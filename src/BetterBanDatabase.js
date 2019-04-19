const Sequelize = require('sequelize');

module.exports = class BetterBanDatabase extends Sequelize {
    constructor() {
        super('database', 'user', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            storage: 'database.sqlite',
        });

        this.Ban = this.define('ban', {
            userId: Sequelize.STRING,
            guildId: Sequelize.STRING,
            timestamp: Sequelize.STRING,
            timeout: Sequelize.STRING,
        });
    }
};
