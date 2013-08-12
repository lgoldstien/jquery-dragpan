(function ($) {

    $.fn.dragpan = function () {
        // Set up the variables and default values
        var _this = this,
            maxX,
            maxY,
            posX,
            posY,
            lastPosX = 0,
            lastPosY = 0,
            $parent = _this,
            $child = _this.children();

        var dragPan = {
            // Set up the dragpan plugin for the element we want to work with
            setup: function () {
                // Get the maximum width and height of the scrollable content
                _this.maxX = $child.prop('scrollWidth');
                _this.maxY = $child.prop('scrollHeight');

                // Get the current scroll position
                _this.posX = $parent.scrollLeft();
                _this.posY = $parent.scrollTop();

                // If the scroll even is triggered then update scroll position (keys and wheel)
                $parent.scroll( function () {
                    _this.posX = $parent.scrollLeft();
                    _this.posY = $parent.scrollTop();
                });

                // On mousedown toggle dragging on
                $parent.mousedown( function (e) {
                    _this.lastPosX = e.clientX;
                    _this.lastPosY = e.clientY;
                    dragPan.dragging( 'on' );
                });

                // On mouseup toggle dragging off
                $parent.mouseup( function () {
                    dragPan.dragging( 'off' );
                });

                // When the mouse leaves the window toggle dragging off
                $parent.mouseleave( function () {
                    dragPan.dragging( 'off' );
                });
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
            dragging: function ( toggle ) {
                // If toggling dragging on then add a mousemove event to update the position
                if ( toggle === 'on' ) {
                    $parent.mousemove(function (e) {

                        var x = _this.lastPosX - e.clientX;
                        var y = _this.lastPosY - e.clientY;

                        dragPan.updateScrollPosition( x, y, true );

                        _this.lastPosX = e.clientX;
                        _this.lastPosY = e.clientY;

                    });
                } else {
                    $parent.off('mousemove');
                }
            }

        };
        
        dragPan.setup();

        return dragPan;
    };

}( jQuery ));