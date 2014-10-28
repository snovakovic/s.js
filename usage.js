
/*****************************************************
 			  String Modification.
 ***************************************************/
console.log("replaceAll:");
console.log(s.replaceAll("this is old value in old string", "old", "new"));

console.log("format:");
console.log(s.format("Hi {0}, your rank is {1}.", "Foo", 100));
console.log(s.format("this is {0} test and to repeat {1} {0}"), "format", "first parametar");



/*****************************************************
	 Array and Object Modification
 ***************************************************/
var testArr = [1, 2, 3, 4, 5];


console.log("each:");
s.each(testArr, function(val, i) {
	 console.log(val);
});

console.log("each with break:");
//break from foreach loop
s.each(testArr, function (val, i) {
	console.log(val);
	if (val === 2) 
		return false; //break the each loop
	
});

console.log("iterate:");
s.iterate(10, function(i) {
	 console.log(i);
});

console.log("iterate with break:");
s.iterate(10, function (i) {
	console.log(i);
	if (i === 3) return false;
});

console.log("remove:");
var without3 = s.remove(testArr, 3);
var without2 = s.removeFirst(testArr, 2);
var without1 = s.removeByIndex(testArr, 0);
console.log(without3);
console.log(without2);
console.log(without1);
