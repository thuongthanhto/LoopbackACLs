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

  Appuser.remoteMethod('makeAsAdmin', {
    accepts: [{ arg: 'id', type: 'string' }],
    returns: { arg: 'success', type: 'boolean' },
    http: { path: '/make-as-admin', verb: 'post' },
  });

  Appuser.makeAsAdmin = function(id, cb) {
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    Appuser.findById(id, function(err, user) {
      if (err) return cb(err);
      // create the admin role
      Role.find({ name: 'admin' }, function(err, res) {
        if (err) cb(err);
        if (res.length > 0) {
          // make user an admin
          res[0].principals.create(
            {
              principalType: RoleMapping.USER,
              principalId: user.id,
            },
            function(err, principal) {
              cb(err);
              cb(null, true);
            }
          );
        } else {
          Role.create(
            {
              name: 'admin',
            },
            function(err, role) {
              if (err) cb(err);

              // make user an admin
              role.principals.create(
                {
                  principalType: RoleMapping.USER,
                  principalId: user.id,
                },
                function(err, principal) {
                  cb(err);
                }
              );
            }
          );
          cb(null, true);
        }
      });
    });
  };

  Appuser.remoteMethod('makeAsTeamMember', {
    accepts: [{ arg: 'id', type: 'string' }],
    returns: { arg: 'success', type: 'boolean' },
    http: { path: '/make-as-team-member', verb: 'post' },
  });

  Appuser.makeAsTeamMember = function(id, cb) {
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    Appuser.findById(id, function(err, user) {
      if (err) return cb(err);
      // create the admin role
      Role.find({ name: 'teamMember' }, function(err, res) {
        if (err) cb(err);
        if (res.length > 0) {
          // make user an admin
          res[0].principals.create(
            {
              principalType: RoleMapping.USER,
              principalId: user.id,
            },
            function(err, principal) {
              cb(err);
              cb(null, true);
            }
          );
        } else {
          Role.create(
            {
              name: 'teamMember',
            },
            function(err, role) {
              if (err) cb(err);

              // make user an admin
              role.principals.create(
                {
                  principalType: RoleMapping.USER,
                  principalId: user.id,
                },
                function(err, principal) {
                  cb(err);
                }
              );
            }
          );
          cb(null, true);
        }
      });
    });
  };
};
