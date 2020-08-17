const { verifySignUp } = require("../middleware");
const controller = require("../controllers/autenticacao.controller");

module.exports = function(server) {
  server.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  server.post("/auth/login", controller.login);

  server.get("/auth/load-session", controller.validateSession, controller.loadSession)

  server.get("/auth/load-full-session", controller.validateSession, controller.loadFullSession)
};