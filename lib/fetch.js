var native_fetch = typeof(fetch) !== "undefined" && fetch;

module.exports = native_fetch || function(url, params) {
  var thens   = [];
  var catches = [];
  var options = params || {};
  var xhr     = new XMLHttpRequest();
  var method  = options.method || "GET";

  xhr.open(method, url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 0) { // failed
        pipe_through(catches, xhr.statusText);
      } else {
        pipe_through(thens, xhr);
      }
    }
  };
  xhr.send();

  function pipe_through(list, value) {
    for (var i=0,result=value; i<list.length; i++) {
      result = list[i](result);
    }
  }

  return {
    then: function(callback) {
      thens.push(callback);
      return this;
    },
    catch: function(callback) {
      catches.push(callback);
      return this;
    }
  };
};
