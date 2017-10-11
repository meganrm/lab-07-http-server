'use strict';

const bodyParser = module.exports = {};
const cowsay = require('cowsay');

bodyParser.mainPage = function() {
  let mainBody = `
  <html>
    <head>
      <title> cowsay </title>
    </head>
    <body>
     <header>
       <nav>
         <ul>
           <li><a href="/cowsay">cowsay</a></li>
         </ul>
       </nav>
     <header>
     <main>
       Send query param to see the cow say things. Ex /cowsay?text=hello!
     </main>
    </body>
  </html>`;
  return mainBody;
};

bodyParser.makePage = function (key, queryParam) {
  let cowSay = cowsay.say({
    text: queryParam,
    cow: key,
  });
  let pageBody = `<html>
    <head>
      <title> ${key}say </title>
    </head>
    <body>
      <h1> ${key}say </h1>
      <pre>
        ${cowSay}
      </pre>
    </body>
  </html>`;
  return pageBody;
};
