// Generated by CoffeeScript 1.7.1

/*
* Returns a random number between min and max
 */

(function() {
  Math.getRandomArbitary = function(min, max) {
    return Math.random() * (max - min) + min;
  };

  Math.randomRange = function(min, max) {
    return Math.random() * (max - min) + min;
  };

  Math.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

}).call(this);

//# sourceMappingURL=javascript.map
