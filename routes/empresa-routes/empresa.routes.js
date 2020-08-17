const { verifySignUp } = require("../../middleware");
const empresaController = require("../../controllers/empresa/empresa.controller");

module.exports = function (server) {
    server.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    server.post("/cadastrarEmpresa", empresaController.cadastrarEmpresa);

    server.get("/getEmpresaById/:idEmpresa", empresaController.getEmpresaById);

    server.get("/getTodasEmpresas", empresaController.getTodasEmpresa);

    server.put("/atualizarEmpresa/:idEmpresa", empresaController.updateEmpresa);

    server.delete("/deletarEmpresa/:idEmpresa", empresaController.deleteEmpresa);
}