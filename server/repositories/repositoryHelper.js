"use strict";

function compare(a, b) {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
}

function getSmallestContinuousId(itemList) {
    if (itemList.length === 0) {
        return 0;

    } else if (itemList.sort(compare)[0].id !== 0) {
        return 0;

    } else {
        var hightestContinousElement = itemList
                                       .sort(compare)
                                       .filter(function (item, index) { return item.id === index })
                                       .pop();

        return hightestContinousElement.id + 1;
    }
}

module.exports = {
    "compare": compare,
    "getSmallestContinuousId": getSmallestContinuousId
};
