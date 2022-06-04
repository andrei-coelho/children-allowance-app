const fs = require('fs');

function Config() {

    if (!Config.instance) {
        try {
            let file = fs.readFileSync('./conf.json', {encoding:'utf8', flag:'r'});
            Config.instance = JSON.parse(file);
        } catch (err) {
            console.log(err);
        }
    }

    return Config.instance;
}

module.exports = Config;