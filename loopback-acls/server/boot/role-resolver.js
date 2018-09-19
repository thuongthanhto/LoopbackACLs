module.exports = function(app) {
    var Role = app.models.Role;
  
    Role.registerResolver('teamMember', function(role, context, cb) {
      function reject() {
        process.nextTick(function() {
          cb(null, false);
        });
      }
    });
    Role.registerResolver('admin', function(role, context, cb) {
        function reject() {
          process.nextTick(function() {
            cb(null, false);
          });
        }
      });
  };