var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define([], function() {
  var Dao;
  Dao = (function(_super) {
    __extends(Dao, _super);

    function Dao() {
      return Dao.__super__.constructor.apply(this, arguments);
    }

    Dao.name = 'DAO';

    return Dao;

  })(global.engine.classes.AbstractController);
  return global.runtime.helpers.MakeGlobalNamespaceAndObject({
    path: 'runtime.helpers.dao',
    object: Dao
  });
});
