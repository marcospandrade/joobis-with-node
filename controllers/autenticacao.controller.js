const db = require("../database/models");
const config = require("../config/auth.config");
const empresaController = require('./empresa/empresa.controller')

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
    db.usuario_empresa.findOne({
            where: {
                email_usuario: req.body.email_usuario
            }
        })
        .then(async usuario_login => {
            if (!usuario_login) {
                return res.status(404).send({
                    message: "Usuário não encontrado."
                });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.senha_usuario,
                usuario_login.senha_usuario
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Senha ou email inválidos!"
                });
            }

            var accessToken = jwt.sign({
                id: usuario_login.id
            }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            const autoridadeUsuario = await db.cargo_usuario.findOne({
                where: {
                    id: usuario_login.id_cargo_usuario
                }
            });

            const empresaVinculada = await db.empresa.findOne({
                where: {
                    id: usuario_login.id_empresa_vinculada
                }
            });

            res.status(200).send({
                message: 'Login efetuado com sucesso',
                accessToken,
                usuario_login,
                autoridadeUsuario,
                empresaVinculada
            })
            /*res.status(200).send({
                id: usuario_solicitando_login.id,
                nome_completo_usuario: usuario_solicitando_login.nome_completo_usuario,
                email_usuario: usuario_solicitando_login.email_usuario,
                telefone_usuario: usuario_solicitando_login.telefone_usuario,
                verificado_usuario: usuario_solicitando_login.verificado_usuario,
                id_empresa_vinculada: empresaVinculada,
                cargo_usuario: autoridade,
                accessToken: token
            })*/
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.validateSession = (req, res, next) => {
    const accessToken = req.headers['x-access-token'];
    
    if (!accessToken) {
        res.status(401).send({
            message: 'Não tem token! Sua sessão é inválida ou está expirada'
        })
        return
    }
    //validação de token = middleware para requests
    jwt.verify(accessToken, config.secret, (err, decoded) => {
        if (err) {
            res.status(401).send({
                message: 'Sua sessão é inválida ou está expirada '
            })
        }

        req.data = decoded

        next()
    })
}

exports.loadSession = (req, res) => {
    const accessToken = req.headers['x-access-token'];
    //console.log(req.headers)
    jwt.verify(accessToken, config.secret, (err, decoded) => {
        if (err) {
            res.status(402).send({
                message: 'Sua sessão é inválida ou está expirada'
            })
            return
        }

        res.status(200).send({
            accessToken,
            usuario_login: decoded
        })
    })
}

exports.loadFullSession = (req, res) => {
    //Carrega todas as informações do usuario => Dados Usuario + Autoridades + Empresa Vinculada
    const accessToken = req.headers['x-access-token'];

    jwt.verify(accessToken, config.secret, async (err, decoded) => {
        if (err) {
            res.status(402).send({
                message: 'Sua sessão é inválida ou está expirada'
            })
            return
        }
        var usuarioLogado = await db.usuario_empresa.findOne({
            where: {
                id: decoded.id
            },
            include: [
                {
                  model: db.cargo_usuario,
                  as: "cargo_do_usuario",
                },
                {
                    model: db.empresa,
                    as: "empresa_vinculada"
                }
            ]
        })
        const empresaVinculada = await db.empresa.findOne({
            where: {
                id: usuarioLogado.id_empresa_vinculada
            }
        })
        res.status(200).send({
            accessToken,
            usuario_login: usuarioLogado,
        })
    })
}

/* TODO - encapsular o carregamento de informações sobre empresa + usuário + autoridades
carregarInfosUsuarioLogado (usuario) = async (req, res) => {
    const autoridadeUsuario = await db.cargo_usuario.findOne({
        where: {
            id: usuario.id_cargo_usuario
        }
    });

    const empresaVinculada = await db.empresa.findOne({
        where: {
            id: usuario.id_empresa_vinculada
        }
    });
}*/