// server.js
const jsonServer = require('json-server');
const cors = require('cors');

function createServer() {
  const server = jsonServer.create();
  const router = jsonServer.router('db.json');
  const middlewares = jsonServer.defaults();

  server.use(cors());
  server.use(jsonServer.bodyParser);
  server.use(middlewares);

  server.get('/', (req, res) => {
    res.json({
      message: 'API CuidaBem rodando com JSON Server',
      endpoints: [
        '/usuarios',
        '/medicamentos',
        '/compromissos',
        '/lembretes',
        '/alarmes',
        '/contatos',
        '/perfil_familiar'
      ]
    });
  });

  server.use(router);

  return server;
}

const localServer = createServer();

// 👉 LOCAL: npm start
if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  localServer.listen(port, () => {
    console.log(`✅ Rodando local na porta ${port}`);
  });
}

// 👉 VERCEL: exporta handler serverless
module.exports = (req, res) => {
  const server = createServer();
  return server(req, res);
};
