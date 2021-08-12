/*
 * Tests for popup page
 * Using phantomjs to render page and execute scripts
 */

describe('popup page', function() {

  // sometimes it takes time to start phantomjs
  this.timeout(4000);

  var FILENAME = 'src/popup.html';

  it('should assert show table button value', function(done) {

    page.open(FILENAME, function() {
      // assert
      page.evaluate(function() {
        assert.equal(document.querySelector('#btnShowTable').innerText, 'Load times');
      });
      done();
    });
  });

  it('should assert clear time value', function(done) {
    page.open(FILENAME, function() {
      // assert
      page.evaluate(function() {
        assert.equal(document.querySelector('#btnClearTimes').innerText, 'Clear times');
      });
      done();
    });
  });


  it('show table should fire click event', function(done) {
    page.open(FILENAME, function() {
      // assert
      page.evaluate(function() {
        document.querySelector('#btnShowTable').dispatchEvent(clickEvent);
      });
      done();
    });
  });
});