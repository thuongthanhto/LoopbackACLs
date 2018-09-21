'use strict';
const disableAllMethods = require('./helpers.js').disableAllMethods;

module.exports = function(Appuser) {
  disableAllMethods(Appuser, [
    'findById',
    'create',
    'replaceById',
    'deleteById',
    'find',
    'findOne',
    'login',
    'logout',
    'confirm',
    'resetPassword',
    'changePassword',
  ]);
};
