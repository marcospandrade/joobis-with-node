'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class endereco_empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      endereco_empresa.belongsTo(models.empresa, {
        foreignKey: 'id_empresa_neste_endereco',
        as: 'empresa_neste_endereco',
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      });
    }
  };
  endereco_empresa.init({
    endereco: DataTypes.STRING,
    numero_endereco: DataTypes.STRING,
    bairro_endereco: DataTypes.STRING,
    complemento_endereco: DataTypes.STRING,
    cep_endereco: DataTypes.STRING,
    cidade_endereco: DataTypes.STRING,
    estado_endereco: DataTypes.STRING,
    pais_endereco: DataTypes.STRING,
    id_empresa_neste_endereco: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'endereco_empresa',
  });
  return endereco_empresa;
};