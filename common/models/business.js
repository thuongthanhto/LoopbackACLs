'use strict';
const disableAllMethods = require('./helpers.js').disableAllMethods;

module.exports = function(Business) {
  disableAllMethods(Business, [
    'findById',
    'create',
    'replaceById',
    'deleteById',
    'find',
    'findOne',
  ]);
};
