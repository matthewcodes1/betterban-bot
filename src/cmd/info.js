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
};
