global.engine.core.helpers.MakeGlobalNamespaceFromString('engine.input', global)
class Input
define [
  'modules.core/input.text'
  'modules.core/ui.jquery'
  'modules.core/output.logger'
], ()->
  global.engine.core.helpers.MakeGlobalNamespaceAndObject
    path:'runtime.app.modules.core'
    object: {}
    global: emojs
    #shortcut: 'e$rp'
#global.input = Input