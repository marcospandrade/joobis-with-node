'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class configuracoes_empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      configuracoes_empresa.belongsTo(models.empresa, {
        foreignKey: 'id_configuracao_empresa',
        as: 'empresa_configurada',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
    }
  };
  configuracoes_empresa.init({
    status_conta_empresa: DataTypes.BOOLEAN,
    receber_perfil_candidatos: DataTypes.BOOLEAN,
    perfil_confidencial: DataTypes.BOOLEAN,
    sugestao_abertura_vagas: DataTypes.BOOLEAN,
    controlar_acesso_funcionario_expediente: DataTypes.BOOLEAN,
    id_configuracao_empresa: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'configuracoes_empresa',
  });
  return configuracoes_empresa;
};