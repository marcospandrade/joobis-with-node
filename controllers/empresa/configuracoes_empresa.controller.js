const db = require("../../database/models");

const registrarConfiguracoesEmpresa = async (req, res) => {
    //buscar empresa para validação se já existe cadastro prévio das configurações
    const empresa = await db.empresa.findOne({ where: {id: req.body.id_configuracao_empresa} });
    try{
      const configuracaoCadastrada = await db.configuracoes_empresa.findOne({
        where: 
        { 
          id_configuracao_empresa: empresa.id
        }
      });
      if(configuracaoCadastrada){
        return res.status(400).send({ message: "Essa empresa já possui configuração, atualize-as" });
      }
    }catch(err) {
      return res.status(500).json({ message: err.message });
    };
    //salvar configurações da empresa
    try{
        const configuracoes_da_empresa = await db.configuracoes_empresa.create({
            status_conta_empresa: req.body.status_conta_empresa,
            receber_perfil_candidatos: req.body.receber_perfil_candidatos,
            perfil_confidencial: req.body.perfil_confidencial,
            sugestao_abertura_vagas: req.body.sugestao_abertura_vagas,
            controlar_acesso_funcionario_expediente: req.body.controlar_acesso_funcionario_expediente,
            id_configuracao_empresa: req.body.id_configuracao_empresa
        })
  
        return res.status(201).send({
            message:"As configurações da empresa foram registradas com sucesso!",
            config_empresa: configuracoes_da_empresa
        })
    }catch (error){
        return res.status(500).json({ error: error.message });
    }
};

const getConfiguracaoEmpresaById = async (req, res) => {
    //buscar empresa específica
    const { idEmpresa } = req.params
    const empresa = await db.empresa.findOne({ where: {id: idEmpresa} });
  try {
    const configuracao_da_empresa = await db.configuracoes_empresa.findOne({
      where: { id_configuracao_empresa: empresa.id },
    });
    if (configuracao_da_empresa) {
      return res.status(200).json({ configuracao_da_empresa });
    }
    return res.status(404).send("Essa empresa não possui configurações salvas.");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateConfiguracoesEmpresa = async (req, res) => {
  try {
    const { idEmpresa } = req.params;
    //selecionando empresa
    const empresa = await db.empresa.findOne({ where: { id: idEmpresa } });
    //atualizando as configurações da empresa
    const [updated] = await db.configuracoes_empresa.update(req.body, {
      where: { id_configuracao_empresa: empresa.id }
    });
    if (updated) {
      const updatedConfiguracao = await db.configuracoes_empresa.findOne({ where: { id_configuracao_empresa: empresa.id } });
      return res.status(200).json({ Configuracoes_da_empresa: updatedConfiguracao });
    }
    throw new Error("Configuração não encontrada");
  } catch (error) {
      return res.status(500).send(error.message);
  }
};

const deleteConfiguracoesEmpresa = async (req, res) => {
  try {
    const { idEmpresa } = req.params;
    //selecionando empresa
    const empresa = await db.empresa.findOne({ where: { id: idEmpresa } });
    //deletando a configuracao da empresa
    const deleted = await db.configuracoes_empresa.destroy({
      where: { id_configuracao_empresa: empresa.id }
    });
    if (deleted) {
      return res.status(200).send({ message: "Configuração da empresa deletada."});
    }
    throw new Error("Configuração da empresa não encontrada.");
  } catch (error) {
      return res.status(500).send(error.message);
  }
};

module.exports = {
    registrarConfiguracoesEmpresa,
    getConfiguracaoEmpresaById,
    updateConfiguracoesEmpresa,
    deleteConfiguracoesEmpresa
};