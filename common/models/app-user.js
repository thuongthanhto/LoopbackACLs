'use strict';
var disableAllMethods = require('./helpers.js').disableAllMethods;

module.exports = function(Appuser) {
  disableAllMethods(Appuser, [
    'findById',
    'create',
    'replaceById',
    'deleteById',
    'find',
    'login',
    'logout',
    'confirm',
    'resetPassword',
    'changePassword',
  ]);
};
