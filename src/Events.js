module.exports = function Events(bot) {
    // With this model, there can't be user-defined prefix easily; maybe switch to the previous system.
    let r;

    bot.on('ready', () => {
        Logger.info(`Successfully connected as user ${bot.user.username}#${bot.user.discriminator}`);
        r = new RegExp(`^(?:<@${bot.user.id}> +|\\+)\\b`);
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
};
