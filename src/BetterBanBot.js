const Eris = require('eris');
const toml = require('toml');
const fs = require('fs');

const RegexFramework = require('./RegexFramework');
const Events = require('./Events');
const CommandLoader = require('./CommandLoader');
const BetterBanDatabase = require('./BetterBanDatabase');


module.exports = class ConstitutionBot extends Eris {
    constructor(configPath, options) {
        if (!fs.existsSync(configPath)) {
            fs.writeFileSync(configPath, 'token = ""\n\n# NPM Logging levels :\n#\n#  error: 0, \n#  warn: 1, \n#  info: 2, \n#  verbose: 3, \n#  debug: 4, \n#  silly: 5 \n\ndatabase = "database.sqlite"\n\n[logging.console]\nenabled = true\nminimal = "verbose"\n\n[logging.file]\nenabled = false\npath = "betterbanbot.log"\nminimal = "info"\n');
            process.exit(0);
        }
        let c = toml.parse(fs.readFileSync(configPath));
        super(c.token, options);
        this.config = c;
        this.db = new BetterBanDatabase(c.database);
        this.handler = new RegexFramework();
        Events(this);
        CommandLoader(this);
        this.db.sync();
    }
};
