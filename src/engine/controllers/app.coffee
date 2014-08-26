###*
* MainController class will be Events Bus
*
* @namespace engine.controllers
* @class MainController
*###

class App extends global.engine.classes.AbstractController
  processor = null
  @config = null
  #@contextsPool = new global.run

  constructor:(config)->
    @config = config ?= {}
    #create context pool and default context in the context pool:
    #contextsPool = new global.engine.

  ###*
  * For trigger events, that will be listened/casted in any part of program.
  * Format of the triggered event:
  *   'global:{name}:{action}'
  * @param {String} DESCRIPTION
  * @return {String} DESCRIPTION
  *###
  trigger: (name, action)->
  getProcessorInstance : ()->
    processor
  setProcessorInstance : (ProcessorClassObjectName)->
    processorClass = eval(ProcessorClassObjectName)
    processor = new processorClass(@)
    processor.ready ()->
  start : ()->
    if (typeof @config.processor != 'undefined')
      @setProcessorInstance(@config.processor)
    else
      #set default processor:
      @setProcessorInstance('global.engine.processors.client.ServerProcessor')

global.engine.core.helpers.MakeGlobalNamespaceAndObject {
  path:'engine.controllers.App'
  object: App
  global: global
  shortcut: 'e$eca'
}

define [
], ()->
