s.js
======


Why should you use this lib?
You probably shouldn’t! as there is much better and mature libraries out-there this is just personal collection of methods used over time, and helpers for pure js programming without any other libraries.

As that is said if you find any method inside useful please fell free to use it. 
All methods are under unit test so usage should be relatively secure. If you find any bug please provide info about it, or even better a solution :)


String Modification Module Part
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
```

### capitalize
 Capitalize the first letter in the string.    

```javascript
   s.capitalize("hello");
    //>> Hello.
```






