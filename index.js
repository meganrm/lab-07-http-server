'use strict';

const cowsay = require('cowsay');
const http = require('http');
const url = require('url');
const urlParser = require('./lib/urlParser');

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);

  if (req.method === 'GET') {

    urlParser.getRouter(req, res);

  } else if (req.method === 'POST') {

    if (req.url.pathname.startsWith('/api')) {

      urlParser.postRouter(req, res);

    } else {

      urlParser.sendResponse(res, 400, 'bad request');

    }

  } else {

    urlParser.sendResponse(res, 400, 'bad request');

  }
});


server.listen(3000);
