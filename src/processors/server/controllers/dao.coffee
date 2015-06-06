define [
], () ->
  class Dao extends global.engine.classes.AbstractController
    @name = 'DAO'

  global.runtime.helpers.MakeGlobalNamespaceAndObject
    path: 'runtime.helpers.dao'
    object: Dao
