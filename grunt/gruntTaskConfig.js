"use strict";

var paths = require("./paths.js"),
    linterConfig = {
        "files": [paths.serverjs, paths.serverspecjs],
        "globals": {
            "jQuery": true,
            "Marionette": true,
            "Backbone": true
        },
        "options": {
            "junit": "out/junit.xml",
            "log": "out/lint.log",
            "errorsOnly": true
        }
    },

    jscsConfig = {
       "src": [paths.serverjs, paths.serverspecjs], // todo: need to replace by **.js
        "options": {
            "config": ".jscsrc",
            "fix": true,
            "requireCurlyBraces": [ "if" ]
        }
    },

    watchConfig = {
        "js": {
            "files": ["grunt/*.js", "backbone/**/*.js", "!dist/*"], // todo: use paths to config
            "tasks": ["uglify", "linter"]
        },
        "html": {
            "files": ["*/*/*.html", "!dist/*"],
            "tasks": ["underscore_singlefile"]
        },
        "serverSrc": {
            "files": [paths.serverjs, paths.serverspecjs],
            "tasks": ["browserify"]
        }
    },

    jasmineNodejsConfig = {
        "serverUnitTest": {
            "specs": ["./server/*.js"],
            "helpers": ["./server/*.js"],
        },
        "options": {
            "seed": null,
            "useHelpers": true,
            "traceFatal": true,
            "stopOnFailure": true,
            "defaultTimeout": 5000,
            "specNameSuffix": ".spec.js",
            "helperNameSuffix": ".helper.js",
            "reporters": {
                "console": {
                    "colors": true,
                    "activity": true,
                    "verbosity": true,
                    "cleanStack": true,
                    "listStyle": "indent"
                }
            }
        }
    },

    karmaConfig = {
        "appUT": {
            "browsers": ["phantomjs"],
            "frameworks": ["jasmine"],
            "options": {
                // todo: add src files and spec files
            }
        },
        "appUIOnline": {
            "port": 9999,
            "browsers": ["chrome"],
            "frameworks": ["jasmine"],
            "options": {
                // todo: add src files and spec files
            }
        }
    },

    webpackConfig = {
        "client": {
            "entry": ["backbone/app.js"],
            "output": {
                "filename": "[name].js",
                "path": "./dist"
            }
        }
    },

    gruntTaskConfig = {
        "config": {
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
            },

            "karma": karmaConfig,
            "watch": watchConfig,
            "linter": linterConfig,
            "jscs": jscsConfig,
            "webpack": webpackConfig,
            "jasmine_nodejs": jasmineNodejsConfig
        },

        "tasks": {
            "default": ["uglify", "concat", "underscore_singlefile", "watch"],
            "serverUT": ["jasmine_nodejs:serverUnitTest"],
            "checkJs": ["jscs", "linter"]
        }
    };

module.exports = gruntTaskConfig;
