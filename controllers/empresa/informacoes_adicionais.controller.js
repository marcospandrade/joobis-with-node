const db = require("../../database/models");

const registrarInformacoesAdicionaisEmpresa = async (req, res) => {
  //buscar empresa para validação se já existe cadastro prévio das informacoes adicionais
  const empresa = await db.empresa.findOne({ where: { id: req.body.id_informacoes_empresa } });
  try {
    const infosAdicionaisCadastradas = await db.informacoes_adicionais_empresa.findOne({
      where:
      {
        id_informacoes_empresa: empresa.id
      }
    });
    if (infosAdicionaisCadastradas) {
      return res.status(400).send({ message: "Essa empresa já possui registro de informações adicionais, atualize-as" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  };
  //salvar informacoes adicionais da empresa
  try {
    const infos_adicionais_empresa = await db.informacoes_adicionais_empresa.create({
      logo_empresa: req.body.logo_empresa,
      descricao_empresa: req.body.descricao_empresa,
      //to-do: upload de imagens/video backend ou frontend
      imagens_anexas: req.body.imagens_anexas,
      videos_anexos: req.body.videos_anexos,
      id_informacoes_empresa: req.body.id_informacoes_empresa
    })

    return res.status(201).send({
      message: "As informações adicionais da empresa foram registradas com sucesso!",
      infos_adicionais_empresa: infos_adicionais_empresa
    })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getInformacoesEmpresaById = async (req, res) => {
  const { idEmpresa } = req.params;
  //buscar empresa específica
  const empresa = await db.empresa.findOne({ where: { id: idEmpresa } });
  try {
    const infos_adicionais_empresa = await db.informacoes_adicionais_empresa.findOne({
      where: { id_informacoes_empresa: empresa.id },
    });
    if (infos_adicionais_empresa) {
      return res.status(200).json({ infos_adicionais_empresa });
    }
    return res.status(404).send("Essa empresa não possui informações adicionais salvas.");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateInformacoesAdicionaisEmpresa = async (req, res) => {
  const { idEmpresa } = req.params;
  const empresa = await db.empresa.findOne({ where: { id: idEmpresa } });
  try {
    //localizando informações adicionais pelo idempresa fornecido pelos parametros da request
    const infosAdicionais = await db.informacoes_adicionais_empresa.findOne({ where: { id_informacoes_empresa: empresa.id } })

    const [updated] = await db.informacoes_adicionais_empresa.update(req.body, {
      where: { id: infosAdicionais.id }
    });
    if (updated) {
      const updatedInfosAdicionais = await db.informacoes_adicionais_empresa.findOne({ where: { id_informacoes_empresa: empresa.id } });
      return res.status(200).json({ Informações_da_empresa: updatedInfosAdicionais });
    }
    throw new Error("Informações adicionais não encontrada");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteInformaçõesAdicionaisEmpresa = async (req, res) => {
  const { idEmpresa } = req.params;
  try {
    //localizando informações adicionais pelo idempresa fornecido pelos parametros da request
    const infosAdicionais = await db.informacoes_adicionais_empresa.findOne({ where: { id_informacoes_empresa: idEmpresa } })

    const deleted = await db.informacoes_adicionais_empresa.destroy({
      where: { id: infosAdicionais.id }
    });
    if (deleted) {
      return res.status(200).send("Informações adicionais da empresa deletadas.");
    }
    throw new Error("Informações adicionais da empresa não foram encontradas.");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  registrarInformacoesAdicionaisEmpresa,
  getInformacoesEmpresaById,
  updateInformacoesAdicionaisEmpresa,
  deleteInformaçõesAdicionaisEmpresa
};