/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"web/bundle": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/app.ts","web/vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar ReactDOM = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\nvar main_1 = __webpack_require__(/*! ./components/main */ \"./src/components/main.tsx\");\nwindow.onload = function () {\n    ReactDOM.render(React.createElement(main_1.Main), document.getElementById('container'));\n};\n\n\n//# sourceURL=webpack:///./src/app.ts?");

/***/ }),

/***/ "./src/components/main.tsx":
/*!*********************************!*\
  !*** ./src/components/main.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar MapBox = __webpack_require__(/*! mapbox-gl */ \"./node_modules/mapbox-gl/dist/mapbox-gl.js\");\nvar map_1 = __webpack_require__(/*! ./map */ \"./src/components/map.tsx\");\nvar Main = /** @class */ (function (_super) {\n    __extends(Main, _super);\n    function Main(props) {\n        var _this = _super.call(this, props) || this;\n        _this.Callbacks = [];\n        return _this;\n    }\n    Main.prototype.handleFlyTo = function (location) {\n        this.Callbacks.forEach(function (callback) {\n            callback(location);\n        });\n    };\n    /* interface ideas:\n      have a list of locations with coorinates and allow users to input its latitude and longitude in context\n    */\n    //  <MapContext.Provider value={{ lat: -27.498025783712994, lng: 53.04370816437722 }}>\n    // <Map callbackRegistration={ (callback: (location: MapBox.LngLat) => void) => { this.Callbacks.push(callback) } } />\n    Main.prototype.render = function () {\n        var _this = this;\n        return (React.createElement(\"div\", null,\n            React.createElement(map_1.Map, { callbackRegistration: function (callback) { _this.Callbacks.push(callback); }, callback: this.handleFlyTo.bind(this) }),\n            React.createElement(\"button\", { onClick: this.handleFlyTo.bind(this, new MapBox.LngLat(153.0437, -27.497925)) }, \"Fly To Library\"),\n            React.createElement(\"button\", { onClick: this.handleFlyTo.bind(this, new MapBox.LngLat(153.048425, -27.495646)) }, \"Fly To Park\")));\n    };\n    return Main;\n}(React.Component));\nexports.Main = Main;\n\n\n//# sourceURL=webpack:///./src/components/main.tsx?");

/***/ }),

/***/ "./src/components/map.tsx":
/*!********************************!*\
  !*** ./src/components/map.tsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar MapBox = __webpack_require__(/*! mapbox-gl */ \"./node_modules/mapbox-gl/dist/mapbox-gl.js\");\nfunction Map(_a) {\n    var callbackRegistration = _a.callbackRegistration, callback = _a.callback;\n    var _b = React.useState(null), map = _b[0], setMap = _b[1];\n    React.useEffect(function () {\n        var localMap = new MapBox.Map({\n            container: 'map',\n            style: 'mapbox://styles/mapbox/streets-v9',\n            center: { lng: 153.04370816437722, lat: -27.498025783712994 },\n            zoom: 19,\n            pitch: 45,\n            antialias: true,\n            accessToken: 'pk.eyJ1IjoiZ3JhYm9yZW5rbyIsImEiOiJjazdrenBmZmgwMXhjM2xvMDUxczB3bXdrIn0.TuJeI3ekW2M3_ArY0gMeVA'\n        });\n        /*\n        var layers: any = localMap.getStyle().layers;\n        var labelLayerId;\n        for (var i = 0; i < layers.length; i++) {\n            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {\n                labelLayerId = layers[i].id;\n                break;\n            }\n        }\n\n        localMap.addLayer(\n        {\n            'id': '3d-buildings',\n            'source': 'composite',\n            'source-layer': 'building',\n            'filter': ['==', 'extrude', 'true'],\n            'type': 'fill-extrusion',\n            'minzoom': 15,\n            'paint': {\n                'fill-extrusion-color': '#aaa',\n                \n                // use an 'interpolate' expression to add a smooth transition effect to the\n                // buildings as the user zooms in\n                'fill-extrusion-height': [\n                    'interpolate',\n                    ['linear'],\n                    ['zoom'],\n                    15,\n                    0,\n                    15.05,\n                    ['get', 'height']\n                ],\n                'fill-extrusion-base': [\n                    'interpolate',\n                    ['linear'],\n                    ['zoom'],\n                    15,\n                    0,\n                    15.05,\n                    ['get', 'min_height']\n                ],\n                'fill-extrusion-opacity': 0.6\n            }\n        },\n        labelLayerId\n        );\n*/\n        setMap(localMap);\n        // console.log(\"value\", value);\n        callbackRegistration(function (location) {\n            console.log(\"location\", location, localMap);\n            localMap.flyTo({ center: { lng: location.lng, lat: location.lat } });\n        });\n        /* TODO add a prop/value for the hook to listen to,\n        and only create a new map if the map is falsy */\n    }, []);\n    // console.log(test);\n    // cleaner way to fetch context updates, we should use this to update the map\n    function onClick() {\n        callback(new MapBox.LngLat(153.0437, -27.497925));\n        // if(map !== null) {\n        //     map.flyTo({\n        //         center: { lng: 153.0437, lat: -27.497925 }\n        //     })\n        // }\n    }\n    // console.log(MapContext, MapContext.Consumer)\n    return (React.createElement(\"div\", null,\n        \"INSERT MAP\",\n        React.createElement(\"button\", { onClick: onClick }, \" fly to the sea \"),\n        React.createElement(\"div\", { id: 'map', style: { width: '400px', height: '300px' } })));\n}\nexports.Map = Map;\n//////////////////////////\n\n\n//# sourceURL=webpack:///./src/components/map.tsx?");

/***/ })

/******/ });