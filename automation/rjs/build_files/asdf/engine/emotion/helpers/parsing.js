(function() {
  emo$.Core.Helpers.MakeGlobalNamespaceFromString('emo$.Engine.Emotion.Helpers.Parsing');

  emo$.Engine.Emotion.Helpers.Parsing = (function() {
    function Parsing() {}

    Parsing.parseSentences = function(text) {
      var value;
      value = [];
      value = text.split('.');
      value = value.filter(function(val) {
        return val.trim() !== '';
      });
      return value;
    };

    Parsing.parseWords = function(text) {
      var value;
      value = text.match(/[^\W]+/mig) || [];
      return value;

      /*value = []
      boundary = BreakIterator.getWordInstance()
      boundary.setText(text)
      start = boundary.first()
      for int end = boundary.next(); end != BreakIterator.DONE; start = end, end = boundary.next()
        word = text.substring(start, end)
        value.push(word)
      return value
       */
    };

    Parsing.splitWords = function(text, splitter) {
      return text.split(splitter);
    };

    Parsing.containsFirst = function(container, containee) {
      var x, _i, _ref;
      if (container.length > containee.length) {
        for (x = _i = 1, _ref = containee.length; _i < _ref; x = _i += 1) {
          if (!(containee.charAt(x) === container.charAt(x))) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    };

    return Parsing;

  })();

}).call(this);
