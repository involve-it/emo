###*
* ServerProcessor class will be processing core (standard) input-output events.
*   custom Processors are pluggable through modules into the system and should be inherited from AbstractProcessor.
* @namespace engine.controllers
* @class ServerProcessor
*###

class ServerProcessor extends global.engine.classes.AbstractProcessor
  constructor:()->
  ###*
  * For trigger events, that will be listened/casted in any part of program.
  * Format of the triggered event:
  *   'global:{name}:{action}'
  * @param {String} DESCRIPTION
  * @return {String} DESCRIPTION
  *###
  trigger: (name, action)->


global.engine.core.helpers.MakeGlobalNamespaceAndObject {
  path:'engine.processors.client.controllers.Processor'
  object: ServerProcessor
  global: global
  shortcut: 'e$epcs'
}

define 'controllers/main', [
], ()->
