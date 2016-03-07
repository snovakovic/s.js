/*************************
 * s.execute aka Pesky execute method when condition becomes true
 * exampte a = false; 
 * s.execute(function() { console.log('a has become true')}).when(function() { return a;}): 
 * setTimeout(function(){ a= true; },30);
 ************************/

(function (s) {

  s.execute = function (executeCb) {
    return new PeskyInstance(executeCb);
  };

  function PeskyInstance(executeCb) {
    var _executeCb = executeCb;
    var _conditionCb;
    var _maxTries;
    var _timeOut;
    var _failCb;
    var _doneCb;
    var _noTries = 0;

    function done() {
      _doneCb && _doneCb();
    }
    function fail() {
      _failCb && _failCb();
      done();
    }

    function when() {
      _noTries++;
      if (_conditionCb()) {
        _executeCb();
        done();
      } else if (!_maxTries || (_noTries < _maxTries)) {
        setTimeout(when, _timeOut);
      } else {
        fail();
      }
    }

    return {
      when: function (conditionCb, timeOut) {
        _timeOut = timeOut || 5;
        _conditionCb = conditionCb;

        setTimeout(when);
        return this;
      },
      fail: function (failCb) {
        _failCb = failCb;
        return this;
      },
      done: function (doneCb) {
        _doneCb = doneCb;
        return this;
      },
      limit: function (maxTries) {
        _maxTries = maxTries;
      }
    };
  }
} (window.s = window.s || {}));
