
(function ($) {

    $.fn.draggabletabs = function (options) {

        var defaults = $.extend({}, options);
        
        /******************************
        Private Variables
        *******************************/         
        
        var object = $(this);
        var settings = $.extend(defaults, options);     
        var $switches_cnt = $('#'+settings.switcher);
        var $tabs_cnt = object;
        var $switches = $switches_cnt.children('.jf-tab-switch');
        var $tabs = $tabs_cnt.children('.jf-tab-content');
        var n_switch = $switches.length;
        var n_tabs = $tabs.length;
        var index = 0;
        

        /******************************
        Public Methods
        *******************************/        
        
        var methods = {
            init: function() {
            		if(!(n_switch>0 && n_switch==n_tabs)) return false;
                return this.each(function () {
                	methods.initializeItems();
                  methods.initializeListeners();
                });
            },     
            
            initializeItems: function(){
            	$tabs.hide().css('user-select','none');
            	methods.switch_to(index);
            },
            
            next: function(){
            	methods.switch_to(index+1);
            },
            
            previous: function(){
            	methods.switch_to(index-1);
            },
            
            switch_to: function(_index){
              let old_index = index;
            	index = ((_index%n_tabs)+n_tabs)%n_tabs;
              $tabs.eq(old_index).removeClass("jf-active-content").hide();
              $tabs.eq(index).addClass("jf-active-content").show();
              $switches.eq(old_index).removeClass("jf-active-switch");
              $switches.eq(index).addClass("jf-active-switch");
            },
            
            initializeListeners: function(){
            	$switches.on('click', function(){
              	let _index = $(this).parent().children('.jf-tab-switch').index($(this));
                methods.switch_to(_index);
              });
              object[0].addEventListener('mousedown', methods.touchHandler.handleMouseDown, false);  
              object[0].addEventListener('mousemove', methods.touchHandler.handleMouseMove, false);
              object[0].addEventListener('mouseup', methods.touchHandler.handleMouseUp, false); 
            },
            
            touchHandler: {

                xDown: null,
                yDown: null,
                
                handleMouseDown: function(evt) {    
                    this.xDown = evt.clientX;                                      
                    this.yDown = evt.clientY;
                }, 
                handleMouseMove: function (evt) {
                    
                    if (!this.xDown || !this.yDown) {
                        return;
                    }

                    var cx = evt.clientX;                                    
                    var cy = evt.clientY;

                    var xDiff = this.xDown - cx;
                    var yDiff = this.yDown - cy;


                    if (Math.abs( xDiff ) > 20) {
                        if ( xDiff > 0 ) {
                            // swipe left
                            methods.previous();
                        } else {
                            //swipe right
                            methods.next();
                        }   
                        this.xDown = null;
                        this.yDown = null;
                        canNavigate = true;                    
                    }
                },
                handleMouseUp: function(evt){
                    /* reset values */
                    this.xDown = null;
                    this.yDown = null;
                    canNavigate = true;
                }
            },     
            
        };

        if (methods[options]) {    
            return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof options === 'object' || !options) {
            return methods.init.apply(this);  
        } else {
            $.error( 'Method "' +  method + '" does not exist in tabslider plugin!');
        }        
};

})(jQuery);
