'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.bulkInsert(
    'planos_assinatura_empresas',
      [
        {
          nome_plano: 'Free',
          valor_mensalidade: 0.00,
          numero_vagas_para_registrar: 2,
          usuarios_liberados: 1,
          perfis_match_jobs_disponiveis: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome_plano: 'Basico',
          valor_mensalidade: 500.00,
          numero_vagas_para_registrar: 10,
          usuarios_liberados: 3,
          perfis_match_jobs_disponiveis: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome_plano: 'Supreme',
          valor_mensalidade: 1000.00,
          numero_vagas_para_registrar: 20,
          usuarios_liberados: 5,
          perfis_match_jobs_disponiveis: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
  ),

  down: async (queryInterface, Sequelize) => await queryInterface.bulkDelete('planos_assinatura_empresas', null, {}),
};
