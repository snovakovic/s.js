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

  /**********************************************
  * return function that can be executed only once
  * @example var init = s.once(function(){ }): init();
 ************************************************/
  s.once = function(fn, context) {
    var result;

    return function() {
      if (fn) {
        result = fn.apply(context || this, arguments);
        fn = null;
      }

      return result;
    };
  }

  /**********************************************
  * Returns a function, that, as long as it continues to be invoked, will not
  * be triggered. The function will be called after it stops being called for
  * N milliseconds. If `immediate` is passed, trigger the function on the
  * leading edge, instead of the trailing.
   ************************************************/
  s.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  // // Usage
  // var myEfficientFn = debounce(function() {
  //   // All the taxing stuff you do
  // }, 250);
  // window.addEventListener('resize', myEfficientFn);

})(window.s = window.s || {});
