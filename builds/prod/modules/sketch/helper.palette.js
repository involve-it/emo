(function() {
  var SynesketchPalette, paletteFilePath;

  paletteFilePath = '/palette/standard';

  SynesketchPalette = (function() {
    var angerColors, disgustColors, fearColors, happinessColors, randomiser, sadnessColors, surpriseColors;

    fearColors = [];

    angerColors = [];

    disgustColors = [];

    happinessColors = [];

    sadnessColors = [];

    surpriseColors = [];

    randomiser = null;

    function SynesketchPalette(paletteName) {
      var pm;
      pm = new emojs.engine.controllers.PropertiesManager(paletteFilePath, function() {
        happinessColors = pm.getIntArrayProperty('happiness.palette');
        sadnessColors = pm.getIntArrayProperty('sadness.palette');
        angerColors = pm.getIntArrayProperty('anger.palette');
        fearColors = pm.getIntArrayProperty('fear.palette');
        disgustColors = pm.getIntArrayProperty('disgust.palette');
        return surpriseColors = pm.getIntArrayProperty('surprise.palette');
      });
    }

    SynesketchPalette.prototype.getAngerColors = function() {
      return angerColors;
    };

    SynesketchPalette.prototype.getDisgustColors = function() {
      return disgustColors;
    };

    SynesketchPalette.prototype.getFearColors = function() {
      return fearColors;
    };

    SynesketchPalette.prototype.getHappinessColors = function() {
      return happinessColors;
    };

    SynesketchPalette.prototype.getSadnessColors = function() {
      return sadnessColors;
    };

    SynesketchPalette.prototype.getSurpriseColors = function() {
      return surpriseColors;
    };

    SynesketchPalette.prototype.getRandomHappinessColor = function() {
      return happinessColors[Math.floor(Math.random() * happinessColors.length)];
    };

    SynesketchPalette.prototype.getRandomSadnessColor = function() {
      return sadnessColors[Math.floor(Math.random() * sadnessColors.length)];
    };

    SynesketchPalette.prototype.getRandomAngerColor = function() {
      return angerColors[Math.floor(Math.random() * angerColors.length)];
    };

    SynesketchPalette.prototype.getRandomFearColor = function() {
      return fearColors[Math.floor(Math.random() * fearColors.length)];
    };

    SynesketchPalette.prototype.getRandomDisgustColor = function() {
      return disgustColors[Math.floor(Math.random() * disgustColors.length)];
    };

    SynesketchPalette.prototype.getRandomSurpriseColor = function() {
      return surpriseColors[Math.floor(Math.random() * surpriseColors.length)];
    };

    return SynesketchPalette;

  })();

  define([], function() {
    return emojs.runtime.helpers.MakeGlobalNamespaceAndObject({
      path: 'output.art.utils.SynesketchPalette',
      object: SynesketchPalette
    });
  });

}).call(this);
