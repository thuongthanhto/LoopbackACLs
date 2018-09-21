'use strict';
const disableAllMethods = require('./helpers.js').disableAllMethods;

module.exports = function(Loanapplication) {
  disableAllMethods(Loanapplication, [
    'findById',
    'create',
    'replaceById',
    'deleteById',
    'find',
    'findOne',
  ]);
};
