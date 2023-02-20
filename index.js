const http = require('http');
const fs = require('fs');

let file = fs.createReadStream('loop.mp3');
const port = 443;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'audio/mpeg' });
  file.pipe(res);
  res.on('close', () => {
    file.destroy();
    file = fs.createReadStream('loop.mp3');
  });
});

server.listen(process.env.PORT || 3000);

console.log(`Radio streaming!`);