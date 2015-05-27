var Helpers;

Helpers = (function() {
  var global1;

  function Helpers() {}

  global1 = window;

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
        retObj = global.libs._.extend(ns[first] != null ? ns[first] : ns[first] = {}, retObj != null ? retObj : retObj = {});
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
        global.libs._.extend(global[first], initialObject);
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
        ns[foreverFirst] = global.libs._.extend(initialObject.object, ns[foreverFirst]);
        retObj = global.libs._.extend(ns[foreverFirst] != null ? ns[foreverFirst] : ns[foreverFirst] = {}, retObj != null ? retObj : retObj = {});
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

var AbstractController;

AbstractController = (function() {
  function AbstractController() {

    /**
    * For trigger events, that will be listened/casted in any part of program.
    * Format of the triggered event:
    *   'global:{name}:{action}'
    * @param {String} DESCRIPTION
    * @return {String} DESCRIPTION
    *
     */
  }

  AbstractController.prototype.trigger = function(name, action) {
    return this.emit(name);
  };

  AbstractController.prototype.ready = function(callback) {
    if (typeof callback !== 'undefined') {
      return callback.call();
    }
  };

  AbstractController.prototype.start = function() {};

  AbstractController.prototype.stop = function() {};

  return AbstractController;

})();

_.extend(AbstractController.prototype, new global.libs.emitter());

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.AbstractController',
  object: AbstractController
});

define('classes/abstract.controller',[], function() {});

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
var App,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.controllers.App',
  object: App,
  global: global,
  shortcut: 'e$eca'
});

define('controllers/app',[], function() {});

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

//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(predicate), context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (!iterator && _.isArray(obj)) {
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      each(obj, function(value, index, list) {
        computed = iterator ? iterator.call(context, value, index, list) : value;
        if (computed > lastComputed) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (!iterator && _.isArray(obj)) {
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      each(obj, function(value, index, list) {
        computed = iterator ? iterator.call(context, value, index, list) : value;
        if (computed < lastComputed) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = lookupIterator(predicate);
    var pass = [], fail = [];
    each(obj, function(elem) {
      (predicate.call(context, elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (array == null) return [];
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (iterator) value = iterator.call(context, value, i, array);
      if (isSorted ? (!i || seen !== value) : !_.contains(seen, value)) {
        if (isSorted) seen = value;
        else seen.push(value);
        result.push(array[i]);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iterator, context) {
    var result = {};
    if (_.isFunction(iterator)) {
      for (var key in obj) {
        var value = obj[key];
        if (iterator.call(context, value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iterator, context) {
    var keys;
    if (_.isFunction(iterator)) {
      iterator = _.negate(iterator);
    } else {
      keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iterator = function(value, key) { return !_.contains(keys, key); };
    }
    return _.pick(obj, iterator, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true;
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);

/**
 * jQuery plugin to convert a given $.ajax response xml object to json.
 *
 * @example var json = $.xml2json(response);
 */
(function() {

  // default options based on https://github.com/Leonidas-from-XIV/node-xml2js
  var defaultOptions = {
    attrkey: '$',
    charkey: '_',
    normalize: false
  };

  // extracted from jquery
  function parseXML(data) {
    var xml, tmp;
    if (!data || typeof data !== "string") {
      return null;
    }
    try {
      if (window.DOMParser) { // Standard
        tmp = new DOMParser();
        xml = tmp.parseFromString(data, "text/xml");
      } else { // IE
        xml = new ActiveXObject("Microsoft.XMLDOM");
        xml.async = "false";
        xml.loadXML(data);
      }
    } catch (e) {
      xml = undefined;
    }
    if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
      throw new Error("Invalid XML: " + data);
    }
    return xml;
  }

  function normalize(value, options){
    if (!!options.normalize){
      return (value || '').trim();
    }
    return value;
  }

  function xml2jsonImpl(xml, options) {

    var i, result = {}, attrs = {}, node, child, name;
    result[options.attrkey] = attrs;

    if (xml.attributes && xml.attributes.length > 0) {
      for (i = 0; i < xml.attributes.length; i++){
        var item = xml.attributes.item(i);
        attrs[item.nodeName] = item.value;
      }
    }

    // element content
    if (xml.childElementCount === 0) {
      result[options.charkey] = normalize(xml.textContent, options);
    }

    for (i = 0; i < xml.childNodes.length; i++) {
      node = xml.childNodes[i];
      if (node.nodeType === 1) {

        if (node.attributes.length === 0 && node.childElementCount === 0){
          child = normalize(node.textContent, options);
        } else {
          child = xml2jsonImpl(node, options);
        }

        name = node.nodeName;
        if (result.hasOwnProperty(name)) {
          // For repeating elements, cast/promote the node to array
          var val = result[name];
          if (!Array.isArray(val)) {
            val = [val];
            result[name] = val;
          }
          val.push(child);
        } else {
          result[name] = child;
        }
      }
    }

    return result;
  }

  /**w
   * Converts an xml document or string to a JSON object.
   *
   * @param xml
   */
  function xml2json(xml, options) {
    if (!xml) {
      return xml;
    }

    options = options || defaultOptions;

    if (typeof xml === 'string') {
      xml = parseXML(xml).documentElement;
    }

    var root = {};

    if (xml.attributes.length === 0 && xml.childElementCount === 0){
      root[xml.nodeName] = normalize(xml.textContent, options);
    } else {
      root[xml.nodeName] = xml2jsonImpl(xml, options);
    }

    return root;
  }

  if (typeof jQuery !== 'undefined') {
    jQuery.extend({xml2json: xml2json});
  } else if (typeof module !== 'undefined') {
    module.exports = xml2json;
  } else if (typeof window !== 'undefined') {
    window.xml2json = xml2json;
  }
})();
define("xml2json", function(){});

/**
 * Created by arutu_000 on 8/24/2014.
 * Event Emitter library for using custom Object as event listener/dispatcher
 * https://github.com/component/emitter
 */


define('emitter',['module'], function(module) {
  /**
   * Expose `Emitter`.
   */
  module.exports = Emitter;

  /**
   * Initialize a new `Emitter`.
   *
   * @api public
   */
  function Emitter(obj) {
    if (obj) return mixin(obj);
  };

  /**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */

  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }

  // let's add stack of ALL triggered events:
  var triggererWithEmitterEventsGlobal = []

  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.on =
    Emitter.prototype.addEventListener = function(event, fn){
      this._callbacks = this._callbacks || {};
      (this._callbacks[event] = this._callbacks[event] || [])
        .push(fn);
      return this;
    };

  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */
  Emitter.prototype.once = function(event, fn){
    var self = this;
    this._callbacks = this._callbacks || {};

    function on() {
      self.off(event, on);
      fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
  };
  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed OR if event was already triggered before, the function gets executed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */
  Emitter.prototype.runOrWait = function(event, fn){
    if (triggererWithEmitterEventsGlobal.indexOf(event) === -1) {
      var self = this;
      this._callbacks = this._callbacks || {};

      function on() {
        self.off(event, on);
        fn.apply(this, arguments);
      }

      on.fn = fn;
      this.on(event, on);
      return this;
    } else {
      fn.apply(this, arguments);
    }

  };
  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.off =
    Emitter.prototype.removeListener =
      Emitter.prototype.removeAllListeners =
        Emitter.prototype.removeEventListener = function(event, fn){
          this._callbacks = this._callbacks || {};

          // all
          if (0 == arguments.length) {
            this._callbacks = {};
            return this;
          }

          // specific event
          var callbacks = this._callbacks[event];
          if (!callbacks) return this;

          // remove all handlers
          if (1 == arguments.length) {
            delete this._callbacks[event];
            return this;
          }

          // remove specific handler
          var cb;
          for (var i = 0; i < callbacks.length; i++) {
            cb = callbacks[i];
            if (cb === fn || cb.fn === fn) {
              callbacks.splice(i, 1);
              break;
            }
          }
          return this;
        };

  /**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */

  Emitter.prototype.emit = function(event){
    this._callbacks = this._callbacks || {};

    /*var args = []
    for (var i=1; i<arguments.length; i++)
      args.push(arguments[i])
    var callbacks = this._callbacks[event];*/

    var args = [].slice.call(arguments, 1)
       , callbacks = this._callbacks[event];

    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }
    // add event to global event stack:
    triggererWithEmitterEventsGlobal.push(event);
    return this;
  };

  /**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */

  Emitter.prototype.listeners = function(event){
    this._callbacks = this._callbacks || {};
    return this._callbacks[event] || [];
  };

  /**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */

  Emitter.prototype.hasListeners = function(event){
    return !! this.listeners(event).length;
  };
})
;
/**
 * @license RequireJS text 2.0.12 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */
/*jslint regexp: true */
/*global require, XMLHttpRequest, ActiveXObject,
 define, window, process, Packages,
 java, location, Components, FileUtils */

define('text',['module'], function (module) {
  

  var text, fs, Cc, Ci, xpcIsWindows,
    progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
    xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
    bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
    hasLocation = typeof location !== 'undefined' && location.href,
    defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/\:/, ''),
    defaultHostName = hasLocation && location.hostname,
    defaultPort = hasLocation && (location.port || undefined),
    buildMap = {},
    masterConfig = (module.config && module.config()) || {};

  text = {
    version: '2.0.12',

    strip: function (content) {
      //Strips <?xml ...?> declarations so that external SVG and XML
      //documents can be added to a document without worry. Also, if the string
      //is an HTML document, only the part inside the body tag is returned.
      if (content) {
        content = content.replace(xmlRegExp, "");
        var matches = content.match(bodyRegExp);
        if (matches) {
          content = matches[1];
        }
      } else {
        content = "";
      }
      return content;
    },

    jsEscape: function (content) {
      return content.replace(/(['\\])/g, '\\$1')
        .replace(/[\f]/g, "\\f")
        .replace(/[\b]/g, "\\b")
        .replace(/[\n]/g, "\\n")
        .replace(/[\t]/g, "\\t")
        .replace(/[\r]/g, "\\r")
        .replace(/[\u2028]/g, "\\u2028")
        .replace(/[\u2029]/g, "\\u2029");
    },

    createXhr: masterConfig.createXhr || function () {
      //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
      var xhr, i, progId;
      if (typeof XMLHttpRequest !== "undefined") {
        return new XMLHttpRequest();
      } else if (typeof ActiveXObject !== "undefined") {
        for (i = 0; i < 3; i += 1) {
          progId = progIds[i];
          try {
            xhr = new ActiveXObject(progId);
          } catch (e) {}

          if (xhr) {
            progIds = [progId];  // so faster next time
            break;
          }
        }
      }

      return xhr;
    },

    /**
     * Parses a resource name into its component parts. Resource names
     * look like: module/name.ext!strip, where the !strip part is
     * optional.
     * @param {String} name the resource name
     * @returns {Object} with properties "moduleName", "ext" and "strip"
     * where strip is a boolean.
     */
    parseName: function (name) {
      var modName, ext, temp,
        strip = false,
        index = name.indexOf("."),
        isRelative = name.indexOf('./') === 0 ||
          name.indexOf('../') === 0;

      if (index !== -1 && (!isRelative || index > 1)) {
        modName = name.substring(0, index);
        ext = name.substring(index + 1, name.length);
      } else {
        modName = name;
      }

      temp = ext || modName;
      index = temp.indexOf("!");
      if (index !== -1) {
        //Pull off the strip arg.
        strip = temp.substring(index + 1) === "strip";
        temp = temp.substring(0, index);
        if (ext) {
          ext = temp;
        } else {
          modName = temp;
        }
      }

      return {
        moduleName: modName,
        ext: ext,
        strip: strip
      };
    },

    xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,

    /**
     * Is an URL on another domain. Only works for browser use, returns
     * false in non-browser environments. Only used to know if an
     * optimized .js version of a text resource should be loaded
     * instead.
     * @param {String} url
     * @returns Boolean
     */
    useXhr: function (url, protocol, hostname, port) {
      var uProtocol, uHostName, uPort,
        match = text.xdRegExp.exec(url);
      if (!match) {
        return true;
      }
      uProtocol = match[2];
      uHostName = match[3];

      uHostName = uHostName.split(':');
      uPort = uHostName[1];
      uHostName = uHostName[0];

      return (!uProtocol || uProtocol === protocol) &&
        (!uHostName || uHostName.toLowerCase() === hostname.toLowerCase()) &&
        ((!uPort && !uHostName) || uPort === port);
    },

    finishLoad: function (name, strip, content, onLoad) {
      content = strip ? text.strip(content) : content;
      if (masterConfig.isBuild) {
        buildMap[name] = content;
      }
      onLoad(content);
    },

    load: function (name, req, onLoad, config) {
      //Name has format: some.module.filext!strip
      //The strip part is optional.
      //if strip is present, then that means only get the string contents
      //inside a body tag in an HTML string. For XML/SVG content it means
      //removing the <?xml ...?> declarations so the content can be inserted
      //into the current doc without problems.

      // Do not bother with the work if a build and text will
      // not be inlined.
      if (config && config.isBuild && !config.inlineText) {
        onLoad();
        return;
      }

      masterConfig.isBuild = config && config.isBuild;

      var parsed = text.parseName(name),
        nonStripName = parsed.moduleName +
          (parsed.ext ? '.' + parsed.ext : ''),
        url = req.toUrl(nonStripName),
        useXhr = (masterConfig.useXhr) ||
          text.useXhr;

      // Do not load if it is an empty: url
      if (url.indexOf('empty:') === 0) {
        onLoad();
        return;
      }

      //Load the text. Use XHR if possible and in a browser.
      if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
        text.get(url, function (content) {
          text.finishLoad(name, parsed.strip, content, onLoad);
        }, function (err) {
          if (onLoad.error) {
            onLoad.error(err);
          }
        });
      } else {
        //Need to fetch the resource across domains. Assume
        //the resource has been optimized into a JS module. Fetch
        //by the module name + extension, but do not include the
        //!strip part to avoid file system issues.
        req([nonStripName], function (content) {
          text.finishLoad(parsed.moduleName + '.' + parsed.ext,
            parsed.strip, content, onLoad);
        });
      }
    },

    write: function (pluginName, moduleName, write, config) {
      if (buildMap.hasOwnProperty(moduleName)) {
        var content = text.jsEscape(buildMap[moduleName]);
        write.asModule(pluginName + "!" + moduleName,
            "define(function () { return '" +
            content +
            "';});\n");
      }
    },

    writeFile: function (pluginName, moduleName, req, write, config) {
      var parsed = text.parseName(moduleName),
        extPart = parsed.ext ? '.' + parsed.ext : '',
        nonStripName = parsed.moduleName + extPart,
      //Use a '.js' file name so that it indicates it is a
      //script that can be loaded across domains.
        fileName = req.toUrl(parsed.moduleName + extPart) + '.js';

      //Leverage own load() method to load plugin value, but only
      //write out values that do not have the strip argument,
      //to avoid any potential issues with ! in file names.
      text.load(nonStripName, req, function (value) {
        //Use own write() method to construct full module value.
        //But need to create shell that translates writeFile's
        //write() to the right interface.
        var textWrite = function (contents) {
          return write(fileName, contents);
        };
        textWrite.asModule = function (moduleName, contents) {
          return write.asModule(moduleName, fileName, contents);
        };

        text.write(pluginName, nonStripName, textWrite, config);
      }, config);
    }
  };

  if (masterConfig.env === 'node' || (!masterConfig.env &&
    typeof process !== "undefined" &&
    process.versions &&
    !!process.versions.node &&
    !process.versions['node-webkit'])) {
    //Using special require.nodeRequire, something added by r.js.
    fs = require.nodeRequire('fs');

    text.get = function (url, callback, errback) {
      try {
        var file = fs.readFileSync(url, 'utf8');
        //Remove BOM (Byte Mark Order) from utf8 files if it is there.
        if (file.indexOf('\uFEFF') === 0) {
          file = file.substring(1);
        }
        callback(file);
      } catch (e) {
        if (errback) {
          errback(e);
        }
      }
    };
  } else if (masterConfig.env === 'xhr' || (!masterConfig.env &&
    text.createXhr())) {
    text.get = function (url, callback, errback, headers) {
      var xhr = text.createXhr(), header;
      xhr.open('GET', url, true);

      //Allow plugins direct access to xhr headers
      if (headers) {
        for (header in headers) {
          if (headers.hasOwnProperty(header)) {
            xhr.setRequestHeader(header.toLowerCase(), headers[header]);
          }
        }
      }

      //Allow overrides specified in config
      if (masterConfig.onXhr) {
        masterConfig.onXhr(xhr, url);
      }

      xhr.onreadystatechange = function (evt) {
        var status, err;
        //Do not explicitly handle errors, those should be
        //visible via console output in the browser.
        if (xhr.readyState === 4) {
          status = xhr.status || 0;
          if (status > 399 && status < 600) {
            //An http 4xx or 5xx error. Signal an error.
            err = new Error(url + ' HTTP status: ' + status);
            err.xhr = xhr;
            if (errback) {
              errback(err);
            }
          } else {
            callback(xhr.responseText);
          }

          if (masterConfig.onXhrComplete) {
            masterConfig.onXhrComplete(xhr, url);
          }
        }
      };
      xhr.send(null);
    };
  } else if (masterConfig.env === 'rhino' || (!masterConfig.env &&
    typeof Packages !== 'undefined' && typeof java !== 'undefined')) {
    //Why Java, why is this so awkward?
    text.get = function (url, callback) {
      var stringBuffer, line,
        encoding = "utf-8",
        file = new java.io.File(url),
        lineSeparator = java.lang.System.getProperty("line.separator"),
        input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
        content = '';
      try {
        stringBuffer = new java.lang.StringBuffer();
        line = input.readLine();

        // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
        // http://www.unicode.org/faq/utf_bom.html

        // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
        // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
        if (line && line.length() && line.charAt(0) === 0xfeff) {
          // Eat the BOM, since we've already found the encoding on this file,
          // and we plan to concatenating this buffer with others; the BOM should
          // only appear at the top of a file.
          line = line.substring(1);
        }

        if (line !== null) {
          stringBuffer.append(line);
        }

        while ((line = input.readLine()) !== null) {
          stringBuffer.append(lineSeparator);
          stringBuffer.append(line);
        }
        //Make sure we return a JavaScript string and not a Java string.
        content = String(stringBuffer.toString()); //String
      } finally {
        input.close();
      }
      callback(content);
    };
  } else if (masterConfig.env === 'xpconnect' || (!masterConfig.env &&
    typeof Components !== 'undefined' && Components.classes &&
    Components.interfaces)) {
    //Avert your gaze!
    Cc = Components.classes;
    Ci = Components.interfaces;
    Components.utils['import']('resource://gre/modules/FileUtils.jsm');
    xpcIsWindows = ('@mozilla.org/windows-registry-key;1' in Cc);

    text.get = function (url, callback) {
      var inStream, convertStream, fileObj,
        readData = {};

      if (xpcIsWindows) {
        url = url.replace(/\//g, '\\');
      }

      fileObj = new FileUtils.File(url);

      //XPCOM, you so crazy
      try {
        inStream = Cc['@mozilla.org/network/file-input-stream;1']
          .createInstance(Ci.nsIFileInputStream);
        inStream.init(fileObj, 1, 0, false);

        convertStream = Cc['@mozilla.org/intl/converter-input-stream;1']
          .createInstance(Ci.nsIConverterInputStream);
        convertStream.init(inStream, "utf-8", inStream.available(),
          Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);

        convertStream.readString(inStream.available(), readData);
        convertStream.close();
        inStream.close();
        callback(readData.value);
      } catch (e) {
        throw new Error((fileObj && fileObj.path || '') + ': ' + e);
      }
    };
  }
  return text;
});
requirejs.config({
  paths: {
    'underscore': './libs/underscore-1.6.0',
    'xml2json': './libs/xml2json',
    'emitter': './libs/emitter',
    'text': './libs/require/text'
  },
  shim: {
    'underscore': {
      exports: ['_']
    }
  }
});

define('libs/main',['underscore', 'xml2json', 'emitter', 'text'], function(underscorejs, _x2j, _emitter) {
  var gX2j, jqX2j, _$, _base;
  global.libs = (function() {
    function libs() {}

    return libs;

  })();
  if (typeof xml2json !== 'undefined') {
    gX2j = xml2json;
  }
  if (typeof jQuery !== 'undefined' && typeof jQuery.xml2json !== 'undefined') {
    jqX2j = jQuery.xml2json;
  }
  if ((_base = global.libs).x2js == null) {
    _base.x2js = gX2j || jqX2j;
  }
  _$ = {};
  _$.fn = {
    "function": function() {}
  };
  global.libs.$ = global.libs.jQuery = _$;
  global.libs._ = underscorejs;
  return global.libs.emitter = _emitter;
});


require(["libs/main"]);


/**
* ClientProcessor class will be ..
* @namespace engine.controllers
* @class ClientProcessor
*
 */
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('processors/client/client.processor',[], function() {
  var ClientProcessor;
  ClientProcessor = (function(_super) {
    var lexUtil;

    __extends(ClientProcessor, _super);

    lexUtil = null;

    ClientProcessor.instances = {};

    ClientProcessor.prototype.emotionStates = [];

    function ClientProcessor(app) {
      this.app = app;

      /*@.on 'lexical:ready', ()->
        @app.emit('processor:ready')
        @.ready.call()
       */
      lexUtil = new global.engine.processors.client.controllers.Lexical(this);
      global.runtime.helpers.MakeGlobalNamespaceAndObject({
        path: 'runtime.helpers.lexical',
        object: lexUtil,
        global: global,
        shortcut: 'e$rhl'
      });
    }

    ClientProcessor.prototype.feelText = function(text, context) {
      var affectWords, capsLockCoef, emoWord, emoWordSurprise, emoticonCoef, exclaminationQoef, hasNegation, modifierCoef, negation, previousWord, ret, sentence, sentences, splittedWord, splittedWords, t1, t2, t3, word, words, _i, _j, _k, _len, _len1, _len2;
      ClientProcessor.__super__.feelText.apply(this, arguments);
      if (context == null) {
        context = 'default';
      }
      console.log('client feelText: ' + text);
      t1 = Date.now();
      text = text.replace('\n', ' ');
      affectWords = [];
      sentences = global.engine.processors.client.controllers.Parsing.parseSentences(text);
      for (_i = 0, _len = sentences.length; _i < _len; _i++) {
        sentence = sentences[_i];
        console.log('- ' + sentence);
        exclaminationQoef = global.engine.processors.client.controllers.Heuristics.computeExclaminationQoef(sentence.toLowerCase());
        if (global.engine.processors.client.controllers.Heuristics.hasExclaminationQuestionMarks(sentence)) {
          emoWordSurprise = new global.engine.processors.client.classes.AffectWord("?!");
          emoWordSurprise.setSurpriseWeight(1.0);
          affectWords.push(emoWordSurprise);
        }
        hasNegation = false;
        splittedWords = global.engine.processors.client.controllers.Parsing.splitWords(sentence, ' ');
        previousWord = '';
        negation = '';
        for (_j = 0, _len1 = splittedWords.length; _j < _len1; _j++) {
          splittedWord = splittedWords[_j];
          emoWord = lexUtil.getEmoticonAffectWord(splittedWord);
          if (emoWord === null) {
            emoWord = lexUtil.getEmoticonAffectWord(splittedWord.toLowerCase());
          }
          if (emoWord !== null) {
            emoticonCoef = global.engine.processors.client.controllers.Heuristics.computeEmoticonCoef(splittedWord, emoWord);
            if (emoticonCoef === 1.0) {
              emoticonCoef = global.engine.processors.client.controllers.Heuristics.computeEmoticonCoef(splittedWord.toLowerCase(), emoWord);
            }
            emoWord.adjustWeights(exclaminationQoef * emoticonCoef);
            affectWords.push(emoWord);
          } else {
            words = global.engine.processors.client.controllers.Parsing.parseWords(splittedWord);
          }
          for (_k = 0, _len2 = words.length; _k < _len2; _k++) {
            word = words[_k];
            if (global.engine.processors.client.controllers.Heuristics.isNegation(word.toLowerCase())) {
              negation = word;
              hasNegation = true;
            }
            emoWord = lexUtil.getAffectWord(word.toLowerCase());
            if (emoWord === null) {
              emoWord = lexUtil.getEmoticonAffectWord(word.toLowerCase());
            }
            if (emoWord !== null) {
              capsLockCoef = global.engine.processors.client.controllers.Heuristics.computeCapsLockQoef(word);
              modifierCoef = global.engine.processors.client.controllers.Heuristics.computeModifier(previousWord);
              if (hasNegation && lexUtil.inTheSamePartOfTheSentence(negation, emoWord.getWord(), sentence)) {
                emoWord.flipValence();
              }
              emoWord.adjustWeights(exclaminationQoef * capsLockCoef * modifierCoef);
              console.groupCollapsed('affect word ', word);
              console.dir(emoWord);
              console.groupEnd();
              affectWords.push(emoWord);
            }
            previousWord = word;
          }
        }
      }
      console.dir('all affectWords: ' + affectWords);
      ret = this.createEmotionState(text, affectWords, 'TEXT');
      this.emotionStates.push(ret);
      t2 = Date.now();
      window.t3 = t3 = t2 - t1;
      console.log('Context feelText time: ' + t3 / 1000 + 's');
      this.app.emit('processor:feel:' + context, ret);
      this.app.emit('processor:feel', ret, context);
      return ret;
    };

    ClientProcessor.prototype.createEmotionState = function(text, affectWords, TYPE) {
      var affectWord, angerWeight, disgustWeight, emotions, fearWeight, generalValence, generalWeight, happinessWeight, ret, sadnessWeight, surpriseWeight, valence, _i, _len;
      ClientProcessor.__super__.createEmotionState.apply(this, arguments);

      /*console.dir
        message: 'abstract createEmotionState: '
        affectWords : affectWords
        TYPE : TYPE
       */
      emotions = [];
      generalValence = 0;
      valence = 0.0;
      generalWeight = 0.0;
      happinessWeight = 0.0;
      sadnessWeight = 0.0;
      angerWeight = 0.0;
      fearWeight = 0.0;
      disgustWeight = 0.0;
      surpriseWeight = 0.0;
      for (_i = 0, _len = affectWords.length; _i < _len; _i++) {
        affectWord = affectWords[_i];
        valence += affectWord.getGeneralValence();
        if (affectWord.getGeneralWeight() > generalWeight) {
          generalWeight = affectWord.getGeneralWeight();
        }
        if (affectWord.getHappinessWeight() > happinessWeight) {
          happinessWeight = affectWord.getHappinessWeight();
        }
        if (affectWord.getSadnessWeight() > sadnessWeight) {
          sadnessWeight = affectWord.getSadnessWeight();
        }
        if (affectWord.getAngerWeight() > angerWeight) {
          angerWeight = affectWord.getAngerWeight();
        }
        if (affectWord.getFearWeight() > fearWeight) {
          fearWeight = affectWord.getFearWeight();
        }
        if (affectWord.getDisgustWeight() > disgustWeight) {
          disgustWeight = affectWord.getDisgustWeight();
        }
        if (affectWord.getSurpriseWeight() > surpriseWeight) {
          surpriseWeight = affectWord.getSurpriseWeight();
        }
      }
      if (valence > 0) {
        generalValence = 1;
      } else if (valence < 0) {
        generalValence = -1;
      }
      if (happinessWeight > 0) {
        emotions.push(new global.engine.classes.Emotion(happinessWeight, global.engine.classes.Emotion.HAPPINESS));
      }
      if (sadnessWeight > 0) {
        emotions.push(new global.engine.classes.Emotion(sadnessWeight, global.engine.classes.Emotion.SADNESS));
      }
      if (angerWeight > 0) {
        emotions.push(new global.engine.classes.Emotion(angerWeight, global.engine.classes.Emotion.ANGER));
      }
      if (fearWeight > 0) {
        emotions.push(new global.engine.classes.Emotion(fearWeight, global.engine.classes.Emotion.FEAR));
      }
      if (disgustWeight > 0) {
        emotions.push(new global.engine.classes.Emotion(disgustWeight, global.engine.classes.Emotion.DISGUST));
      }
      if (surpriseWeight > 0) {
        emotions.push(new global.engine.classes.Emotion(surpriseWeight, global.engine.classes.Emotion.SURPRISE));
      }
      if (emotions.length === 0) {
        emotions.push(new global.engine.classes.Emotion((0.2 + generalWeight) / 1.2, global.engine.classes.Emotion.NEUTRAL));
      }
      ret = new global.engine.classes.EmotionState(text, emotions, generalWeight, generalValence, TYPE);
      return ret;
    };

    ClientProcessor.prototype.ready = function(callback) {
      return ClientProcessor.__super__.ready.apply(this, arguments);
    };

    return ClientProcessor;

  })(global.engine.classes.AbstractProcessor);
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'processors.client.ClientProcessor',
    object: ClientProcessor,
    global: global,
    shortcut: 'e$pcc'
  });
});

define('processors/client/controllers/heuristics',[], function() {
  var Heuristics;
  Heuristics = (function() {
    var countChars, isCapsLock, isIntensityModifier;

    function Heuristics() {}

    isCapsLock = function(word) {
      var x, _i, _ref;
      for (x = _i = 1, _ref = word.length; _i < _ref; x = _i += 1) {
        if (word[x] === word[x].toLowerCase()) {
          return false;
        }
      }
      return true;
    };

    isIntensityModifier = function(word) {
      return global.runtime.helpers.lexical.isIntensityModifier(word);
    };

    countChars = function(arg, c) {
      var count, i, _i, _ref;
      count = 0;
      for (i = _i = 1, _ref = arg.length; _i < _ref; i = _i += 1) {
        if (arg[i] === c) {
          count++;
        }
      }
      return count;
    };

    Heuristics.computeEmoticonCoefForSentence = function(sentence) {
      var emot, emoticons, value, _fn, _i, _len;
      emoticons = global.runtime.helpers.lexical.getEmoticonWords(sentence);
      value = 1.0;
      _fn = function(emot) {
        var emotWord;
        emotWord = emot.getWord();
        return value *= 1.0 + (0.2 * countChars(sentence, emotWord.charAt(emotWord.length - 1)));
      };
      for (_i = 0, _len = emoticons.length; _i < _len; _i++) {
        emot = emoticons[_i];
        _fn(emot);
      }
      return value;
    };

    Heuristics.computeEmoticonCoef = function(word, emoticon) {
      var emotiveWord;
      if (emoticon.startsWithEmoticon()) {
        emotiveWord = emoticon.getWord();
        return 1.0 + (0.2 * countChars(word, emotiveWord.charAt(emotiveWord.length - 1)));
      } else {
        return 1.0;
      }
    };

    Heuristics.computeCapsLockQoef = function(word) {
      if (isCapsLock(word)) {
        return 1.5;
      } else {
        return 1.0;
      }
    };

    Heuristics.isNegation = function(sentence) {
      return global.runtime.helpers.lexical.isNegation(sentence);
    };

    Heuristics.computeModifier = function(word) {
      if (isIntensityModifier(word)) {
        return 1.5;
      } else {
        return 1.0;
      }
    };

    Heuristics.computeCapsLockQoef = function(word) {
      if (isCapsLock(word)) {
        return 1.5;
      } else {
        return 1.0;
      }
    };

    Heuristics.computeExclaminationQoef = function(text) {
      return 1.0 + (0.2 * countChars(text, '!'));
    };


    /*
    * Returns is there a "!?" or a "?!" in a sentece.
    *
    * @param text {@link String} representing the sentence
    * @return boolean representing the existance of a "!?" or a "?!"
     */

    Heuristics.hasExclaminationQuestionMarks = function(text) {
      if ((text.indexOf('?!') > -1) || (text.indexOf('!?') > -1)) {
        return true;
      }
      return false;
    };

    Heuristics.prototype.isCapsLock = function(word) {
      if (word.toUpperCase() === word) {
        return true;
      } else {
        return false;
      }
    };

    Heuristics.prototype.isIntensityModifier = function(word) {
      return global.runtime.helpers.lexical.isIntensityModifier(word);
    };

    Heuristics.prototype.countChars = function(arg, c) {
      var count, i, _i, _ref;
      count = 0;
      for (i = _i = 0, _ref = arg.length; _i < _ref; i = _i += 1) {
        if (arg[i] === c) {
          count++;
        }
      }
      return count;
    };

    return Heuristics;

  })();
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.processors.client.controllers.Heuristics',
    object: Heuristics
  });
});

define('processors/client/controllers/lexical',[], function() {
  var Lexical, dataServerAddr;
  dataServerAddr = global.engine.core.Config.dataServerRoot;
  Lexical = (function() {
    var affectWords, emoticons, emoticonsFilePath, instance, intensityModifiers, keywordsFilePath, lexiconFilePath, negations, normalisator;

    instance = null;

    keywordsFilePath = '/lex/keywords';

    lexiconFilePath = dataServerAddr + '/lex/lexicon';

    emoticonsFilePath = dataServerAddr + '/lex/lexicon_emoticons';

    affectWords = null;

    emoticons = null;

    negations = null;

    intensityModifiers = null;

    normalisator = 1;

    function Lexical(processor) {
      var pm, that;
      affectWords = [];
      emoticons = [];
      that = this;
      pm = new emojs.engine.controllers.PropertiesManager(keywordsFilePath, function(data) {
        negations = global.engine.processors.client.controllers.Parsing.splitWords(pm.getProperty('negations'), ', ');
        intensityModifiers = global.engine.processors.client.controllers.Parsing.splitWords(pm.getProperty("intensity.modifiers"), ", ");
        return that.parseLexiconFile(lexiconFilePath, function(data) {
          affectWords = data;
          return that.parseLexiconFile(emoticonsFilePath, function(data) {
            emoticons = data;
            return processor.emit('lexical:ready');
          });
        });
      });
    }

    Lexical.getInstance = function() {
      if (instance === null) {
        instance = new Lexical();
      }
      return instance;
    };

    Lexical.prototype.parseLexiconFile = function(fileName, callback) {
      var parsedFile, that, wordList;
      wordList = [];
      that = this;
      return parsedFile = emojs.engine.controllers.FileReader.readFile(fileName, function(file) {
        var line, lines, record, _i, _len;
        lines = file.split('\n');
        for (_i = 0, _len = lines.length; _i < _len; _i++) {
          line = lines[_i];
          record = that.parseLine(line);
          wordList.push(record);
        }
        if (typeof callback !== 'undefined') {
          return callback(wordList);
        }
      });
    };

    Lexical.prototype.parseLine = function(line) {
      value;
      var angerWeight, disgustWeight, fearWeight, generalWeight, happinessWeight, sadnessWeight, surpriseWeight, text, value, word;
      text = line.split(' ');
      word = text[0];
      generalWeight = parseFloat(text[1]);
      happinessWeight = parseFloat(text[2]);
      sadnessWeight = parseFloat(text[3]);
      angerWeight = parseFloat(text[4]);
      fearWeight = parseFloat(text[5]);
      disgustWeight = parseFloat(text[6]);
      surpriseWeight = parseFloat(text[7]);
      value = new global.engine.classes.AffectWord(word, generalWeight, happinessWeight, sadnessWeight, angerWeight, fearWeight, disgustWeight, surpriseWeight, normalisator);
      return value;
    };

    Lexical.prototype.getAffectWord = function(word) {
      var affectWord, _i, _len;
      for (_i = 0, _len = affectWords.length; _i < _len; _i++) {
        affectWord = affectWords[_i];
        if (affectWord.getWord() === word) {
          return affectWord.clone();
        }
      }
      return null;
    };

    Lexical.prototype.getEmoticonAffectWord = function(word) {
      var affectWordEmoticon, _fn, _fn1, _i, _j, _len, _len1;
      _fn = function(affectWordEmoticon) {
        if (affectWordEmoticon.getWord() === word) {
          return affectWordEmoticon.clone();
        }
      };
      for (_i = 0, _len = emoticons.length; _i < _len; _i++) {
        affectWordEmoticon = emoticons[_i];
        _fn(affectWordEmoticon);
      }
      _fn1 = function(affectWordEmoticon) {
        var emoticon;
        emoticon = affectWordEmoticon.getWord();
        if (global.engine.processors.client.controllers.Parsing.containsFirst(word, emoticon)) {
          affectWordEmoticon.setStartsWithEmoticon(true);
          return affectWordEmoticon.clone();
        }
      };
      for (_j = 0, _len1 = emoticons.length; _j < _len1; _j++) {
        affectWordEmoticon = emoticons[_j];
        _fn1(affectWordEmoticon);
      }
      return null;
    };

    Lexical.prototype.getEmoticonWords = function(sentence) {
      var emoticon, value, _fn, _i, _len;
      value = [];
      _fn = function(emoticon) {
        var emoticonWord;
        emoticonWord = emoticon.getWord();
        if (sentence.contains(emoticonWord)) {
          emoticon.setStartsWithEmoticon(true);
          return value.push(emoticon);
        }
      };
      for (_i = 0, _len = emoticons.length; _i < _len; _i++) {
        emoticon = emoticons[_i];
        _fn(emoticon);
      }
      return value;
    };

    Lexical.prototype.getAffectWords = function() {
      return affectWords;
    };

    Lexical.prototype.isNegation = function(word) {
      var ret;
      return ret = negations.indexOf(word) > -1;
    };


    /*hasNegation : (sentence) ->
      for negation in negations
        if sentence.indexOf(negation) > -1
          return true
      return false
     */

    Lexical.prototype.isIntensityModifier = function(word) {
      var ret;
      return ret = intensityModifiers.indexOf(word) > -1;
    };

    Lexical.prototype.inTheSamePartOfTheSentence = function(negation, word, sentence) {
      var i, j, k, tmp, _i;
      i = sentence.indexOf(negation);
      j = sentence.indexOf(word);
      if (i < j) {
        i += negation.length;
      } else {
        tmp = i;
        i = j + word.length;
        j = tmp;
      }
      for (k = _i = i; _i < j; k = _i += 1) {
        if ((sentence[k] === ',') || (sentence[k] === '.') || (sentence[k] === ';') || (sentence[k] === ':') || (sentence[k] === '-')) {
          return false;
        }
      }
      return true;
    };

    return Lexical;

  })();
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.processors.client.controllers.Lexical',
    object: Lexical
  });
});

define('processors/client/controllers/parsing',[], function() {
  var Parsing;
  Parsing = (function() {
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
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.processors.client.controllers.Parsing',
    object: Parsing,
    shortcut: 'e$epccp'
  });
});

global.runtime.helpers.MakeGlobalNamespaceFromString('engine.processors.client.controllers');

define('processors/client/controllers/main',['processors/client/controllers/heuristics', 'processors/client/controllers/lexical', 'processors/client/controllers/parsing'], function() {});

define('processors/client/classes/affect.word',[], function() {
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
    path: 'engine.processors.client.classes.AffectWord',
    object: AffectWord
  });
});

define('processors/client/main',['processors/client/client.processor', 'processors/client/controllers/main', 'processors/client/classes/affect.word'], function() {
  var processor;
  processor = new emojs.processors.client.ClientProcessor(emojs.runtime.app);
  processor.runOrWait('lexical:ready', function() {
    emojs.runtime.app.emit('processor:ready');
    return processor.ready.call();
  });
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'runtime.app.processor',
    object: processor,
    global: global,
    shortcut: 'e$rp'
  });
});

var Processor;

Processor = (function() {
  function Processor() {}

  return Processor;

})();

define('processors/main',['processors/client/main'], function() {
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.processors',
    object: Processor
  });
});


require(["processors/main"]);

define('modules.core/input.text',[], function() {
  var Text;
  Text = (function() {
    function Text() {}

    Text.emo = function(value, contextName) {
      if (!contextName || contextName === '' || contextName === 'default') {

        /*if (@text()!='')
          text = @text()
        else
          text = @val()
         */
        contextName = 'default';
        return this.process(value, contextName);
      } else {
        return this.process(value, contextName);
      }
    };

    Text.process = function(text, contextName) {
      var curProc, processedEmo;
      curProc = global.runtime.app.getProcessorInstance();
      return processedEmo = curProc.feelText(text);
    };

    return Text;

  })();
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'modules.core.input.text',
    object: Text
  });
});

define('modules.core/ui.jquery',[], function() {
  global.libs.$.fn.emo1 = function(contextName) {
    var text;
    if (!contextName || contextName === '' || contextName === 'default') {

      /*if (@text()!='')
        text = @text()
      else
        text = @val()
       */
      text = this[0].value;
      return this.process(text, contextName);
    } else if (contextName === 'user1') {
      return {};
    }
  };

  /*$.fn.feel = ()->
    empathyScope.feel(@val())
   */
  return global.libs.$.fn.process1 = function(text, contextName) {
    var context, current;
    context = global.core.api.Context.getInstance(contextName);
    return current = context.feel(text);
  };
});


/*
  $.fn.art = (contextName, moduleName) ->
    ret = null
    if(!moduleName || moduleName == '' || moduleName == 'synemania')
       *synemania effect:
      ret = new global.output.art.sketch.Synemania(@, contextName)
      $(window).on 'context:feel:' + contextName, (e, state)->
        ret.update(state)

    else if (moduleName == 'splash')
       *show user waves!
      debugger
    else
      debugger
    ret
 */
;
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('modules.core/output.logger',[], function() {
  var Logger;
  Logger = (function(_super) {
    __extends(Logger, _super);

    function Logger() {
      return Logger.__super__.constructor.apply(this, arguments);
    }

    return Logger;

  })(global.engine.classes.AbstractController);
  global.runtime.app.on('processor:feel', function(state, contextName) {
    return console.log(state.toString());
  });
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'engine.output.Logger',
    object: Logger
  });
});

var Input;

global.runtime.helpers.MakeGlobalNamespaceFromString('engine.input', global);

Input = (function() {
  function Input() {}

  return Input;

})();

define('modules.core/main',['modules.core/input.text', 'modules.core/ui.jquery', 'modules.core/output.logger'], function() {
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'runtime.app.modules.core',
    object: {},
    global: emojs
  });
});

define('modules.core', ['modules.core/main'], function (main) { return main; });

var HeartsParticle, SnailParticle, SpiralParticle, retObj;

SpiralParticle = (function() {
  function SpiralParticle(x, y, ctx) {
    this.ctx = ctx;
    this.x = x / 2.1;
    this.y = y / 5;
    this.collide();
  }

  SpiralParticle.prototype.color = '#ff0000';

  SpiralParticle.prototype.vx = null;

  SpiralParticle.prototype.vy = null;

  SpiralParticle.prototype.speed = 1;

  SpiralParticle.prototype.i = 0;

  SpiralParticle.prototype.coords = [];

  SpiralParticle.prototype.collide = function() {
    this.theta = Math.random() * 6.28;
    this.speed = Math.randomRange(1.001, 1.0001);
    this.speedD = 1.001;
    this.thetaD = 0;
    this.thetaDD = 0;
    while (Math.abs(this.thetaDD) < 0.00001) {
      this.thetaDD = Math.randomRange(-0.001, 0.001);
    }
    this.thetaD = 0.1;
    this.color = '#ff0000';
    this.alpha = 1;
    return this.alphaD = 0.0005;
  };

  SpiralParticle.prototype.move = function() {
    var c1;
    c1 = {
      i: ++this.i,
      x: this.x,
      y: this.y,
      a: this.alpha
    };
    this.coords.push(c1);
    this.x += this.vx;
    this.y += this.vy;
    this.vx = this.speed * Math.sin(this.theta);
    this.vy = this.speed * Math.cos(this.theta);
    this.theta += this.thetaD;
    this.speed *= this.speedD;
    return this.alpha -= this.alphaD;
  };

  SpiralParticle.prototype.draw = function() {
    return this.move();
  };

  return SpiralParticle;

})();

SnailParticle = (function() {
  function SnailParticle(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.collide();
  }

  SnailParticle.prototype.color = '#ff0000';

  SnailParticle.prototype.vx = null;

  SnailParticle.prototype.vy = null;

  SnailParticle.prototype.speed = 1;

  SnailParticle.prototype.collide = function() {
    this.theta = Math.random() * 6.28;
    this.speed = Math.randomRange(0.5, 3.5);
    this.speedD = Math.randomRange(0.996, 1.001);
    this.thetaD = 0;
    this.thetaDD = 0;
    while (Math.abs(this.thetaDD) < 0.00001) {
      this.thetaDD = Math.randomRange(-0.001, 0.001);
    }
    return this.color = '#ff0000';
  };

  SnailParticle.prototype.move = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, 1, 1);
    this.x += this.vx;
    this.y += this.vy;
    this.vx = this.speed * Math.sin(this.theta);
    this.vy = this.speed * Math.cos(this.theta);
    this.theta += this.thetaD;
    this.thetaD += this.thetaDD;
    return this.speed *= this.speedD;
  };

  SnailParticle.prototype.draw = function() {
    return this.move();
  };

  return SnailParticle;

})();

HeartsParticle = (function() {
  function HeartsParticle() {}

  return HeartsParticle;

})();

retObj = {
  Hearts: HeartsParticle,
  Spiral: SpiralParticle,
  Snail: SnailParticle
};

emojs.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'output.art.particles',
  object: retObj
});

define("modules.sketch/class.particle", function(){});

emojs.runtime.helpers.MakeGlobalNamespaceFromString('output.art');


/*confObj =
  shim:
    './sketch/_sketch_.js':
      deps: ['./sketch/_sketch_.js']

requirejs.config(confObj)
 */

define('modules.sketch/ui.jquery',[], function(_$) {
  $.fn.art = function(contextName, moduleName) {
    var ret;
    contextName = contextName || 'default';
    ret = null;
    if (!moduleName || moduleName === '' || moduleName === 'synemania') {
      ret = new global.output.art.sketch.Synemania(this, contextName);
      global.libs.$(window).on('context:feel:' + contextName, function(e, state) {
        var a;
        a = contextName;
        return ret.update(state);
      });
    } else if (moduleName === 'splash') {
      debugger;
    } else {
      debugger;
    }
    return ret;
  };
  $.fn.backgroundContext = function(contextName, moduleName) {
    var that;
    that = this;
    return global.libs.$(window).on('context:feel:' + contextName, function(e, state) {
      var imgData, ret, tempCanvasEl, x, _i;
      tempCanvasEl = global.libs.$('<canvas id="canvasOverlay"></canvas>');
      tempCanvasEl.attr('style', 'width: ' + that.css('width') + '; height: ' + that.css('height') + ';');
      tempCanvasEl[0].getContext('2d').globalAlpha = 0.4;
      contextName = contextName || 'default';
      ret = null;
      if (!moduleName || moduleName === '' || moduleName === 'synemania') {
        ret = new global.output.art.sketch.Synemania(tempCanvasEl, contextName);
        ret.update(state);
        for (x = _i = 1; _i <= 1000; x = _i += 1) {
          ret.draw(contextName);
        }
      } else if (moduleName === 'splash') {
        debugger;
      } else {
        debugger;
      }
      imgData = tempCanvasEl[0].toDataURL();
      that.css('background', 'url("' + imgData + '")');
      return that.css('background-size', '100% 100%');
    });
  };
  $.fn.drawEmotion = function(contextName, sourceEmotionText) {
    var emotion, i, synemania, tempCanvasEl, text, that, x, _i, _ref, _results;
    contextName = contextName || 'default';
    that = this;
    _results = [];
    for (i = _i = 0, _ref = this.length - 1; _i <= _ref; i = _i += 1) {
      tempCanvasEl = that[i];
      text = sourceEmotionText || that[i].innerText;
      emotion = emojs.modules.core.input.text.emo(text, contextName);
      if (emotion.getStrongestEmotion().getName() === 'HAPPINESS') {
        tempCanvasEl.getContext('2d').globalAlpha = 0.4;
      } else if (emotion.getStrongestEmotion().getName() === 'SURPRISE') {
        tempCanvasEl.getContext('2d').globalAlpha = 0.3;
      } else if (emotion.getStrongestEmotion().getName() === 'NEUTRAL') {
        tempCanvasEl.getContext('2d').globalAlpha = 0.1;
      } else {
        tempCanvasEl.getContext('2d').globalAlpha = 0.1;
      }
      emotion.id = 'emo' + Math.floor(Math.random(2) * 100);
      synemania = new emojs.modules.sketch.output.synemania.Synemania(tempCanvasEl, contextName);
      synemania.update(emotion);
      _results.push((function() {
        var _j, _results1;
        _results1 = [];
        for (x = _j = 1; _j <= 1000; x = _j += 1) {
          _results1.push(synemania.draw(contextName));
        }
        return _results1;
      })());
    }
    return _results;
  };
  $.fn.backgroundEmotion = function(contextName, sourceEmotionText) {
    var attr, emotion, i, imgData, synemania, tempCanvasEl, text, that, x, _i, _j, _ref, _results;
    contextName = contextName || 'default';
    that = this;
    _results = [];
    for (i = _i = 0, _ref = this.length - 1; _i <= _ref; i = _i += 1) {
      tempCanvasEl = document.createElement('canvas');
      tempCanvasEl.id = 'canvasOverlay';
      attr = document.createAttribute('style');
      attr.value = 'width: ' + that.css('width') + '; height: ' + that.css('height') + ';';
      tempCanvasEl.setAttributeNode(attr);
      text = sourceEmotionText || that[i].innerText;
      emotion = emojs.modules.core.input.text.emo(text, contextName);
      if (emotion.getStrongestEmotion().getName() === 'HAPPINESS') {
        tempCanvasEl.getContext('2d').globalAlpha = 0.4;
      } else if (emotion.getStrongestEmotion().getName() === 'SURPRISE') {
        tempCanvasEl.getContext('2d').globalAlpha = 0.3;
      } else if (emotion.getStrongestEmotion().getName() === 'NEUTRAL') {
        tempCanvasEl.getContext('2d').globalAlpha = 0.1;
      } else {
        tempCanvasEl.getContext('2d').globalAlpha = 0.1;
      }
      emotion.id = 'emo' + Math.floor(Math.random(2) * 100);
      synemania = new emojs.modules.sketch.output.synemania.Synemania(tempCanvasEl, contextName);
      synemania.update(emotion);
      for (x = _j = 1; _j <= 1000; x = _j += 1) {
        synemania.draw(contextName);
      }
      window.tempCanvasEl = tempCanvasEl;
      imgData = tempCanvasEl.toDataURL();
      $(that[i]).css('background-image', 'url("data:' + imgData + '")');
      _results.push($(that[i]).css('background-size', '100% 100%'));
    }
    return _results;
  };
  return $.fn.clearBackground = function() {
    return $(this).css('background-image', global.libs.$(this).prevBackground || 'none');
  };
});

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

define('modules.sketch/helper.palette',[], function() {
  return emojs.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'output.art.utils.SynesketchPalette',
    object: SynesketchPalette
  });
});


/**
*  Classes which describe emotion-specific particles, that is visual representation of each emotion.
*
* @module Synemania
*
 */
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('modules.sketch/output.synemania',['modules.sketch/helper.palette'], function() {
  var AngryParticle, DisgustParticle, FearParticle, HappyParticle, NeutralParticle, Particle, SadParticle, SupriseParticle, Synemania, TWO_PI, dim, palette, retObj;
  dim = 500;
  TWO_PI = 6.28;
  palette = new global.output.art.utils.SynesketchPalette('standard');
  window.testParticles = window.testParticles || [];

  /**
  * Class representing a particle
  *
  * @namespace emo.output.art.sketch
  * @class Particle
  *
   */
  Particle = (function() {
    Particle.prototype.color = null;

    Particle.prototype.x = null;

    Particle.prototype.y = null;

    Particle.prototype.vx = null;

    Particle.prototype.vy = null;

    Particle.prototype.theta = null;

    Particle.prototype.speed = null;

    Particle.prototype.speedD = null;

    Particle.prototype.thetaD = null;

    Particle.prototype.thetaDD = null;

    function Particle(ctx) {
      this.ctx = ctx;
      this.x = dim / 2;
      this.y = dim / 2;
      testParticles.push(this);
    }

    Particle.prototype.collide = function() {
      throw 'abstract';
    };

    Particle.prototype.move = function() {
      throw 'abstract';
    };

    return Particle;

  })();
  NeutralParticle = (function(_super) {
    __extends(NeutralParticle, _super);

    NeutralParticle.prototype.gray = null;

    function NeutralParticle(ctx) {
      NeutralParticle.__super__.constructor.call(this, ctx);
      this.gray = 0xFFFFFF;
      this.count = 0;
    }

    NeutralParticle.prototype.collide = function() {
      var _results;
      this.x = dim / 2;
      this.y = dim / 2;
      this.theta = Math.random() * TWO_PI;
      this.speed = Math.randomRange(0.5, 3.5);
      this.speedD = Math.randomRange(0.996, 1.001);
      this.thetaD = 0;
      this.thetaDD = 0;
      _results = [];
      while (Math.abs(this.thetaDD) < 0.00001) {
        _results.push(this.thetaDD = Math.randomRange(-0.001, 0.001));
      }
      return _results;
    };

    NeutralParticle.prototype.move = function() {
      var col16;
      col16 = this.gray.toString(16);
      this.ctx.fillStyle = 'rgba(' + emojs.runtime.helpers.hexToR(col16) + ',' + emojs.runtime.helpers.hexToG(col16) + ',' + emojs.runtime.helpers.hexToB(col16) + ',0.2)';
      this.ctx.fillRect(this.x, this.y - 1, 1, 1);
      this.x += this.vx;
      this.y += this.vy;
      this.vx = this.speed * Math.sin(this.theta);
      this.vy = this.speed * Math.cos(this.theta);

      /*if(@x>0)
        debugger
       */
      if ((Math.random() * 1000) > 990) {
        this.x = dim / 2;
        this.y = dim / 2;
        this.collide();
      }
      if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
        this.x = dim / 2;
        this.y = dim / 2;
        return this.collide();
      }
    };

    return NeutralParticle;

  })(Particle);
  HappyParticle = (function(_super) {
    __extends(HappyParticle, _super);

    function HappyParticle() {
      return HappyParticle.__super__.constructor.apply(this, arguments);
    }

    HappyParticle.prototype.collide = function() {
      this.x = dim / 2;
      this.y = dim / 2;
      this.theta = Math.random() * TWO_PI;
      this.speed = Math.randomRange(0.5, 3.5);
      this.speedD = Math.randomRange(0.996, 1.001);
      this.thetaD = 0;
      this.thetaDD = 0;
      while (Math.abs(this.thetaDD) < 0.00001) {
        this.thetaDD = Math.randomRange(-0.001, 0.001);
      }
      return this.color = palette.getRandomHappinessColor();
    };

    HappyParticle.prototype.move = function() {
      var col16, fillst;
      if ((this.color != null)) {
        col16 = this.color.toString(16);
        this.count = this.count || 0;
        this.count += 1;
        this.ctx.fillStyle = 'rgba(' + emojs.runtime.helpers.hexToR(col16) + ',' + emojs.runtime.helpers.hexToG(col16) + ',' + emojs.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
        this.ctx.fillRect(this.x, this.y - 1, 1, 1);
        fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
        this.ctx.fillStyle = fillst;
        this.ctx.fillRect(0, this.y + 1, 1, 1);
      }
      this.x += this.vx;
      this.y += this.vy;
      this.vx = this.speed * Math.sin(this.theta);
      this.vy = this.speed * Math.cos(this.theta);
      this.theta += this.thetaD;
      this.thetaD += this.thetaDD;
      this.speed *= this.speedD;
      if ((Math.random() * 1000) > 997) {
        this.speedD = 1.0;
        this.thetaDD = 0.00001;
        if (Math.random() * 100 > 70) {
          this.x = dim / 2;
          this.y = dim / 2;
          this.collide();
        }
      }
      if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
        return this.collide();
      }
    };

    return HappyParticle;

  })(Particle);
  SadParticle = (function(_super) {
    __extends(SadParticle, _super);

    function SadParticle() {
      return SadParticle.__super__.constructor.apply(this, arguments);
    }

    SadParticle.prototype.collide = function() {
      this.x = dim / 2;
      this.y = dim / 2;
      this.theta = Math.random() * TWO_PI;
      this.speed = Math.randomRange(0.5, 3.5);
      this.speedD = Math.randomRange(0.996, 1.001);
      this.thetaD = 0;
      this.thetaDD = 0;
      while (Math.abs(this.thetaDD) < 0.00001) {
        this.thetaDD = Math.randomRange(-0.001, 0.001);
      }
      return this.color = palette.getRandomSadnessColor();
    };

    SadParticle.prototype.move = function() {
      var col16, fillst;
      if ((this.color != null)) {
        col16 = this.color.toString(16);
        this.count = this.count || 0;
        this.count += 1;
        this.ctx.fillStyle = 'rgba(' + emojs.runtime.helpers.hexToR(col16) + ',' + emojs.runtime.helpers.hexToG(col16) + ',' + emojs.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
        this.ctx.fillRect(this.x, this.y - 1, 1, 1);
        fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
        this.ctx.fillStyle = fillst;
        this.ctx.fillRect(0, this.y + 1, 1, 1);
      }
      this.x += this.vx;
      this.y += this.vy;
      this.vx = this.speed * Math.sin(this.theta);
      this.vy = this.speed * Math.cos(this.theta);
      this.theta += this.thetaD;
      this.thetaD += this.thetaDD;
      this.speed *= this.speedD;
      if ((Math.random() * 1000) > 997) {
        this.speedD = 1.0;
        this.thetaDD = 0.00001;
        if (Math.random() * 100 > 70) {
          this.collide();
        }
      }
      if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
        return this.collide();
      }
    };

    return SadParticle;

  })(Particle);
  AngryParticle = (function(_super) {
    __extends(AngryParticle, _super);

    function AngryParticle() {
      return AngryParticle.__super__.constructor.apply(this, arguments);
    }

    AngryParticle.prototype.collide = function() {
      this.x = dim / 2;
      this.y = dim / 2;
      this.theta = Math.random() * TWO_PI;
      this.speed = Math.randomRange(0.5, 3.5);
      this.speedD = Math.randomRange(0.996, 1.001);
      this.thetaD = 0;
      this.thetaDD = 0;
      while (Math.abs(this.thetaDD) < 0.00001) {
        this.thetaDD = Math.randomRange(-0.001, 0.001);
      }
      return this.color = palette.getRandomAngerColor();
    };

    AngryParticle.prototype.move = function() {
      var col16, fillst;
      if ((this.color != null)) {
        col16 = this.color.toString(16);
        this.count = this.count || 0;
        this.count += 1;
        this.ctx.fillStyle = 'rgba(' + emojs.runtime.helpers.hexToR(col16) + ',' + emojs.runtime.helpers.hexToG(col16) + ',' + emojs.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
        this.ctx.fillRect(this.x, this.y - 1, 1, 1);
        fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
        this.ctx.fillStyle = fillst;
        this.ctx.fillRect(0, this.y + 1, 1, 1);
      }
      this.x += this.vx;
      this.y += this.vy;
      this.vx = this.speed * Math.sin(this.theta);
      this.vy = this.speed * Math.cos(this.theta);
      this.theta += this.thetaD;
      this.thetaD += this.thetaDD;
      this.speed *= this.speedD;
      if ((Math.random() * 1000) > 997) {
        this.speedD = 1.0;
        this.thetaDD = 0.00001;
        if (Math.random() * 100 > 70) {
          this.x = dim / 2;
          this.y = dim / 2;
          this.collide();
        }
      }
      if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
        return this.collide();
      }
    };

    return AngryParticle;

  })(Particle);
  SupriseParticle = (function(_super) {
    __extends(SupriseParticle, _super);

    function SupriseParticle() {
      return SupriseParticle.__super__.constructor.apply(this, arguments);
    }

    SupriseParticle.prototype.collide = function() {
      this.x = dim / 2;
      this.y = dim / 2;
      this.theta = Math.random() * TWO_PI;
      this.speed = Math.randomRange(0.5, 3.5);
      this.speedD = Math.randomRange(0.996, 1.001);
      this.thetaD = 0;
      this.thetaDD = 0;
      while (Math.abs(this.thetaDD) < 0.00001) {
        this.thetaDD = Math.randomRange(-0.001, 0.001);
      }
      return this.color = palette.getRandomSurpriseColor();
    };

    SupriseParticle.prototype.move = function() {
      var col16, fillst;
      if ((this.color != null)) {
        col16 = this.color.toString(16);
        this.count = this.count || 0;
        this.count += 1;
        this.ctx.fillStyle = 'rgba(' + emojs.runtime.helpers.hexToR(col16) + ',' + emojs.runtime.helpers.hexToG(col16) + ',' + emojs.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
        this.ctx.fillRect(this.x, this.y - 1, 1, 1);
        fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
        this.ctx.fillStyle = fillst;
        this.ctx.fillRect(0, this.y + 1, 1, 1);
      }
      this.x += this.vx;
      this.y += this.vy;
      this.vx = this.speed * Math.sin(this.theta);
      this.vy = this.speed * Math.cos(this.theta);
      this.theta += this.thetaD;
      this.thetaD += this.thetaDD;
      this.speed *= this.speedD;
      if ((Math.random() * 1000) > 997) {
        this.speedD = 1.0;
        this.thetaDD = 0.00001;
        if (Math.random() * 100 > 70) {
          this.x = dim / 2;
          this.y = dim / 2;
          this.collide();
        }
      }
      if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
        return this.collide();
      }
    };

    return SupriseParticle;

  })(Particle);
  FearParticle = (function(_super) {
    __extends(FearParticle, _super);

    function FearParticle() {
      return FearParticle.__super__.constructor.apply(this, arguments);
    }

    FearParticle.prototype.collide = function() {
      this.x = dim / 2;
      this.y = dim / 2;
      this.theta = Math.random() * TWO_PI;
      this.speed = Math.randomRange(0.5, 3.5);
      this.speedD = Math.randomRange(0.996, 1.001);
      this.thetaD = 0;
      this.thetaDD = 0;
      while (Math.abs(this.thetaDD) < 0.00001) {
        this.thetaDD = Math.randomRange(-0.001, 0.001);
      }
      return this.color = palette.getRandomFearColor();
    };

    FearParticle.prototype.move = function() {
      var col16, fillst;
      if ((this.color != null)) {
        col16 = this.color.toString(16);
        this.count = this.count || 0;
        this.count += 1;
        this.ctx.fillStyle = 'rgba(' + emojs.runtime.helpers.hexToR(col16) + ',' + emojs.runtime.helpers.hexToG(col16) + ',' + emojs.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
        this.ctx.fillRect(this.x, this.y - 1, 1, 1);
        fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
        this.ctx.fillStyle = fillst;
        this.ctx.fillRect(0, this.y + 1, 1, 1);
      }
      this.x += this.vx;
      this.y += this.vy;
      this.vx = this.speed * Math.sin(this.theta);
      this.vy = this.speed * Math.cos(this.theta);
      this.theta += this.thetaD;
      this.thetaD += this.thetaDD;
      this.speed *= this.speedD;
      if ((Math.random() * 1000) > 997) {
        this.speedD = 1.0;
        this.thetaDD = 0.00001;
        if (Math.random() * 100 > 70) {
          this.x = dim / 2;
          this.y = dim / 2;
          this.collide();
        }
      }
      if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
        return this.collide();
      }
    };

    return FearParticle;

  })(Particle);
  DisgustParticle = (function(_super) {
    __extends(DisgustParticle, _super);

    function DisgustParticle() {
      return DisgustParticle.__super__.constructor.apply(this, arguments);
    }

    DisgustParticle.prototype.collide = function() {
      this.x = dim / 2;
      this.y = dim / 2;
      this.theta = Math.random() * TWO_PI;
      this.speed = Math.randomRange(0.5, 3.5);
      this.speedD = Math.randomRange(0.996, 1.001);
      this.thetaD = 0;
      this.thetaDD = 0;
      while (Math.abs(this.thetaDD) < 0.00001) {
        this.thetaDD = Math.randomRange(-0.001, 0.001);
      }
      return this.color = palette.getRandomDisgustColor();
    };

    DisgustParticle.prototype.move = function() {
      var col16, fillst;
      if ((this.color != null)) {
        col16 = this.color.toString(16);
        this.count = this.count || 0;
        this.count += 1;
        this.ctx.fillStyle = 'rgba(' + emojs.runtime.helpers.hexToR(col16) + ',' + emojs.runtime.helpers.hexToG(col16) + ',' + emojs.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
        this.ctx.fillRect(this.x, this.y - 1, 1, 1);
        fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
        this.ctx.fillStyle = fillst;
        this.ctx.fillRect(0, this.y + 1, 1, 1);
      }
      this.x += this.vx;
      this.y += this.vy;
      this.vx = this.speed * Math.sin(this.theta);
      this.vy = this.speed * Math.cos(this.theta);
      this.theta += this.thetaD;
      this.thetaD += this.thetaDD;
      this.speed *= this.speedD;
      if ((Math.random() * 1000) > 997) {
        this.speedD = 1.0;
        this.thetaDD = 0.00001;
        if (Math.random() * 100 > 70) {
          this.x = dim / 2;
          this.y = dim / 2;
          this.collide();
        }
      }
      if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
        return this.collide();
      }
    };

    return DisgustParticle;

  })(Particle);
  Synemania = (function() {
    var angries, currentEmotionState, currentParticles, currentText, disgusties, fearies, happies, maxAngries, maxDisgusties, maxFearies, maxHappies, maxNeutrals, maxSaddies, maxSurprises, neutrals, sadTheta, saddies, saturationFactor, surprises, syne;

    Synemania.serialVersionUID = '1L';

    maxHappies = 800;

    maxSaddies = 800;

    maxAngries = 800;

    maxSurprises = 800;

    maxFearies = 800;

    maxDisgusties = 800;

    maxNeutrals = 30;

    currentEmotionState = new emojs.engine.classes.EmotionState();

    syne = null;

    neutrals = [];

    happies = [];

    saddies = [];

    angries = [];

    surprises = [];

    fearies = [];

    disgusties = [];

    currentParticles = [];

    sadTheta = null;

    saturationFactor = 1.0;

    currentText = null;

    function Synemania($el, context, dim) {
      this.$el = $el;
      this.context = context;
      this.dim = dim;
      this.setup();
    }

    Synemania.prototype.setup = function() {
      var x, _i, _j, _k, _l, _m, _n, _o, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
      if (this.$el != null) {
        this.$el.width = dim;
        this.$el.height = dim;
      }
      this.ctx = this.$el.getContext("2d");
      for (x = _i = 0, _ref = maxNeutrals - 1; _i < _ref; x = _i += 1) {
        neutrals[x] = new emojs.modules.sketch.output.synemania.NeutralParticle(this.ctx);
      }
      for (x = _j = 0, _ref1 = maxSaddies - 1; _j < _ref1; x = _j += 1) {
        saddies[x] = new emojs.modules.sketch.output.synemania.SadParticle(this.ctx);
      }
      for (x = _k = 0, _ref2 = maxHappies - 1; _k < _ref2; x = _k += 1) {
        happies[x] = new emojs.modules.sketch.output.synemania.HappyParticle(this.ctx);
      }
      for (x = _l = 0, _ref3 = maxAngries - 1; _l < _ref3; x = _l += 1) {
        angries[x] = new emojs.modules.sketch.output.synemania.AngryParticle(this.ctx);
      }
      for (x = _m = 0, _ref4 = maxSurprises - 1; _m < _ref4; x = _m += 1) {
        surprises[x] = new emojs.modules.sketch.output.synemania.SupriseParticle(this.ctx);
      }
      for (x = _n = 0, _ref5 = maxFearies - 1; _n < _ref5; x = _n += 1) {
        fearies[x] = new emojs.modules.sketch.output.synemania.FearParticle(this.ctx);
      }
      for (x = _o = 0, _ref6 = maxDisgusties - 1; _o < _ref6; x = _o += 1) {
        disgusties[x] = new emojs.modules.sketch.output.synemania.DisgustParticle(this.ctx);
      }
      sadTheta = Math.random() * TWO_PI;
      return currentParticles = neutrals;

      /*try
        syne = new SynesthetiatorEmotion(@)
      catch e
        e.printStackTrace()
       */
    };

    Synemania.prototype.update = function(state) {
      currentEmotionState = state;
      return currentParticles = this.getCurrentParticles(currentEmotionState.getStrongestEmotion());
    };

    Synemania.prototype.draw = function(contextName) {
      var numberOfParticles, strongest, weight, x, _i, _results;
      strongest = currentEmotionState.getStrongestEmotion();
      weight = strongest.getWeight();
      saturationFactor = Math.sqrt(weight);
      numberOfParticles = Math.round(currentParticles.length * saturationFactor);
      _results = [];
      for (x = _i = 0; _i < numberOfParticles; x = _i += 1) {
        _results.push(currentParticles[x].move());
      }
      return _results;
    };

    Synemania.prototype.getCurrentParticles = function(e) {
      var currentEmotion;
      currentEmotion = e.getType();
      if (currentEmotion === emojs.engine.classes.Emotion.HAPPINESS) {
        return happies;
      } else if (currentEmotion === emojs.engine.classes.Emotion.SADNESS) {
        return saddies;
      } else if (currentEmotion === emojs.engine.classes.Emotion.ANGER) {
        return angries;
      } else if (currentEmotion === emojs.engine.classes.Emotion.FEAR) {
        return fearies;
      } else if (currentEmotion === emojs.engine.classes.Emotion.DISGUST) {
        return disgusties;
      } else if (currentEmotion === emojs.engine.classes.Emotion.SURPRISE) {
        return surprises;
      } else {
        return neutrals;
      }
    };

    Synemania.prototype.saturate = function(color) {
      colorMode(HSB, 1.0);
      color = color(hue(color), saturation(color) * 0.98, brightness(color));
      colorMode(RGB, 255);
      return color;
    };

    return Synemania;

  })();
  retObj = {
    Particle: Particle,
    NeutralParticle: NeutralParticle,
    HappyParticle: HappyParticle,
    SadParticle: SadParticle,
    AngryParticle: AngryParticle,
    SupriseParticle: SupriseParticle,
    FearParticle: FearParticle,
    DisgustParticle: DisgustParticle,
    Synemania: Synemania
  };
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'modules.sketch.output.synemania',
    object: retObj
  });

  /*global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.Particle'
    object: Particle
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.NeutralParticle'
    object: NeutralParticle
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.HappyParticle'
    object: HappyParticle
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.SadParticle'
    object: SadParticle
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.AngryParticle'
    object: AngryParticle
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.SupriseParticle'
    object: SupriseParticle
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.FearParticle'
    object: FearParticle
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.DisgustParticle'
    object: DisgustParticle
  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'output.art.sketch.Synemania'
    object: Synemania
   */
});

var Input;

global.runtime.helpers.MakeGlobalNamespaceFromString('engine.input', global);

Input = (function() {
  function Input() {}

  return Input;

})();

define('modules.sketch/main',['modules.sketch/class.particle', 'modules.sketch/ui.jquery', 'modules.sketch/output.synemania'], function() {});

define('modules.sketch', ['modules.sketch/main'], function (main) { return main; });

requirejs.config({
  packages: [
    {
      name: 'modules.core',
      location: './modules/core'
    }, {
      name: 'modules.sketch',
      location: './modules/sketch'
    }
  ]
});

emojs.runtime.helpers.MakeGlobalNamespaceFromString('modules');

define('modules/main',['modules.core', 'modules.sketch'], function() {});


/*if global.engine.controllers.Config.isFullyClientSide
  define [
    'modules.dao'
  ], () ->
else
  define [
    'modules.datafiles'
  ], () ->
 */
;

require(["modules/main"]);
