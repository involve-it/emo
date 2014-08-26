define [
], () ->
  class Dao extends global.core.abstract.Controller
    @name = 'DAO'

  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'modules.dao'
    object: Dao
