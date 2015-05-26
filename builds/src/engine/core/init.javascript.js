define([], function() {

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
