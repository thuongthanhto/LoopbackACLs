'use strict';
var app = require('../../server/server');
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

  Appuser.beforeRemote('create', function(context, unused, next) {
    console.log('Input: ', context.args);
    next();
  });

  Appuser.afterRemote('create', function(context, remoteMethodOutput, next) {
    console.log('Output: ', context.result);
    next();
  });

  Appuser.makeAsAdmin = function(id, cb) {
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    Appuser.findById(id, function(err, user) {
      if (err) return cb(err);
      // create the admin role
      Role.create({
        name: 'admin',
      }, function(err, role) {
        if (err) cb(err);
  
        // make bob an admin
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: user.id,
        }, function(err, principal) {
          cb(err);
        });
      });
      cb(null, true);
    });
  };

  Appuser.remoteMethod('makeAsAdmin', {
    accepts: [{ arg: 'id', type: 'string' }],
    returns: { arg: 'success', type: 'boolean' },
    http: { path: '/mask-as-admin', verb: 'post' },
  });
};
