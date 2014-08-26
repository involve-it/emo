###*
* AbstractProcessor class will be processing core (standard) input-output events.
*   custom Processors are pluggable through modules into the system and should be inherited from AbstractProcessor.
* @namespace engine.controllers
* @class AbstractProcessor
*###

class AbstractProcessor extends global.engine.classes.AbstractController
  constructor:()->
  feelText : (text, context) ->
    console.log('abstract feelText: ' + text)
  createEmotionState : (text, affectWords, TYPE) ->
    console.dir
      message: 'abstract createEmotionState: '
      affectWords : affectWords
      TYPE : TYPE

  ###*
  * For trigger events, that will be listened/casted in any part of program.
  * Format of the triggered event:
  *   'global:{name}:{action}'
  * @param {String} DESCRIPTION
  * @return {String} DESCRIPTION
  *###

global.engine.core.helpers.MakeGlobalNamespaceAndObject {
  path:'engine.classes.AbstractProcessor'
  object: AbstractProcessor
  global: global
  shortcut: 'e$ecp'
}

define 'controllers/main', [
], ()->
