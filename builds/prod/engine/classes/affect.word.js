(function() {
  define([], function() {
    var AffectWord;
    AffectWord = (function() {
      AffectWord.prototype.word = null;

      AffectWord.prototype.generalWeight = 0.0;

      AffectWord.prototype.generalValence = 0.0;

      AffectWord.prototype.happinessWeight = 0.0;

      AffectWord.prototype.sadnessWeight = 0.0;

      AffectWord.prototype.angerWeight = 0.0;

      AffectWord.prototype.fearWeight = 0.0;

      AffectWord.prototype.disgustWeight = 0.0;

      AffectWord.prototype.surpriseWeight = 0.0;

      AffectWord.prototype.startsWithEmoticon = false;

      function AffectWord(word, generalWeight, happinessWeight, sadnessWeight, angerWeight, fearWeight, disgustWeight, surpriseWeight, quoficient) {
        this.word = word;
        this.generalWeight = generalWeight;
        this.happinessWeight = happinessWeight;
        this.sadnessWeight = sadnessWeight;
        this.angerWeight = angerWeight;
        this.fearWeight = fearWeight;
        this.disgustWeight = disgustWeight;
        this.surpriseWeight = surpriseWeight;
        this.quoficient = quoficient;
        if (quoficient) {
          this.generalWeight = this.generalWeight * quoficient;
          this.happinessWeight = this.happinessWeight * quoficient;
          this.sadnessWeight = this.sadnessWeight * quoficient;
          this.angerWeight = this.angerWeight * quoficient;
          this.fearWeight = this.fearWeight * quoficient;
          this.disgustWeight = this.disgustWeight * quoficient;
          this.surpriseWeight = this.surpriseWeight * quoficient;
        }
        this.generalValence = this.getValenceSum();
      }

      AffectWord.prototype.adjustWeights = function(quoficient) {
        this.generalWeight = this.generalWeight * quoficient;
        this.happinessWeight = this.happinessWeight * quoficient;
        this.sadnessWeight = this.sadnessWeight * quoficient;
        this.angerWeight = this.angerWeight * quoficient;
        this.fearWeight = this.fearWeight * quoficient;
        this.disgustWeight = this.disgustWeight * quoficient;
        this.surpriseWeight = this.surpriseWeight * quoficient;
        return this.normalise();
      };

      AffectWord.prototype.normalise = function() {
        if (this.generalWeight > 1) {
          this.generalWeight = 1.0;
        }
        if (this.happinessWeight > 1) {
          this.happinessWeight = 1.0;
        }
        if (this.sadnessWeight > 1) {
          this.sadnessWeight = 1.0;
        }
        if (this.angerWeight > 1) {
          this.angerWeight = 1.0;
        }
        if (this.fearWeight > 1) {
          this.fearWeight = 1.0;
        }
        if (this.disgustWeight > 1) {
          this.disgustWeight = 1.0;
        }
        if (this.surpriseWeight > 1) {
          return this.surpriseWeight = 1.0;
        }
      };

      AffectWord.prototype.flipValence = function() {
        var temp;
        this.generalValence = -this.generalValence;
        temp = this.happinessWeight;
        this.happinessWeight = Math.max(Math.max(this.sadnessWeight, this.angerWeight), Math.max(this.fearWeight, this.disgustWeight));
        this.sadnessWeight = temp;
        this.angerWeight = temp / 2;
        this.fearWeight = temp / 2;
        return this.disgustWeight = temp / 2;
      };

      AffectWord.prototype.clone = function() {
        var value;
        value = new AffectWord(this.word, this.generalWeight, this.happinessWeight, this.sadnessWeight, this.angerWeight, this.fearWeight, this.disgustWeight, this.surpriseWeight);
        value.setStartsWithEmoticon(this.startsWithEmoticon);
        return value;
      };

      AffectWord.prototype.getStartsWithEmoticon = function() {
        return this.startsWithEmoticon;
      };

      AffectWord.prototype.setStartsWithEmoticon = function(startsWithEmoticon) {
        return this.startsWithEmoticon = startsWithEmoticon;
      };

      AffectWord.prototype.getAngerWeight = function() {
        return this.angerWeight;
      };

      AffectWord.prototype.setAngerWeight = function(angerWeight) {
        return this.angerWeight = angerWeight;
      };

      AffectWord.prototype.getDisgustWeight = function() {
        return this.disgustWeight;
      };

      AffectWord.prototype.setDisgustWeight = function(disgustWeight) {
        return this.disgustWeight = disgustWeight;
      };

      AffectWord.prototype.getFearWeight = function() {
        return this.fearWeight;
      };

      AffectWord.prototype.setFearWeight = function(fearWeight) {
        return this.fearWeight = fearWeight;
      };

      AffectWord.prototype.getHappinessWeight = function() {
        return this.happinessWeight;
      };

      AffectWord.prototype.setHappinessWeight = function(happinessWeight) {
        return this.happinessWeight = happinessWeight;
      };

      AffectWord.prototype.getSadnessWeight = function() {
        return this.sadnessWeight;
      };

      AffectWord.prototype.setSadnessWeight = function(sadnessWeight) {
        return this.sadnessWeight = sadnessWeight;
      };

      AffectWord.prototype.getSurpriseWeight = function() {
        return this.surpriseWeight;
      };

      AffectWord.prototype.setSurpriseWeight = function(surpriseWeight) {
        return this.surpriseWeight = surpriseWeight;
      };

      AffectWord.prototype.getWord = function() {
        return this.word;
      };

      AffectWord.prototype.getGeneralWeight = function() {
        return this.generalWeight;
      };

      AffectWord.prototype.setGeneralWeight = function(generalWeight) {
        return this.generalWeight = generalWeight;
      };

      AffectWord.prototype.getGeneralValence = function() {
        return this.generalValence;
      };

      AffectWord.prototype.setGeneralValence = function(generalValence) {
        return this.generalValence = generalValence;
      };

      AffectWord.prototype.isZeroEkman = function() {
        if (this.getWeightSum() === 0) {
          return true;
        } else {
          return false;
        }
      };

      AffectWord.prototype.toString = function() {
        var ret;
        return ret = this.word + ' ' + this.generalWeight + ' ' + this.happinessWeight + ' ' + this.sadnessWeight + ' ' + this.angerWeight + ' ' + this.fearWeight + ' ' + this.disgustWeight + ' ' + this.surpriseWeight;
      };

      AffectWord.prototype.getValenceSum = function() {
        var ret;
        return ret = this.happinessWeight - this.sadnessWeight - this.angerWeight - this.fearWeight - this.disgustWeight;
      };

      AffectWord.prototype.getWeightSum = function() {
        var ret;
        return ret = this.happinessWeight + this.sadnessWeight + this.angerWeight + this.fearWeight + this.disgustWeight + this.surpriseWeight;
      };

      return AffectWord;

    })();
    return global.engine.core.helpers.MakeGlobalNamespaceAndObject({
      path: 'engine.classes.AffectWord',
      object: AffectWord
    });
  });

}).call(this);
