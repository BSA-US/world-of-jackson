import { readFileSync, readdirSync, accessSync, mkdirSync, appendFileSync } from "fs"
const bunyan = require('bunyan');

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

var config_env = process.env.NODE_ENV;
if(process.env.NODE_ENV === undefined) {
    config_env = "dev";
}
const config = JSON.parse(`${readFileSync("config/" + config_env + ".json")}`);

["log", config.parameters.file.local_storage, config.parameters.file.temp_storage].forEach(function(check_dir) {
    try {
        accessSync(check_dir);
    } catch(err) {
        mkdirSync(check_dir);
    }
});

const logger = bunyan.createLogger({
    name: "core"
    ,streams: [{ level: 'debug', stream: process.stdout }].concat(config.logger.streams)
});

/*
function InitServer(sequelize_instance: any, db_instance: any, config_instance: any, logger_instance: any) {
    const servers = boc.RunServer({
        config: config_instance
        ,orm: sequelize_instance
        ,db: db_instance
        ,logger: logger_instance
        ,app: App
        ,actions: actions
        ,decorators: decorators

        ,base_dir: (process.cwd() + "/")
        ,base_html: "src/base.html"
        ,web_dir: "web"
        ,statelets: statelets
        ,html_pre_process: function(html: string) {
            if((process.argv.length >= 3) && ((process.argv[2] === "dev") || (process.argv[2] === "test"))) {
                return html.replace("vendor.js", "vendor_dev.js").replace("bundle.js", "bundle_dev.js");
            }
            return html;
        }
    });
    servers[0].setTimeout(config_instance.server.timeout);
    return servers;
}

const [sequelize, db] = InitDB(config.db.name);

if((process.argv.length >= 3) && (process.argv[2] === "command")) {
    let commands = process.argv.slice(3);
    logger.info("Running command " + commands.join(" "));
    require('./command.ts')(sequelize, db, logger, commands, config.parameters).then(function(success: any) {
        logger.info(success);
        process.exit();
    }, function(err: any) {
        logger.error(err);
        process.exit();
    });
} else {
    InitServer(sequelize, db, config, logger);
}
*/