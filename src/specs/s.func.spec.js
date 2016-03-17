describe('s.func', function() {

  describe('once', function() {

    it('should call function only once', function() {
      var noCalls = 0;
      var init = s.once(function() {
        noCalls++;
      });

      expect(noCalls).toEqual(0);
      init();
      init();
      init();
      expect(noCalls).toEqual(1);
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
