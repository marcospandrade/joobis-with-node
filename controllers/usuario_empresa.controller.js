const db = require("../database/models");
const config = require("../config/auth.config");

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.registroUsuario = async (req, res) => {
    // Save User to Database
    try {
        const usuario = await db.usuario_empresa.create({
            nome_completo_usuario: req.body.nome_completo_usuario,
            email_usuario: req.body.email_usuario,
            telefone_usuario: req.body.telefone_usuario,
            verificado_usuario: req.body.verificado_usuario,
            senha_usuario: bcrypt.hashSync(req.body.senha_usuario, 8),
            id_empresa_vinculada: req.body.id_empresa_vinculada,
            id_cargo_usuario: req.body.id_cargo_usuario
        })
        res.status(200).send({ message: "Deu certo o cadastro de usuário!", usuario: usuario });
    } catch (err) {
        res.status(500).send({ message: err.message + "Erro doido" });
    };
};

exports.getUsuarioById = async (req, res) => {
    const { idUsuario } = req.params;
    try {
        const usuario = await db.usuario_empresa.findOne({
            where: { id: idUsuario }
        })

        if (usuario) {
            return res.status(200).json({ usuario });
        }
        return res.status(404).send("Esse usuario não está registrado no sistema.");
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

exports.getTodosUsuarios = async (req, res) => {
    try {
        const usuarios = await db.usuario_empresa.findAll();
        if (usuarios) {
            return res.status(200).json({ usuarios });
        }
        throw new Error("Não possuimos usuários registrados")
    } catch (error) {
        return res.send(500).send({ message: error.message });
    }
}

exports.atualizarUsuario = async (req, res) => {
    const { idUsuario } = req.params;
    try {
        const [updated] = await db.usuario_empresa.update(req.body, {
            where: { id: idUsuario }
        });
        if (updated) {
            const updatedUsuario = await db.usuario_empresa.findOne({ where: { id: idUsuario } });
            return res.status(200).json({ Usuario_Atualizado: updatedUsuario });
        }
        throw new Error("Usuário não encontrado");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.deleteUsuario = async (req, res) => {
    const { idUsuario } = req.params;
    try {
        const deleted = await db.usuario_empresa.destroy({
            where: { id: idUsuario }
        });
        if (deleted) {
            return res.status(200).send({ message: "Rapaz, tu deletou mesmo o usuário ein!" })
        }
        throw new Error("Usuário não foi encontrado.");
    } catch (error) {
        return res.status(500).send(error.message);
    };
}
