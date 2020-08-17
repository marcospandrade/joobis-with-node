'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('endereco_empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      endereco: {
        type: Sequelize.STRING
      },
      numero_endereco: {
        type: Sequelize.STRING
      },
      bairro_endereco: {
        type: Sequelize.STRING
      },
      complemento_endereco: {
        type: Sequelize.STRING
      },
      cep_endereco: {
        type: Sequelize.STRING
      },
      cidade_endereco: {
        type: Sequelize.STRING
      },
      estado_endereco: {
        type: Sequelize.STRING
      },
      pais_endereco: {
        type: Sequelize.STRING
      },
      id_empresa_neste_endereco: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'empresas',
          },
          key: 'id'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
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
    await queryInterface.dropTable('endereco_empresas');
  }
};