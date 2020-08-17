const db = require("../database/models");

checkDuplicateEmailOrPhone = (req, res, next) => {
  // check email
  db.usuario_empresa.findOne({
    where: {
      email_usuario: req.body.email_usuario
    }
  }).then(usuario => {
    if (usuario) {
      res.status(400).send({
        message: "Falha! Email ou telefone já está em uso!"
      });
      return;
    }

    //check Phone
    db.usuario_empresa.findOne({
      where: {
        telefone_usuario: req.body.telefone_usuario
      }
    }).then(usuario => {
      if (usuario) {
        res.status(400).send({
          message: "Falhou! Telefone ou email já está em uso!"
        });
        return;
      }

      next();
    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

const verifySignUp = {
  checkDuplicateEmailOrPhone: checkDuplicateEmailOrPhone
};

module.exports = verifySignUp;