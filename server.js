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

  // Rota raiz só para teste rápido
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

// 🔹 Servidor local (npm start)
if (!process.env.VERCEL) {
  const localServer = createServer();
  const port = process.env.PORT || 3000;
  localServer.listen(port, () => {
    console.log(`✅ API CuidaBem rodando local na porta ${port}`);
  });
}

// 🔹 Handler para a Vercel (Serverless Function)
module.exports = (req, res) => {
  try {
    const server = createServer();
    return server(req, res);
  } catch (err) {
    console.error('🔥 Erro na função serverless:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        error: 'Erro interno na API CuidaBem',
        detail: err.message,
      })
    );
  }
};
