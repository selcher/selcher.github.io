( function( $ ) {
    $( function(){

        $( ".button-collapse" ).sideNav( {
        	"edge": "left"
        } );
        $( ".parallax" ).parallax();
        $( ".slider" ).slider( { "full_width": true } );
        $( ".collapsible" ).collapsible();

    } ); // end of document ready
} )( jQuery ); // end of jQuery name space