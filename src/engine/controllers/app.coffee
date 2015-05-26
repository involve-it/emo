###*
* MainController class will be Events Bus
*
* @namespace engine.controllers
* @class MainController
*###



define [
], ()->
  class App extends global.engine.classes.AbstractController
    processor = null
    @staticConfig = null
  #@contextsPool = new global.run

    constructor:(config)->
      @staticConfig = config ?= {}
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
      ###processorClass = eval(ProcessorClassObjectName)
      processor = new processorClass(@)
      processor.ready ()->###
      processor = emojs.runtime.app.processor
      processor.ready ()->
    start : ()->
      if (typeof @staticConfig.processor != 'undefined')
        @setProcessorInstance(@staticConfig.processor)
      else
        #set default processor:
        @setProcessorInstance('emojs.processors.client.ClientProcessor')

  global.runtime.helpers.MakeGlobalNamespaceAndObject
    path:'engine.controllers.App'
    object: App
    global: global
    shortcut: 'e$eca'