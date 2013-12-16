# Bacon Ipsum

This is a node module for generating text based on words from the
baconipsum.com[1] generator.

## Usage

    var baconipsum = require('baconipsum');
    //get 100 words of bacon ipsum split into sentences and paragraphs
    var placeholder_text = baconipsum(100);

## Todo

 * Optionally output a stream
 * Make configurable (whether to break into paragraphs, sentences, etc)

[1]: https://github.com/petenelson/bacon-ipsum

