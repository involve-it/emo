define [
], () ->
  class Dao extends emojs.engine.classes.AbstractController
    @name = 'DAO'

  emojs.engine.core.helpers.MakeGlobalNamespaceAndObject
    path: 'runtime.helpers.dao'
    object: Dao
