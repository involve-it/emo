
/*
* Returns a random number between min and max
 */

(function() {
  var empathyScope;

  empathyScope = emo$.Engine.Emotion.EmpathyScope.getInstance();

  $.fn.emo$ = function() {
    return this.text();
  };

  $.fn.feel$ = function() {
    return empathyScope.feel(this.val());
  };

}).call(this);
