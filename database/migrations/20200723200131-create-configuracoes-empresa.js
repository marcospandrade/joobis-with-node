'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('configuracoes_empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status_conta_empresa: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      receber_perfil_candidatos: {
        type: Sequelize.BOOLEAN
      },
      perfil_confidencial: {
        type: Sequelize.BOOLEAN
      },
      sugestao_abertura_vagas: {
        type: Sequelize.BOOLEAN
      },
      controlar_acesso_funcionario_expediente: {
        type: Sequelize.BOOLEAN
      },
      id_configuracao_empresa: {
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
    await queryInterface.dropTable('configuracoes_empresas');
  }
};