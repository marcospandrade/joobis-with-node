'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cargo_usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cargo_usuario.hasMany(models.usuario_empresa, {
        foreignKey: 'id_cargo_usuario',
        as: 'cargo_do_usuario',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
    }
  };
  cargo_usuario.init({
    nome_cargo: DataTypes.STRING,
    descricao_cargo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cargo_usuario',
  });
  return cargo_usuario;
};