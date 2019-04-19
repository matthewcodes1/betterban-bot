const timestring = require('timestring');
const lt = require('long-timeout');

const wait = require('./wait.js');

module.exports = function Events(bot) {
    // With this model, there can't be user-defined prefix easily; maybe switch to the previous system.
    let r;

    bot.on('ready', async () => {
        Logger.info(`Successfully connected as user ${bot.user.username}#${bot.user.discriminator}`);
        r = new RegExp(`^(?:<@${bot.user.id}> +|\\+)\\b`);
        let bans = await bot.db.Ban.findAll();
        console.log(bans);
        bans.forEach(b => {
            if (parseInt(b.get('timestamp')) <= Date.now()) {
                bot.unbanGuildMember(b.get('guildId'), b.get('userId'), 'Unban timeout has passed.');
                Logger.verbose(`${b.get('userId')} has been unbanned from guild ${b.get('guildId')}}`);
                b.destroy();
            }
            else {
                let timeout = parseInt(b.get('timestamp')) - Date.now();
                Logger.verbose(`Reset tempban on user ${b.get('userId')} with timeout ${timeout} in guild ${b.get('guildId')}`);
                lt.setTimeout(() => {
                    bot.unbanGuildMember(b.get('guildId'), b.get('userId'), 'Unban timeout has passed.');
                    Logger.verbose(`${b.get('userId')} has been unbanned from guild ${b.get('guildId')}}`);
                    b.destroy();
                }, timeout);
            }
        });
    });
    bot.on('messageCreate', msg => {
        if (!r) {
            Logger.error('Some real shit hapened : message matching regex hasn\'t been defined for some reason.');
            process.exit();
        }

        let content = msg.content.replace(r, '');

        if (content === msg.content) return;
        if (msg.author.bot) return;
        if (msg.author === bot.user) return;
        if (msg.channel.type !== 0) return;

        Logger.debug(`Command '${msg.content}' issued`);

        let trimmedContent = content.trim();
        let result = bot.handler.apply(trimmedContent, msg);
        if (Array.isArray(result)) {
            bot.createMessage(msg.channel.id, `Missing permissions : ${result.join(', ')}`);
        }
    });
    bot.on('guildBanAdd', async (guild, user) => {
        await wait(50);
        let entries = (await bot.getGuildAuditLogs(guild.id, 1, undefined, 22)).entries;
        if (entries.length < 1) return;
        let reason = entries[0].reason;
        let match = reason.match(/^(.*?)(?:-(.*?))?$/);
        if (!match[1]) return;
        let m = match[2] ? match[2] : match[1];
        let timeoutString = m.trim().toLowerCase();
        if (timeoutString === 'softban' || timeoutString === 'sb') {
            bot.unbanGuildMember(guild.id, user.id, 'Softban unban.');
            return;
        }
        let timeout = timestring(timeoutString, 'ms');
        if (!timeout) return;
        let timestamp = (new Date(Date.now() + timeout)).getTime();
        bot.db.Ban.create({
            userId: user.id,
            guildId: guild.id,
            timestamp: timestamp,
            timeout: timeout,
        });
        lt.setTimeout(() => {
            bot.unbanGuildMember(guild.id, user.id, 'Unban timeout has passed.');
            Logger.verbose(`${user.id} has been unbanned from guild ${guild.id}`);
            bot.db.Ban.destroy({ where: { userId: user.id, guildId: guild.id } });
        }, timeout);
        Logger.verbose(`Set tempban on user ${user.id} with timeout ${timeoutString} in guild ${guild.id}`);
    });
};
