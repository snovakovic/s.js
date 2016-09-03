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
