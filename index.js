'use strict';

const http = require('http');
const url = require('url');
const bodyParser = require('./lib/bodyParser');

let sendResponse = function(res, status, body, textType) {
  res.writeHead(status, {'Content-Type': `text/${textType}`});
  res.write(body);
  res.end();
};

const server = http.createServer((req, res) => {
  //things coming in from the header will be automatically stored on the req object
  //shouldnt have any data in get request
  //if you want to send data, put in the header
  req.url = url.parse(req.url);
  if (req.method === 'GET' && req.url.pathname === '/') {
    let statusCode = 200;
    sendResponse(res, statusCode, bodyParser.mainPage(), 'html');
  }
  else if (req.method === 'GET' && req.url.pathname === '/query') {
    //handeling query params
    sendResponse(res, 200, req.url.query);
  }
  //parse data
  else if (req.method === 'POST' && req.url === '/') {
    let body = '';
    req.on('data', function(data){
      //there is a max buffer size so we have to add chunks together
      body += data.toString();
    });
    req.on('end', function(){
      console.log(body);
      let json;
      try {
        json = JSON.parse(body);
        console.log(json);
      } catch(e){
        return sendResponse(res, 400, 'bad JSON :()');
      }
      sendResponse(res, 200, 'got the data, thanks!');
    });
  } else {
    sendResponse(res, 400, 'bad request');
  }

});
//request is an event emitter, response is not.


server.listen(3000);
