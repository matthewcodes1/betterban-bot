const Sequelize = require('sequelize');

module.exports = class BetterBanDatabase extends Sequelize {
    constructor(path) {
        super('database', 'user', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            storage: path,
        });

        this.Ban = this.define('ban', {
            userId: Sequelize.STRING,
            guildId: Sequelize.STRING,
            timestamp: Sequelize.STRING,
            timeout: Sequelize.STRING,
        });
        this.Mute = this.define('mute', {
            userId: Sequelize.STRING,
            guildId: Sequelize.STRING,
            mutedRoleId: Sequelize.STRING,
            timestamp: Sequelize.STRING,
            timeout: Sequelize.STRING,
        });
        this.Guild = this.define('guild', {
            guildId: {
                type: Sequelize.STRING,
                unique: true,
            },
            mutedRoleId: Sequelize.STRING,
            channels: Sequelize.TEXT,
        });
    }
};
