/*****************************************************
	  s.js https://github.com/snovakovic/s.js
    author: stefan.novakovich@gmail.com
    version: 1.2.2
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

/*****************************************************
	  Array Modification
 ***************************************************/
(function(s, undefined) {

  /**
  * Loop through any array
  * @example s.each([1,2,3,4,5,6,7], function(val, i) { console.log(val); } );
  */
  s.each = function(arr, callback) {
    for (var i = 0, l = arr.length; i < l; i++) {
      if (callback(arr[i], i) === false) {
        break;
      }
    }
  };

  /**
  * Iterate specific number of times
  * @param  {Integer}   n  number of iterations
  * @param  {Function} callback function that will be call per each iteration. use return false to break from iterations
  * @example s.iterate(10, function(i) { console.log(i); } );
  */
  s.iterate = function(l, callback) {
    for (var i = 0; i < l; i++) {
      if (callback(i) === false) {
        break;
      }
    }
  };

  /**
  * Remove all occurrences of element from array
  * @param arr {Array} array from where we want  to remove the values
  * @param elToRemove {...} element that we want to remove from array
  * @param max {whole number integer} max number of occurrences to remove. 1 - remove first, -1 remove last.
   * @return {Array} new array without the removed values
  * @example s.remove( ['a', 'b', 'c', 'd', 'c'], 'c' );
  */
  s.remove = function(arr, elToRemove, max) {
    var pos;
    if (max && (typeof max !== 'number' || max % 1 !== 0)) {
      throw new Error('Invalid argument exception');
    }

    while (pos !== -1 && max !== 0) {
      if (max) {
        if (max >= 1) {
          pos = arr.indexOf(elToRemove);
          max--;
        } else {
          pos = arr.lastIndexOf(elToRemove);
          max++;
        }

      } else {
        pos = arr.indexOf(elToRemove);
      }

      pos > -1 && arr.splice(pos, 1);
    }
    return arr;
  };

  /**
  * Shuffle values in the array
  * @param arr {Array} input array that we want to shuffle
  * @return {Array} shuffled array
  * @example s.shuffle(['a', 'b', 'c', 'd', 'c']);
  */
  s.shuffle = function(arr) {
    for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
  };

  /**
  * Get the new array filled with default values
  * @param val {....} default value that will fill the array
  * @return len {Integer} size of the new array
  * @example s.getFilledArray(0, 5);
  */
  s.getFilledArray = function(val, len) {
    var rv = new Array(len);
    while (--len >= 0) {
      rv[len] = val;
    }
    return rv;
  };

  /**
  * Returns new array containing only unique values from original array
  * Doesn't support nested objects and array
  */
  s.unique = function(originalArr) {
    var arr = [];
    for (var i = 0; i < originalArr.length; i++) {
      if (arr.indexOf(originalArr[i]) === -1) {
        arr.push(originalArr[i]);
      }
    }
    return arr;
  };

  /**
  * Returns first element of array if no condition is passed,
  * else if there is condition returns first element of array that meets condition
  * if element is not found undefined is returned
  */
  s.first = function(arr, condition) {
    if (!s.common.isArrayWithValue(arr)) {
      return undefined;
    }

    if (condition) {
      for (var i = 0; i < arr.length; i++) {
        if (condition(arr[i])) {
          return arr[i];
        }
      }
    } else {
      return arr[0]
    }

    return undefined;

  };

  /**
  * Returns last element of array if no condition is passed,
  * else if there is condition returns last element of array that meets condition
  * if element is not found undefined is returned
  */
  s.last = function(arr, condition) {
    if (!s.common.isArrayWithValue(arr)) {
      return undefined;
    }

    if (condition) {
      for (var i = arr.length - 1; i >= 0; i--) {
        if (condition(arr[i])) {
          return arr[i];
        }
      }
    } else {
      return arr[arr.length - 1]
    }

    return undefined;

  };

  /*****
   * Stack implementation LIFO last in first out
  ******/
  s.stack = function(defaultArray) {
    return (function() {
      var _stack = defaultArray || [];
      return {
        add: function(val) {
          Array.isArray(val) ? Array.prototype.push.apply(_stack, val) : _stack.push(val);
        },
        remove: function() {
          return _stack.length ? _stack.pop() : null;
        },
        peek: function() {
          return _stack.length ? _stack[_stack.length - 1] : null;
        },
        array: _stack,
        length: function() {
          return _stack.length;
        }
      }
    })();
  };

  /*****
  * Queue implementation FIFI: first in first out
  ******/
  s.queue = function(defaultArray) {
    return (function() {
      var _queue = defaultArray || [];
      return {
        add: function(val) {
          Array.isArray(val) ? Array.prototype.push.apply(_queue, val) : _queue.push(val);
        },
        addRange: function(range) {
          Array.prototype.push.apply(_queue, range);
        },
        remove: function() {
          return _queue.length ? _queue.shift() : null;
        },
        peek: function() {
          return _queue.length ? _queue[0] : null;
        },
        array: _queue,
        length: function() {
          return _queue.length;
        }
      }
    })();
  };


})(window.snovakovic);

/*****************************************************
	  Test Module part
 ***************************************************/
(function(s) {

  s.is = {};

  s.is.defined = function(testVar) {
    return typeof testVar !== 'undefined';
  };

  /**
   * Test if variable has been defined and is not empty,
   * Following will be treated as false
   * s.is.empty(null); => true
   * s.is.empty(undefined); => true
   * s.is.empty({}); => true
   * s.is.empty([]); => true
   * s.is.empty(' '); => true
   * s.is.empty('\n\t'); => true
   * s.is.empty(null); => true
  */
  s.is.empty = function(testVar) {
    if (typeof testVar === 'undefined' || testVar === null
      || (typeof testVar === 'string' && (/^\s*$/).test(testVar))) {
      return true;
    }

    if (typeof testVar === 'object') {
      for (var key in testVar) {
        if (Object.prototype.hasOwnProperty.call(testVar, key)) {
          return false;
        }
      }
      return true;
    }

    return false;
  };

  /**
   * VAR type check
   */
  s.is.string = function(testVar) {
    return typeof testVar === 'string';
  };

  s.is.number = function(testVar) {
    return typeof testVar === 'number';
  };

  s.is.boolean = function(testVar) {
    return typeof testVar === 'boolean';
  };

  s.is.object = function(testVar) {
    return typeof testVar === 'object' && testVar !== null && !Array.isArray(testVar);
  };

  s.is.function = function(testVar) {
    return typeof testVar === 'function';
  };

  s.is.array = function(testVar) {
    return typeof testVar === 'object' && Array.isArray(testVar);
  };

  s.is.arrayWithValue = function(testVar) {
    return s.common.arrayWithValue(testVar);
  };

  /****
  * STRING tests
  ****/

  s.is.alphabetic = function(str) {
    var re = /^[a-zA-Z ]*$/;
    return re.test(str);
  };

  s.is.alphanumeric = function(str) {
    var re = /^[a-zA-Z0-9 ]*$/;
    return re.test(str);
  };

  s.is.numeric = function(str) {
    var re = /^[0-9 ]*$/;
    return re.test(str);
  };

  s.is.lowercase = function(str) {
    var re = /^[a-z ]*$/;
    return re.test(str);
  };

  s.is.uppercase = function(str) {
    var re = /^[A-Z ]*$/;
    return re.test(str);
  };

  s.is.email = function(str) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
  };

  s.is.strongpassword = function(str) {
    var re = /^(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*$/;
    return re.test(str);
  };

  s.is.ip = function(str) {
    var re = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return re.test(str);
  };

})(window.snovakovic);

/*****************************
 * sMsg - broadcast messages
 * example s.broadcast('something-happened', objToSend)
 * s.listen('something-happened', function(val) {
 *  console.log(val);
 * });
 ****************************/
(function(s) {
  var subscribers = [];

  s.broadcast = function(to, obj) {
    for (var i = 0; i < subscribers[to].length; i++) {
      subscribers[to][i](obj);
    }
  };

  s.listen = function(subscribe, cb) {
    subscribers[subscribe] = subscribers[subscribe] ? subscribers[subscribe] : [];
    subscribers[subscribe].push(cb);
  };

})(window.snovakovic);

/************************************
 * MatchMedia polyfill for IE9 or below
 * ! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license
 ****************************************/
if (!window.matchMedia) {

  window.matchMedia = (function() {

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
        matchMedium: function(media) {
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

    return function(media) {
      return {
        matches: styleMedia.matchMedium(media || 'all'),
        media: media || 'all'
      };
    };

  })();
}


/************************************
 * sResizeWatch
 * whatch for resize events - and switching between layouts.
 * Detect when media query is triggered
 ****************************************/
(function(s) {
  var onFunctionStack = [];
  var offFunctionStack = [];
  var onceFunctionStack = [];
  var resizeEndFunctionStack = [];
  var onResizeFunctionStack = [];
  var i;
  var doit;
  var currentScreenSizes = [];
  //based on bootstrap breakpoints
  var screenSizes = [
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
    screenSizes.forEach(function(size) {
      if (testSize(size)) {
        currentScreenSizes.push(size);
      }
    });
  }
  setCurrentScreenSizes();

  //MAIN RESIZE EVENT LISTENER
  window.addEventListener('resize', function() {
    onResizeFunctionStack.forEach(function(callback) {
      callback();
    });

    clearTimeout(doit);
    doit = setTimeout(onScreenResize, 50);
  }, true);

  function onScreenResize() {

    for (i = 0; i < screenSizes.length; i++) {
      var size = screenSizes[i];
      if (!currentScreenSizes.some(function(currentSize) { return currentSize.name === size.name; })) {
        if (testSize(size)) {
          currentScreenSizes.push(size);
          onScreenChange(size);
        }
      }

      // remove current screen sizes if necessary
      var indexesToRemove = [];
      currentScreenSizes.forEach(function(currentSize, index) {
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
    resizeEndFunctionStack.forEach(function(callback) {
      callback();
    });

  }

  function onScreenChange(screenSize) {
    if (onFunctionStack[screenSize.name]) {
      onFunctionStack[screenSize.name].forEach(function(callback) {
        callback();
      });
    }
    if (onceFunctionStack[screenSize.name]) {
      onceFunctionStack[screenSize.name].forEach(function(callback) {
        callback();
      });
      onceFunctionStack[screenSize.name] = [];
    }
  }

  function offScreenChange(screenSize) {
    if (offFunctionStack[screenSize.name]) {
      offFunctionStack[screenSize.name].forEach(function(callback) {
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

  s.resizeWatch.on = function(screenSizeName, callback) {
    this.queueOn(screenSizeName, callback);

    var size = getSize(screenSizeName);
    if (size && testSize(size)) {
      callback();
    }
  };

  s.resizeWatch.once = function(screenSizeName, callback) {
    var size = getSize(screenSizeName);
    if (size && testSize(size)) {
      callback();
    } else {
      onceFunctionStack[screenSizeName] = onceFunctionStack[screenSizeName] ? onceFunctionStack[screenSizeName] : [];
      onceFunctionStack[screenSizeName].push(callback);
    }
  };

  s.resizeWatch.queueOn = function(screenSizeName, callback) {
    onFunctionStack[screenSizeName] = onFunctionStack[screenSizeName] ? onFunctionStack[screenSizeName] : [];
    onFunctionStack[screenSizeName].push(callback);
  };

  s.resizeWatch.off = function(screenSizeName, callback) {
    this.queueOff(screenSizeName, callback);

    var size = getSize(screenSizeName);
    if (size && !testSize(size)) {
      callback();
    }
  };

  s.resizeWatch.queueOff = function(screenSizeName, callback) {
    offFunctionStack[screenSizeName] = offFunctionStack[screenSizeName] ? offFunctionStack[screenSizeName] : [];
    offFunctionStack[screenSizeName].push(callback);
  };

  s.resizeWatch.addSize = function(screenSize) {
    if (typeof screenSize === 'object') {
      screenSizes.push(screenSize);
      if (testSize(screenSize)) {
        currentScreenSizes.push(screenSize);
      }
    }
  };

  s.resizeWatch.onResizeEnd = function(callback) {
    resizeEndFunctionStack.push(callback);
  };

  s.resizeWatch.onResize = function(callback) {
    onResizeFunctionStack.push(callback);
  };

  s.resizeWatch.setNewScreenSizes = function(newScreenSizes) {
    screenSizes = newScreenSizes;
    setCurrentScreenSizes();
  };

  s.resizeWatch.getCurrentScreenSizes = function() {
    return currentScreenSizes;
  };

  s.resizeWatch.is = function(screenSizeName) {
    return currentScreenSizes.some(function(elem) {
      return elem.name === screenSizeName;
    });
  };

  s.resizeWatch.getAllScreenSizes = function() {
    return screenSizes;
  };

})(window.snovakovic);


/*****************************************************
 			  String Modification.
 ***************************************************/
(function(s) {

  s.replaceAll = function(str, find) {
    return {
      with: function(replace) {
        return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
      }
    }
  };

  s.capitalize = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  /***********************************************
   * Below methods has been taken from
   * https://github.com/epeli/underscore.string
  ************************************************/

  /*
   * test if string contains substring
   * @ignore case - case is ignored on comparation
   * @example capitalize('foo Bar', 'oo'); => 'Foo Bar'; capitalize('FOO Bar', true); => 'Foo bar'
   * https://github.com/epeli/underscore.string
  */
  s.contains = function(str1, str2, ignoreCase) {
    if (ignoreCase === true) {
      str1 = str1.toLowerCase();
      str2 = str2.toLowerCase();
    }
    return str1.indexOf(str2) !== -1;
  };

  /*
   * Break string in array of substring
   * @example: chop("whitespace", 3); => ['whi', 'tes', 'pac', 'e']
  */
  s.chop = function(str, step) {
    if (!str) {
      return [];
    }
    str = String(str);
    step = ~~step;
    return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
  };

  /*
  * Trim and replace multiple spaces with a single space.
  * @example clean(' foo    bar   '); => 'foo bar'
  */
  s.clean = function(str) {
    return str.trim().replace(/\s\s+/g, ' ');
  };


  /**
  * Truncate string if it exceed max number of characters,
  * apply provided truncate string at the end of truncated string (default: '...')
  */
  s.truncate = function(str, length, truncateStr) {
    truncateStr = truncateStr || '...';
    length = ~~length;
    return str.length > length ? str.slice(0, length) + truncateStr : str;
  };


})(window.snovakovic);

/*****************************************************
   Utilities
 ***************************************************/
(function(s) {

  /**
  * Get random number between 2 provided numbers.
	* @example s.random(1, 10); get random number between 1 and 10 (1 and 10 are included)
	*/
  s.random = function(from, to) {
    if (s.is.numeric(from) && s.is.numeric(to)) {
      return Math.floor(Math.random() * (to - from + 1) + from);
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
  * returns function that can be executed only once
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
  * Returns a function, that, as long as it continues to be invoked, will not be triggered
   ************************************************/
  s.debounce = function(func, wait) {
    var timeout;
    return function() {
      var context = this;
      var callNow = !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);

      if (callNow) {
        func.apply(context, arguments);
      }
    };
  };

  /*************************
  * execute function when condition becomes true
  * example:
  ** a = false;
  ** s.execute(function() { console.log('a has become true')}).when(function() { return a;}):
  ** setTimeout(function(){ a= true; },30);
  ************************/
  s.execute = function(executeCb) {
    return (function() {
      var _executeCb = executeCb;
      var _conditionCb;
      var _maxTries;
      var _timeOut;
      var _noTries = 0;

      function when() {
        _noTries++;
        if (_conditionCb()) {
          _executeCb();
          clean();
        } else if (!_maxTries || (_noTries < _maxTries)) {
          setTimeout(when, _timeOut);
        } else {
          clean();
        }
      }

      function clean() {
        _executeCb = _conditionCb = _maxTries = _timeOut = _noTries = null;
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
    } ());
  };


})(window.snovakovic);

//# sourceMappingURL=s.js.map
