const controller = require("../../controllers/empresa/informacoes_adicionais.controller");

module.exports = function (server) {
    server.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    server.post("/registrarInformacoesAdicionaisEmpresa", controller.registrarInformacoesAdicionaisEmpresa);

    server.get("/getInformacoesAdicionaisEmpresa/:idEmpresa", controller.getInformacoesEmpresaById);

    server.put("/atualizarInformacoesAdicionaisEmpresa/:idEmpresa", controller.updateInformacoesAdicionaisEmpresa);

    server.delete("/deletarInformacoesAdicionaisEmpresa/:idEmpresa", controller.deleteInformaçõesAdicionaisEmpresa);
}