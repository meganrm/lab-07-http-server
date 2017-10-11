'use strict';

const urlParser = module.exports = {};
const bodyParser = require('../lib/bodyParser');

let sendResponse = function(res, status, body, textType) {
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

urlParser.getRouter = function(req, res){
  if (req.url.pathname === '/') {

    let statusCode = 200;
    sendResponse(res, statusCode, bodyParser.mainPage(), 'text/html');

  } else if (req.url.pathname === '/cowsay') {

    let value = urlParser.checkParams(req.url.query, 'text', 'I need something to say!');
    sendResponse(res, 200, bodyParser.makePage('cow', value), 'text/html');

  } else if (req.url.pathname === '/api/cowsay') {

    sendResponse(res, 200, 'cowsay api', 'text/plain');

  }
}
