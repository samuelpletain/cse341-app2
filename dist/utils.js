"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formattedNow = exports.validateEmail = exports.validateDate = void 0;
const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};
exports.validateEmail = validateEmail;
const validateDate = function (date) {
    if (date) {
        // ISO string regex without milliseconds
        var date_regex = /^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])Z$/;
        return date_regex.test(date);
    }
};
exports.validateDate = validateDate;
const formattedNow = function () {
    return new Date().toISOString().split('.')[0] + "Z";
};
exports.formattedNow = formattedNow;
