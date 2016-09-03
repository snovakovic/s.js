/*****************************************************
	  Test Module part
 ***************************************************/
(function(s) {

  s.is = {};

  s.is.defined = function(testVar) {
    return typeof testVar !== 'undefined';
  };

  /**
   * Test if variable has been defined and is not empty,
   * Following will be treated as false
   * s.is.empty(null); => true
   * s.is.empty(undefined); => true
   * s.is.empty({}); => true
   * s.is.empty([]); => true
   * s.is.empty(' '); => true
   * s.is.empty('\n\t'); => true
   * s.is.empty(null); => true
  */
  s.is.empty = function(testVar) {
    if (typeof testVar === 'undefined' || testVar === null
      || (typeof testVar === 'string' && (/^\s*$/).test(testVar))) {
      return true;
    }

    if (typeof testVar === 'object') {
      for (var key in testVar) {
        if (Object.prototype.hasOwnProperty.call(testVar, key)) {
          return false;
        }
      }
      return true;
    }

    return false;
  };

  /**
   * VAR type check
   */
  s.is.string = function(testVar) {
    return typeof testVar === 'string';
  };

  s.is.number = function(testVar) {
    return typeof testVar === 'number';
  };

  s.is.boolean = function(testVar) {
    return typeof testVar === 'boolean';
  };

  s.is.object = function(testVar) {
    return typeof testVar === 'object' && testVar !== null && !Array.isArray(testVar);
  };

  s.is.function = function(testVar) {
    return typeof testVar === 'function';
  };

  s.is.array = function(testVar) {
    return typeof testVar === 'object' && Array.isArray(testVar);
  };

  s.is.arrayWithValue = function(testVar) {
    return s.common.arrayWithValue(testVar);
  };

  /****
  * STRING tests
  ****/

  s.is.alphabetic = function(str) {
    var re = /^[a-zA-Z ]*$/;
    return re.test(str);
  };

  s.is.alphanumeric = function(str) {
    var re = /^[a-zA-Z0-9 ]*$/;
    return re.test(str);
  };

  s.is.numeric = function(str) {
    var re = /^[0-9 ]*$/;
    return re.test(str);
  };

  s.is.lowercase = function(str) {
    var re = /^[a-z ]*$/;
    return re.test(str);
  };

  s.is.uppercase = function(str) {
    var re = /^[A-Z ]*$/;
    return re.test(str);
  };

  s.is.email = function(str) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
  };

  s.is.strongpassword = function(str) {
    var re = /^(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*$/;
    return re.test(str);
  };

  s.is.ip = function(str) {
    var re = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return re.test(str);
  };

})(window.snovakovic);
