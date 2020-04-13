const exec = require('child_process').exec;

module.exports.loadModule = function loadModule(bot) {
    bot.handler.endpoint('^v(?:ersion)?$', [], (match, message) => {
        exec('git rev-list --count HEAD', (error, stdout) => {
            if (error) {
                bot.createMessage(message.channel.id, 'An error has occured');
                return;
            }
            exec('git log -1 --pretty=%B', (error2, stdout2) => {
                let msg = `Commit number ${stdout}`;
                if (!error2) {
                    msg += `\n\`\`\`\n${stdout2}\`\`\``;
                }
                bot.createMessage(message.channel.id, msg);
            });
        });
    });
    bot.handler.endpoint('^help$', [], (match, message) => {
        let textToSend = 'The bot has no prefix, the only way to make it work is by mentionning it before the command. The bot commands are:\n```\nhelp - Shows the list of available commands.\n\ntemps - Shows the currently tempbanned and tempmuted members and their remaining time in seconds (Ban Members permission needed by the user that issues the command).\n\nversion - Shows the commit number of the current running instance.\n\nping - Mostly a debug command, echoes back \'Pong\'```\nMore informations and explanations on what is the bot about: <https://github.com/ahoZiorce/betterban-bot/blob/master/README.md>\n\nI develop this bot and put it available for everyone for free. Currently, the hosting costs aren\'t yet covered any help would be ***greatly*** appreciated.\nIf you wish to donate you can do it at https://www.patreon.com/aosync. I plan on making a Patreon-only music bot with a lot of features! Thank you, from Belgium with love!';
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
