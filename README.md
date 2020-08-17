# backend-joobis-analytics-description

Projeto do backend da iniciativa Joobis que é composta por duas frentes: Joobis Analytics e Joobis App, feito em Node Js utilizando o Sequelize-CLI como ORM.

# how to configure in the first time open the project

npm install

# config database url via .env ou database/config

* copiar o .env.example e renomear para .env e registrar as urls para conexão com o banco.
* Ou altere os dados para conexão no arquivo database/config/config.js

# modelo padrão de configuração URL para o .env

DEV_DATABASE_URL=(dialect)://(usuario):(senha)@(host):(port)/(database-name)

# instalar o banco de dados

* sequelize db:migrate
* sequelize db:migrate:undo:all (Desfazer as migrations criadas)

# Popular cargos e planos de assinatura iniciais

* sequelize db:seed:all


# start nodemon server

npm run start-dev
