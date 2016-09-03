/*****************************************************
	  s.js https://github.com/snovakovic/s.js
    author: stefan.novakovich@gmail.com
    version: 1.2.0
 ***************************************************/
(function(s) {

  //It will be added as s to global scope only if it does not exist already
  window.s = window.s || s;

  s.noConflict = function() {
    if(window.s === window.snovakovic) {
      window.s = undefined;
    }
    return window.snovakovic;
  }

  s.common = {};

  s.common.isArrayWithValue = function(testVar) {
    return s.is.array(testVar) && testVar.length > 0;
  };

})(window.snovakovic = function(callContext) {
  var s = window.snovakovic;
  //ALIASES THAT CAN BE USED AS FUNCTIONS AND AS OBJECT PROPERTIES
  return {
    //s.string.js
    replaceAll: s.replaceAll.bind(null, callContext),
    capitalize: s.capitalize.bind(null, callContext),
    contains: s.contains.bind(null, callContext),
    chop: s.chop.bind(null, callContext),
    clean: s.clean.bind(null, callContext),
    truncate: s.truncate.bind(null, callContext)
  }

});
