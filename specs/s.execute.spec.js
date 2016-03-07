'use strict';

describe('s.msg', function () {

  describe('Execute', function () {

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

  });

});
