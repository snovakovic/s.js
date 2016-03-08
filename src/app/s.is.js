'use strict';

/*****************************************************
	  Test Module part
 ***************************************************/
(function (s) {

  s.is = {};
  s.is.not = {};

  s.is.defined = function (testVar) {
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
  s.is.empty = function (testVar) {
    if (typeof testVar === 'undefined' || testVar === null
      || (typeof testVar === 'string' && testVar.trim().length === 0)) {
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
  
  s.is.not.empty = function(testVar) {
    return !s.is.empty(testVar);
  };

  /**
   * VAR type check
   */
  s.is.string = function (testVar) {
    return typeof testVar === 'string';
  };

  s.is.number = function (testVar) {
    return typeof testVar === 'number';
  };

  s.is.boolean = function (testVar) {
    return typeof testVar === 'boolean';
  };

  s.is.object = function (testVar) {
    return typeof testVar === 'object' && testVar !== null;
  };

  s.is.array = function (testVar) {
    return Array.isArray(testVar);
  };

  /****
  * STRING tests
  */

  s.is.blank = function (str) {
    return (/^\s*$/).test(str);
  };

  s.is.alphabetic = function (str) {
    var re = /^[a-zA-Z ]*$/;
    return re.test(str);
  };

  s.is.alphanumeric = function (str) {
    var re = /^[a-zA-Z0-9 ]*$/;
    return re.test(str);
  };

  s.is.numeric = function (str) {
    var re = /^[0-9 ]*$/;
    return re.test(str);
  };

  s.is.lowercase = function (str) {
    var re = /^[a-z ]*$/;
    return re.test(str);
  };

  s.is.uppercase = function (str) {
    var re = /^[A-Z ]*$/;
    return re.test(str);
  };

  s.is.email = function (str) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
  };

  s.is.strongpassword = function (str) {
    var re = /^(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*$/;
    return re.test(str);
  };

  s.is.ip = function (str) {
    var re = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return re.test(str);
  };


})(window.s = window.s || {});
