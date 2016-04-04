/*****************************************************
	  Test Module part
 ***************************************************/
(function(s) {

  s.common = {};

  s.common.isArrayWithValue = function(testVar) {
    return s.is.array(testVar) && testVar.length > 0;
  };

})(window.s = window.s || {});
