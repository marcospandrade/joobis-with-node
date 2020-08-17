const { Router } = require('express');
const router = Router();

require('./empresa-routes/configuracoes_empresa.routes')(router);
require('./empresa-routes/empresa.routes')(router);
require('./empresa-routes/informacoes_adicionais.routes')(router);

require('./plano_assinatura.routes')(router);

require('./usuario_empresa.routes')(router);
require('./autenticacao.routes')(router);

router.get('/', (req, res) => res.send('Hello Word From Backend with NodeJs'));

module.exports = router;