'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      empresa.belongsTo(models.planos_assinatura_empresa, {
        foreignKey: 'plano_assinatura',
        as: 'plano_assinatura_contratado',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });

      empresa.hasMany(models.usuario_empresa, {
        foreignKey: 'id_empresa_vinculada',
        as: 'usuarios_registrados',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'  
      });

      empresa.hasOne(models.informacoes_adicionais_empresa, {
        foreignKey: 'id_informacoes_empresa',
        as: 'informacoes_da_empresa',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });

      empresa.hasOne(models.configuracoes_empresa, {
        foreignKey: 'id_configuracao_empresa',
        as: 'configuracao_da_empresa',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });

      empresa.hasOne(models.endereco_empresa, {
        foreignKey: 'id_empresa_neste_endereco',
        as: 'endereco_da_empresa',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });      
    }
  };
  empresa.init({
    cnpj: DataTypes.STRING,
    razao_social: DataTypes.STRING,
    nome_fantasia_empresa: DataTypes.STRING,
    site_empresa: DataTypes.STRING,
    email_empresa: DataTypes.STRING,
    telefone_empresa: DataTypes.STRING,
    plano_assinatura: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'empresa',
  });
  return empresa;
};