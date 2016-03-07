'use strict';

/************************************
 * MatchMedia polyfill for IE9 or below
 * ! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license
 ****************************************/
if (!window.matchMedia) {

  window.matchMedia = (function () {

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
      var style = document.createElement('style'),
        script = document.getElementsByTagName('script')[0],
        info = null;

      style.type = 'text/css';
      style.id = 'matchmediajs-test';

      script.parentNode.insertBefore(style, script);

      // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
      info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

      styleMedia = {
        matchMedium: function (media) {
          var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

          // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
          if (style.styleSheet) {
            style.styleSheet.cssText = text;
          } else {
            style.textContent = text;
          }

          // Test if media query is true or false
          return info.width === '1px';
        }
      };
    }

    return function (media) {
      return {
        matches: styleMedia.matchMedium(media || 'all'),
        media: media || 'all'
      };
    };

  })();
}


/************************************
 * sResizeWatch : https://github.com/snovakovic/sResizeWatch
 * whatch for resize events - and switching between layouts. 
 ****************************************/
(function (s) {
  var onFunctionStack = [],
    offFunctionStack = [],
    onceFunctionStack = [],
    resizeEndFunctionStack = [],
    onResizeFunctionStack = [],
    i,
    currentScreenSizes = [],
    //based on bootstrap breakpoints
    screenSizes = [
      {
        minWidth: 992,
        name: 'desktop'
      },
      {
        minWidth: 768,
        maxWidth: 991,
        name: 'tablet'
      },
      {
        maxWidth: 767,
        name: 'mobile'
      }
    ];

  //set current screen sizes
  function setCurrentScreenSizes() {
    currentScreenSizes = [];
    screenSizes.forEach(function (size) {
      if (testSize(size)) {
        currentScreenSizes.push(size);
      }
    });
  }
  setCurrentScreenSizes();


  var doit;

  //MAIN RESIZE EVENT LISTENER
  window.addEventListener('resize', function () {
    onResizeFunctionStack.forEach(function (callback) {
      callback();
    });

    clearTimeout(doit);
    doit = setTimeout(onScreenResize, 50);
  }, true);

  function onScreenResize() {

    for (i = 0; i < screenSizes.length; i++) {
      var size = screenSizes[i];
      if (!currentScreenSizes.some(function (currentSize) { return currentSize.name === size.name; })) {
        if (testSize(size)) {
          currentScreenSizes.push(size);
          onScreenChange(size);
        }
      }

      // remove current screen sizes if necessary
      var indexesToRemove = [];
      currentScreenSizes.forEach(function (currentSize, index) {
        if (!testSize(currentSize)) {
          indexesToRemove.push(index);
        }
      });

      for (var x = indexesToRemove.length - 1; x >= 0; x--) {
        offScreenChange(currentScreenSizes[indexesToRemove[x]]);
        currentScreenSizes.splice(indexesToRemove[x], 1);
      }

    }

    /** Call any on resize end event **/
    //this should be at the bottom in case that function use any of other sResizeFunctionalities
    resizeEndFunctionStack.forEach(function (callback) {
      callback();
    });

  }

  function onScreenChange(screenSize) {
    if (onFunctionStack[screenSize.name]) {
      onFunctionStack[screenSize.name].forEach(function (callback) {
        callback();
      });
    }
    if (onceFunctionStack[screenSize.name]) {
      onceFunctionStack[screenSize.name].forEach(function (callback) {
        callback();
      });
      onceFunctionStack[screenSize.name] = [];
    }
  }

  function offScreenChange(screenSize) {
    if (offFunctionStack[screenSize.name]) {
      offFunctionStack[screenSize.name].forEach(function (callback) {
        callback();
      });
    }
  }

  function testSize(size) {
    var minMatch = size.minWidth ? window.matchMedia('(min-width: ' + size.minWidth + 'px)').matches : true;
    var maxMatch = size.maxWidth ? window.matchMedia('(max-width: ' + size.maxWidth + 'px)').matches : true;

    return (minMatch && maxMatch) && (size.minWidth || size.maxWidth);
  }

  function getSize(screenSizeName) {
    for (i = 0; i < screenSizes.length; i++) {
      if (screenSizeName === screenSizes[i].name) {
        return screenSizes[i];
      }
    }

    return null;
  }

  /**
   * PUBLIC METHODS
   */
  s.resizeWatch = {};

  s.resizeWatch.on = function (screenSizeName, callback) {
    this.queueOn(screenSizeName, callback);

    var size = getSize(screenSizeName);
    if (size && testSize(size)) {
      callback();
    }
  };

  s.resizeWatch.once = function (screenSizeName, callback) {
    var size = getSize(screenSizeName);
    if (size && testSize(size)) {
      callback();
    } else {
      onceFunctionStack[screenSizeName] = onceFunctionStack[screenSizeName] ? onceFunctionStack[screenSizeName] : [];
      onceFunctionStack[screenSizeName].push(callback);
    }
  };

  s.resizeWatch.queueOn = function (screenSizeName, callback) {
    onFunctionStack[screenSizeName] = onFunctionStack[screenSizeName] ? onFunctionStack[screenSizeName] : [];
    onFunctionStack[screenSizeName].push(callback);
  };

  s.resizeWatch.off = function (screenSizeName, callback) {
    this.queueOff(screenSizeName, callback);

    var size = getSize(screenSizeName);
    if (size && !testSize(size)) {
      callback();
    }
  };

  s.resizeWatch.queueOff = function (screenSizeName, callback) {
    offFunctionStack[screenSizeName] = offFunctionStack[screenSizeName] ? offFunctionStack[screenSizeName] : [];
    offFunctionStack[screenSizeName].push(callback);
  };

  s.resizeWatch.addSize = function (screenSize) {
    if (typeof screenSize === 'object') {
      screenSizes.push(screenSize);
      if (testSize(screenSize)) {
        currentScreenSizes.push(screenSize);
      }
    }
  };

  s.resizeWatch.onResizeEnd = function (callback) {
    resizeEndFunctionStack.push(callback);
  };

  s.resizeWatch.onResize = function (callback) {
    onResizeFunctionStack.push(callback);
  };

  s.resizeWatch.setNewScreenSizes = function (newScreenSizes) {
    screenSizes = newScreenSizes;
    setCurrentScreenSizes();
  };

  s.resizeWatch.getCurrentScreenSizes = function () {
    return currentScreenSizes;
  };

  s.resizeWatch.is = function (screenSizeName) {
    return currentScreenSizes.some(function (elem) {
      return elem.name === screenSizeName;
    });
  };

  s.resizeWatch.getAllScreenSizes = function () {
    return screenSizes;
  };

})(window.s = window.s || {});

