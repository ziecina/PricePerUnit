$( document ).on( "pagecreate", "#demo-page", function() {
    $( document ).on( "swiperight", "#demo-page", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
	
	$( document ).on( "swipeleft", "#mainTable1", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft" ) {
				var row = $(e.target).closest("tr");
				$( "#right-panel input[id='textinput-1']").val(row.children("td:nth-child(1)").text());
				$( "#right-panel input[id='textinput-1']").attr("refid", row.children("td:nth-child(1)").attr("id"));

				$( "#right-panel input[id='textinput-2']").val(row.children("td:nth-child(2)").text());
				$( "#right-panel input[id='textinput-2']").attr("refid", row.children("td:nth-child(2)").attr("id"));
                $( "#right-panel" ).panel( "open" );
            }
        }
    });
	
	$( "#right-panel input").change(function(){
		var refid = $(this).attr("refid");
		$("#" + refid).text($(this).val());
		
		var row = $("#" + refid).closest("tr");
		row.children("td:nth-child(3)").text(parseFloat(row.children("td:nth-child(2)").text()) / parseFloat(row.children("td:nth-child(1)").text()));
	});
	
});

