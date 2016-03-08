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

})(window.s = window.s || {});
