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
        let textToSend = '```\nhelp - Shows the list of available commands.\nversion - Shows the commit number of the current running instance.\nping - Mostly a debug command, echoes back \'Pong\'\n```';
        bot.createMessage(message.channel.id, textToSend);
    });
};
