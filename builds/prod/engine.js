var Helpers;

Helpers = (function() {
  var global1, _;

  function Helpers() {}

  global1 = window;

  _ = _ || window._;

  Helpers.MakeGlobalNamespaceFromString = function(path, _global, shortcut, initialObject) {
    var buildFromName, first, global, l1, l2, namespace, retObj, sc, subPaths;
    global = _global || global1 || {};
    if (global !== window) {
      global1 = global;
    }
    if (typeof global === 'string') {
      global = eval(global);
    }
    subPaths = path.split('.').reverse();
    first = subPaths.pop();
    namespace = global[first] = typeof global[first] !== 'undefined' && global[first] || {};
    if (subPaths.length === 0) {
      namespace;
      return namespace;
    }
    retObj = null;
    l1 = l2 = subPaths.length;
    buildFromName = function(paths, ns) {
      var retns;
      if (paths.length <= 0) {
        return ns;
      }
      first = subPaths.pop();
      retns = typeof ns[first] !== 'undefined' && ns[first] || {};
      ns[first] = buildFromName(paths, retns);
      if (l1 === l2) {
        retObj = _.extend(ns[first] != null ? ns[first] : ns[first] = {}, retObj != null ? retObj : retObj = {});
      }
      return ns;
    };
    namespace = buildFromName(subPaths, namespace);
    if (shortcut) {
      sc = this.MakeGlobalNamespaceFromString(shortcut, window);
      global[shortcut] = retObj;
      sc = retObj;
    }
    return retObj;
  };

  Helpers.MakeGlobalNamespaceAndObject = function(initialObject) {
    var buildFromName, first, foreverFirst, global, l1, l2, namespace, retObj, sc, subPaths;
    global = initialObject.global || global1 || {};
    if (global !== window) {
      global1 = global;
    }
    if (typeof global === 'string') {
      global = eval(global);
    }
    subPaths = initialObject.path.split('.').reverse();
    foreverFirst = subPaths[0];
    first = subPaths.pop();
    namespace = global[first] = typeof global[first] !== 'undefined' && global[first] || {};
    if (subPaths.length === 0) {
      if (typeof global[first] !== 'undefined' && global[first]) {
        _.extend(global[first], initialObject);
      } else {
        global[first] = initialObject.object;
      }
      return namespace;
    }
    retObj = null;
    l1 = l2 = subPaths.length;
    buildFromName = function(paths, ns) {
      var retns;
      if (paths.length <= 0) {
        return ns;
      }
      first = subPaths.pop();
      retns = typeof ns[first] !== 'undefined' && ns[first] || {};
      ns[first] = buildFromName(paths, retns);
      if (l1 === l2) {
        ns[foreverFirst] = _.extend(initialObject.object, ns[foreverFirst]);
        retObj = _.extend(ns[foreverFirst] != null ? ns[foreverFirst] : ns[foreverFirst] = {}, retObj != null ? retObj : retObj = {});
      }
      l1 = l1 - 1;
      return ns;
    };
    namespace = buildFromName(subPaths, namespace);
    if (initialObject.shortcut) {
      sc = this.MakeGlobalNamespaceFromString(initialObject.shortcut, window);
      global[initialObject.shortcut] = retObj;
      sc = retObj;
    }
    return retObj;
  };

  return Helpers;

})();

Helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.core.helpers',
  object: Helpers,
  global: global
});

Helpers.MakeGlobalNamespaceAndObject({
  path: 'runtime.helpers',
  object: Helpers,
  global: global
});

Helpers.hexToR = function(h) {
  return parseInt((this.cutHex(h)).substring(0, 2), 16);
};

Helpers.hexToG = function(h) {
  return parseInt((this.cutHex(h)).substring(2, 4), 16);
};

Helpers.hexToB = function(h) {
  return parseInt((this.cutHex(h)).substring(4, 6), 16);
};

Helpers.cutHex = function(h) {
  if (h.charAt(0) === "#") {
    return h.substring(1, 7);
  } else {
    return h;
  }
};


var ajax = {};
ajax.x = function() {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for(var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function(url, callback, method, data, sync) {
    var x = ajax.x();
    x.open(method, url, sync);
    x.onreadystatechange = function() {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/json');
        x.setRequestHeader('dataType', 'jsonp');
    }
    /*if (method == 'GET') {
        x.setRequestHeader('Content-type', 'application/json');
        x.setRequestHeader('dataType', 'json');
    }*/
    x.send(data)
};

ajax.get = function(url, data, callback, sync) {
    var callback = typeof callback == 'undefined' ? function(){} : callback;
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'GET', null, sync)
    //ajax.send(url + '?' + query.join('&'), callback, 'GET', null, sync)
};

ajax.post = function(url, data, callback, sync) {
    var callback = typeof callback == 'undefined' ? function(){} : callback;
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), sync)
}
global.runtime.helpers.ajax = ajax;
;

define('core/helpers',[], function() {});

define('core/config',['core/helpers'], function() {
  var Config;
  Config = (function() {
    function Config() {}

    Config.dataServerRoot = emojs.settings.dataServerRoot;

    Config.fullyClientSide = true;

    return Config;

  })();
  global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.core.Config',
    object: Config
  });
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'runtime.config',
    object: Config
  });
});

define('core/init.javascript',[], function() {

  /*
  * Returns a random number between min and max
   */
  Math.getRandomArbitary = function(min, max) {
    return Math.random() * (max - min) + min;
  };
  Math.randomRange = function(min, max) {
    return Math.random() * (max - min) + min;
  };
  Math.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  return Function.prototype.property = function(prop, desc) {
    return Object.defineProperty(this.prototype, prop, desc);
  };
});

var global;

if (typeof global === 'undefined') {
  global = {};
}

if (typeof global.engine === 'undefined') {
  global.engine = {};
}

global.engine.core = {};

define('core/main',['core/config', 'core/helpers', 'core/init.javascript'], function() {});

define('core', ['core/main'], function (main) { return main; });

define('classes/abstract.controller',[], function() {
  var AbstractController;
  AbstractController = (function() {
    function AbstractController() {}

    return AbstractController;

  })();
  ({
    constructor: function() {

      /**
      * For trigger events, that will be listened/casted in any part of program.
      * Format of the triggered event:
      *   'global:{name}:{action}'
      * @param {String} DESCRIPTION
      * @return {String} DESCRIPTION
      *
       */
    },
    trigger: function(name, action) {
      return this.emit(name);
    },
    ready: function(callback) {
      if (typeof callback !== 'undefined') {
        return callback.call();
      }
    },
    start: function() {},
    stop: function() {}
  });
  _.extend(AbstractController.prototype, new global.libs.emitter());
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.classes.AbstractController',
    object: AbstractController
  });
});

var AbstractEmotion;

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.AbstractEmotion',
  object: AbstractEmotion = (function() {
    function AbstractEmotion(val) {
      this.val = val;
    }

    return AbstractEmotion;

  })()
});

define('classes/abstract.emotion',[], function() {});

define('classes/abstract.state',[], function() {
  var AbstractState;
  AbstractState = (function() {
    function AbstractState(text) {
      this.text = text;
    }

    AbstractState.prototype.getText = function() {
      return this.text;
    };

    return AbstractState;

  })();
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.classes.AbstractState',
    object: AbstractState
  });
});


/**
* AbstractProcessor class will be processing core (standard) input-output events.
*   custom Processors are pluggable through modules into the system and should be inherited from AbstractProcessor.
* @namespace engine.controllers
* @class AbstractProcessor
*
 */
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('classes/abstract.processor',['classes/abstract.controller'], function() {
  var AbstractProcessor;
  AbstractProcessor = (function(_super) {
    __extends(AbstractProcessor, _super);

    function AbstractProcessor() {}

    AbstractProcessor.prototype.feelText = function(text, context) {
      return console.log('abstract feelText: ' + text);
    };

    AbstractProcessor.prototype.createEmotionState = function(text, affectWords, TYPE) {
      return console.dir({
        message: 'abstract createEmotionState: ',
        affectWords: affectWords,
        TYPE: TYPE
      });
    };


    /**
    * For trigger events, that will be listened/casted in any part of program.
    * Format of the triggered event:
    *   'global:{name}:{action}'
    * @param {String} DESCRIPTION
    * @return {String} DESCRIPTION
    *
     */

    return AbstractProcessor;

  })(global.engine.classes.AbstractController);
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.classes.AbstractProcessor',
    object: AbstractProcessor,
    global: global,
    shortcut: 'e$ecp'
  });
});

define('classes/affect.word',[], function() {
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
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.classes.AffectWord',
    object: AffectWord
  });
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('classes/emotion',['classes/abstract.emotion'], function() {
  var Emotion;
  Emotion = (function(_super) {
    __extends(Emotion, _super);

    function Emotion(weight, type) {
      this.weight = weight;
      this.type = type;
    }

    Emotion.prototype.compareTo = function(arg0) {
      var value;
      value = 100 * ((arg0.weight != null) - this.weight);
      if (value === 0) {
        return 1;
      }
      return value;
    };

    Emotion.prototype.getType = function() {
      return this.type;
    };

    Emotion.prototype.setType = function(type) {
      this.type = type;
    };

    Emotion.prototype.getName = function() {
      switch (this.type) {
        case -1:
          return 'NEUTRAL';
        case 0:
          return 'HAPPINESS';
        case 1:
          return 'SADNESS';
        case 2:
          return 'FEAR';
        case 3:
          return 'ANGER';
        case 4:
          return 'DISGUST';
        case 5:
          return 'SURPRISE';
      }
    };

    Emotion.prototype.getWeight = function() {
      return this.weight;
    };

    Emotion.prototype.setWeight = function(weight) {
      this.weight = weight;
    };

    Emotion.prototype.toString = function() {
      return "Type number: " + this.type + ", weight: " + this.weight;
    };

    Emotion.NEUTRAL = -1;

    Emotion.HAPPINESS = 0;

    Emotion.SADNESS = 1;

    Emotion.FEAR = 2;

    Emotion.ANGER = 3;

    Emotion.DISGUST = 4;

    Emotion.SURPRISE = 5;

    Emotion.TYPES = {
      TEXT: "TEXT",
      TOUCH: "TOUCH"
    };

    return Emotion;

  })(global.engine.classes.AbstractEmotion);
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.classes.Emotion',
    object: Emotion
  });
});

define('classes/emotion.state',['classes/emotion'], function() {
  var EmotionState;
  EmotionState = (function() {
    var _Emotion;

    _Emotion = global.engine.classes.Emotion;

    EmotionState.prototype._generalWeight = 0.0;

    EmotionState.prototype._valence = 0;

    EmotionState.prototype._previous = null;

    EmotionState.prototype._emotions = [];

    function EmotionState(text, _emotions, _generalWeight, _valence) {
      this.text = text;
      this._generalWeight = _generalWeight;
      this._valence = _valence;
      this._emotions = _emotions || this._emotions;
      if (this._emotions.length === 0) {
        this._emotions.push(new _Emotion(1.0, _Emotion.NEUTRAL));
      }
      this;
    }

    EmotionState.prototype.getStrongestEmotion = function() {
      return _.max(this._emotions, function(emotion) {
        return emotion.weight;
      });
    };

    EmotionState.prototype.getFirstStrongestEmotions = function(stop) {
      var e, value, _i, _len, _ref;
      value = [];
      _ref = this._emotions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        if (stop <= 0) {
          break;
        }
        value.push(e);
        stop--;
      }
      return value;
    };

    EmotionState.prototype.getHappiness = function() {
      var e, value, _i, _len, _ref;
      value = new _Emotion(0.0, _Emotion.HAPPINESS);
      _ref = this._emotions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        if (e.getType() === _Emotion.HAPPINESS) {
          value = e;
        }
      }
      return value;
    };

    EmotionState.prototype.getHappinessWeight = function() {
      return this.getHappiness().getWeight();
    };

    EmotionState.prototype.getSadness = function() {
      var e, value, _i, _len, _ref;
      value = new _Emotion(0.0, _Emotion.SADNESS);
      _ref = this._emotions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        if (e.getType() === _Emotion.SADNESS) {
          value = e;
        }
      }
      return value;
    };

    EmotionState.prototype.getSadnessWeight = function() {
      return this.getSadness().getWeight();
    };

    EmotionState.prototype.getFear = function() {
      var e, value, _i, _len, _ref;
      value = new _Emotion(0.0, _Emotion.FEAR);
      _ref = this._emotions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        if (e.getType() === _Emotion.FEAR) {
          value = e;
        }
      }
      return value;
    };

    EmotionState.prototype.getFearWeight = function() {
      return this.getFear().getWeight();
    };

    EmotionState.prototype.getAnger = function() {
      var e, value, _i, _len, _ref;
      value = new _Emotion(0.0, _Emotion.ANGER);
      _ref = this._emotions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        if (e.getType() === _Emotion.ANGER) {
          value = e;
        }
      }
      return value;
    };

    EmotionState.prototype.getAngerWeight = function() {
      return this.getAnger().getWeight();
    };

    EmotionState.prototype.getDisgust = function() {
      var e, value, _i, _len, _ref;
      value = new _Emotion(0.0, _Emotion.DISGUST);
      _ref = this._emotions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        if (e.getType() === _Emotion.DISGUST) {
          value = e;
        }
      }
      return value;
    };

    EmotionState.prototype.getDisgustWeight = function() {
      return this.getDisgust().getWeight();
    };

    EmotionState.prototype.getSurprise = function() {
      var e, value, _i, _len, _ref;
      value = new _Emotion(0.0, _Emotion.SURPRISE);
      _ref = this._emotions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        if (e.getType() === _Emotion.SURPRISE) {
          value = e;
        }
      }
      return value;
    };

    EmotionState.prototype.getSurpriseWeight = function() {
      return this.getSurprise().getWeight();
    };

    EmotionState.prototype.getPrevious = function() {
      return this.previous;
    };

    EmotionState.prototype.setPrevious = function(_previous) {
      return this.previous = _previous;
    };

    EmotionState.prototype.getValence = function() {
      return this._valence;
    };

    EmotionState.prototype.getGeneralWeight = function() {
      return this._generalWeight;
    };

    EmotionState.prototype.toString = function(separator) {
      var ret;
      if (separator) {
        ret = this.text + separator + this.getGeneralWeight() + separator + this.getValence() + separator + this.getHappinessWeight() + separator + this.getSadnessWeight() + separator + this.getAngerWeight() + separator + this.getFearWeight() + separator + this.getDisgustWeight() + separator + this.getSurpriseWeight();
      } else {
        ret = "Text: " + this.text + "\n General weight: " + this.getGeneralWeight() + "\nValence: " + this.getValence() + "\nhappiness: " + this.getHappinessWeight() + ",\nsadness: " + this.getSadnessWeight() + ",\nanger: " + this.getAngerWeight() + ",\nfear: " + this.getFearWeight() + ",\ndisgust: " + this.getDisgustWeight() + ",\nsurprise: " + this.getSurpriseWeight() + "\n";
      }
      return ret;
    };

    EmotionState.prototype.toHtml = function() {
      var ret;
      ret = "<i>Input text:</i> <b class='htmlText'>" + this.text + "</b><br/> <i>General weight: </i>" + this.getGeneralWeight() + "\n<i>Valence: </i>" + this.getValence() + "\n<i>happiness: </i>" + this.getHappinessWeight() + ",\n<i>sadness: </i>" + this.getSadnessWeight() + ",\n<i>anger: </i>" + this.getAngerWeight() + ",\n<i>fear: </i>" + this.getFearWeight() + ",\n<i>disgust: </i>" + this.getDisgustWeight() + ",\n<i>surprise: </i>" + this.getSurpriseWeight() + "\n";
      return ret;
    };

    return EmotionState;

  })();
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.classes.EmotionState',
    object: EmotionState
  });
});

define('classes/main',['classes/abstract.controller', 'classes/abstract.emotion', 'classes/abstract.state', 'classes/abstract.processor', 'classes/affect.word', 'classes/emotion', 'classes/emotion.state'], function() {
  return global.runtime.helpers.MakeGlobalNamespaceFromString('engine.classes');
});

define('classes', ['classes/main'], function (main) { return main; });


/**
* MainController class will be Events Bus
*
* @namespace engine.controllers
* @class MainController
*
 */
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('controllers/app',[], function() {
  var App;
  App = (function(_super) {
    var processor;

    __extends(App, _super);

    processor = null;

    App.staticConfig = null;

    function App(config) {
      this.staticConfig = config != null ? config : config = {};
    }


    /**
    * For trigger events, that will be listened/casted in any part of program.
    * Format of the triggered event:
    *   'global:{name}:{action}'
    * @param {String} DESCRIPTION
    * @return {String} DESCRIPTION
    *
     */

    App.prototype.trigger = function(name, action) {};

    App.prototype.getProcessorInstance = function() {
      return processor;
    };

    App.prototype.setProcessorInstance = function(ProcessorClassObjectName) {

      /*processorClass = eval(ProcessorClassObjectName)
      processor = new processorClass(@)
      processor.ready ()->
       */
      processor = emojs.runtime.app.processor;
      return processor.ready(function() {});
    };

    App.prototype.start = function() {
      if (typeof this.staticConfig.processor !== 'undefined') {
        return this.setProcessorInstance(this.staticConfig.processor);
      } else {
        return this.setProcessorInstance('emojs.processors.client.ClientProcessor');
      }
    };

    return App;

  })(global.engine.classes.AbstractController);
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.controllers.App',
    object: App,
    global: global,
    shortcut: 'e$eca'
  });
});

define('controllers/properties.manager',[], function() {
  var PropertiesManager, dataServerAddr;
  dataServerAddr = global.engine.core.Config.dataServerRoot;
  PropertiesManager = (function() {
    var properties;

    properties = null;

    function PropertiesManager(fileName, callbackFunction) {

      /*try
        properties = (global.libs.x2js).xml2json(fileContent).properties.entry
      catch e
        properties = (new X2JS()).xml2json(fileContent).properties.entry
       */
      var d, url;
      url = dataServerAddr + fileName;
      d = null;
      emojs.engine.controllers.FileReader.readFile(url, function(data) {
        properties = global.libs.x2js(data).properties && global.libs.x2js(data).properties.entry;
        return callbackFunction(data);
      });
    }

    PropertiesManager.prototype.getProperty = function(key) {
      var prop, _i, _len;
      for (_i = 0, _len = properties.length; _i < _len; _i++) {
        prop = properties[_i];

        /*if prop['_key'] == key
          return prop['__text']
         */
        if (prop.$['key'] === key) {
          return prop._;
        }
      }
    };

    PropertiesManager.prototype.getIntArrayProperty = function(key) {
      var line, string, strings, values, _i, _len;
      line = this.getProperty(key);
      strings = line.split(', ');
      values = [];
      for (_i = 0, _len = strings.length; _i < _len; _i++) {
        string = strings[_i];
        values.push(parseInt(string, 16));
      }
      return values;
    };

    return PropertiesManager;

  })();
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.controllers.PropertiesManager',
    object: PropertiesManager
  });
});

define('controllers/file.reader',[], function() {
  var FileReader;
  FileReader = (function() {
    function FileReader() {}

    FileReader.readFile = function(fileName, callback) {
      var d, file;
      file = null;
      d = null;
      global.runtime.helpers.ajax.get(fileName, {}, function(data) {
        d = data;
        if (callback) {
          return callback(data);
        }
      }, true);

      /*url:fileName
      async : false,
      crossDomain: true,
      contentType: "application/json",
      dataType: 'jsonp',
      success :(data)->
        callback.call(data)
      error : (e) ->
        console.log(e)
       */
      return file;
    };

    FileReader.parseLine = function(line) {
      var ret;
      return ret = null;
    };

    return FileReader;

  })();
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.controllers.FileReader',
    object: FileReader
  });
});

global.runtime.helpers.MakeGlobalNamespaceFromString('engine.controllers');

define('controllers/main',['controllers/app', 'controllers/properties.manager', 'controllers/file.reader'], function() {});

define('controllers', ['controllers/main'], function (main) { return main; });

requirejs.config({
  shim: {
    'core': {
      deps: ['libs']
    },
    'classes': {
      deps: ['core']
    },
    'controllers': {
      deps: ['core', 'classes']
    }
  },
  packages: [
    {
      name: 'classes',
      location: './engine/classes'
    }, {
      name: 'controllers',
      location: './engine/controllers'
    }, {
      name: 'core',
      location: './engine/core'
    }
  ]
});

define('engine/main',['core', 'classes', 'controllers'], function() {
  var app;
  emojs.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine',
    object: this,
    global: global,
    shortcut: 'e$e'
  });
  global.runtime.helpers.MakeGlobalNamespaceFromString('runtime', global, 'e$r');
  app = new emojs.engine.controllers.App;
  global.runtime.app = app;

  /*require [
  ], () ->
   */
  return app.once('processor:ready', function() {
    var appReadyEvent;
    appReadyEvent = new Event('app:ready');
    window.document.dispatchEvent(appReadyEvent);
    return app.start();
  });
});


require(["engine/main"]);
