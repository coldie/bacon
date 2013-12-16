var bacon = require('./index.js');

//count the words in the string
function countWords(string) {
  var words = string.replace(/[\s\n,.\!\?]+/g, ' ', 'm').trim().split(' ');
  return words.length;
}

var test_num_words = function(num, test) {
  //arrange
  //act
  var output = bacon(num);
  //assert
  var num_words = countWords(output);
  test.ok(num_words >= num, 'Expected at least ' + num + ' words but counted ' + num_words + '. Output was:' + "\n" + output);
  test.done();
}


//NOTE: you can't assert an exactly equal number of words because the word list
//contains some words that are compound words/have spaces, but the number will
//always be greater than the requested number of words.

exports.testOneWord = function(test) {
  test_num_words(1, test);
}

exports.testTwoWords = function(test) {
  test_num_words(2, test);
}

exports.testTenWords = function(test) {
  test_num_words(10, test);
}

exports.testAHundredWords = function(test) {
  test_num_words(100, test);
}

exports.testAThousandWords = function(test) {
  test_num_words(1000, test);
}

exports.testTenThousandWords = function(test) {
  test_num_words(10000, test);
}



