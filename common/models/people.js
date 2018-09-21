'use strict';
const disableAllMethods = require('./helpers.js').disableAllMethods;

module.exports = function(People) {
  disableAllMethods(People, [
    'findById',
    'create',
    'replaceById',
    'deleteById',
    'find',
    'findOne',
  ]);
};
