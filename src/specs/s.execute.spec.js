describe('s.execute', function () {

  describe('execute', function () {

    it('should execute on async condition change', function (done) {
      var executeCondition = false;
      setTimeout(function () {
        executeCondition = true;
      }, 1);

      s.execute(function () {
        expect(executeCondition).toEqual(true);
        done();
      }).when(function () {
        return executeCondition;
      });

    });


    it('should exceed max tries count', function (done) {
      var executeCondition = false;
      var isExecuted = false;
      setTimeout(function () {
        executeCondition = true;

        setTimeout(function () {
          expect(isExecuted).toEqual(false);
          done();
        }, 1);
      }, 3);

      s.execute(function () {
        isExecuted = true;
      }).when(function () {
        return executeCondition;
      }, 1).limit(2);  //timeout is 1ms with 2 tries == 2ms
    });


  });

});
