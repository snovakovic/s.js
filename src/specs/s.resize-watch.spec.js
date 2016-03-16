describe('s.array', function () {

  var resizeListeners = [];

  beforeEach(function () {

  });



  describe('sResize', function () {

    it('should call on resize', function (done) {
      var onResizeNumberOfCalls = 0;
      var onResizeEndNumberOfCalls = 0;
      s.resizeWatch.onResize(function () {
        onResizeNumberOfCalls++;
      });

      s.resizeWatch.onResizeEnd(function () {
        onResizeEndNumberOfCalls++;
      });

      windowEventListenerMock.executeResizeEvent();
      windowEventListenerMock.executeResizeEvent();
      windowEventListenerMock.executeResizeEvent();

      expect(onResizeNumberOfCalls).toEqual(3);

      setTimeout(function () {
        expect(onResizeEndNumberOfCalls).toEqual(1);
        done();
      }, 55);
    });

    it('should set new screen sizes', function () {
      var newScreenSizes = [
        {
          minWidth: 992,
          name: 'test-desktop'
        },
        {
          maxWidth: 991,
          name: 'test-mobile'
        }
      ];

      s.resizeWatch.setNewScreenSizes(newScreenSizes);

      expect(s.resizeWatch.getAllScreenSizes()).toEqual(newScreenSizes);

    });

    it('should add new screen size  to the list of screen size and to current screen', function () {
      var newScreenSize = 
        {
          minWidth: 666, //this is only size that is set to pass on matchMedia in window.mock
          name: 'test-mobile'
        };

      s.resizeWatch.addSize(newScreenSize);

      expect(s.resizeWatch.getAllScreenSizes()).toContain(newScreenSize);
      expect(s.resizeWatch.getCurrentScreenSizes()).toEqual([newScreenSize]); 
      expect(s.resizeWatch.is('test-mobile')).toEqual(true);
      expect(s.resizeWatch.is('something-else')).toEqual(false);

    });

  });

});
