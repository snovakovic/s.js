describe('s.utilities', function() {

  describe('random', function() {

    it('should create random numner in the provided scope', function() {
      var random = s.random(1, 2);
      var random2 = s.random(5, 10);

      expect(random >= 1 && random <= 2).toEqual(true);
      expect(random2 >= 5 && random2 <= 10).toEqual(true);

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
      var f2 = s.once(function() {
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

  describe('debounce', function() {

    it('should call function only twice', function(done) {
      var noCalls = 0;
      var debounceFunction = s.debounce(function() {
        noCalls++;
      }, 1);

      expect(noCalls).toEqual(0);
      debounceFunction();
      debounceFunction();
      debounceFunction();

      setTimeout(function() {
        debounceFunction();
        debounceFunction();
        expect(noCalls).toEqual(2);
        done();
      }, 2);

    });

    it('should call function once', function() {
      var noCalls = 0;
      var debounceFunction = s.debounce(function() {
        noCalls++;
      }, 1);

      expect(noCalls).toEqual(0);
      debounceFunction();
      debounceFunction();
      debounceFunction();
      debounceFunction();
      expect(noCalls).toEqual(1);

    });

  });

  describe('execute', function() {

    it('should execute on async condition change', function(done) {
      var executeCondition = false;
      setTimeout(function() {
        executeCondition = true;
      }, 1);

      s.execute(function() {
        expect(executeCondition).toEqual(true);
        done();
      }).when(function() {
        return executeCondition;
      });

    });

    it('should exceed max tries count', function(done) {
      var executeCondition = false;
      var isExecuted = false;
      setTimeout(function() {
        executeCondition = true;
        setTimeout(function() {
          expect(isExecuted).toEqual(false);
          done();
        }, 1);
      }, 15);

      s.execute(function() {
        isExecuted = true;
      }).when(function() {
        return executeCondition;
      }, 1).limit(1);  //timeout is 1ms with 2 tries == 2ms
    });

  });

});
