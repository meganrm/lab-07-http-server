'use strict';

const bodyParser = module.exports = {};

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
       <!-- project description -->
     </main>
    </body>
  </html>`
  return mainBody;
}

bodyParser.makePage = function (key, queryParam) {
  let splitQuery = queryParam.split('=');
  let value = splitQuery.length > 1 && unescape(splitQuery[1].length) > 0 ? unescape(queryParam.split('=').slice(1)) : 'I need something to say!';
  let pageBody = `<html>
    <head>
      <title> ${key}say </title>
    </head>
    <body>
      <h1> ${key}say </h1>
      <pre>
        ${key}say: ${value}
      </pre>
    </body>
  </html>`
  return pageBody;
}
