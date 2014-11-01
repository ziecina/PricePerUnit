$( document ).on( "pagecreate", "#comparison-page", function() {
	
	var localItems = JSON.parse(localStorage.getItem("localItems"));
	if (! localItems) {
		localItems = [];
		localItems[0] = {
			"size":"1",
			"price":"1.00"
			};
		localItems[1] = {
			"size":"2",
			"price":"2.00"
			};
	}
	
	for (var i = 0; i < localItems.length; i++) {
		var row = $("#comparison-table tr:nth-child("+(parseInt(i)+1)+")");
		row.children("td[name='size']").text(localItems[i].size);
		row.children("td[name='price']").text(localItems[i].price);
		row.children("td[name='ppu']").text(parseFloat(row.children("td[name='price']").text()) / parseFloat(row.children("td[name='size']").text()));
	}
	
    $( document ).on( "swiperight", "#comparison-page", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
	
	$( document ).on( "swipeleft", "#comparison-table", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft" ) {
				var row = $(e.target).closest("tr");
				$( "#right-panel input[name='size']").val(row.children("td[name='size']").text());
				$( "#right-panel input[name='size']").attr("refid", row.children("td[name='size']").attr("id"));

				$( "#right-panel input[name='price']").val(row.children("td[name='price']").text());
				$( "#right-panel input[name='price']").attr("refid", row.children("td[name='price']").attr("id"));
                $( "#right-panel" ).panel( "open" );
            }
        }
    });
	
	$( "#right-panel input").change(function(){
		var refid = $(this).attr("refid");
		$("#" + refid).text($(this).val());
		
		var row = $("#" + refid).closest("tr");
		row.children("td[name='ppu']").text(parseFloat(row.children("td[name='price']").text()) / parseFloat(row.children("td[name='size']").text()));
	});	
	
});

