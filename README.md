s.js (v1.1.0)
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
Get a value from url parameter.

```javascript
//example url: http://index.html?firstName=John&LastName=Doe
s.getUrlParam("firstName"); //=> John
s.getUrlParam("lastName"); //=> Doe
s.getUrlParam("something"); //=> null
```

#### once
returns a function that can be executed only once.

```javascript
var init = s.once(function() { /*function implementations*/ });
init();  //=> function will be executed
init(); //=>  function won't be executed
```

#### debounce
Returns a function, that as long as it continues to be invoked, will not be triggered.

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
Execute a function when condition becomes true.

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

Default timeout for checking condition is set to 5ms.
This can be configured to different time by passing argument after condition callback in when function. We can also limit max number of tries that can be preformed before we stop checking for condition to become true.

```javascript
//condition is now checked every 100ms instead of default 5ms
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


Messaging
-----
Subscribe based messaging.
ex sMsg https://github.com/snovakovic/sMsg

```javascript
//subscribe to message/event
s.listen('message-name', function(optionalParam) {
  /*subscriber implementation*/
});
//we can have as many subscribers for single message as we like.
s.listen('message-name', function() {});

//this will trigger execution of all subscribers to this message
s.broadcast('message-name', {additionalInfo: 'info'});
//we can trigger it as many time as we like
s.broadcast('message-name', {additionalInfo: 'info'});
```

```javascript
s.listen('new-contact-saved', function(contact) {
  /*This can be in different file than ajax request to save contact*/
});

var contact = { name: "John", email: "john@doe.com" };
$.post( "save-contact-url", )
  .then(function(response) {
    //this will execute all new-contact-saved subscribers
    s.broadcast('new-contact-saved', contact);
  });
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
Converts first letter of a string to uppercase.
If true is passed as second argument the rest of the string will be converted to lower case.

```javascript
s.capitalize('mAte'); //=> MAte
s.capitalize('mAte', true); //=> Mate
s.capitalize('MAte', true); //=> Mate
```

#### contains
Test if string contains provided substring.
By default it's case-sensitive which can be turned of by providing last optional parameter.

```javascript
s.contains(string, substringToCheck, ignoreCase);
s.contains('abc Da', 'da'); //=> false
s.contains('abc Da', 'da', true); //=> true
s.contains('abc Da', 'Da'); //=> true
s.contains('abc Da', 'bc'); //=> true
```

#### chop
Breaks a string in array of substring

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
Loop over the array.
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
Remove all occurrences of element from the array.

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
Shuffle values in the array.

```javascript
s.shuffle(['a', 'b', 'c', 'd', 'c']);
```

#### getFilledArray
Returns array filled with the default values

```javascript
s.getFilledArray(defaultValue, arrayLength);
s.getFilledArray(0, 4); //=> [0,0,0,0]
s.getFilledArray('a', 3); //=> ['a','a','a']
```

#### unique
Returns new array that contain only unique values from the original array.

```javascript
s.unique([1,1,2,3,2,1,3]); //=> [1,2,3]
s.unique(["a", "b", "a"]); //=> ["a","b"]
```

#### first
Returns first element of array that match the condition in callback function or undefined if there is no match.
if no condition is passed it returns first element of array.

```javascript
s.first([1,1,2,3,2,1,3]); //=> 1
s.first([1,1,2,3,2,1,3], function(e) {
  return e === 2;
}); //=> 2
s.first([{name:'test'}], function(e) {
  return e.name = 'test';
}); //=> {name:'test'}
```

#### last
Returns last element of array that match the condition in callback function or undefined if there is no match.
if no condition is passed it returns last element of array.

```javascript
s.last([1,1,2,3,2,1,3]); //=> 3
s.last([1,1,2,3,2,1,3], function(e) {
  return e === 2;
}); //=> 2
s.last([{name:'test'}], function(e) {
  return e.name = 'test';
}); //=> {name:'test'}
```

#### stack
Stack implementation. FIFO: first in first out.
Stack is instantiated by calling s.stack().
We can instantiate stack by passing optional start array s.stack([1,2,3]).

Stack Operations:
  * .add() - add new item to stack
  * .remove() - remove item from stack. Removed items is returned or in case of empty stack null is returned.
  * .peek() - peek next value in stack without modifying stack
  * .length() - get size of stack
  * .array - get raw stack array


```javascript
var stack = s.stack(); //instantiate new stack
stack.add(2); //add new value in stack.
stack.add(3);
stack.length(); //get length of stack. => 2
stack.array; //get raw stack array => [2,3]
stack.peek(); //=> 3 peek next value in stack without removing it
var val = stack.remove(); //remove last added value from stack
console.log(val); //=> 3
stack.length(); //=> 1
stack.array; //=> [2]

//if there is no value in stack .remove() will return null instead of removed value
var stack2 = s.stack();
console.log(stack2.remove()) //=> null
stack2.array //=> []

//stack can be instantiated with default array
var stack3 = s.stack([1,2,3]);
stack3.add(4);
stack3.array; //=> [1,2,3,4]
stack3.remove(); //=> 4
stack3.remove(); //=> 3
stack3.array; //=> [1,2]
```

#### queue
Queue implementation. LIFO: last in first out.

Queue is instantiated by calling s.queue().
We can instantiate queue by passing optional start array s.queue([1,2,3]).

Queue Operations:
  * .add() - add new item to queue
  * .remove() - remove item from queue. Removed items is returned or in case of empty queue null is returned.
  * .peek() - peek next value in queue without modifying queue
  * .length() - get size of queue
  * .array - get raw queue array

```javascript
var queue = s.queue(); //instantiate new queue
queue.add(2); //add new value in queue.
queue.add(3);
queue.length(); //get length of queue. => 2
queue.array; //get raw queue array => [2,3]
stack.peek(); //=> 2 peek next value in stack without removing it
var val = queue.remove(); //remove last added value from queue
console.log(val); //=> 2
queue.length(); //=> 1
queue.array; //=> [3]

//if there is no value in queue .remove() will return null instead of removed value
var queue2 = s.queue();
console.log(queue2.remove()) //=> null
queue2.array //=> []

//queue can be instantiated with default array
var queue3 = s.queue([1,2,3]);
queue3.add(4);
queue3.array; //=> [1,2,3,4]
queue3.remove(); //=> 1
queue3.remove(); //=> 2
queue3.array; //=> [3,4]
```


Is
-----
true if not false.

#### is.defined

```javascript
s.is.defined(nonExistingVar); //=> false
s.is.defined([]); //=> true
s.is.defined(null); //=> true
s.is.defined(0); //=> true
```

#### is.empty
Test if variable has been defined and is not empty.

```javascript
s.is.empty(nonExistingVar); //=> true
s.is.empty(null); //=> true
s.is.empty([]); //=> true
s.is.empty({}); //=> true
s.is.empty(""); //=> true
s.is.empty("  "); //=> true

s.is.empty(0); //=> false
s.is.empty(false); //=> false
s.is.empty(true); //=> false
s.is.empty(","); //=> false

```

#### is.string

```javascript
s.is.string(""); //=> true
s.is.string(2); //=> false
```

#### is.number

```javascript
s.is.number(2); //=> true
s.is.number(""); //=> false
```

#### is.boolean

```javascript
s.is.boolean(false); //=> true
s.is.boolean(2); //=> false
```

#### is.object

```javascript
s.is.object({}); //=> true
s.is.object([]); //=> false
s.is.object(null); //=> false
s.is.object(function(){}); //=> false
s.is.object(false); //=> false
```
#### is.function

```javascript
s.is.function(function(){}); //=> true
s.is.function([]); //=> false
s.is.function({}); //=> false
s.is.function(false); //=> false
```

#### is.array

```javascript
s.is.array([]); //=> true
s.is.array({}); //=> false
s.is.array(null); //=> false
```

#### is.arrayWithValue

```javascript
s.is.arrayWithValue([1]); //=> true
s.is.arrayWithValue([]); //=> false
s.is.arrayWithValue({}); //=> false
s.is.arrayWithValue(null); //=> false
```
#### Regular Expression tests
Test string against predefined regular expressions.

##### is.alphabetic

```javascript
s.is.alphabetic('abCd'); //=> true
s.is.alphabetic('Ab1'); //=> false
s.is.alphabetic('@a/'); //=> false
```

##### is.alphanumeric

```javascript
s.is.alphanumeric('abCd'); //=> true
s.is.alphanumeric('Ab1'); //=> true
s.is.alphanumeric('@a/'); //=> false
```
##### is.numeric

```javascript
s.is.numeric('103'); //=> true
s.is.numeric('-103'); //=> false
s.is.numeric('103.1'); //=> false
s.is.numeric('103a'); //=> false
```

##### is.lowercase

```javascript
s.is.lowercase('a'); //=> true
s.is.lowercase('abcd'); //=> true
s.is.lowercase('abD'); //=> false
s.is.lowercase('a@'); //=> false
```

##### is.uppercase

```javascript
s.is.lowercase('A'); //=> true
s.is.lowercase('ABC'); //=> true
s.is.lowercase('abD'); //=> false
s.is.lowercase('A@'); //=> false
```

##### is.email
```javascript
s.is.email('stefan.novakovich@gmail.com'); //=> true
s.is.email('s@b.com'); //=> true
s.is.email('stefan@st@mail.com'); //=> false
s.is.email('fake'); //=> false
```

##### is.strongpassword
check if string is strong password.
To be strong password string must contain at least one lowercase latter,
one uppercase letter, one number and min 6 characters
```javascript
s.is.strongpassword('Stefan1'); //=> true
s.is.strongpassword('password'); //=> false
s.is.strongpassword('S1t'); //=> false
```

##### is.ip
returns truy only for IPv6 addresses. it will return false for IPv6 addresses
```javascript
s.is.ip('31.45.238.138'); //=> true
s.is.ip('1.45.238.1234'); //=> false
```

ResizeWatch
-----
ex: https://github.com/snovakovic/sResizeWatch
Do you need to execute JavaScript function when screen size change to match CSS inside media query?
Did you notice that $(window).width() < 768 does not match media query 768 inside your css code.

Meet small s.resizeWatch library to make your life easier and your code cleaner.

```javascript
s.resizeWatch.on('mobile', function() {
  console.log("function that will be executed if current screen size is mobile and every time screen sizes switch to mobile screen size");
});

s.resizeWatch.queueOn('mobile', function() {
  console.log("function that will be executed every time screen size switch to mobile screen size");
});

s.resizeWatch.off('mobile', function() {
  console.log("function that will be executed if current screen size is not mobile and every time screen size switch from mobile to some other screen size");
});

s.resizeWatch.queueOff('mobile', function() {
  console.log("function that will be executed every time screen size switch from mobile to some other screen size");
});

s.resizeWatch.once('desktop', function() {
  console.log("This function will execute only once if current screen size is desktop or first time it change to desktop screen size.");
});


s.resizeWatch.is('desktop') //=> true if current screen size is desktop.
```

You may ask what is 'mobile' inside s.resizeWatch.on ?

It's just friendly defined name for screen size.

Here is the list of default screen sizes(based on bootstrap breakpoints):
```javascript
//default screen sizes
screenSizes = [
  {
    minWidth: 992,
    name: 'desktop'
  },
  {
    minWidth: 768,
    maxWidth: 991,
    name: 'tablet'
  },
  {
    maxWidth: 767,
    name: 'mobile'
  }
];
});
```

Jep this is great but what if I need some other screen size?

Where is the fuss just add it.

```javascript
//add new screen size
s.resizeWatch.addSize({
  maxWidth: 1088,
  name: 'services-break-point'
});

```

But what if default screen sizes is not your coup of tea?
OK, OK I hear you no need to yell, just override default screen sizes with you precious screen sizes and leave me alone.

```javascript
//change screen sizes completely
s.resizeWatch.setNewScreenSizes([{
  maxWidth: 1088,
  name: 'services-break-point'
},
{
  maxWidth: 700,
  minWidth: 450,
  name: 'custom-size'
}]);

s.resizeWatch.on('custom-size', function(){
  console.log('thats what I talking about!');
});
```

Want to execute function after browser stops resizing?

```javascript
window.addEventListener('resize', function () {
  console.log('This function will execute many times while browser is resizing.');
}, true);

s.resizeWatch.onResizeEnd( function(){
  console.log('This function will execute after browser stops resizing.');
  //delay of 50ms is used to detect resize end. on slow resize it can execute more than once.
});

//or you want cleaner way for writing resize listeners.
s.resizeWatch.onResize( function() {
  console.log('this will be called contentiously while window is resized. onResizeEnd is more suitable for recourse intensive operations. ');
});
```


Object Helpers
-----
!!! Object helpers may be depreciated in near future.

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
//=> prop1 => val1
//=> prop2 => val2

s.getProperties(obj, function(key, value) {
  console.log(key + ' => ' + value);
  if(key === 'prop1') { return false; }
});
//=> prop1 => val1

```

#### merge
Shallow merge provided objects.
In case of the same property value from second object will override the values in the first object.
Method accepts arbitrary number of object that will be merged together.

```javascript
var obj1 = {
  prop1: 'obj1 prop1',
  prop2: 'obj1 prop2',
  prop3: [1,2,3,4],
};

var obj2 = {
  prop1: 'obj2 prop1',
  prop3: 'obj2 prop3',
  prop4: 1,
};

var obj3 = {
  prop3: 'obj3 prop3',
  prop5: 3,
};

var merged = s.merge(obj1, obj2, obj3);
console.log(merged);
/*=>
{
  prop1: 'obj2 prop1',
  prop2: 'obj1 prop2',
  prop3: 'obj3 prop3',
  prop4: 1,
  prop5:3
}
*/
```

#### deepMerge
Deep merge provided objects.

```javascript
var merged = s.deepMerge(obj1, obj2);
```
