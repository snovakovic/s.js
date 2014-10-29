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

### capitalize
 Capitalize the first letter in the string.    

```javascript
   s.capitalize("hello");
    //>> Hello.
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

### removeFirst
Remove first occurrence of element from array.

```javascript
    var withoutC = s.removeFirst(['a', 'b', 'c', 'd', 'c'], 'c');
    console.log(withoutC);
    //>>a b d c
```

### removeByIndex
Remove value form array by index.

```javascript
    var withoutC = s.removeByIndex(['a', 'b', 'c', 'd', 'c'], 2);
    console.log(withoutC);
    //>>a b d c
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
        prop3: "obj2 prop3"
    };
    var merged = s.merge(obj1, obj2);
    console.log(merged);
    /*>> 
        {
            prop1: "obj2 prop1",
            prop2: "obj1 prop2",
            prop3: "obj2 prop3"
        } 
    */
```


