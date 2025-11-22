// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(require('./db.json')); // carrega o JSON em memória
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Rota de login (somente leitura)
server.post('/login', (req, res) => {
  const { email, password } = req.body;

  // json-server já usa lowdb internamente em memória
  const db = router.db; 
  const user = db
    .get('usuarios')
    .find({ email, password })
    .value();

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // token fake só pra simular backend real
  return res.json({
    token: 'fake-jwt-token',
    user,
  });
});

// Demais rotas REST (GET, POST etc.)
// ATENÇÃO: na Vercel, qualquer "escrita" (POST/PUT/DELETE) não persiste de verdade
server.use(router);

module.exports = server;
