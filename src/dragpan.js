/*jshint -W098 */
(function ($) {

    $.fn.dragpan = function (input) {

        // Define the accessible API so we can check methods
        var API = {
            on: 'addMouseBinding',
            off: 'removeMouseBinding'
        };

        // Set opts to be an object for later use
        var opts = {};

        // If the input is a sting
        if (typeof input === 'string') {
            // Is the input an available API call
            if (input in API) {
                // If it is then run the API call
            } else {
                // If not then return nothing
                return;
            }
        } else if (typeof input === 'object') {

        }
        // Set up the variables and default values
        // var _this = this,
        //     maxX,
        //     maxY,
        //     posX,
        //     posY,
        //     lastPosX = 0,
        //     lastPosY = 0,
        //     $parent = options.parent,
        //     $child = $parent.children();

        return API;

    };

    var Dragpan = {
        // Set the internal option defaults
        defaults: {
            speedX: 10, // X Speed default is 10
            speedY: 10, // Y Speed default is 10
            parent: $(this) // The parent selector
        },
        setup: function (opts) {
            // Set the options to override defaults if any are given
            var options = $.extend( defaults, opts );

            // Get the maximum width and height of the scrollable content
            _this.maxX = $child.prop('scrollWidth');
            _this.maxY = $child.prop('scrollHeight');

            // Set the all-scroll cursor
            $parent.css( "cursor", "all-scroll" );

            // Get the current scroll position
            _this.posX = $parent.scrollLeft();
            _this.posY = $parent.scrollTop();

            // If the scroll event is triggered then update scroll position (keys and wheel)
            $parent.scroll( function () {
                _this.posX = $parent.scrollLeft();
                _this.posY = $parent.scrollTop();
            });

            Dragpan.addMouseBinding();
            
        },
        updateScrollPosition: function (x, y, relational) {
            // If the new scroll position is in relation to the old ones 
            // then update the scroll position based on them
            if ( relational === true ) {
                $parent.scrollLeft( _this.posX + x );
                $parent.scrollTop( _this.posY + y );
            } else {
                $parent.scrollLeft( x );
                $parent.scrollTop( y );
            }
        },
        dragging: function ( t ) {
            // If toggling dragging on then add a mousemove event to update the position
            if ( t === 'on' ) {
                $parent.mousemove(function (e) {

                    var x = ( _this.lastPosX - e.clientX ) * (options.speedX / 10);
                    var y = ( _this.lastPosY - e.clientY ) * (options.speedY / 10);

                    Dragpan.updateScrollPosition( x, y, true );

                    _this.lastPosX = e.clientX;
                    _this.lastPosY = e.clientY;

                });
            } else {
                $parent.off('mousemove');
            }
        },
        addMouseBinding: function () {
            // On mousedown toggle dragging on
            $parent.mousedown( function (e) {
                _this.lastPosX = e.clientX;
                _this.lastPosY = e.clientY;
                Dragpan.dragging( 'on' );
            });

            // On mouseup toggle dragging off
            $parent.mouseup( function (e) {
                console.log('Add Binding:mouseup', _this);
                Dragpan.dragging( 'off' );
            });

            // When the mouse leaves the window toggle dragging off
            $parent.mouseleave( function (e) {
                Dragpan.dragging( 'off' );
            });
        },
        removeMouseBinding: function () {
            $parent.mousedown( function (e) {
                Dragpan.dragging( 'off' );
            });
        }
    };

}( jQuery ));