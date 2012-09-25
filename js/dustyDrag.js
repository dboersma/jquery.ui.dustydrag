 /**
 * jQuery.dustyDrag
 * Copyright (c) 2012 Dustin Boersma | http://dustinboersma.com
 * Date: 6/6/2012
 * @author Dustin Boersma
 * @version 1.0.0
 *
 */
(function($) {
  $.widget("widgets.dustyDrag", {
    options: {
      swipeBlockClass: 'swipeBlock',
      swipeBlock: {},
      onComplete: function(){
      
      }
    },
    _create: function() {
      var self = this;
      var element = self.element;
      var options = self.options;
      
      options.swipeBlock = $('<div class="swipeBlock"></div>').appendTo(element);
      options.swipeBlock.draggable({
        axis: 'x',
        containment: 'parent',
        revert: true
      });
      options.swipeBlock.on('drag', {self: self}, self._drag);
      options.swipeBlock.on('dragstop', {self: self}, self._dragStop);
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
    _dragStop: function _dragStop(event, ui) {
      var self = event.data.self;
      var element = self.element;
      var options = self.options;
      if($(this).is('.swiped')){
        options.onComplete();
      }
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
      options.swipeBlock.removeClass('swiped');
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
      options.swipeBlock.addClass('swiped');
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