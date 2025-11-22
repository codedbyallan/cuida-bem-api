// server.js
const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Middlewares básicos
server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

// Rota raiz só para teste
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

// Rotas padrão do JSON Server
server.use(router);

// 🔹 Modo local (npm start) -> abre porta
const port = process.env.PORT || 3000;
if (!process.env.VERCEL) {
  server.listen(port, () => {
    console.log(`✅ JSON Server CuidaBem rodando na porta ${port}`);
  });
}

// 🔹 Export para a Vercel (serverless handler)
module.exports = server;
