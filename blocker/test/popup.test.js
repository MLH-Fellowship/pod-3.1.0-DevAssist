/*
 * Tests for popup page
 * Using phantomjs to render page and execute scripts
 */

describe('popup page', function() {

  // sometimes it takes time to start phantomjs
  this.timeout(4000);

  var FILENAME = 'src/options.html';

  it('should assert blocked website value', function(done) {

    page.open(FILENAME, function() {
      // assert
      page.evaluate(function() {
        assert.equal(document.querySelector('#date').innerText, 'Blocked Websites');
      });
      done();
    });
  });


  it('add button should fire click event', function(done) {
    page.open(FILENAME, function() {
      // assert
      page.evaluate(function() {
        document.querySelector('#addButtonTask').dispatchEvent(clickEvent);
      });
      done();
    });
  });
});