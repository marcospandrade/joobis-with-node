'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class informacoes_adicionais_empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      informacoes_adicionais_empresa.belongsTo(models.empresa, {
        foreignKey: 'id_informacoes_empresa',
        as: 'informacoes_da_empresa',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
    }
  };
  informacoes_adicionais_empresa.init({
    logo_empresa: DataTypes.STRING,
    descricao_empresa: DataTypes.STRING,
    imagens_anexas: DataTypes.STRING,
    videos_anexos: DataTypes.STRING,
    id_informacoes_empresa: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'informacoes_adicionais_empresa',
  });
  return informacoes_adicionais_empresa;
};