/*****************************************************
	  Array Modification
 ***************************************************/

(function (s, undefined) {

    /**
      * Loop over object properties. 
      * @param arr {Object} object which properties will be looped over
      * @example s.getProperties({prop1:'val1', prop2:'val2'}, function(key, value){console.log(key + ' >> ' + value);});
      */
    s.getProperties = function (obj, callback) {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                if (callback(prop, obj[prop]) === false)
                    break;
            }
        }
    }

    /**
	 * Merge properties of the second object to the first object.
	 * In case of the same property value from second object will override the value in the first object
	 * @param  {Object} obj1 properties will be merged in this object
	 * @param  {Object} obj2 object from where we will merge properties
	 * @example s.merge({prop1:1,prop2:2}, {prop1:0,prop3:3});
	*/
    s.merge = function (obj1, obj2) {
        for (var key in obj2) {
            if (obj2.hasOwnProperty(key))
                obj1[key] = obj2[key];
        }
        return obj1;
    };



})(window.s = window.s || {});




