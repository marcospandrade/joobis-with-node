const db = require("../../database/models");

const registrarPlanoAssinatura = async (req, res) => {
    //buscar plano validando se já existe cadastro prévio
    try {
        const plano_assinatura = await db.planos_assinatura_empresa.findOne({
            where:
            {
                nome_plano: req.body.nome_plano,
                valor_mensalidade: req.body.valor_mensalidade
            }
        });
        if (plano_assinatura) {
            return res.status(400).send({ message: "Esse plano, se pah, já ta cadastrado ein" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    };
    //salvar novo plano de assinatura
    try {
        const plano_assinatura = await db.planos_assinatura_empresa.create({
            nome_plano: req.body.nome_plano,
            valor_mensalidade: req.body.valor_mensalidade,
            numero_vagas_para_registrar: req.body.numero_vagas_para_registrar,
            usuarios_liberados: req.body.usuarios_liberados,
            perfis_match_jobs_disponiveis: req.body.perfis_match_jobs_disponiveis
        })

        return res.status(201).send({
            message: "As informações adicionais da empresa foram registradas com sucesso!",
            plano_de_assinatura: plano_assinatura
        })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getTodosPlanosAssinatura = async (req, res) => {
    try {
        const todosOsPlanosAssinatura = await db.planos_assinatura_empresa.findAll();
        if (todosOsPlanosAssinatura) {
            return res.status(200).json({ todosOsPlanosAssinatura });
        }
        return res.status(404).send("Não encontrei nenhum plano de assinatura registrado.");
    } catch (err) {
        res.send(500).send({ message: err.message })
    }
}

const getPlanoAssinaturaById = async (req, res) => {
    //buscar empresa específica
    const { idPlanoAssinatura } = req.params;
    try {
        const plano_assinatura = await db.planos_assinatura_empresa.findOne({
            where: { id: idPlanoAssinatura },
        });
        if (plano_assinatura) {
            return res.status(200).json({ plano_assinatura });
        }
        return res.status(404).send("Essa empresa não possui esse plano de assinatura salvo.");
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
};

const getPlanoAssinaturaByEmpresa = async (req, res) => {
    const { idEmpresa } = req.params;
    const empresa = await db.empresa.findOne({ where: { id: idEmpresa } });
    try{
        const plano_assinatura = await db.planos_assinatura_empresa.findOne({
            where: { id: empresa.plano_assinatura}
        });
        if(plano_assinatura){
            return res.status(200).json({ plano_assinatura });
        }
        return res.status(404).send("Essa empresa não possui plano de assinatura salvo.")
    }catch(error){
        return res.status(500).send({ message: error.message});
    };
}

const updatePlanoAssinatura = async (req, res) => {
    try {
        const { idPlanoAssinatura } = req.params;
        //localizando informações adicionais pelo idempresa fornecido pelos parametros da request
        const plano_assinatura = await db.planos_assinatura_empresa.findOne({ where: { id: idPlanoAssinatura } })

        const [updated] = await db.planos_assinatura_empresa.update(req.body, {
            where: { id: plano_assinatura.id }
        });
        if (updated) {
            const updatedPlanoAssinatura = await db.planos_assinatura_empresa.findOne({ where: { id: idPlanoAssinatura } });
            return res.status(200).json({ Informações_da_empresa: updatedPlanoAssinatura });
        }
        throw new Error("Plano de Assinatura não encontrado");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deletePlanoAssinatura = async (req, res) => {
    try {
        const { idPlanoAssinatura } = req.params;
        //localizando informações adicionais pelo idempresa fornecido pelos parametros da request
        const plano_assinatura = await db.planos_assinatura_empresa.findOne({ where: { id: idPlanoAssinatura } })

        const deleted = await db.planos_assinatura_empresa.destroy({
            where: { id: plano_assinatura.id }
        });
        if (deleted) {
            return res.status(200).send("Plano de assinatura deletado.");
        }
        throw new Error("Plano de assinatura não encontrado.");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    registrarPlanoAssinatura,
    getTodosPlanosAssinatura,
    getPlanoAssinaturaById,
    getPlanoAssinaturaByEmpresa,
    updatePlanoAssinatura,
    deletePlanoAssinatura
};