define [
    'text!./data/palette/standard.xml'
    'text!./data/lex/keywords.xml'
    'text!./data/lex/synesketch_lexicon.txt'
    'text!./data/lex/synesketch_lexicon_emoticons.txt'
  #'text!https://tetamo.com/data/palette/standard.xml!strip'
], (standard, keywords, synesketch_lexicon, synesketch_lexicon_emoticons) ->
  debugger
  class DataFiles extends global.engine.classes.AbstractController
    @name = 'DATAFILES'
    @files =
      standard : standard
      keywords : keywords
      synesketch_lexicon : synesketch_lexicon
      synesketch_lexicon_emoticons : synesketch_lexicon_emoticons

  global.engine.helpers.MakeGlobalNamespaceAndObject
    path: 'modules.datafiles'
    object: DataFiles