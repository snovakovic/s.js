/*****************************************************
	  Array Modification
 ***************************************************/
(function(s) {

  /**
    * Loop over object properties. 
    * @param arr {Object} object which properties will be looped over
    * @example s.getProperties({prop1:'val1', prop2:'val2'}, function(key, value){console.log(key + ' >> ' + value);});
    */
  s.getProperties = function(obj, callback) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (callback(prop, obj[prop]) === false) {
          break;
        }
      }
    }
  };

  /**
   * Shallow merge provided objects
   * In case of the same property value from second object will override the value in the first object
   * @param  {Objects} arbitrary number of objects that we want to merge
   * @example s.merge({prop1:1,prop2:2}, {prop1:0,prop3:3}, {prop4: '4'});
  */
  s.merge = function() {
    var merged = {};
    var _merge = function(obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          merged[prop] = obj[prop];
        }
      }
    };
    _merge(arguments[0]);
    for (var i = 1; i < arguments.length; i++) {
      _merge(arguments[i]);
    }
    return merged;
  };

  /**
   * Same as merge. But with support for merging nested objects
  */
  s.deepMerge = function() {
    var merged = {};
    var _merge = function(obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            merged[prop] = s.deepMerge(merged[prop], obj[prop]);
          }
          else {
            merged[prop] = obj[prop];
          }
        }
      }
    };
    _merge(arguments[0]);
    for (var i = 1; i < arguments.length; i++) {
      _merge(arguments[i]);
    }
    return merged;
  };

})(window.s = window.s || {});
