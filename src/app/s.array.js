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
