/*****************************************************
	  s.js https://github.com/snovakovic/s.js
    author: stefan.novakovich@gmail.com
    version: 1.1.1
 ***************************************************/
(function(s) {

  s.common = {};

  s.common.isArrayWithValue = function(testVar) {
    return s.is.array(testVar) && testVar.length > 0;
  };

})(window.s = window.s || {});
