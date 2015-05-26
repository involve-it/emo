define [
], () ->
  class Dao extends emojs.engine.classes.AbstractController
    @name = 'DAO'

  global.runtime.helpers.MakeGlobalNamespaceAndObject
    path: 'runtime.helpers.dao'
    object: Dao
