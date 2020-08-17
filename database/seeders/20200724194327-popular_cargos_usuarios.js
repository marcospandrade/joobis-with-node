'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.bulkInsert(
    'cargo_usuarios',
      [
        {
          nome_cargo: 'Admin',
          descricao_cargo: 'Acesso máximo ao sistema para a gestão do projeto',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome_cargo: 'Moderador',
          descricao_cargo: 'Acesso máximo para usuários registrados no sistema',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome_cargo: 'Usuario',
          descricao_cargo: 'Usuários que utilizaram o sistema com algumas restrições',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
  ),

  down: async (queryInterface, Sequelize) => await queryInterface.bulkDelete('cargo_usuario', null, {}),
};
