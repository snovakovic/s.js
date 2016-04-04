describe('s.test', function() {

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
  var func = function() {};

  beforeEach(function() {
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

  describe('is.defined', function() {
    it('should show correct values for isDefined', function() {
      expect(s.is.defined(notDefined)).toEqual(false);
      expect(s.is.defined(obj)).toEqual(true);
      expect(s.is.defined(num)).toEqual(true);
      expect(s.is.defined(empty)).toEqual(true);
      expect(s.is.defined(str)).toEqual(true);
      expect(s.is.defined(emptyString)).toEqual(true);
      expect(s.is.defined(bool)).toEqual(true);
    });
  });

  describe('is.empty', function() {
    it('should show correct values for is.empty', function() {
      expect(s.is.empty(notDefined)).toEqual(true);
      expect(s.is.empty(obj)).toEqual(true);
      expect(s.is.empty(arr)).toEqual(true);
      expect(s.is.empty(empty)).toEqual(true);
      expect(s.is.empty(emptyString)).toEqual(true);
      expect(s.is.empty(spacesOnly)).toEqual(true);
      expect(s.is.empty('')).toEqual(true);
      expect(s.is.empty('\n\t')).toEqual(true);
      expect(s.is.empty('   ')).toEqual(true);
      expect(s.is.empty(obj1)).toEqual(false);
      expect(s.is.empty(arr1)).toEqual(false);
      expect(s.is.empty(num)).toEqual(false);
      expect(s.is.empty(zero)).toEqual(false);
      expect(s.is.empty(str)).toEqual(false);
      expect(s.is.empty(bool)).toEqual(false);
      expect(s.is.empty(falseBool)).toEqual(false);
      expect(s.is.empty('as')).toEqual(false);
    });
  });

  describe('is.number', function() {
    it('should show correct values for is.number', function() {
      expect(s.is.number(notDefined)).toEqual(false);
      expect(s.is.number(obj)).toEqual(false);
      expect(s.is.number(num)).toEqual(true);
      expect(s.is.number(1.23)).toEqual(true);
      expect(s.is.number(-1.23)).toEqual(true);
      expect(s.is.number(empty)).toEqual(false);
      expect(s.is.number(str)).toEqual(false);
      expect(s.is.number(emptyString)).toEqual(false);
      expect(s.is.number(bool)).toEqual(false);
    });
  });

  describe('is.string', function() {
    it('should show correct values for is.string', function() {
      expect(s.is.string(notDefined)).toEqual(false);
      expect(s.is.string(obj)).toEqual(false);
      expect(s.is.string(num)).toEqual(false);
      expect(s.is.string(empty)).toEqual(false);
      expect(s.is.string(str)).toEqual(true);
      expect(s.is.string(emptyString)).toEqual(true);
      expect(s.is.string(bool)).toEqual(false);
    });
  });

  describe('is.boolean', function() {
    it('should show correct values for is.boolean', function() {
      expect(s.is.boolean(notDefined)).toEqual(false);
      expect(s.is.boolean(obj)).toEqual(false);
      expect(s.is.boolean(num)).toEqual(false);
      expect(s.is.boolean(empty)).toEqual(false);
      expect(s.is.boolean(str)).toEqual(false);
      expect(s.is.boolean(emptyString)).toEqual(false);
      expect(s.is.boolean(bool)).toEqual(true);
    });
  });

  describe('is.object', function() {
    it('should show correct values for is.object', function() {
      expect(s.is.object(notDefined)).toEqual(false);
      expect(s.is.object(obj)).toEqual(true);
      expect(s.is.object(num)).toEqual(false);
      expect(s.is.object(empty)).toEqual(false);
      expect(s.is.object(str)).toEqual(false);
      expect(s.is.object(emptyString)).toEqual(false);
      expect(s.is.object(bool)).toEqual(false);
      expect(s.is.object(arr)).toEqual(false);
      expect(s.is.object(func)).toEqual(false);
    });
  });

  describe('is.function', function() {
    it('should show correct values for is.object', function() {
      expect(s.is.function(func)).toEqual(true);
      expect(s.is.function(notDefined)).toEqual(false);
      expect(s.is.function(obj)).toEqual(false);
      expect(s.is.function(num)).toEqual(false);
      expect(s.is.function(empty)).toEqual(false);
      expect(s.is.function(str)).toEqual(false);
      expect(s.is.function(emptyString)).toEqual(false);
      expect(s.is.function(bool)).toEqual(false);
      expect(s.is.function(arr)).toEqual(false);
    });
  });

  describe('is.array', function() {
    it('should show correct values for is.array', function() {
      expect(s.is.array(notDefined)).toEqual(false);
      expect(s.is.array(obj)).toEqual(false);
      expect(s.is.array(num)).toEqual(false);
      expect(s.is.array(empty)).toEqual(false);
      expect(s.is.array(str)).toEqual(false);
      expect(s.is.array(emptyString)).toEqual(false);
      expect(s.is.array(bool)).toEqual(false);
      expect(s.is.array(arr)).toEqual(true);
      expect(s.is.array(func)).toEqual(false);
    });
  });

  describe('String tests', function() {

    it('should show correct values for alphabetic regex', function() {
      expect(s.is.alphabetic('abc')).toEqual(true);
      expect(s.is.alphabetic('a b c')).toEqual(true);
      expect(s.is.alphabetic('a b c')).toEqual(true);
      expect(s.is.alphabetic('')).toEqual(true);
      expect(s.is.alphabetic('  ')).toEqual(true);
      expect(s.is.alphabetic('asd12')).toEqual(false);
      expect(s.is.alphabetic('asd.')).toEqual(false);
    });

    it('should show correct values for alphanumeric regex', function() {
      expect(s.is.alphanumeric('abc')).toEqual(true);
      expect(s.is.alphanumeric('a b c')).toEqual(true);
      expect(s.is.alphanumeric('')).toEqual(true);
      expect(s.is.alphanumeric('  ')).toEqual(true);
      expect(s.is.alphanumeric('asd12')).toEqual(true);
      expect(s.is.alphanumeric('12345')).toEqual(true);
      expect(s.is.alphanumeric('asd.')).toEqual(false);
    });

    it('should show correct values for numeric regex', function() {
      expect(s.is.numeric('abc')).toEqual(false);
      expect(s.is.numeric('a b c')).toEqual(false);
      expect(s.is.numeric('')).toEqual(true);
      expect(s.is.numeric('  ')).toEqual(true);
      expect(s.is.numeric('asd12')).toEqual(false);
      expect(s.is.numeric('12345')).toEqual(true);
      expect(s.is.numeric('12345.456')).toEqual(false);
    });

    it('should show correct values for lowercase regex', function() {
      expect(s.is.lowercase('abc')).toEqual(true);
      expect(s.is.lowercase('a b c')).toEqual(true);
      expect(s.is.lowercase('')).toEqual(true);
      expect(s.is.lowercase('  ')).toEqual(true);
      expect(s.is.lowercase('asd12')).toEqual(false);
      expect(s.is.lowercase('asBc')).toEqual(false);
      expect(s.is.lowercase('12345')).toEqual(false);
      expect(s.is.lowercase('12345.456')).toEqual(false);
    });

    it('should show correct values for uppercase regex', function() {
      expect(s.is.uppercase('ABC')).toEqual(true);
      expect(s.is.uppercase('A B C')).toEqual(true);
      expect(s.is.uppercase('')).toEqual(true);
      expect(s.is.uppercase('  ')).toEqual(true);
      expect(s.is.uppercase('asd12')).toEqual(false);
      expect(s.is.uppercase('ASBc')).toEqual(false);
      expect(s.is.uppercase('12345')).toEqual(false);
      expect(s.is.uppercase('12345.456')).toEqual(false);
    });

    it('should show correct values for email regex', function() {
      expect(s.is.email(notDefined)).toEqual(false);
      expect(s.is.email(obj)).toEqual(false);
      expect(s.is.email(num)).toEqual(false);
      expect(s.is.email(empty)).toEqual(false);
      expect(s.is.email(str)).toEqual(false);
      expect(s.is.email(emptyString)).toEqual(false);
      expect(s.is.email(bool)).toEqual(false);
      expect(s.is.email('stefan.novakovich@gmail.com')).toEqual(true);
      expect(s.is.email('test22@net.hr')).toEqual(true);
      expect(s.is.email('test22@net@hr')).toEqual(false);
      expect(s.is.email('test22@net')).toEqual(false);
      expect(s.is.email('a@net.bc')).toEqual(true);
      expect(s.is.email('a@net.bc nije')).toEqual(false);
    });

    it('should show correct values for strong password', function() {
      expect(s.is.strongpassword('ABC')).toEqual(false);
      expect(s.is.strongpassword('StrongPassword1')).toEqual(true);
      expect(s.is.strongpassword('abC1s')).toEqual(false);
      expect(s.is.strongpassword('')).toEqual(false);
      expect(s.is.strongpassword('  ')).toEqual(false);
      expect(s.is.strongpassword('asd12')).toEqual(false);
    });

    it('should show correct values for ip', function() {
      expect(s.is.ip('73.60.124.136')).toEqual(true);
      expect(s.is.ip('256.60.124.136')).toEqual(false);
    });

  });

});
