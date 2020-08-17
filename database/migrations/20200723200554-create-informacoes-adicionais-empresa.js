'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('informacoes_adicionais_empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      logo_empresa: {
        type: Sequelize.STRING
      },
      descricao_empresa: {
        type: Sequelize.STRING
      },
      imagens_anexas: {
        type: Sequelize.STRING
      },
      videos_anexos: {
        type: Sequelize.STRING
      },
      id_informacoes_empresa: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('informacoes_adicionais_empresas');
  }
};