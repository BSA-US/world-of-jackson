/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar fs_1 = __webpack_require__(/*! fs */ \"fs\");\nvar bunyan = __webpack_require__(/*! bunyan */ \"bunyan\");\nvar config_env = \"development\";\nif (\"development\" === undefined) {\n    config_env = \"dev\";\n}\nvar config = JSON.parse(\"\" + fs_1.readFileSync(\"config/\" + config_env + \".json\"));\n[\"log\", config.parameters.file.local_storage, config.parameters.file.temp_storage].forEach(function (check_dir) {\n    try {\n        fs_1.accessSync(check_dir);\n    }\n    catch (err) {\n        fs_1.mkdirSync(check_dir);\n    }\n});\nvar logger = bunyan.createLogger({\n    name: \"core\",\n    streams: [{ level: 'debug', stream: process.stdout }].concat(config.logger.streams)\n});\n/*\nfunction InitServer(sequelize_instance: any, db_instance: any, config_instance: any, logger_instance: any) {\n    const servers = boc.RunServer({\n        config: config_instance\n        ,orm: sequelize_instance\n        ,db: db_instance\n        ,logger: logger_instance\n        ,app: App\n        ,actions: actions\n        ,decorators: decorators\n\n        ,base_dir: (process.cwd() + \"/\")\n        ,base_html: \"src/base.html\"\n        ,web_dir: \"web\"\n        ,statelets: statelets\n        ,html_pre_process: function(html: string) {\n            if((process.argv.length >= 3) && ((process.argv[2] === \"dev\") || (process.argv[2] === \"test\"))) {\n                return html.replace(\"vendor.js\", \"vendor_dev.js\").replace(\"bundle.js\", \"bundle_dev.js\");\n            }\n            return html;\n        }\n    });\n    servers[0].setTimeout(config_instance.server.timeout);\n    return servers;\n}\n\nconst [sequelize, db] = InitDB(config.db.name);\n\nif((process.argv.length >= 3) && (process.argv[2] === \"command\")) {\n    let commands = process.argv.slice(3);\n    logger.info(\"Running command \" + commands.join(\" \"));\n    require('./command.ts')(sequelize, db, logger, commands, config.parameters).then(function(success: any) {\n        logger.info(success);\n        process.exit();\n    }, function(err: any) {\n        logger.error(err);\n        process.exit();\n    });\n} else {\n    InitServer(sequelize, db, config, logger);\n}\n*/ \n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "bunyan":
/*!*************************!*\
  !*** external "bunyan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bunyan\");\n\n//# sourceURL=webpack:///external_%22bunyan%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ })

/******/ });