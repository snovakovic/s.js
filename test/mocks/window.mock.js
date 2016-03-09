'use strict';

var windowEventListenerMock = (function () {
  var resizeListeners = [];

  window.addEventListener = function (event, cb) {
    if (event === 'resize') {
      resizeListeners.push(cb);
    }
  };

  window.matchMedia = function (query) {
    if (query.indexOf('666') !== -1) {
      return { matches: true };
    } else {
      return { matches: false };
    }
  };

  return {
    executeResizeEvent: function () {
      resizeListeners.forEach(function (listener) {
        listener();
      });
    }
  };

})();
