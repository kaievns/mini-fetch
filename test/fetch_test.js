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
      })
      .catch(function(e) {
        t.ok(false); // shouldn't be called
      });
  });

  t.test("happy noppy", function(t) {
    t.plan(1);

    nock("http://localhost").get("/test.json")
      .reply(404, '');

    fetch("/test.json")
      .then(function(response) {
        t.equal(response.status, 404);
      })
      .catch(function(e) {
        t.ok(false); // shouldn't be called
      });
  });

  t.test("totally unhappy", function(t) {
    t.plan(1);

    nock("http://localhost").get("/test.json")
      .replyWithError("Oh, no!");

    fetch("/test.json")
      .then(function(response) {
        t.ok(false); // shouldn't be called
      })
      .catch(function(e) {
        t.equal(e.message, "Oh, no!");
      });
  });

});
