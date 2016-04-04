describe('s.msg', function() {

  describe('broadcasting', function() {

    it('should recive messages without object', function() {
      var messageReceived = false;
      s.listen('test-msg', function() {
        messageReceived = true;
      });
      s.broadcast('test-msg');
      expect(messageReceived).toEqual(true);
    });

    it('should recive messages with object', function() {
      var testObj = { test: 'test' };
      var receivedObject = null;
      s.listen('test-obj', function(val) {
        receivedObject = val;
      });
      s.broadcast('test-obj', testObj);
      expect(receivedObject).toEqual(testObj);
    });

    it('should handle multiple listeneres', function() {
      var noOfReceivedMessages = 0;
      s.listen('test-multiple', function() {
        noOfReceivedMessages++;
      });
      s.listen('test-multiple', function() {
        noOfReceivedMessages++;
      });
      s.listen('test-multiple', function() {
        noOfReceivedMessages++;
      });

      s.broadcast('test-multiple');
      expect(noOfReceivedMessages).toEqual(3);
    });

  });

});
