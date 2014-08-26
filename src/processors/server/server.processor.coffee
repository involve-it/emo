###*
* ServerProcessor class will be processing core (standard) input-output events.
*   custom Processors are pluggable through modules into the system and should be inherited from AbstractProcessor.
* @namespace engine.controllers
* @class ServerProcessor
*###

class ServerProcessor extends emojs.engine.classes.AbstractProcessor
  constructor:(app)->
    @app = app

  ###*
  * For trigger events, that will be listened/casted in any part of program.
  * Format of the triggered event:
  *   'global:{name}:{action}'
  * @param {String} DESCRIPTION
  * @return {String} DESCRIPTION
  *###
  trigger: (name, action)->
  feelText : (text, context) ->
    debugger
    super

emojs.engine.core.helpers.MakeGlobalNamespaceAndObject {
  path:'processors.server.ServerProcessor'
  object: ServerProcessor
  global: global
  shortcut: 'e$pcs'
}

define 'controllers/main', [
], ()->
