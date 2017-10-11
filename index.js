'use strict';

const http = require('http');
const url = require('url');
const urlParser = require('./lib/urlParser');
const bodyParser = require('./lib/bodyParser');

let sendResponse = function(res, status, body, textType) {
  res.writeHead(status, {'Content-Type': `${textType ? textType : 'text/plain'}`});
  res.write(body);
  res.end();
};

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  if (req.method === 'GET') {

    urlParser.getRouter(req, res);

  } else if (req.method === 'POST' && req.url.pathname === '/api/cowsay') {
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

        returnBody['error'] = 'invalid request: body required'
        return sendResponse(res, 400, returnBody);

      }

      let dataValue = urlParser.checkJSON(json, 'text');
      if (dataValue) {
        returnBody['content'] = `cowsay cow ${dataValue}`;
      } else {
        returnBody['error'] = 'invalid request: text query required';
      }
      sendResponse(res, 200, JSON.stringify(returnBody), 'plain/text');
    });
  } else {
    sendResponse(res, 400, 'bad request');
  }
});
//request is an event emitter, response is not.


server.listen(3000);
