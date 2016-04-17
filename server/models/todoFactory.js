"use strict";
var todoFactory;

function validateId(options) {
    if (typeof options.id !== "number") {
        throw "id is not defined.";
    }
}

function create(options) {
    validateId(options);

    return {
        "id": options.id,
        "content": options.content || "*Empty Todo*"
    };
}

todoFactory = {
    "create": create
};

module.exports = todoFactory;
