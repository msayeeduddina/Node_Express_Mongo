const http = require("http");

const port = 8000;

const server = http.createServer((req, res) => {
  console.log(req);
  res.setHeader("Content-Type", "text/html");
  if (req.url == "/") {
    res.statusCode = 200;
    res.end("<h1>Hello World Home</h1");
  } else if (req.url == "/about") {
    res.statusCode = 200;
    res.end("<h1>Hello World About</h1");
  } else {
    res.statusCode = 404;
    res.end("<h1>Page Not Found</h1");
  }
});

server.listen(port, () => {
  console.log(`Listening':${port}`);
});
