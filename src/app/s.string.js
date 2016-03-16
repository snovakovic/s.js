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
   * @example capitalize('foo Bar', 'oo'); => 'Foo Bar'; capitalize('FOO Bar', true); => 'Foo bar'
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
   * @example: chop("whitespace", 3); => ['whi', 'tes', 'pac', 'e']
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
  * @example clean(' foo    bar   '); => 'foo bar'
  */
  s.clean = function (str) {
    return str.trim().replace(/\s\s+/g, ' ');
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
