'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuario_empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_completo_usuario: {
        type: Sequelize.STRING
      },
      email_usuario: {
        type: Sequelize.STRING
      },
      telefone_usuario: {
        type: Sequelize.STRING
      },
      verificado_usuario: {
        type: Sequelize.BOOLEAN
      },
      senha_usuario: {
        type: Sequelize.STRING
      },
      id_cargo_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 3,
        references: {
          model: {
            tableName: 'cargo_usuarios',
          },
          key: 'id'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      },
      id_empresa_vinculada: {
        references: {
          model: {
            tableName: 'empresas',
          },
          key: 'id'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuario_empresas');
  }
};