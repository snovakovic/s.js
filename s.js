
/*****************************************************
 			  String Module part.
 ***************************************************/
(function (_s, undefined) {

	/**
 	 * format string ("Hi {0}, you are {1}!", "Foo", 100) --> Hi Foo you are 100        
 	 * @return {[string]} [formated string]
 	 * @example console.log(S.format("Hi {0}, you are {1}!", "Foo", 100))
 	 */
	_s.format = function () {
		var s = arguments[0],
			 length = arguments.length - 1;
		for (var i = 0; i < length; i++) {
			s = s.replace("{" + i + "}", arguments[i + 1]);
		}
		return s;
	};

})(window.s = window.s || {});



/*****************************************************
	  Arrays and object modification Module part
 ***************************************************/
(function (_s, undefined) {

	/*
	* for each loop for the arrays
	* var testArray = ["a","b","c"];
	* s.each(testArray, function(val, i){
	*     console.log(val);
	*  });
	*/
	_s.each = function (arr, callback) {
		var length = arr.length;

		for (var i = 0; i < length; i++) {
			if (callback(arr[i], i) === false) {
				break;
			}
		}
	};

	/**
	 * Iterate specific number of times
	 * @param  {Integer}   n  number of times to iterate
	 * @param  {Function} callback function that we will call
	 *  s.iterate(10, function(i){
	 *     console.log(i);
	 *  });
	 */
	_s.iterate = function (length, callback) {
		for (var i = 0 ; i < length; i++) {
			if (callback(i) === false) {
				break;
			}
		}
	};

	/**
	 * Merge object 1 with same properties from obj2. 
	 * Add properties from obj2 to obj1. Override properties from obj1 with same properties from obj2
	 * @param  {Object} obj1 object in which we want to change properties
	 * @param  {Object} obj2 properties that we will take
	*/
	_s.merge = function (obj1, obj2) {
		if (!_s.hasValue(obj2)) {
			return obj1;
		} else if (!_s.hasValue(obj1)) {
			return obj2;
		}

		for (var key in obj2) {
			if (obj2.hasOwnProperty(key)) {
				obj1[key] = obj2[key];
			}
		}

		return obj1;
	};

	//Remove easily an known element from an array
	//var arr = ['a', 'b', 'c', 'd'];
	//_s.remove(arr, 'c');
	_s.removeByValue = function(arr, elToRemove) {
		var pos = arr.indexOf(elToRemove);
		pos > -1 && arr.splice(pos, 1);
	};

	// Remove element from array by index
	// var arr = ['a', 'b', 'c', 'd'];
	// _s.removeByIndex(2); //c is removed from array
	_s.removeByIndex = function(arr, index) {
		arr.splice(index, 1);
	};

	//shuffle values in the array
	_s.shuffle = function (arr) {
		for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
			return arr;
	}


})(window.s = window.s || {});



/*****************************************************
	  Test Module part
 ***************************************************/
(function (_s, undefined) {

	_s.isDefined = function (testVar) {
		return typeof testVar !== 'undefined';
	};

	/**
	* Test to see if variable has been defined and if it has associated value.
	* @param  {var} testVar any var that we want to check
	* @return {boolean} true - value is defined and have value, false - value is eater undefined or null ({} and [] return false)
	*/
	_s.hasValue = function (testVar) {
		//TODO add check for empty testVarect and empty array
		if (typeof testVar === 'undefined' || testVar === null || testVar === "") return false;

		var type = typeof testVar;

		if (type === "object") {
			// Assume if it has a length property with a non-zero value
			// that that property is correct.
			if (testVar.length > 0) return true;
			if (testVar.length === 0) return false;

			if (testVar === "") return false

			for (var key in testVar) {
				if (hasOwnProperty.call(testVar, key)) return true;
			}

			return false;

		}

		return true;

	};

	_s.isString = function (testVar) {
		return typeof testVar === 'string';
	};

	_s.isNumber = function (testVar) {
		return typeof testVar === 'number';
	};

	_s.isBoolean = function (testVar) {
		return typeof testVar === 'boolean';
	};

	///REGEX

	//check if this is email
	_s.isEmail = function (email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	_s.isAlphaNumeric = function (string) {
		var re = /^[a-zA-Z0-9 ]*$/;
		return re.test(email);
	};

	_s.isAlphabetic = function (string) {
		var re = /^[a-zA-Z]*$/;
		return re.test(string);
	};

	_s.isLowerCaseOnly = function (string) {
		var re = /^[a-z]*$/;
		return re.test(string);
	};

	_s.isUpperCaseOnly = function (string) {
		var re = /^[A-Z]*$/;
		return re.test(string);
	};

	_s.isDigitOnly = function (string) {
		var re = /^[0-9]*$/;
		return re.test(string);
	};

	//Test for a strong password with this regex. 
	//The password must contain one lowercase letter, one uppercase letter, one number, and be at least 6 characters long.
	_s.isStrongPassword = function (string) {
		var re = /^(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*$/;
		return re.test(string);
	};

})(window.s = window.s || {});


/*****************************************************
   New feature support for older browsers
 ***************************************************/
(function (_s, undefined) {
	// Add JavaScript-1.6 array features if not supported natively
	if (![].indexOf) {
		Array.prototype.indexOf = function (find) {
			for (var i = 0; i < this.length; i++)
				if (this[i] == find)
					return i;
			return -1;
		};
	}
	if (![].map) {
		Array.prototype.map = function (fn) {
			var out = [];
			for (var i = 0; i < this.length; i++)
				out.push(fn(this[i]));
			return out;
		};
	}
	if (![].filter) {
		Array.prototype.filter = function (fn) {
			var out = [];
			for (var i = 0; i < this.length; i++)
				if (fn(this[i]))
					out.push(this[i]);
			return out;
		};
	}

})(window.s = window.s || {});



