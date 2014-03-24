define [],()->
  ###
  * Returns a random number between min and max
  ###
  Math.getRandomArbitary = (min, max) ->
    return Math.random() * (max - min) + min
  ###
  * Returns a random integer between min and max
  * Using Math.round() will give you a non-uniform distribution!
  ###
  Math.getRandomInt = (min, max) ->
    return Math.floor(Math.random() * (max - min + 1)) + min
