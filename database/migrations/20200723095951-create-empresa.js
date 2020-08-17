'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cnpj: {
        type: Sequelize.STRING
      },
      razao_social: {
        type: Sequelize.STRING
      },
      nome_fantasia_empresa: {
        type: Sequelize.STRING
      },
      site_empresa: {
        type: Sequelize.STRING
      },
      email_empresa: {
        type: Sequelize.STRING
      },
      telefone_empresa: {
        type: Sequelize.STRING
      },/*
      endereco_empresa_campo: {
        type: Sequelize.INTEGER
      },
      informacoes_empresa: {
        type: Sequelize.INTEGER
      },
      configuracao_empresa: {
        type: Sequelize.INTEGER
      },*/
      plano_assinatura: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'planos_assinatura_empresas',
          },
          key: 'id'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
        defaultValue: 2
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
    await queryInterface.dropTable('empresas');
  }
};