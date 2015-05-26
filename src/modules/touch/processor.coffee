###*
* Processor controller class will be processing core (standard) input-output events.
*   custom Processors are pluggable through modules into the system.
* @namespace engine.controllers
* @class Processor
*###

class Processor extends global.engine.classes.AbstractController
  constructor:()->
  ###*
  * For trigger events, that will be listened/casted in any part of program.
  * Format of the triggered event:
  *   'global:{name}:{action}'
  * @param {String} DESCRIPTION
  * @return {String} DESCRIPTION
  *###
  trigger: (name, action)->


global.runtime.helpers.MakeGlobalNamespaceAndObject {
  path:'engine.controllers.Processor'
  object: Processor
  global: global
  shortcut: 'e$ecp'
}

define 'controllers/main', [
], ()->
