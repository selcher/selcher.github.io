// Load last

$( document ).ready( function() {

    // Toolbar tabs
	$( "#toolbar" ).tabs();

	// Tooltip
	$( document ).tooltip();

	// Right sidebar drop down lists (add image, edit image, save canvas...)
	$( "#sidebar-panel" ).accordion( { "active": 1 } );

	// hide add image/background buttons until user opens a file
	$( "#toolbar_addImg" ).hide();

    // Initialize canvas app
    var app = new CanvasApp( new fabric.Canvas( "collage" ) );

    app.init();

} );
