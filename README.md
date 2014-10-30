s.js
======


Why should you use this lib?
You probably shouldn’t! as there is much better and mature libraries out-there this is just personal collection of methods used over time, and helpers for pure js programming without any other libraries.

As that is said if you find any method inside useful please fell free to use it. 
All methods are under unit test so usage should be relatively secure. If you find any bug please provide info about it, or even better a solution :)



String Modification
-----

### replaceAll
Replace all occurrences in a string with a new value. 

```javascript
   s.replaceAll("this is old value in old string", "old", "new");
    //>> this is new value in new string 
```

### format
 String Concatenation variation based on C# string concatanation    

```javascript
   s.format("Hi {0}, your rank is {1}.", "Foo", 100);
    //>> Hi Foo, your rank is 100
    s.format("one {0} two {1} one {0}", 1, 2);
    //>> one 1 two 2 one 1
```



Array and Object Modification
-----

###each
Loop over arrays. 
Use return false in callback function to break from loop. 

```javascript
   
    var testArr = [1, 2, 3, 4, 5];
    s.each(testArr, function(val, i) {
        console.log(val);
    });
    //>> 1 2 3 4 5

    //break from foreach loop
    s.each(testArr, function (val, i) {
        console.log(val);
        if (val === 2) 
            return false; //break the each loop
	
    });
    //>> 1 2

```

### iterate
Iterate specific number of times. Iteration starts from 0. 
Use return false in callback function to stop iterating. 

```javascript
    s.iterate(4, function(i) {
        console.log(i);
    });
    //>> 0 1 2 3

    s.iterate(10, function (i) {
        console.log(i);
        if (i === 2) return false;
    });
    //>>0 1 2
```

### remove
Remove all occurrences of element from array.

```javascript
    var withoutC = s.remove(['a', 'b', 'c', 'd', 'c'], 'c');
    console.log(withoutC);
    //>>a b d
```

Remove accepts optional third parametar that tels what is the maximim number of occurences to remove. 
If number is negative it will remove that many occurrences but starting from end of array.

```javascript
    //remove first c from the array
    var withoutC = s.remove(['a', 'b', 'c', 'd', 'c'], 'c', 1);
    console.log(withoutC);
    //>>a b d c

    //remove last c from the array
    var withoutC = s.remove(['a', 'b', 'c', 'd', 'c'], 'c', -1);
    console.log(withoutC);
    //>>a b c d

    //remove last 2 c from the array
    var withoutC = s.remove(['c','a', 'b', 'c', 'd', 'c'], 'c', -2);
    console.log(withoutC);
    //>>c a b d
```


### shuffle
Shuffle values in the array

```javascript
    var shuffle = s.shuffle(['a', 'b', 'c', 'd', 'c']);
    console.log(shuffle);
    //>> new order cannot be determined
```


### merge
Merge properties of the second object to the first object.
In case of the same property value from second object will override the value in the first object

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
    var merged = s.merge(obj1, obj2);
    console.log(merged);
    /*>> 
        {
            prop1: "obj2 prop1",
            prop2: "obj1 prop2",
            prop3: "obj2 prop3",
            prop4: 1
        } 
    */
```



Tests
-----

### isDefined
Test if variable is initialized

```javascript
    var not,
        arr = [],
        nll = null;
    s.isDefined(not); //>> false
    s.isDefined(arr); //>> true
    s.isDefined(nll); //>> true
```

### hasValue
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

    s.hasValue(tmp); //>> false
    s.hasValue(null); //>> false
    s.hasValue([]); //>> false
    s.hasValue({}); //>> false
    s.hasValue(""); //>> false
    s.hasValue("  "); //>> false

    s.hasValue(0); //>> true
    s.hasValue(false); //>> true
    s.hasValue(true); //>> true
    s.hasValue(","); //>> true

```

### isString
Check if variable type is string

```javascript
    s.isString(""); //>> true
    s.isString(2); //>> false
```

### isNumber
Check if variable type is isNumber

```javascript
    s.isNumber(2); //>> true
    s.isNumber(""); //>> false
```

### isBoolean
Check if variable type is Boolean

```javascript
    s.isBoolean(false); //>> true
    s.isBoolean(2); //>> false
```

### isObject
Check if variable type is Object. 
Array is also considered as object in JS. 
type of NULL is object in JS but isObject returns false for null.

```javascript
    s.isObject({}); //>> true
    s.isObject([]); //>> true
    s.isObject(null); //>> false
    s.isObject(false); //>> false
```   

### isArray
Check if variable is Array.

```javascript
    s.isArray([]); //>> true
    s.isArray({}); //>> false
    s.isArray(null); //>> false
```  

### is
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



Utilities
-----
