  /*
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function(b){b.support.touch="ontouchend" in document;if(!b.support.touch){return;}var c=b.ui.mouse.prototype,e=c._mouseInit,a;function d(g,h){if(g.originalEvent.touches.length>1){return;}g.preventDefault();var i=g.originalEvent.changedTouches[0],f=document.createEvent("MouseEvents");f.initMouseEvent(h,true,true,window,1,i.screenX,i.screenY,i.clientX,i.clientY,false,false,false,false,0,null);g.target.dispatchEvent(f);}c._touchStart=function(g){var f=this;if(a||!f._mouseCapture(g.originalEvent.changedTouches[0])){return;}a=true;f._touchMoved=false;d(g,"mouseover");d(g,"mousemove");d(g,"mousedown");};c._touchMove=function(f){if(!a){return;}this._touchMoved=true;d(f,"mousemove");};c._touchEnd=function(f){if(!a){return;}d(f,"mouseup");d(f,"mouseout");if(!this._touchMoved){d(f,"click");}a=false;};c._mouseInit=function(){var f=this;f.element.bind("touchstart",b.proxy(f,"_touchStart")).bind("touchmove",b.proxy(f,"_touchMove")).bind("touchend",b.proxy(f,"_touchEnd"));e.call(f);};})(jQuery);
 
 /**
 * jQuery.dustyDrag
 * Copyright (c) 2012 Dustin Boersma | http://dustinboersma.com
 * Date: 9/8/2012
 * @author Dustin Boersma
 * @version 1.0.1
 *
 */
(function($) {
  $.widget("widgets.dustyDrag", {
    options: {
      swipedClass: 'swiped',
      swipeBlockClass: 'swipeBlock',
      slideOverlayClass: 'sliderOverlay',
      swipeBlock: {},
      onComplete: function(){
      
      }
    },
    _create: function() {
      var self = this;
      var element = self.element;
      var options = self.options;
      
      options.swipeBlock = $('<div></div>').addClass(options.swipeBlockClass).appendTo(element);
      options.swipeBlock.draggable({
        axis: 'x',
        containment: 'parent',
        revert: true
      });
      options.swipeBlock.on('drag', {self: self}, self._drag);
      options.swipeBlock.on('dragstop', {self: self}, self._dragStop);
      options.swipeBlock.on('dragstart', {self: self}, self._dragStart);
      element.on('reset', {self: self}, self._resetSlider);
    },
    _drag: function _drag(event, ui) {
      var self = event.data.self;
      var element = self.element;
      var options = self.options;
      var slideEnd = element.width() - options.swipeBlock.outerWidth();
      if (ui.position.left === slideEnd){
        self._dragComplete();
      } else {
        self._restartDrag();
      }
    },
    _dragStart: function _dragStart(event, ui) {
      var self = event.data.self;
      var element = self.element;
      var options = self.options;
      options.overlay = $('<div></div>').addClass(options.slideOverlayClass);
      $('body').append(options.overlay);
    },
    _dragStop: function _dragStop(event, ui) {
      var self = event.data.self;
      var element = self.element;
      var options = self.options;
      if($(this).hasClass(options.swipedClass)){
        options.onComplete();
      }
      options.overlay.remove();
    },
    _restartDrag: function _restartDrag(){
      var self = this;
      var element = self.element;
      var options = self.options;
      options.swipeBlock.draggable('option', {
        disabled: false,
        revert: true,
        cursor: 'auto'
      });
      options.swipeBlock.removeClass(options.swipedClass);
    },
    _dragComplete: function _dragComplete(){
      var self = this;
      var element = self.element;
      var options = self.options;
      options.swipeBlock.draggable('option', {
        disabled: true,
        revert: false,
        cursor: 'cursor'
      });
      options.swipeBlock.addClass(options.swipedClass);
    },
    _resetSlider: function _resetSlider(event) {
      var self = event.data.self;
      var element = self.element;
      var options = self.options;
      
      self._restartDrag();
      options.swipeBlock.animate({'left': 0});
    }
  });
}(jQuery));