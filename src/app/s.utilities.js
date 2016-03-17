/*****************************************************
   Utilities
 ***************************************************/
(function(s) {

  function getRandomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  /**
	* Returns random number between 2 provided numbers numbers
  * If array is provided instead it returns random element from array
	* @param from {string} min number
	* @param to {string|regExpresion} max number
	* @example s.random(1, 10); get random number between 1 and 10 (1 and 10 are included)
	*/
  s.random = function(from, to) {
    if (s.is.numeric(from) && s.is.numeric(to)) {
      return getRandomNumber(parseInt(from), parseInt(to));
    } else if (s.is.array(from)) {
      var randIndex = getRandomNumber(0, from.length - 1);
      return from.length > 0 ? from[randIndex] : undefined;
    } else {
      throw new Error('Invalid argument exception');
    }
  };

  /**
  * Get the parameter from URL by the name
  * @param key {string} the key for which value will be retrieved
  * @example s.getUrlParam("firstName"); 
  */
  s.getUrlParam = function(key) {
    var val = RegExp(key + '=' + '(.+?)(&|$)').exec(location.search) || null;
    if (val === null) {
      return null;
    }
    return decodeURI(val[1]);
  };

})(window.s = window.s || {});
