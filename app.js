const restify = require('restify')
const generatePdf = require('./generate')
const fs = require('fs');

const APP_NAME = 'attestation-generator'


function createServer() {
  const server = restify.createServer({ name: APP_NAME })
  server.post({ name: 'generatePdf', path: '/generate' }, async (req, res, next) => {
    const pdf = await generatePdf(req);
    res.header('Content-disposition', 'inline; filename=attestation.pdf');
    res.header('Content-type', 'application/pdf');
    const buffer = Buffer.from(pdf);
    res.write(buffer)
    res.end();
  })
  server.get({ name: 'index', path: '/' }, (req, res, next) => {
    const body = fs.readFileSync('./index.html')
    res.write(body);
    res.end();
  })
  return server
}

module.exports = createServer
