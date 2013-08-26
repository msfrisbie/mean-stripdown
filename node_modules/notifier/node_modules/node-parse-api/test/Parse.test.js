var Parse = require('../index').Parse;

// use environment variables APPLICATION_ID and MASTER_KEY to test against
var application_id = process.env.APPLICATION_ID;
var master_key = process.env.MASTER_KEY;

// require the environment variables, or exit with explanation
if (!application_id || !master_key) {
  console.log('Set the following environment variables for the test Parse app');
  console.log('  export APPLICATION_ID=...');
  console.log('  export MASTER_KEY=...');
  process.exit(1);
}

// global objects to test against
var parse = new Parse(application_id, master_key);
var className = 'NodeParseApiTest';
var object = { foo: Math.floor(Math.random() * 10000) };  // ERROR: if you change the type
var stub;

exports.insert = function (assert) {
  parse.insert(className, object, function (err, response) {
    err && console.log(err);
    assert.ok(response);
    stub = response;
    assert.done();
  });
};

exports.find = function (assert) {
  parse.find(className, stub.objectId, function (err, response) {
    assert.equal(object.foo, response.foo);
    assert.done();
  });
};

exports['find many'] = function (assert) {
  parse.find(className, stub, function (err, response) {
    assert.equal(1, response.results.length);
    assert.equal(stub.objectId, response.results[0].objectId);
    assert.equal(stub.createdAt, response.results[0].createdAt);
    assert.equal(object.foo, response.results[0].foo);
    assert.done();
  });
};

exports.update = function (assert) {
  do {
    var num = Math.floor(Math.random() * 10000);
  } while (num == object.foo);
  object.foo = num;
  
  parse.update(className, stub.objectId, object, function (err, response) {
    err && console.log(err);
    assert.ok(response);
    exports.find(assert);  // retest find on the updated object
  });
};

exports['delete'] = function (assert) {
  parse['delete'](className, stub.objectId, function (err) {
    err && console.log(err);
    assert.ok(!err);
    parse.find(className, stub.objectId, function (err, response) {
      assert.equal(404, err.type);
      assert.done();
    });
  });
};
