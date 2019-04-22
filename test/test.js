const Nightmare = require('nightmare');
const assert = require('assert');

const urlHomepage = 'https://enhancedecommerce.appspot.com';

describe('Load a Page', function() {
  // 5s locally, 10s to remote server, 30s from airplan...
  this.timeout('10s');

  let nightmare = null;
  beforeEach(() => {
    nightmare = new Nightmare();
  });

  describe('/ (Home Page)', () => {
    it('should load without error', done => {
      nightmare.goto(urlHomepage)
        .end()
        .then(function (result) { done() })
        .catch(done)
    });
  });
});