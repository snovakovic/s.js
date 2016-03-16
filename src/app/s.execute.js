
/*************************
 * s.execute aka Pesky 
 * execute method when condition becomes true
 * example: 
 ** a = false; 
 ** s.execute(function() { console.log('a has become true')}).when(function() { return a;}): 
 ** setTimeout(function(){ a= true; },30);
 ************************/
(function(s) {

  s.execute = function(executeCb) {
    return new PeskyInstance(executeCb);
  };

  function PeskyInstance(executeCb) {
    var _executeCb = executeCb;
    var _conditionCb;
    var _maxTries;
    var _timeOut;
    var _noTries = 0;

    function when() {
      _noTries++;
      if (_conditionCb()) {
        _executeCb();
      } else if (!_maxTries || (_noTries < _maxTries)) {
        setTimeout(when, _timeOut);
      }
    }

    return {
      when: function(conditionCb, timeOut) {
        _timeOut = timeOut || 5;
        _conditionCb = conditionCb;

        setTimeout(when);
        return this;
      },
      limit: function(maxTries) {
        _maxTries = maxTries;
      }
    };
  }
} (window.s = window.s || {}));
