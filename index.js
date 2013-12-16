var meats = require('./meats.js');
var filler = require('./filler.js');
var p_punctuate = 0.1; //~= every 10 words
var p_comma = 0.25; //~= every 20 words
var p_fullstop = 0.25; //~= every 20 words
var p_exclamation = 0.25; //~= every 20 words
var p_question = 0.25; //~= every 20 words
var p_new_paragraph = 0.3; //~= every 3.33 sentences

var swap = function(array, index1, index2) {
  var tmp = array[index1];
  array[index1] = array[index2];
  array[index2] = tmp;
}

var isEmpty = function(array) {
  return (typeof array !== 'undefined' && array.length > 0)
}

var getRandomInt = function(min,max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Fisher-Yates/Knuth algorithm for shuffling
var shuffle = function(array) {
  var i;
  var j;

  for (i=array.length-1;i>=0;i--) {
    j = getRandomInt(0, i);
    swap(array, j, i);
  }

  return array;
}

var sample = function(array) {
  if (typeof(array) !== 'undefined' && array.length > 0) {
    return array[getRandomInt(0, array.length-1)];
  }
}

var capitalise = function(word) {
  var chars = word.split("");
  chars[0] = chars[0].toUpperCase();
  word = chars.join("");
  return word;
}

var initialiseWords = function () {
  return shuffle(meats.concat(filler));
}

module.exports = function bacon(num_words) {
  var ret = "";
  var should_capitalise = true;
  var i=0;
  var word;
  var words = initialiseWords();
  var new_paragraph = false;

  for (i=0;i<num_words;i++) {
    if (new_paragraph) {
      ret = ret + "\n\n";
      new_paragraph = false;
    }

    word = words.pop();
    if (should_capitalise) {
      word = capitalise(word);
      should_capitalise = false;
    }

    //append a comma or a full stop sometimes
    should_punctuate = Math.random() <= p_punctuate;

    if (should_punctuate) {
      punctuation_character = sample(['.', ',', '!', '?']);

      word = word + punctuation_character;
      if (punctuation_character !== ',') {
        should_capitalise = true;
        if (Math.random() <= p_new_paragraph) {
          new_paragraph = true;
        }
      }
    }

    //append the word
    if (ret.slice(-1) === '\n' || ret.length === 0) {
      ret = [ret, word].join("");
    }
    else
    {
      ret = [ret, word].join(" ");
    }

    if (isEmpty(words)) {
      words = initialiseWords();
    }

  }

  if (!/[\.\?\!]/.test(ret.slice(-1))) {
    if (ret.slice(-1) === ',') {
      ret = ret.slice(0, -1);
    }
    ret = ret + '.';
  }

  return ret;
}
