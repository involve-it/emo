#global.engine.helpers.MakeGlobalNamespaceFromString('global.output')
class Processor
#put some logic, defining server/cliend side choice, can be both static and dynamic:
#define [
#  'processors/client/main'
#  #'processors/server/main'
#], ()->
global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.processors'
  object : Processor
})
