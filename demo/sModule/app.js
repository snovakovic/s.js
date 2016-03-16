s.require(['m1','m2'])
.module('combination', function(m1, m2) {
  console.log(m1.hello, 'm1 module should say hello');
  console.log(m2.hello, 'm2 module should say hello');
  
  return {
    hello: m1.hello + ' ' + m2.hello
  }
});

s.require('m1', function(m1) {
  console.log(m1.hello, 'another m1 call');
});

s.require('combination', function(combined) {
  console.log(combined.hello, 'kombinuj'); 
});

