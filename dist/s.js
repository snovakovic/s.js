'use strict';

/*****************************************************
	  Array Modification
 ***************************************************/
(function (s) {

  /**
  * Loop through any array
  * @example s.each([1,2,3,4,5,6,7], function(val, i) { console.log(val); } );
  */
  s.each = function (arr, callback) {
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
  s.iterate = function (l, callback) {
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
  s.remove = function (arr, elToRemove, max) {
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
  s.shuffle = function (arr) {
    for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
  };

  /**
  * Get the new array filled with default values
  * @param val {....} default value that will fill the array
  * @return len {Integer} size of the new array
  * @example s.getFilledArray(0, 5);
  */
  s.getFilledArray = function (val, len) {
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
  s.unique = function (originalArr) {
    var arr = [];
    for (var i = 0; i < originalArr.length; i++) {
      if (arr.indexOf(originalArr[i]) === -1) {
        arr.push(originalArr[i]);
      }
    }
    return arr;
  };

})(window.s = window.s || {});

'use strict';

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
      when: function (conditionCb, timeOut) {
        _timeOut = timeOut || 5;
        _conditionCb = conditionCb;

        setTimeout(when);
        return this;
      },
      limit: function (maxTries) {
        _maxTries = maxTries;
      }
    };
  }
} (window.s = window.s || {}));

'use strict';

/*****************************
 * sMsg - broadcast messages
 * example s.broadcast('something-happened', objToSend)
 * s.listen('something-happened', function(val) {
 *  console.log(val);
 * });
 ****************************/
(function (s) {
  var subscribers = [];

  s.broadcast = function (to, obj) {
    for (var i = 0; i < subscribers[to].length; i++) {
      subscribers[to][i](obj);
    }
  };

  s.listen = function (subscribe, cb) {
    subscribers[subscribe] = subscribers[subscribe] ? subscribers[subscribe] : [];
    subscribers[subscribe].push(cb);
  };

})(window.s = window.s || {});

'use strict';

/*****************************************************
	  Array Modification
 ***************************************************/
(function (s) {

  /**
    * Loop over object properties. 
    * @param arr {Object} object which properties will be looped over
    * @example s.getProperties({prop1:'val1', prop2:'val2'}, function(key, value){console.log(key + ' >> ' + value);});
    */
  s.getProperties = function (obj, callback) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (callback(prop, obj[prop]) === false) {
          break;
        }
      }
    }
  };

  /**
   * Shallow merge provided objects
   * In case of the same property value from second object will override the value in the first object
   * @param  {Objects} arbitrary number of objects that we want to merge
   * @example s.merge({prop1:1,prop2:2}, {prop1:0,prop3:3}, {prop4: '4'});
  */
  s.merge = function () {
    var merged = {};
    var _merge = function (obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          merged[prop] = obj[prop];
        }
      }
    };
    _merge(arguments[0]);
    for (var i = 1; i < arguments.length; i++) {
      _merge(arguments[i]);
    }
    return merged;
  };

  /**
   * Same as merge. But with support for merging nested objects
  */
  s.deepMerge = function () {
    var merged = {};
    var _merge = function (obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            merged[prop] = s.deepMerge(merged[prop], obj[prop]);
          }
          else {
            merged[prop] = obj[prop];
          }
        }
      }
    };
    _merge(arguments[0]);
    for (var i = 1; i < arguments.length; i++) {
      _merge(arguments[i]);
    }
    return merged;
  };

})(window.s = window.s || {});

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


'use strict';

/*****************************************************
 			  String Modification.
 ***************************************************/
(function (s) {

  /**
  * Replace all occurrences in a string with a new value   
  * @param  str {String} string where occurrences will be replaced
  * @param find {String} string that we want to replace with new value    
  * @param replace {String} new string value which will replace old value   
  * @return {[string]} new string with replaced values
  * @example console.log(s.replaceAll("this is old value in old string", "old", "new"))
   */
  s.replaceAll = function (str, find, replace) {
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
  };
  
  
  /***********************************************
   * Below methods has been taken from
   * https://github.com/epeli/underscore.string
  ************************************************/
  
  /*
   * Converts first letter of the string to uppercase. If true is passed as second argument the rest of the string will be converted to lower case.
   * @example capitalize("foo Bar"); => "Foo Bar"; capitalize("FOO Bar", true); => "Foo bar"
   * https://github.com/epeli/underscore.string
  */
  s.capitalize = function (str, lowercaseRest) {
    var remainingChars = !lowercaseRest ? str.slice(1) : str.slice(1).toLowerCase();
    return str.charAt(0).toUpperCase() + remainingChars;
  };
  
  /*
   * test if string contains substring
   * @ignore case - case is ignored on comparation
   * @example capitalize("foo Bar", 'oo'); => "Foo Bar"; capitalize("FOO Bar", true); => "Foo bar"
   * https://github.com/epeli/underscore.string
  */
  s.contains = function (str1, str2, ignoreCase) {
    if (ignoreCase === true) {
      str1 = str1.toLowerCase();
      str2 = str2.toLowerCase();
    }
    return str1.indexOf(str2) !== -1;
  };
  
  /*
   * Break string in array of substring 
   * @example: chop("whitespace", 3); => ["whi", "tes", "pac", "e"]
  */
  s.chop = function (str, step) {
    if (!str) {
      return [];
    }
    str = String(str);
    step = ~~step;
    return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
  };
  
  /*
  * Trim and replace multiple spaces with a single space.
  * @example clean(" foo    bar   "); => "foo bar"
  */
  s.clean = function (str) {
    return str.trim().replace(/\s\s+/g, ' ');
  };
  
  /**
  * Checks whether the string begins with starts at position (default: 0).
  */
  s.startsWith = function (str, starts, position) {
    position = position ? 0 : Math.min(position, str.length);
    return str.lastIndexOf(starts, position) === position;
  };
  
  /**
  * Checks whether the string ends with ends at position (default: string.length).
  */
  s.endsWith = function (str, ends, position) {
    if (position) {
      position = str.length - ends.length;
    } else {
      position = Math.min(position, str.length) - ends.length;
    }
    return position >= 0 && str.indexOf(ends, position) === position;
  };
  
  /**
   * Check if string is blank
   * isBlank(""); // => true
   * isBlank("\n"); // => true
   * isBlank(" "); // => true
   * isBlank("a"); // => false
   */
  s.isBlank = function (str) {
    return (/^\s*$/).test(str);
  };

  /**
  * Truncate string if it exceed max number of caracters, 
  * apply provided truncate string at the end of truncated string (default: '...')
  */
  s.truncate = function (str, length, truncateStr) {
    truncateStr = truncateStr || '...';
    length = ~~length;
    return str.length > length ? str.slice(0, length) + truncateStr : str;
  };


})(window.s = window.s || {});

'use strict';

/*****************************************************
	  Test Module part
 ***************************************************/
(function (s) {

  s.isDefined = function (testVar) {
    return typeof testVar !== 'undefined';
  };

  /**
   * Test if variable has been defined and is not empty, 
   * Following will be treated as false
   *     1) null
   *     2) not initialized variable
   *     3) empty array
   *     4) empty object
   *     5) empty string
   *     6) string with only spaces
  */
  s.hasValue = function (testVar) {
    if (typeof testVar === 'undefined' || testVar === null
      || (typeof testVar === 'string' && testVar.trim().length === 0)) {
      return false;
    }

    if (typeof testVar === 'object') {
      for (var key in testVar) {
        if (Object.prototype.hasOwnProperty.call(testVar, key)) {
          return true;
        }
      }
      return false;
    }

    return true;
  };

  s.isString = function (testVar) {
    return typeof testVar === 'string';
  };

  s.isNumber = function (testVar) {
    return typeof testVar === 'number';
  };

  s.isBoolean = function (testVar) {
    return typeof testVar === 'boolean';
  };

  /**
  * Check if variable type is object
  * variable type of array is also object
  * type for null returns object, but is.object will return false for null
  */
  s.isObject = function (testVar) {
    return typeof testVar === 'object' && testVar !== null;
  };

  s.isArray = function (testVar) {
    return Array.isArray(testVar);
  };

  /**
   * Test string using any regular expression or by using any of defined keywords
   * @param str {string} string that will be tested
   * @param expr {string|regExpresion} expression can be defined keyword in string format or any regular expression.
   * @example s.is("test", alphabetic); same as s.is("test", /^[a-zA-Z ]*$/)
  */
  s.is = function (str, expr) {
    var re = expr;
    if (typeof str !== 'string') {
      return false;
    }

    //look for keywords
    if (typeof expr === 'string') {
      expr = expr.trim().toLowerCase();

      switch (expr) {
        case 'alphabetic':
          re = /^[a-zA-Z ]*$/;
          break;
        case 'alphanumeric':
          re = /^[a-zA-Z0-9 ]*$/;
          break;
        case 'numeric':
          re = /^[0-9 ]*$/;
          break;
        case 'lowercase':
          re = /^[a-z ]*$/;
          break;
        case 'uppercase':
          re = /^[A-Z ]*$/;
          break;
        case 'email':
          re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          break;
        case 'strongpassword':
          re = /^(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*$/;
          break;
        case 'ip':
          re = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
          break;
        default:
          throw new Error('Invalid argument exception');
      }
    }

    return re.test(str);
  };

})(window.s = window.s || {});

//# sourceMappingURL=s.js.map
