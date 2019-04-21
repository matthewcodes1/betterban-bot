const exec = require('child_process').exec;

module.exports.loadModule = function loadModule(bot) {
    bot.handler.endpoint('^v(?:ersion)?$', [], (match, message) => {
        exec('git rev-list --count HEAD', (error, stdout) => {
            if (error) {
                bot.createMessage(message.channel.id, 'An error has occured');
                return;
            }
            bot.createMessage(message.channel.id, `Commit number ${stdout}`);
        });
    });
    bot.handler.endpoint('^help$', [], (match, message) => {
        let textToSend = '```\nhelp - Shows the list of available commands.\ntemps - Shows the currently tempbanned and tempmuted members and their remaining time in seconds (Ban Members permission needed).\nversion - Shows the commit number of the current running instance.\nping - Mostly a debug command, echoes back \'Pong\'\n```';
        bot.createMessage(message.channel.id, textToSend);
    });
    bot.handler.endpoint('^temps$', ['banMembers'], async (match, message) => {
        let textToSend = '```\nTempbans:\n';
        let bans = await bot.db.Ban.findAll({ where: { guildId: message.channel.guild.id } });
        if (bans.length === 0) {
            textToSend += 'No tempbans going on currently.\n';
        }
        else {
            bans.forEach(b => {
                textToSend += `${b.get('userId')} - Remaining: ${(b.get('timestamp') - Date.now()) / 1000} seconds\n`;
            });
        }
        textToSend += '\nTempmutes:\n';
        let mutes = await bot.db.Mute.findAll({ where: { guildId: message.channel.guild.id } });
        if (mutes.length === 0) {
            textToSend += 'No tempmutes going on currently.\n';
        }
        else {
            mutes.forEach(m => {
                textToSend += `${m.get('userId')} - Remaining: ${(m.get('timestamp') - Date.now()) / 1000} seconds\n`;
            });
        }
        textToSend += '```';
        bot.createMessage(message.channel.id, textToSend);
    });
};
