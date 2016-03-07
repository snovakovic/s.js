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

  /**
   * String concatenation variation based on .net   
   * Don't use in high intensive loops as it is much slower than normal string concatenation         
   * @return {[string]} formatted  string
   * @example console.log(s.format("Hi {0}, your rank is {1}.", "Foo", 100))
   */
  s.format = function () {
    var str = arguments[0],
      length = arguments.length - 1;
    for (var i = 0; i < length; i++) {
      str = s.replaceAll(str, '{' + i + '}', arguments[i + 1]);
    }
    return str;
  };

})(window.s = window.s || {});
