'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('planos_assinatura_empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_plano: {
        type: Sequelize.STRING
      },
      valor_mensalidade: {
        type: Sequelize.INTEGER
      },
      numero_vagas_para_registrar: {
        type: Sequelize.INTEGER
      },
      usuarios_liberados: {
        type: Sequelize.INTEGER
      },
      perfis_match_jobs_disponiveis: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('planos_assinatura_empresas');
  }
};