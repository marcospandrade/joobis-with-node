'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario_empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      usuario_empresa.belongsTo(models.empresa, {
        foreignKey: 'id_empresa_vinculada',
        as: 'empresa_vinculada',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });

      usuario_empresa.belongsTo(models.cargo_usuario, {
        foreignKey: 'id_cargo_usuario',
        as: 'cargo_do_usuario',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
    }
  };
  usuario_empresa.init({
    nome_completo_usuario: DataTypes.STRING,
    email_usuario: DataTypes.STRING,
    telefone_usuario: DataTypes.STRING,
    verificado_usuario: DataTypes.BOOLEAN,
    senha_usuario: DataTypes.STRING,
    id_empresa_vinculada: DataTypes.INTEGER,
    id_cargo_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usuario_empresa',
  });
  return usuario_empresa;
};