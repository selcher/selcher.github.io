( function( $ ) {
    $( function(){

        $( ".button-collapse" ).sideNav( {
            "edge": "left"
        } );
        $( ".parallax" ).parallax();
        $( ".slider" ).slider( { "full_width": true } );
        $( ".collapsible" ).collapsible();

        // Register Service Worker
        if ('serviceWorker' in navigator) {
            // Path is relative to the origin
            navigator.serviceWorker.register('/sw.js').then(
                function(reg) {
                    console.log('Service worker registered.');
                }
            ).catch(
                function(error) {
                    console.log('Service worker registration failed:' + error);
                }
            );
        }

    } ); // end of document ready
} )( jQuery ); // end of jQuery name space