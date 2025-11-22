// server.js
const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Permitir requisições do app mobile
server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

/**
 * Exemplo de rota customizada opcional:
 *  - Futuramente podemos criar /login aqui.
 *  - Por enquanto, vamos usar /usuarios?email=&password= diretamente do app.
 */

// Rota raiz opcional só para teste rápido
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

// Demais rotas padrão do JSON Server
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`✅ JSON Server CuidaBem rodando na porta ${port}`);
});
