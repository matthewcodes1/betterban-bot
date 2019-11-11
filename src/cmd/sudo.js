const { inspect } = require('util');
const vm = require('vm');

module.exports.loadModule = function loadModule(bot) {
    bot.handler.endpoint('^is-sudoer$', [], (match, message) => {
        if (!bot.config.sudoers) return;
        if (bot.config.sudoers.indexOf(message.author.id) <= -1) return;
        bot.createMessage(message.channel.id, 'true');
    });
    bot.handler.endpoint('^sudoers$', [], (match, message) => {
        if (!bot.config.sudoers) return;
        if (bot.config.sudoers.indexOf(message.author.id) <= -1) return;
        bot.createMessage(message.channel.id, `\`\`\`\n[ ${bot.config.sudoers.join(',\n  ')} ]\n\`\`\``);
    });
    bot.handler.endpoint('^addsudo (.+)$', [], (match, message) => {
        if (!bot.config.sudoers) return;
        if (bot.config.sudoers.indexOf(message.author.id) <= -1) return;
        bot.config.sudoers.push(match[1]);
        bot.createMessage(message.channel.id, `${match[1]} temporarily added to the sudoers list`);
    });
    bot.handler.endpoint('^resetsudo$', [], (match, message) => {
        if (!bot.config.sudoers) return;
        if (bot.config.sudoers.indexOf(message.author.id) <= -1) return;
        bot.config.sudoers = Array.from(bot._ds);
        bot.createMessage(message.channel.id, `Sudoers list reset`);
    });
    bot.handler.endpoint('^removesudo (.+)$', [], (match, message) => {
        if (!bot.config.sudoers) return;
        if (bot.config.sudoers.indexOf(message.author.id) <= -1) return;
        let i = bot.config.sudoers.indexOf(match[1]);
        if (i >= 0) {
            bot.config.sudoers.splice(i, 1);
            bot.createMessage(message.channel.id, `${match[1]} removed from sudoers list`);
        }
        else {
            bot.createMessage(message.channel.id, `${match[1]} was not sudoer`);
        }
    });
    bot.handler.endpoint('^e ?```(?:.*\n)?(.*)\n?```$', [], (match, message) => {
        if (!bot.config.sudoers) return;
        if (bot.config.sudoers.indexOf(message.author.id) <= -1) return;
        try {
            let evaled = vm.runInNewContext(match[1], {
                ctx: {
                    bot: bot,
                    message: message,
                    match: match,
                },
            });

            if (typeof evaled !== 'string') {
                evaled = inspect(evaled);
            }
            evaled = evaled.replace(bot.config.token, 'ツ');
            bot.createMessage(message.channel.id, `\`\`\`${evaled}\`\`\``);
        }
        catch (e) {
            bot.createMessage(message.channel.id, `Error:\n\`\`\`\n${e}\`\`\``);
        }
    });
};
