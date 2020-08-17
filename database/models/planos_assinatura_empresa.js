'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class planos_assinatura_empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      planos_assinatura_empresa.hasMany(models.empresa, {
        foreignKey: 'plano_assinatura',
        as: 'empresa_contem_plano',
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      });
    }
  };
  planos_assinatura_empresa.init({
    nome_plano: DataTypes.STRING,
    valor_mensalidade: DataTypes.INTEGER,
    numero_vagas_para_registrar: DataTypes.INTEGER,
    usuarios_liberados: DataTypes.INTEGER,
    perfis_match_jobs_disponiveis: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'planos_assinatura_empresa',
  });
  return planos_assinatura_empresa;
};