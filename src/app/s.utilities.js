/*****************************************************
   Utilities
 ***************************************************/
(function (s) {

  /**
	* Returns random number using Math.random() between 2 numbers
	* @param from {string} min number
	* @param to {string|regExpresion} max number
	* @example s.random(1, 10); get random number between 1 and 10 (1 and 10 are included)
	*/
  s.random = function (from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  };

  /**
  * Get the parameter from URL by the name
  * @param key {string} the key for which value will be retrieved
  * @example s.getUrlParam("firstName"); 
  */
  s.getUrlParam = function (key) {
    var val = RegExp(key + '=' + '(.+?)(&|$)').exec(location.search) || null;
    if (val === null) {
      return null;
    }
    return decodeURI(val[1]);
  };

})(window.s = window.s || {});
