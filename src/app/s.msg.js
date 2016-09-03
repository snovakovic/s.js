/*****************************
 * sMsg - broadcast messages
 * example s.broadcast('something-happened', objToSend)
 * s.listen('something-happened', function(val) {
 *  console.log(val);
 * });
 ****************************/
(function(s) {
  var subscribers = [];

  s.broadcast = function(to, obj) {
    for (var i = 0; i < subscribers[to].length; i++) {
      subscribers[to][i](obj);
    }
  };

  s.listen = function(subscribe, cb) {
    subscribers[subscribe] = subscribers[subscribe] ? subscribers[subscribe] : [];
    subscribers[subscribe].push(cb);
  };

})(window.snovakovic);
