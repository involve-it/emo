(function(global) { 
var global;

if (typeof global === 'undefined') {
  global = {};
}

if (typeof global.engine === 'undefined') {
  global.engine = {};
}

global.engine.core = {};

var Helpers, global1;

global1 = window;

Helpers = {};


Helpers.isPlainObject = function(a) {
  var b;
  if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a))
    return !1;
  try {
    if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf"))
      return !1
  } catch (c) {
    return !1
  }
  if (k.ownLast)
    for (b in a)
      return j.call(a, b);
  for (b in a)
    ;
  return void 0 === b || j.call(a, b)
}

Helpers.extend = function () {
  var options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if ( typeof target === "boolean" ) {
    deep = target;

    // Skip the boolean and the target
    target = arguments[ i ] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if ( typeof target !== "object" && typeof target !== 'function' ) {
    target = {};
  }

  if ( i === length ) {
    target = this;
    i--;
  }

  for ( ; i < length; i++ ) {
    // Only deal with non-null/undefined values
    if ( (options = arguments[ i ]) != null ) {
      // Extend the base object
      for ( name in options ) {
        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target === copy ) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if ( deep && copy && ( helpers.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)) ) ) {
          if ( copyIsArray ) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];

          } else {
            clone = src && helpers.isPlainObject(src) ? src : {};
          }

          // Never move original objects, clone them
          target[ name ] = helpers.extend( deep, clone, copy );

          // Don't bring in undefined values
        } else if ( copy !== undefined ) {
          target[ name ] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};
;

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
      retObj = Helpers.extend(ns[first] != null ? ns[first] : ns[first] = {}, retObj != null ? retObj : retObj = {});
    }
    return ns;
  };
  namespace = buildFromName(subPaths, namespace);
  if (shortcut) {
    sc = this.MakeGlobalNamespaceFromString(shortcut, window);
    window[shortcut] = retObj;
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
      Helpers.extend(global[first], initialObject);
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
      ns[foreverFirst] = Helpers.extend(initialObject.object, ns[foreverFirst]);
      retObj = Helpers.extend(ns[foreverFirst] != null ? ns[foreverFirst] : ns[foreverFirst] = {}, retObj != null ? retObj : retObj = {});
    }
    l1 = l1 - 1;
    return ns;
  };
  namespace = buildFromName(subPaths, namespace);
  if (initialObject.shortcut) {
    sc = this.MakeGlobalNamespaceFromString(initialObject.shortcut, window);
    window[initialObject.shortcut] = retObj;
    sc = retObj;
  }
  return retObj;
};

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
Helpers.ajax = ajax;
;

Helpers.MakeGlobalNamespaceAndObject({
  path: 'runtime.helpers',
  object: Helpers,
  global: global,
  shortcut: 'ej$h'
});

var Config;

Config = (function() {
  function Config() {}

  Config.dataServerRoot = global.settings.dataServerRoot;

  Config.fullyClientSide = true;

  return Config;

})();

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.core.Config',
  object: Config
});

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'runtime.config',
  object: Config
});


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

Function.prototype.property = function(prop, desc) {
  return Object.defineProperty(this.prototype, prop, desc);
};

 })(ej$);
(function(global) { 
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

ej$h.extend(AbstractController.prototype, new ej$l.emitter());

ej$h.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.AbstractController',
  object: AbstractController
});

var AbstractContext;

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.AbstractContext',
  object: AbstractContext = (function() {
    function AbstractContext(val) {
      this.val = val;
    }

    return AbstractContext;

  })()
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


/**
* AbstractProcessor class will be processing core (standard) input-output events.
*   custom Processors are pluggable through modules into the system and should be inherited from AbstractProcessor.
* @namespace engine.controllers
* @class AbstractProcessor
*
 */
var AbstractProcessor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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

  AbstractProcessor.prototype.ready = function(callback) {};


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

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.AbstractProcessor',
  object: AbstractProcessor,
  global: global
});

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

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.AbstractState',
  object: AbstractState
});

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

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.AffectWord',
  object: AffectWord
});

var Emotion,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.Emotion',
  object: Emotion
});

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

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.EmotionState',
  object: EmotionState
});

 })(ej$);
(function(global) { 
ej$h.MakeGlobalNamespaceFromString('engine.controllers');


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
    debugger;
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
    processor = global.runtime.app.processor;
    return processor.ready(function() {});
  };

  App.prototype.start = function() {
    if (typeof this.staticConfig.processor !== 'undefined') {
      return this.setProcessorInstance(this.staticConfig.processor);
    } else {
      return this.setProcessorInstance('global.processors.client.ClientProcessor');
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

 })(ej$);