#define [
#  #'engine.helpers'
#], () ->

define [], () ->
  class AbstractController
  constructor: () ->
    ###*
    * For trigger events, that will be listened/casted in any part of program.
    * Format of the triggered event:
    *   'global:{name}:{action}'
    * @param {String} DESCRIPTION
    * @return {String} DESCRIPTION
    *###
  trigger: (name, action)->
#event = new Event(name);
#elem.addEventListener('build', function (e) { ... }, false);
    @.emit(name);
  ready: (callback)->
    if (typeof callback != 'undefined')
      callback.call()
  start: ()->
#kick off things!
  stop: ()->
#stop things.

  _.extend(AbstractController.prototype, new global.libs.emitter())
  global.runtime.helpers.MakeGlobalNamespaceAndObject
    path: 'engine.classes.AbstractController'
    object: AbstractController