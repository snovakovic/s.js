describe('s.utilities', function() {

  describe('random', function() {

    it('should create random numner in the provided scope', function() {
      var random = s.random(1, 2);
      var random2 = s.random(5, 10);

      expect(random >= 1 && random <= 2).toEqual(true);
      expect(random2 >= 5 && random2 <= 10).toEqual(true);
    });

  });

  describe('getUrlParam', function() {

    it('should get correct url parameter', function() {
      //TODO: missing actual UT here. 
      //mocking location.search do full page reload and break test
      expect(s.getUrlParam('test1')).toEqual(null);
      expect(s.getUrlParam('')).toEqual(null);
    });

  });


});
