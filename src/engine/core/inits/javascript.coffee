define [],()->
  ###
  * Returns a random number between min and max
  ###

  Math.getRandomArbitary = (min, max) ->
    return Math.random() * (max - min) + min
  Math.randomRange = (min, max) ->
    return Math.random() * (max - min) + min
  Math.getRandomInt = (min, max) ->
    return Math.floor(Math.random() * (max - min + 1)) + min

#
  Function::property = (prop, desc) ->
    Object.defineProperty @prototype, prop, desc