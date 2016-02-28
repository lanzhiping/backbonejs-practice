"use strict";

var paths = require("./paths.js"),
    gruntTaskConfig = {

        "config": {

            "watch": {
                "js": {
                    "files": ["backbone/*.js", "!dist/*"],
                    "tasks": ["uglify"]
                },
                "html": {
                    "files": ["*/*/*.html", "!dist/*"],
                    "tasks": ["underscore_singlefile"]
                }
            },

            "uglify": {
                "appjs": {
                    "files": {
                        "dist/main.js": paths.appjs
                    }
                }
            },

            "concat": {
                "modulejs": {
                    "files": {
                        "dist/modules.js": [paths.jquery, paths.underscore, paths.backbone, paths.marionette]
                    }
                }
            },

            "underscore_singlefile": {
                "options": {
                    "name": "_templates",
                    "separartor": "\r\n"
                },
                "build": {
                    "src": "backbone/*/*.html",
                    "dest": "dist/tpls.js"
                }
            }
        },

        "tasks": {
            "default": ["uglify", "concat", "underscore_singlefile"]// , "watch"]
        }
    };

module.exports = gruntTaskConfig;

// something might useful tomorrow

// "jasmine": {
//     "appTest": {
//         "src": srcOut,
//         "options": {
//             "keepRunner": true,
//             "host": "http://localhost:8000/",
//             "specs": specs,
//             "vendor": libsOut
//         }
//     }
// },

// iisexpress: {
//     server: {
//         options: {
//             port: 3000,
//             open: true,
//             openPath: "/backbone/index.html"
//         }
//     },
//     test: {
//         options: {
//             port: 8000,
//             keepalive: true,
//             open: true,
//             path: "./",
//             openPath: "/_SpecRunner.html"
//         }
//     }
// },