const controller = require("../../controllers/empresa/configuracoes_empresa.controller");

module.exports = function (server) {
    server.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    server.post("/registrarConfiguracoes", controller.registrarConfiguracoesEmpresa);
    
    server.get("/teste", (req,res) => {
        res.send({
            message: "teste de imports das rotas"
        });
    });

    server.get("/getConfiguracoesEmpresa/:idEmpresa", controller.getConfiguracaoEmpresaById);

    server.put("/atualizarConfiguracoesEmpresa/:idEmpresa", controller.updateConfiguracoesEmpresa);

    server.delete("/deletarConfiguracoesEmpresa/:idEmpresa", controller.deleteConfiguracoesEmpresa);
}