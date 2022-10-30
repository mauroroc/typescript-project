import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('mysql://apiinvest:api@invest2022@172.22.208.1:3306', {
    dialect: 'mysql',
    database: 'projetoAdminjs'
});

export default sequelize;