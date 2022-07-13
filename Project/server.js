const http = require("http");
const os = require("os");
const fs = require("fs");
const host = "localhost";
const port = 8000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(__dirname + "/pages/index.html").pipe(res);
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(__dirname + "/pages/about.html").pipe(res);
  } else if (req.url === "/sys") {
    res.writeHead(201, { "Content-Type": "text/plain" });
    const content = `{
          "hostname":${JSON.stringify(os.hostname())},
          "platform":${JSON.stringify(os.platform())},
          "architecture":${JSON.stringify(os.arch())},
          "numberOfCPUS":${JSON.stringify(os.cpus().length)},
          "networkInterfaces":${JSON.stringify(os.networkInterfaces())},
          "uptime":${JSON.stringify(os.uptime())}
        }`;
    fs.createWriteStream(__dirname + "/osinfo.json").write(content);
    res.end("Your OS info has been saved successfully!");
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    fs.createReadStream(__dirname + "/pages/404.html").pipe(res);
  }
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
