const db = require("../../database/models");

//const http = require('http');
//const request = require('request');
//const apiBuscarEmpresaPeloCnpj = 'https://api.leadfinder.com.br/externo/cnpj/';

exports.validarEmpresa = async (req, res) => {
  //buscar dados pela API leadfinder
  /*
  const dadosEmpresa = request(`${apiBuscarEmpresaPeloCnpj}${path}`, (err, rest, body) => {
    if (err) {
      rest.status(400).send({ message: "Deu b.o na busca pela empresa" + err });
    }
    console.log("buscarEmpresaPelaApi")
    console.log(body);
    //res.status(200).send({ message: body })
    return JSON.parse(body);
  });
  */
  //validar se a empresa já foi registrada
  try {
    const empresaCadastrada = await db.empresa.findOne({
      where: { cnpj: req.body.cnpj }
    })
    console.log(empresaCadastrada)
    if (empresaCadastrada) {
      return res.status(400).send({ message: "Empresa já está cadastrado, dog" });
    }
    res.status(200).send({ message: "Cadastro de empresa válido" })
  } catch (err) {
    return res.status(500).json({ error: err.message });
  };
};

exports.cadastrarEmpresa = async (req, res) => {
  //validação se já existe um registro para o cnpj digitado
  try {
    const empresaCadastrada = await db.empresa.findOne({
      where: { cnpj: req.body.cnpj }
    })
    console.log(empresaCadastrada)
    if (empresaCadastrada) {
      return res.status(400).send({ message: "Empresa já está cadastrado, dog" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  };
  //cria o registro de empresa
  try {
    await db.empresa.create({
      cnpj: req.body.cnpj,
      razao_social: req.body.razao_social,
      nome_fantasia_empresa: req.body.nome_fantasia_empresa,
      site_empresa: req.body.site_empresa,
      email_empresa: req.body.email_empresa,
      telefone_empresa: req.body.telefone_empresa,
      endereco_da_empresa: req.body.endereco_da_empresa,
      plano_assinatura: req.body.plano_assinatura
    }, {
      include: [
        {
          model: db.endereco_empresa,
          as: 'endereco_da_empresa'
        }
      ]
    });
    res.status(200).send({ message: "Deu boa nosso registro" })
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.getEmpresaById = async (req, res) => {
  const { idEmpresa } = req.params;
  //buscar empresa específica
  try {
    const empresa = await db.empresa.findOne({
      where: {
        id: idEmpresa
      },
      include: [
        {
          model: db.endereco_empresa,
          as: "endereco_da_empresa",
        },
        {
          model: db.informacoes_adicionais_empresa,
          as: 'informacoes_da_empresa'
        },
        {
          model: db.configuracoes_empresa,
          as: 'configuracao_da_empresa'
        },
        {
          model: db.planos_assinatura_empresa,
          as: 'plano_assinatura_contratado'
        },
        {
          model: db.usuario_empresa,
          as: 'usuarios_registrados'
        },
      ],
    });
    if (empresa) {
      return res.status(200).json({ empresa });
    }
    return res.status(404).send("Essa empresa não está registrada no sistema.");
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.getTodasEmpresa = async (req, res) => {
  //buscar todas as empresa
  try {
    const empresas = await db.empresa.findAll();
    if (empresas) {
      return res.status(200).json({ empresas });
    }
    return res.status(404).send("Não possuimos empresas cadastradas =(");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.updateEmpresa = async (req, res) => {
  try {
    const { idEmpresa } = req.params;
    const [updated] = await db.empresa.update(req.body, {
      where: { id: idEmpresa }
    });
    if (updated) {
      const updatedEmpresa = await db.empresa.findOne({ where: { id: idEmpresa } });
      return res.status(200).json({ Empresa: updatedEmpresa });
    }
    throw new Error("Empresa não encontrada!");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.deleteEmpresa = async (req, res) => {
  try {
    const { idEmpresa } = req.params;

    const deleted = await db.empresa.destroy({
      where: { id: idEmpresa }
    });
    if (deleted) {
      return res.status(204).send("Empresa deletada.");
    }
    throw new Error("Empresa não encontrada!");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


