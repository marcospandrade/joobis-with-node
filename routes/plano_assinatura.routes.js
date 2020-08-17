const controller = require('../controllers/empresa/plano_assinatura.controller');
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.post(
        '/registrarPlanoAssinatura', 
        //[authJwt.verifyToken, authJwt.isAdmin], 
        controller.registrarPlanoAssinatura 
      );

      app.get(
        '/getTodosPlanosAssinatura',
        //[authJwt.verifyToken, authJwt.isAdmin],
        controller.getTodosPlanosAssinatura
      );

      app.get(
        '/getPlanoAssinaturaById/:idPlanoAssinatura',
        //[authJwt.verifyToken, authJwt.isAdmin],
        controller.getPlanoAssinaturaById
      );
      
      app.get(
        '/getPlanoAssinaturaByEmpresa/:idEmpresa',
        // [authJwt.verifyToken, authJwt.isModerator],
        controller.getPlanoAssinaturaByEmpresa
      )

      app.put(
        '/atualizarPlanoAssinatura/:idPlanoAssinatura',
        //[authJwt.verifyToken, authJwt.isAdmin],
        controller.updatePlanoAssinatura
      );

      app.delete(
        '/deletarPlanoAssinatura/:idPlanoAssinatura',
        //[authJwt.verifyToken, authJwt.isAdmin],
        controller.deletePlanoAssinatura
      );
};