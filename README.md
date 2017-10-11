![cf](https://i.imgur.com/7v5ASc8.png) Lab 07: Vanilla HTTP Server

###### GET /
When a client makes a GET request to / the server should send back html with a project description and a anchor to /cowsay.

###### GET /cowsay?text={message}
When a client makes a GET request to /cowsay?text={message} the server should parse the query string for a text key. It should then send a rendered HTML page with a cowsay cow speaking the value of the text query. If there is no text query the cow message should say `'I need something good to say!'`.


###### GET /api/cowsay?text={message}
When a client makes a GET request to /api/cowsay it responds with instructions.

###### POST /api/cowsay
When a client makes a POST request to /api/{animal}say it should send JSON that includes `{"text": "{message}"}`. The server should respond with a JSON body `{"content": "{animal}say animal {message}"}`.

| Request | Response Status Code | Response Type | Response Body |
| -- | -- | -- | -- |
| With out a body | 400 | JSON | `{"error": "invalid request: body required"}` |
| With out text property on the body | 400 | JSON | `{"error": "invalid request: text query required"}` |
| With text query | 200 | JSON | `{"content": "<cowsay cow text>"}` |
