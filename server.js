const restify = require('restify')
const PORT = process.env.PORT || 3000

const createServer = require('./app')

function initServer() {
  const server = createServer()
  server.use(restify.plugins.bodyParser({
    mapParams: false,
  }));

  server.listen(PORT, '0.0.0.0', () => {
    console.log(
      `${server.name} REST server started at ${server.url}`
    )
  })

  // Graceful shutdown
  process.on('SIGTERM', () => cleanUp(server))
};

initServer();
