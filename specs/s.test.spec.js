'use strict';

describe('s.test', function () {

  var notDefined = undefined;
  var obj = {};
  var obj1 = { test: 'test' };
  var arr = [];
  var arr1 = ['1'];
  var num = 3;
  var zero = 0;
  var empty = null;
  var str = 'string';
  var emptyString = '';
  var spacesOnly = '    ';
  var bool = true;
  var falseBool = false;

  beforeEach(function () {
    notDefined = undefined;
    obj = {};
    obj1 = { test: 'test' };
    arr = [];
    arr1 = ['1'];
    num = 3;
    zero = 0;
    empty = null;
    str = 'string';
    emptyString = '';
    spacesOnly = '    ';
    bool = true;
    falseBool = false;
  });

  describe('isDefined', function () {
    it('should show correct values for isDefined', function () {
      expect(s.isDefined(notDefined)).toEqual(false);
      expect(s.isDefined(obj)).toEqual(true);
      expect(s.isDefined(num)).toEqual(true);
      expect(s.isDefined(empty)).toEqual(true);
      expect(s.isDefined(str)).toEqual(true);
      expect(s.isDefined(emptyString)).toEqual(true);
      expect(s.isDefined(bool)).toEqual(true);
    });
  });

  describe('hasValue', function () {
    it('should show correct values for hasValue', function () {
      expect(s.hasValue(notDefined)).toEqual(false);
      expect(s.hasValue(obj)).toEqual(false);
      expect(s.hasValue(obj1)).toEqual(true);
      expect(s.hasValue(arr)).toEqual(false);
      expect(s.hasValue(arr1)).toEqual(true);
      expect(s.hasValue(num)).toEqual(true);
      expect(s.hasValue(zero)).toEqual(true);
      expect(s.hasValue(empty)).toEqual(false);
      expect(s.hasValue(str)).toEqual(true);
      expect(s.hasValue(emptyString)).toEqual(false);
      expect(s.hasValue(spacesOnly)).toEqual(false);
      expect(s.hasValue(bool)).toEqual(true);
      expect(s.hasValue(falseBool)).toEqual(true);
    });
  });


  describe('isNumber', function () {
    it('should show correct values for isNumber', function () {
      expect(s.isNumber(notDefined)).toEqual(false);
      expect(s.isNumber(obj)).toEqual(false);
      expect(s.isNumber(num)).toEqual(true);
      expect(s.isNumber(1.23)).toEqual(true);
      expect(s.isNumber(-1.23)).toEqual(true);
      expect(s.isNumber(empty)).toEqual(false);
      expect(s.isNumber(str)).toEqual(false);
      expect(s.isNumber(emptyString)).toEqual(false);
      expect(s.isNumber(bool)).toEqual(false);
    });
  });


  describe('isString', function () {
    it('should show correct values for isString', function () {
      expect(s.isString(notDefined)).toEqual(false);
      expect(s.isString(obj)).toEqual(false);
      expect(s.isString(num)).toEqual(false);
      expect(s.isString(empty)).toEqual(false);
      expect(s.isString(str)).toEqual(true);
      expect(s.isString(emptyString)).toEqual(true);
      expect(s.isString(bool)).toEqual(false);
    });
  });

  describe('isBoolean', function () {
    it('should show correct values for isBoolean', function () {
      expect(s.isBoolean(notDefined)).toEqual(false);
      expect(s.isBoolean(obj)).toEqual(false);
      expect(s.isBoolean(num)).toEqual(false);
      expect(s.isBoolean(empty)).toEqual(false);
      expect(s.isBoolean(str)).toEqual(false);
      expect(s.isBoolean(emptyString)).toEqual(false);
      expect(s.isBoolean(bool)).toEqual(true);
    });
  });


  describe('isObject', function () {
    it('should show correct values for isObject', function () {
      expect(s.isObject(notDefined)).toEqual(false);
      expect(s.isObject(obj)).toEqual(true);
      expect(s.isObject(num)).toEqual(false);
      expect(s.isObject(empty)).toEqual(false);
      expect(s.isObject(str)).toEqual(false);
      expect(s.isObject(emptyString)).toEqual(false);
      expect(s.isObject(bool)).toEqual(false);
      expect(s.isObject(arr)).toEqual(true);
    });
  });

  describe('isArray', function () {
    it('should show correct values for isArray', function () {
      expect(s.isArray(notDefined)).toEqual(false);
      expect(s.isArray(obj)).toEqual(false);
      expect(s.isArray(num)).toEqual(false);
      expect(s.isArray(empty)).toEqual(false);
      expect(s.isArray(str)).toEqual(false);
      expect(s.isArray(emptyString)).toEqual(false);
      expect(s.isArray(bool)).toEqual(false);
      expect(s.isArray(arr)).toEqual(true);
    });
  });


  describe('Regex', function () {
    it('should show correct values for regex expresion', function () {
      expect(s.is('stefan.novakovich@gmail.com', /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)).toEqual(true);
      expect(s.is('stefan.novakovich@gmail', /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)).toEqual(false);
    });

    it('should show correct values for alphabetic regex', function () {
      expect(s.is('abc', 'Alphabetic')).toEqual(true);
      expect(s.is('a b c', 'AlphaBetic')).toEqual(true);
      expect(s.is('a b c', 'AlphaBetic')).toEqual(true);
      expect(s.is('', 'AlphaBetic')).toEqual(true);
      expect(s.is('  ', 'alphabetic')).toEqual(true);
      expect(s.is('asd12', 'Alphabetic')).toEqual(false);
      expect(s.is('asd.', 'Alphabetic')).toEqual(false);
    });

    it('should show correct values for alphanumeric regex', function () {
      expect(s.is('abc', 'alphanumeric')).toEqual(true);
      expect(s.is('a b c', 'alphanumeric')).toEqual(true);
      expect(s.is('', 'alphanumeric')).toEqual(true);
      expect(s.is('  ', 'alphanumeric')).toEqual(true);
      expect(s.is('asd12', 'alphanumeric')).toEqual(true);
      expect(s.is('12345', 'alphanumeric')).toEqual(true);
      expect(s.is('asd.', 'alphanumeric')).toEqual(false);
    });

    it('should show correct values for numeric regex', function () {
      expect(s.is('abc', 'numeric')).toEqual(false);
      expect(s.is('a b c', 'numeric')).toEqual(false);
      expect(s.is('', 'numeric')).toEqual(true);
      expect(s.is('  ', 'numeric')).toEqual(true);
      expect(s.is('asd12', 'numeric')).toEqual(false);
      expect(s.is('12345', 'numeric')).toEqual(true);
      expect(s.is('12345.456', 'numeric')).toEqual(false);
    });

    it('should show correct values for lowercase regex', function () {
      expect(s.is('abc', 'lowercase')).toEqual(true);
      expect(s.is('a b c', 'lowercase')).toEqual(true);
      expect(s.is('', 'lowercase')).toEqual(true);
      expect(s.is('  ', 'lowercase')).toEqual(true);
      expect(s.is('asd12', 'lowercase')).toEqual(false);
      expect(s.is('asBc', 'lowercase')).toEqual(false);
      expect(s.is('12345', 'lowercase')).toEqual(false);
      expect(s.is('12345.456', 'lowercase')).toEqual(false);
    });

    it('should show correct values for uppercase regex', function () {
      expect(s.is('ABC', 'uppercase')).toEqual(true);
      expect(s.is('A B C', 'uppercase')).toEqual(true);
      expect(s.is('', 'uppercase')).toEqual(true);
      expect(s.is('  ', 'uppercase')).toEqual(true);
      expect(s.is('asd12', 'uppercase')).toEqual(false);
      expect(s.is('ASBc', 'uppercase')).toEqual(false);
      expect(s.is('12345', 'uppercase')).toEqual(false);
      expect(s.is('12345.456', 'uppercase')).toEqual(false);
    });

    it('should show correct values for email regex', function () {
      expect(s.is(notDefined, 'email')).toEqual(false);
      expect(s.is(obj, 'email')).toEqual(false);
      expect(s.is(num, 'email')).toEqual(false);
      expect(s.is(empty, 'email')).toEqual(false);
      expect(s.is(str, 'email')).toEqual(false);
      expect(s.is(emptyString, 'email')).toEqual(false);
      expect(s.is(bool, 'email')).toEqual(false);
      expect(s.is('stefan.novakovich@gmail.com', 'email')).toEqual(true);
      expect(s.is('test22@net.hr', 'email')).toEqual(true);
      expect(s.is('test22@net@hr', 'email')).toEqual(false);
      expect(s.is('test22@net', 'email')).toEqual(false);
      expect(s.is('a@net.bc', 'email')).toEqual(true);
      expect(s.is('a@net.bc nije', 'email')).toEqual(false);
    });

    it('should show correct values for strong password', function () {
      expect(s.is('ABC', 'strongPassword')).toEqual(false);
      expect(s.is('StrongPassword1', 'strongPassword')).toEqual(true);
      expect(s.is('abC1s', 'strongPassword')).toEqual(false);
      expect(s.is('', 'strongPassword')).toEqual(false);
      expect(s.is('  ', 'strongPassword')).toEqual(false);
      expect(s.is('asd12', 'strongPassword')).toEqual(false);
    });

    it('should show correct values for ip', function () {
      expect(s.is('73.60.124.136', 'ip')).toEqual(true);
      expect(s.is('256.60.124.136', 'ip')).toEqual(false);
    });

    it('should throw exception', function () {
      expect(function () {
        s.is('73.60.124.136', 'test');
      }).toThrow();
    });
  });

});
