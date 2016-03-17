/*****************************************************
	  Functions
 ***************************************************/
(function(s) {
  
  /**********************************************
   * return function that can be executed only once
   * @example var init = s.once(function(){ }): init();
  ************************************************/
  s.once = function(cb) {
    return new Once(cb);

    function Once(cb) {
      var _executed = false;

      return function() {
        if (!_executed) {
          _executed = true;
          cb.apply(window, arguments);
        }
      }
    }
  };

})(window.s = window.s || {});
