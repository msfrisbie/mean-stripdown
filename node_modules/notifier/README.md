[![Build Status](https://travis-ci.org/madhums/node-notifier.png)](https://travis-ci.org/madhums/node-notifier)

## Notifier

A simple node.js module to handle all the application level notifications (apple push notifications, mails and facebook posts)

## Installation

```sh
$ npm install notifier
```

or include it in `package.json`

## Usage

```js
var notifier = new Notifier({
  service: 'postmark' // or 'sendgrid'
  APN: true,
  email: true,
  tplType: 'ejs', // if you want to use ejs as templating system
  actions: ['comment', 'like'],
  tplPath: require('path').resolve(__dirname, './templates'),
  key: 'SERVICE_KEY',
  sendgridUser: 'SENDGRID_USER',
  parseAppId: 'APP_ID',
  parseApiKey: 'MASTER_KEY'
});

var comment = {
  to: 'Tom',
  from: 'Harry'
};

notifier.use({
  parseChannels: ['USER_5093a266180b779762000005']
});

var options = {
  to: 'tom@madhums.me',
  subject: 'Harry says Hi to you',
  from: 'harry@madhums.me',
  locals: comment // should be the object containing the objects used in the templates
};

notifier.send('comment', options, function (err) {
  if (err) return console.log(err);
  console.log('Successfully sent Notifiaction!');
});
```

If you want to use a different templating engine like ejs or something else then just override the `processTemplate` method. And don't forget to use the `tplType` config option

For example

```js
Notifier.prototype.processTemplate = function (tplPath, locals) {
  var ejs = require('ejs')
  locals.filename = tplPath

  var tpl = require('fs').readFileSync(tplPath, 'utf8')

  return ejs.render(tpl, locals)
}
```

## Tests

```sh
$ npm test
```

## License
(The MIT License)

Copyright (c) 2013 Madhusudhan Srinivasa < [madhums8@gmail.com](mailto:madhums8@gmail.com) >

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

