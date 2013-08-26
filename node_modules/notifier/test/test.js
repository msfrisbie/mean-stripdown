
var Notifier = require('../');

exports.testNotifier = function (test) {
  var tplPath = require('path').resolve(__dirname, './templates')
  var options = {
    APN: true,
    email: true,
    actions: ['comment', 'like'],
    tplPath: tplPath,
    key: 'SERVICE_KEY',
    sendgridUser: '',
    parseAppId: 'APP_ID',
    parseApiKey: 'MASTER_KEY'
  };

  test.expect(11);

  test.throws(function () {
    var notifier = new Notifier(options);
  }, 'Please specify the service - postmark or sendgrid');

  options.service = 'postmark'
  var notifier = new Notifier(options);

  var comment = {
    to: 'Tom',
    from: 'Harry'
  };

  var options = {
    to: 'tom@madhums.me',
    subject: 'Harry says Hi to you',
    from: 'harry@madhums.me',
    locals: comment // should be the object containing the objects used in the templates
  };

  test.equal(notifier.config.APN, true, 'APN should be true');
  test.equal(notifier.config.email, true, 'email should be true');
  test.ok(true, notifier.config.tplPath);
  test.equal(notifier.config.actions.length, 2, 'Should have two actions');
  test.equal(notifier.config.key, 'SERVICE_KEY', 'Should contain the service key');
  test.equal(notifier.config.parseAppId, 'APP_ID', 'Should contain the parse api app id');
  test.equal(notifier.config.parseApiKey, 'MASTER_KEY', 'Should contain the master key');

  // change the email config
  notifier.use({ email: false });

  test.equal(notifier.config.email, false, 'email should be false');

  notifier.use({ tplPath: undefined })

  test.throws(function () {
    notifier.send('comment', options)
  }, 'Please specify a path to the template')

  var template = tplPath + '/comment.jade';
  var result = notifier.mail(options, template, function () {}).toString();
  var expectedObj = {
    From: 'harry@madhums.me',
    To: 'tom@madhums.me',
    Subject: 'Harry says Hi to you',
    HtmlBody: '<h2>Hello Tom</h2><p>Harry commented on your post</p><br/><br/><p>-- Notifier Team</p>'
  }.toString();

  test.equal(result, expectedObj, 'Should be the expected object');

  test.done();
}
