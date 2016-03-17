describe('s.utilities', function() {

  describe('random', function() {

    it('should create random numner in the provided scope', function() {
      var arr = [1, 2, 3];
      var random = s.random(1, 2);
      var random2 = s.random(5, 10);
      var randomArrItem = s.random(arr);

      expect(random >= 1 && random <= 2).toEqual(true);
      expect(random2 >= 5 && random2 <= 10).toEqual(true);
      expect(randomArrItem >= 1 && randomArrItem <= 3).toEqual(true);

      expect(function() {
        s.random('something');
      }).toThrow(new Error('Invalid argument exception'));
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

  describe('once', function() {

    it('should call function only once', function() {
      var noCalls = 0;
      var init = s.once(function() {
        noCalls++;
      });
      var f2 = s.once(function () {
        noCalls++;
      });

      expect(noCalls).toEqual(0);
      init();
      init();
      init();
      f2();
      f2();
      expect(noCalls).toEqual(2);
    });

    it('should call function only once and pass correct arguments', function() {
      var noCalls = 0;
      var attr = '';

      var init = s.once(function(name) {
        noCalls++;
        attr = name;
      });

      expect(noCalls).toEqual(0);
      init('first-call');
      init('second-call');
      init('last-call');

      expect(noCalls).toEqual(1);
      expect(attr).toEqual('first-call');
    });

  });

});
