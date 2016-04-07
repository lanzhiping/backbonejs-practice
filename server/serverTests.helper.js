"use strict";

function setupResultMessage (result, expected, actual) {
    if (!result.pass) {
        result.message = "Expected '" + JSON.stringify(actual) + "' to totally be '" + JSON.stringify(expected) + "'";
    }
}

function toBeJsonEqual (util, customEqualityTesters) {

    function replacer(k, v) {
        if (typeof v === 'function') {
            v = v.toString();
        }
        return v;
    }

    function compare (actual, expected) {
        var actualString = JSON.stringify(actual, replacer).replace(/(\\t|\\n)/g,''),
            expectedString = JSON.stringify(expected, replacer).replace(/(\\t|\\n)/g,''),
            result = {};

        result.pass = actualString === expectedString;
        setupResultMessage(result, expected, actual);
        return result;
    }

    return {
        "compare": compare
    }
}

var customMatchers = {
    "toBeJsonEqual": toBeJsonEqual
};

beforeEach(function(){
    jasmine.addMatchers(customMatchers);
});
