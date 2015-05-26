
/**
* @param {String} asdf
* @param {bool} THe asdfa
* @return {String}
*
 */
var global;

requirejs.config({
  paths: {
    'emojs': './main',
    'jquery': './libs/jquery-2.1.0',
    'bootstrap': './libs/bootstrap'
  },
  timeout: 10000
});

global = window.Emo = window.emo = {};

require(['emojs', 'jquery'], function() {
  window.jQuery = window.$;
  $('#butt').click(function(e) {
    var emotion, t1;
    t1 = $('#textArea').text();
    return emotion = global.engine.input.text.emo(t1);
  });
  return function() {

    /*require [
      'modules'
    ], () ->
     */
    var createTooltip, i, positionTooltip, results1;
    results1 = null;
    global.libs.$('#emoticons').emoticon('default');
    global.libs.$('#d3').d3('default');
    global.libs.$('#butt').click(function(e) {
      var emotion;
      return emotion = global.libs.$('#textArea').emo();
    });
    global.libs.$(window).on('context:feel:default', function(e, state) {
      console.log('default context felt: ' + state.toHtml());
      return global.libs.$('#parsingResult').html(state.toHtml());
    });
    global.libs.$(window).on('context:feel:test', function(e, state) {
      return console.log('test context felt: ' + state.toHtml());
    });
    global.libs.$('#addCanvasBtn').click(function(e) {
      var a, b;
      a = global.libs.$('<canvas id="canvasOverlay"></canvas>');
      b = global.libs.$('#contentDiv');
      b.append(a);
      a.attr('style', 'width: ' + b.css('width') + '; height: ' + b.css('height') + ';position: absolute;top:0;');
      return a.emoTouch();
    });
    global.libs.$('#addCanvasBtn1').click(function(e) {
      return $('#contentDiv>p').backgroundEmotion('test');
    });
    global.libs.$('#addCanvasBtn2').click(function(e) {
      global.libs.$('#contentDiv').background('contentDiv');
      return global.libs.$('#contentDiv').emo('contentDiv');
    });
    global.libs.$('#contentDiv>p').hover(function(e) {
      return $(this).clearBackground();
    });
    global.libs.$('#contentDiv>p').mouseleave(function(e) {});
    createTooltip = function(event, canvas) {
      $('<div class="tooltip" id="tooltip1">test</div>').appendTo('body');
      canvas.appendTo('#tooltip1');
      return positionTooltip(event);
    };
    positionTooltip = function(event) {
      var tPosX, tPosY;
      tPosX = event.pageX - 10;
      tPosY = event.pageY - 500;
      return $('div.tooltip').css({
        'position': 'absolute',
        'top': tPosY,
        'left': tPosX
      });
    };
    i = 0;
    global.libs.$('#testHoverA1').hover(function(event) {
      var canvas1, canvasArt1;
      canvas1 = global.libs.$('<canvas id="canvasHoverTemp"></canvas>');
      canvas1.css({
        background: 'white',
        border: '1px orange solid'
      });
      canvasArt1 = canvas1.art('hoverUrl1');
      setInterval(function() {
        var res1;
        return res1 = canvasArt1.draw('hoverUrl1');
      }, 1);
      global.libs.$(this).urlEmotion(global.libs.$(this).attr('href'), 'hoverUrl1');
      return global.libs.$(window).on('context:feel:hoverUrl1', function(e, state) {
        i++;
        if (i < 2) {
          return createTooltip(event, canvas1);
        }
      });
    });
    global.libs.$('#testHoverA1').mouseout(function(e) {
      return setTimeout(function() {
        return global.libs.$('#tooltip1').remove();
      }, 2000);
    });
    return global.libs.$('#testHoverA2').hover(function(e) {
      global.libs.$(this).urlEmotion(global.libs.$(this).attr('href'), 'hoverUrl2');
      return global.libs.$(window).on('context:feel:hoverUrl2', function(e, state) {});
    });
  };
});
