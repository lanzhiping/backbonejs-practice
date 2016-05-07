"use strict";

var paths = require("./paths.js"),
    linterConfig = {
        "files": [paths.serverjs, paths.serverspecjs, "./server/todoRepo.spec.js"], // todo: need to replace by **.js
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
       "src": [paths.serverjs, paths.serverspecjs, "./server/todoRepo.spec.js"], // todo: need to replace by **.js
        "options": {
            "fix": false,
            "config": ".jscsrc"
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
            "files": ["./server/**/*.spec.js", "./server/**/*.js"],
            "tasks": ["serverUT"]
        }
    },

    jasmineNodejsConfig = {
        "serverUnitTest": {
            "specs": ["./server/**/*.spec.js"],
            "helpers": ["./server/**/*.helper.js"],
        },
        "options": {
            "seed": null,
            "useHelpers": true,
            "stopOnFailure": true,
            "traceFatal": 0,
            "defaultTimeout": 5000,
            "specNameSuffix": ".spec.js",
            "helperNameSuffix": ".helper.js",
            "reporters": {
                "console": {
                    "colors": 2,
                    "verbosity": 1,
                    "cleanStack": 1,
                    "activity": true,
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
            "buildClient": ["uglify", "concat", "underscore_singlefile"],
            "watch": ["watch"],
            "serverUT": ["jasmine_nodejs:serverUnitTest"],
            "checkJs": ["jscs", "linter"],
            "build": ["checkJs", "serverUT"]
        }
    };

module.exports = gruntTaskConfig;
