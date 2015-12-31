var test = require("tape");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var nock = require("nock");
var fetch = require("../lib/fetch.js");

global.XMLHttpRequest = XMLHttpRequest;

test("fetch", function(t) {


  t.test("happy days", function(t) {
    t.plan(1);

    nock("http://localhost").get("/test.json")
      .reply(200, '[{"a":1}]', {"Content-Type": "application/json"});

    fetch("/test.json")
      .then(function(response) {
        return JSON.parse(response.responseText);
      })
      .then(function(json) {
        t.deepEqual(json, [{a: 1}]);
      });
  });

});
