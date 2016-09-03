describe('s.string', function() {

  describe('replaceAll', function() {
    it('should replace all ocurance of string', function() {
      var replacedString = s.replaceAll('this is old value in old string old old', 'old').with('new');
      expect(replacedString).toEqual('this is new value in new string new new');
    });
  });

  describe('capitalize', function() {
    it('should capitalize string', function() {
      expect(s.capitalize('abc Da')).toEqual('Abc Da');
      expect(s.capitalize('Abc Da')).toEqual('Abc Da');
    });
  });

  describe('contains', function() {
    it('should contain string', function() {
      expect(s.contains('abc Da', 'da')).toEqual(false);
      expect(s.contains('abc Da', 'da', true)).toEqual(true);
      expect(s.contains('abc Da', 'Da')).toEqual(true);
      expect(s.contains('abc Da', 'bc')).toEqual(true);
    });
  });

  describe('chop', function() {
    it('should choop string', function() {
      expect(s.chop('abc Da', 2)).toEqual(['ab', 'c ', 'Da']);
      expect(s.chop('whitespace', 3)).toEqual(['whi', 'tes', 'pac', 'e']);
      expect(s.chop(null, 3)).toEqual([]);
    });
  });

  describe('clean', function() {
    it('should clean string', function() {
      expect(s.clean('abc')).toEqual('abc');
      expect(s.clean('abc ')).toEqual('abc');
      expect(s.clean('  ab   c  ')).toEqual('ab c');
    });
  });

  describe('truncate', function() {
    it('should truncate string correctly', function() {
      expect(s.truncate('stefan.novakovich@gmail.com', 100)).toEqual('stefan.novakovich@gmail.com');
      expect(s.truncate('stefan.novakovich@gmail.com', 10)).toEqual('stefan.nov...');
      expect(s.truncate('stefan.novakovich@gmail.com', 10, ' ...more')).toEqual('stefan.nov ...more');
    });
  });

});
