(function(s) {
  var modules = [];

  s.module = function(moduleName, moduleImplementation) {
    modules[moduleName] = moduleImplementation();
  }

  s.require = function(moduleNamesParam, cb) {
    return new Require(moduleNamesParam, cb)
  }

  function Require(moduleNamesParam, cb) {
    var moduleNames = [];
    if (Array.isArray(moduleNamesParam)) {
      moduleNames = moduleNamesParam
    } else {
      moduleNames.push(moduleNamesParam);
    }

    if (cb) {
      prepareExecution(function(requiredModules) {
        cb.apply(window, requiredModules);
      });
    }

    function prepareExecution(execute) {
      s.execute(function() {
        var requiredModules = [];
        moduleNames.forEach(function(moduleName) {
          requiredModules.push(modules[moduleName]);
        });

        execute(requiredModules);

      }).when(function() {
        return moduleNames.every(function(moduleName) {
          return modules[moduleName];
        });
      }, 1).limit(1000);
    }

    return {
      module: function(moduleName, cb) {
        prepareExecution(function(requiredModules) {
          modules[moduleName] = cb.apply(window, requiredModules);
        });
      }
    }
  }

})(window.s = window.s || {});
