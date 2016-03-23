s.js
======

In a nutshell mishmash of js methods.

Utilities
------

#### random
Get random number between 2 provided numbers or random element from array if array is provided as argument.

```javascript
s.random(1,10); //=> random number between 1 and 10 (1 and 10 are also included)
s.random(['a', 'b', 'c']); //=> random return one element from array ('a' or 'b' or 'c')
```

#### getUrlParam
Get the value from url parameter.

```javascript
//example url: http://index.html?firstName=John&LastName=Doe
s.getUrlParam("firstName"); //=> John
s.getUrlParam("lastName"); //=> Doe
s.getUrlParam("something"); //=> null
```

#### once
returns function that can be executed only once

```javascript
var init = s.once(function() { /*function implementations*/ });
init();  //=> function will be executed
init(); //=>  function won't be executed
```

#### debounce
Returns a function, that as long as it continues to be invoked, will not be triggered 

```javascript
var wait = 5;
var debounce = s.debounce(function() { /*function implementations*/ }, wait);
debounce();  //=> function will be executed
debounce(); //=>  function won't be executed
debounce(); //=>  function won't be executed
setTimeout(function() {
  debounce(); //=> function will be executed
  debounce(); //=>  function won't be executed
}, 10);
```

#### execute
execute function when condition becomes true.

```javascript
var condition = false;
s.execute(function() {
  console.log('this will be executed after 300ms when condition becomes true.')
}).when(function() {
  return condition;
});

setTimeout(function() {
  condition = true;
}, 300);
```

default timeout for checking condition is set to 5ms.
This can be configured to different time by passing argument after condition callback in when function. We can also limit max number of tries that can be preformed before we stop checking for condition to become true.

```javascript
//condition is now checked every 100ms except default 5ms
s.execute(function() {}).when(function() {
  return $('.something').length;
}, 100);

//this will limit to max of 10 tries.
//We can then calculate that $('.something').length has 900ms to become true before we stop checking for it.
//first check is performed immediately so calculation is ((limit -1 ) * timeout)
s.execute(function() {}).when(function() {
  return $('.something').length;
}, 100)
.limit(10);
```



String Helpers
-----

#### replaceAll
Replace all occurrences of a string with a new value.

```javascript
s.replaceAll(originalString, currentValue, newValue);
s.replaceAll("this is old value in old string", "old", "new"); //=> this is new value in new string
```

#### capitalize
Converts first letter of the string to uppercase.
If true is passed as second argument the rest of the string will be converted to lower case.

```javascript
s.capitalize('mAte'); //=> MAte
s.capitalize('mAte', true); //=> Mate
s.capitalize('MAte', true); //=> Mate
```

#### contains
test if string contains substring.
By default it's case sensitive which can be turned of by providing last optional parameter.

```javascript
s.contains(string, substringToCheck, ignoreCase);
s.contains('abc Da', 'da'); //=> false
s.contains('abc Da', 'da', true); //=> true
s.contains('abc Da', 'Da'); //=> true
s.contains('abc Da', 'bc'); //=> true
```

#### chop
Break string in array of substring

```javascript
s.chop('whitespace', 3); //=> ['whi', 'tes', 'pac', 'e']
```

#### clean
Trim and replace multiple spaces with a single space.

```javascript
s.clean('abc')); //=> 'abc';
s.clean('abc ')); //=> 'abc';
s.clean('  ab   c  ')); //=> 'ab c';
```

#### truncate
Truncate string if it exceed max number of characters.
By default if string is truncated at the end of string will be appended "..."
This can be changed to anything by providing last optional argument

```javascript
s.truncate = function(str, length, truncateStrAppender);
s.truncate('stefan.novakovich@gmail.com', 100); //=> 'stefan.novakovich@gmail.com'
s.truncate('stefan.novakovich@gmail.com', 10); //=> 'stefan.nov...'
s.truncate('stefan.novakovich@gmail.com', 10, ' ...more'); //=> 'stefan.nov ...more'
```


Array Helpers
-----

#### each
Loop over array elements.
Use return false in callback function to break from loop.

```javascript
var testArr = ['a', 'b','c', 'd', 'e'];
s.each(testArr, function(val, i) {
  console.log(val);
  console.log(i);
}); 
//=> a b c d e
//=> 0 1 2 3 4

//break from each loop
s.each(testArr, function (val, i) {
  console.log(val);
  if (val === 'b') {
    return false; //break the each loop
  }
});
//=>> a b
```
We can also use each on DOM elements

```javascript
var p = document.querySelectorAll('p');

//native forEach will throw exception when looping DOM elements
p.forEach(function(el,i) {
    el.innerHTML = "new string value";
});

//And this is working as expected
s.each(p, function(el, i) {
    el.innerHTML = "new string value";
});
```

#### iterate
Iterate specific number of times. Iteration starts from 0.
Use return false in callback function to stop iterating.

```javascript
s.iterate(4, function(i) {
  console.log(i);
}); //=> 0 1 2 3

s.iterate(10, function (i) {
  console.log(i);
  if (i === 2) { return false; }
}); //=> 0 1 2
```

#### remove
Remove all occurrences of element from array.

```javascript
s.remove(['a', 'b', 'c', 'd', 'c'], 'c'); //=> ['a', 'b', 'd']
```

Remove accepts optional third parameter that limit maximum number of occurrences to remove.
If number is negative it will remove that many occurrences starting from end of array.

```javascript
//remove first c from the array
s.remove(['a', 'b', 'c', 'd', 'c'], 'c', 1); //=> ['a', 'b', 'd', 'c']
//remove last c from the array
s.remove(['a', 'b', 'c', 'd', 'c'], 'c', -1); //=> ['a', 'b', 'c', 'd']
//remove last 2 c from the array
s.remove(['c','a', 'b', 'c', 'd', 'c'], 'c', -2); //=> ['c', 'a', 'b', 'd']
```

#### shuffle
Shuffle values in the array

```javascript
s.shuffle(['a', 'b', 'c', 'd', 'c']);
```

#### getFilledArray
Returns array filled with default values

```javascript
s.getFilledArray(defaultValue, arrayLength);
s.getFilledArray(0, 4); //=> [0,0,0,0]
s.getFilledArray('a', 3); //=> ['a','a','a']
```

#### unique
Returns new array that contain only unique values from from original array.

```javascript
s.unique([1,1,2,3,2,1,3]); //=> [1,2,3]
s.unique(["a", "b", "a"]); //=> ["a","b"]
```


Object Helpers
-----

#### getProperties
Loop over object properties.
Looping can be terminated by using return false in callback function.

```javascript
    var obj = {
        prop1: 'val1',
        prop2: 'val2'
    };
    s.getProperties(obj, function(key, value) {
        console.log(key + ' => ' + value);
    });
    //prop1 => val1
    //prop2 => val2

    s.getProperties(obj, function(key, value) {
        console.log(key + ' => ' + value);
        if(key === 'prop1')
            return false;
    });
    //prop1 => val1

```

#### merge
Shallow merge provided objects.
In case of the same property value from second object will override the values in the first object.
Method accepts arbitrary number of object that will be merged together.

```javascript
    var obj1 = {
        prop1: "obj1 prop1",
        prop2: "obj1 prop2",
        prop3: [1,2,3,4],
    };

    var obj2 = {
        prop1: "obj2 prop1",
        prop3: "obj2 prop3",
        prop4: 1,
    };

    var obj3 = {
        prop3: "obj3 prop3",
        prop5: 3,
    };

    var merged = s.merge(obj1, obj2, obj3);
    console.log(merged);
    /*>>
        {
            prop1: "obj2 prop1",
            prop2: "obj1 prop2",
            prop3: "obj3 prop3",
            prop4: 1,
            prop5:3
        }
    */
```


#### deepMerge
Deep merge provided objects.
Objects inside array won't be taken into consideration for deep merging.
In case of the same property value from second object will override the values in the first object.
Method accepts arbitrary number of object that will be merged together.

```javascript
    var obj1 = {
        prop1: "obj1 prop1",
        prop2: {
            a: "a1",
            b: "b1",
            c: {
                d:"d1",
                e: "e1",
            },
            f: {
                g: "g1",
            }
        },
        prop3: [{
            a: "a1",
            b: "b1"
        }],
    };

    var obj2 = {
        prop2: {
            a: "a2",
            c: {
                d: "d2",
            },
            f: "f2",
        },
        prop3: [{a:"a2"}],
    };


    var merged = s.merge(obj1, obj2);
    console.log(merged);
    /*>>
     {
        prop1: "obj1 prop1",
        prop2: {
            a: "a2",
            b: "b1",
            c: {
                d:"d2",
                e: "e1",
                },
            f: "f2"
        },
        prop3: [{a:"a2"}],
     }
    */
```


Tests
-----

#### isDefined
Test if variable is initialized

```javascript
    var not,
        arr = [],
        nll = null;
    s.isDefined(not); //=> false
    s.isDefined(arr); //=> true
    s.isDefined(nll); //=> true
```

#### hasValue
Test if variable has been defined and is not empty.

    Things that are treated as if they don't have value:
        1) null
        2) not initialized variable
        3) empty array
        4) empty object
        5) empty string
        6) string with only spaces in

```javascript
    var tmp;

    s.hasValue(tmp); //=> false
    s.hasValue(null); //=> false
    s.hasValue([]); //=> false
    s.hasValue({}); //=> false
    s.hasValue(""); //=> false
    s.hasValue("  "); //=> false

    s.hasValue(0); //=> true
    s.hasValue(false); //=> true
    s.hasValue(true); //=> true
    s.hasValue(","); //=> true

```

#### isString
Check if variable type is string

```javascript
    s.isString(""); //=> true
    s.isString(2); //=> false
```

#### isNumber
Check if variable type is isNumber

```javascript
    s.isNumber(2); //=> true
    s.isNumber(""); //=> false
```

#### isBoolean
Check if variable type is Boolean

```javascript
    s.isBoolean(false); //=> true
    s.isBoolean(2); //=> false
```

### isObject
Check if variable type is Object.
Array is also considered as object in JS.
type of NULL is object in JS but isObject returns false for null.

```javascript
    s.isObject({}); //=> true
    s.isObject([]); //=> true
    s.isObject(null); //=> false
    s.isObject(false); //=> false
```   

#### isArray
Check if variable is Array.

```javascript
    s.isArray([]); //=> true
    s.isArray({}); //=> false
    s.isArray(null); //=> false
```  

#### is
Test string using any regular expresion or by using any of defined keywords.

Example of testing the string by using regular expresion:

```javascript
    //test if string contains only alphabetical characters spaces are ignored
    s.is("te st", /^[a-zA-Z ]*$/); //>>true
    s.is("te st2", /^[a-zA-Z ]*$/); //>>false

    //test if the string is valid eMail
    s.is("stefan.novakovich@gmail.com", /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); // >> true
    s.is("not.email", /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); // >> false

```

the same thing from above could be achived by using already defined keywords alphabetic and email.

```javascript
    //test if string contains only alphabetical characters spaces are ignored
    s.is("te st", 'alphabetic'); //>>true
    s.is("te st2", 'alphabetic'); //>>false

    //test if the string is valid eMail
    s.is("stefan.novakovich@gmail.com", 'email');// >> true
    s.is("not.email", 'email'); // >> false
```

Available keywords:

    - alphabetic : string contains only alphabetic characters (spaces are alowed, empty string is valid)
    - numeric : string contains only numeric characters (spaces are alowed, empty string is valid)
    - alphanumeric : string contains only alphanumeric characters (spaces are alowed, empty string is valid)
    - lowercase : string contains only lowercase characters (spaces are alowed, empty string is valid)
    - uppercase : string contains only uppercase characters (spaces are alowed, empty string is valid)
    - email : check if string is valid email address
    - strongPassword : check if string is strong password
                       To be strong password string must conatain at least:
                        - one lowercase latter,
                       - one uppercase letter
                        - one number
                        - 6 characters
    -ip: check if string is valid ip address

Keyword is case in-sensitive.
