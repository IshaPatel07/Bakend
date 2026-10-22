import http from "http";
import path from "path";
import fs from "fs";

const serverHandler = (req, res) => {
  if (req.url == "/") {
  } else if (req.url == "/about") {
  } else {
    res.writeHead(404, { "content-type": "plain/text" });
    res.end("404 page not found !");
  }
};

const server = http.createServer(serverHandler);

server.listen(4000, () => {
  console.log("server started successdully !");
});
