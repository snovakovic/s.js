'use strict';

/*****************************************************
	  Test Module part
 ***************************************************/
(function (s) {

  s.isDefined = function (testVar) {
    return typeof testVar !== 'undefined';
  };

  /**
   * Test if variable has been defined and is not empty, 
   * Following will be treated as false
   *     1) null
   *     2) not initialized variable
   *     3) empty array
   *     4) empty object
   *     5) empty string
   *     6) string with only spaces
  */
  s.hasValue = function (testVar) {
    if (typeof testVar === 'undefined' || testVar === null
      || (typeof testVar === 'string' && testVar.trim().length === 0)) {
      return false;
    }

    if (typeof testVar === 'object') {
      for (var key in testVar) {
        if (hasOwnProperty.call(testVar, key)) {
          return true;
        }
      }
      return false;
    }

    return true;
  };

  s.isString = function (testVar) {
    return typeof testVar === 'string';
  };

  s.isNumber = function (testVar) {
    return typeof testVar === 'number';
  };

  s.isBoolean = function (testVar) {
    return typeof testVar === 'boolean';
  };

  /**
  * Check if variable type is object
  * variable type of array is also object
  * type for null returns object, but is object will return false for null
  */
  s.isObject = function (testVar) {
    return typeof testVar === 'object' && testVar !== null && !Array.isArray(testVar);
  };

  s.isArray = function (testVar) {
    return Array.isArray(testVar);
  };

  /**
   * Test string using any regular expression or by using any of defined keywords
   * @param str {string} string that will be tested
   * @param expr {string|regExpresion} expression can be defined keyword in string format or any regular expression.
   * @example s.is("test", alphabetic); same as s.is("test", /^[a-zA-Z ]*$/)
  */
  s.is = function (str, expr) {
    var re = expr;
    if (typeof str !== 'string') {
      return false;
    }

    //look for keywords
    if (typeof expr === 'string') {
      expr = expr.trim().toLowerCase();

      switch (expr) {
        case 'alphabetic':
          re = /^[a-zA-Z ]*$/;
          break;
        case 'alphanumeric':
          re = /^[a-zA-Z0-9 ]*$/;
          break;
        case 'numeric':
          re = /^[0-9 ]*$/;
          break;
        case 'lowercase':
          re = /^[a-z ]*$/;
          break;
        case 'uppercase':
          re = /^[A-Z ]*$/;
          break;
        case 'email':
          re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          break;
        case 'strongpassword':
          re = /^(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*$/;
          break;
        case 'ip':
          re = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
          break;
        default:
          throw new Error('Invalid argument exception');
      }
    }

    return re.test(str);
  };

})(window.s = window.s || {});
