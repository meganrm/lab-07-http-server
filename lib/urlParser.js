'use strict';

const urlParser = module.exports = {};
const bodyParser = require('../lib/bodyParser');
const cowsay = require('cowsay');

urlParser.sendResponse = function (res, status, body, textType) {
  res.writeHead(status, {'Content-Type': `${textType ? textType : 'text/plain'}`});
  res.write(body);
  res.end();
};

urlParser.checkParams = function(queryParam, keyWord, defaultResponse) {
  let ret = defaultResponse;

  if (queryParam && queryParam.startsWith(`${keyWord}=`)) {
    ret = unescape(queryParam.split('=').slice(1));
  }

  return ret;

};

urlParser.checkJSON = function(data, keyWord) {
  let ret = false;
  if (data[keyWord]) {
    ret = data[keyWord];
  }
  return ret;
};

urlParser.makeResponse = function(key, dataValue) {
  let returnBody = {};
  if (dataValue) {
    returnBody['content'] = `${key}: ${cowsay.say({
      cow : key,
      text: dataValue,
    })
  }`;
  } else {
    returnBody['error'] = 'invalid request: text query required';
  }
  return JSON.stringify(returnBody);
};

urlParser.getRouter = function(req, res){
  if (req.url.pathname === '/') {

    let statusCode = 200;
    urlParser.sendResponse(res, statusCode, bodyParser.mainPage(), 'text/html');

  } else if (req.url.pathname === '/cowsay') {

    let value = urlParser.checkParams(req.url.query, 'text', 'I need something to say!');
    urlParser.sendResponse(res, 200, bodyParser.makePage('cow', value), 'text/html');

  } else if (req.url.pathname === '/api/cowsay') {
    let dataValue = urlParser.checkParams(req.url.query, 'text', 'I need something to say!');
    let key = urlParser.sayKey(req.url.pathname);
    urlParser.sendResponse(res, 200,  urlParser.makeResponse(key, dataValue), 'text/plain');
  }
};

urlParser.sayKey = function (pathname) {
  let splitPathname = pathname.split('/');
  let index = parseInt(splitPathname.indexOf('api')) + 1;
  return splitPathname[index].replace('say', '');
};

urlParser.postRouter = function (req, res) {
  let body = '';
  req.on('data', function(data){
    //there is a max buffer size so we have to add chunks together
    body += data.toString();
  });
  req.on('end', function(){
    let json;
    let returnBody = {};

    try {

      json = JSON.parse(body);

    } catch(e) {

      returnBody['error'] = 'invalid request: body required';
      return urlParser.sendResponse(res, 400, returnBody);

    }

    let dataValue = urlParser.checkJSON(json, 'text');
    let key = urlParser.sayKey(req.url.pathname);

    urlParser.sendResponse(res, 200,  urlParser.makeResponse(key, dataValue), 'text/plain');
  });
};
