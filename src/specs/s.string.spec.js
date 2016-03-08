'use strict';

describe('s.string', function () {

  describe('replaceAll', function () {
    it('should replace all ocurance of string', function () {
      var replacedString = s.replaceAll('this is old value in old string old old', 'old', 'new');
      expect(replacedString).toEqual('this is new value in new string new new');
    });
  });

});
