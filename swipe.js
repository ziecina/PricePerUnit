$( document ).on( "pagecreate", "#comparison-page", function() {
	
	var localProducts = JSON.parse(localStorage.getItem("localProducts"));
	var currentProduct = 0;
	if (! localProducts) {
		localProducts = [];

		localProducts[0] = {
			"name": "Soap",
			"comparisons": [
				{"size":"3.4","price":".98"},
				{"size":"16","price":"5.98"}
			]
		};
		localProducts[1] = {
			"name": "Coke",
			"comparisons": [
				{"size":"12","price":"4.98"},
				{"size":"24","price":"6.98"}
			]
		};
	}
	
	$.each(localProducts, function(index, value){
		var li = $('<li>');
		$("#tablist").append($(li));
		var a = $('<a>', {'data-theme': 'a', product: index});
		$(li).append($(a));
		$(a).append(value.name);
		$(a).addClass("ui-btn ui-btn-icon-right ui-icon-carat-r");
		//$("#tablist").append($.parseHTML('<li><a data-theme="a" data-ajax="false" product="'+ index +'">'+ value.name +'</a></li>'));
	});
	$("#tablist li a").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r");
	$("#tablist li").removeClass("ui-last-child");
	$("#tablist li:last-child").addClass("ui-last-child");
	
	$( "h1[name='product-name']").text(localProducts[currentProduct].name);
	$.each(localProducts[currentProduct].comparisons, function(index, value){
		var row = $("#comparison-table tbody tr:nth-child("+(index + 1)+")");

		row.children("td[name='size']").text(value.size);
		row.children("td[name='price']").text(value.price);
		row.children("td[name='ppu']").text(value.price / value.size);
		if (row.children("td[name='ppu']").text() == "NaN") row.children("td[name='ppu']").text("");
	});
			
    $( document ).on( "click", "#left-panel li a", function( e ) {	
		currentProduct = $(e.target).attr("product");
		
		if(currentProduct == "add") {
			currentProduct = localProducts.length;
			
			localProducts[currentProduct] = {
				"name": "Product Name",
				"comparisons": [
					{"size":"1","price":".99"}
				]
			};
			
			$("#tablist").append($.parseHTML('<li><a data-theme="a" data-ajax="false" product="'+ currentProduct +'">'+ "(Product Name)" +'</a></li>'));
			$("#tablist li a").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r");
			$("#tablist li").removeClass("ui-last-child");
			$("#tablist li:last-child").addClass("ui-last-child");
			$( "#right-panel-product-name input[name='product']").val("");
			$( "#right-panel-product-name" ).panel( "open" );
		}
		$( "h1[name='product-name']").text(localProducts[currentProduct].name);
		
		$("#comparison-table tbody td").text("");
		
		$.each(localProducts[currentProduct].comparisons, function(index, value){
			var row = $("#comparison-table tbody tr:nth-child("+(index + 1)+")");

			$("#comparison-table").children("td").text("");
			
			row.children("td[name='size']").text(value.size);
			row.children("td[name='price']").text(value.price);
			row.children("td[name='ppu']").text(value.price / value.size);
			if (row.children("td[name='ppu']").text() == "NaN") row.children("td[name='ppu']").text("");
		});
    });
		
    $( document ).on( "swiperight", "#comparison-page", function( e ) {
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
	
	$( document ).on( "swipeleft", "#comparison-table tbody tr", function( e ) {
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
	
	
	$( document ).on( "swipeleft", "h1[name='product-name']", function( e ) {
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft" ) {
				$( "#right-panel-product-name input[name='product']").val($( "h1[name='product-name']").text());
                $( "#right-panel-product-name" ).panel( "open" );
            }
        }
    });
	
	$( "#right-panel input").change(function(){
		var refid = $(this).attr("refid");
		$("#" + refid).text($(this).val());
		
		var row = $("#" + refid).closest("tr");
		row.children("td[name='ppu']").text(parseFloat(row.children("td[name='price']").text()) / parseFloat(row.children("td[name='size']").text()));
		if (row.children("td[name='ppu']").text() == "NaN") row.children("td[name='ppu']").text("");
		
		var items = [];
		var i = 0;
		$("#comparison-table tbody tr").each(function() {
			items[i++] = {
				"size":$(this).children("td[name='size']").text(),
				"price":$(this).children("td[name='price']").text()
			};
		});
		localProducts[currentProduct].comparisons = items;
		localStorage["localProducts"] = JSON.stringify(localProducts);
	});	
	
	$( "#right-panel-product-name input").change(function(){
		var productName = $( "#right-panel-product-name input[name='product']").val();
	
		$( "h1[name='product-name']").text(productName);
		localProducts[currentProduct].name = productName;
		localStorage["localProducts"] = JSON.stringify(localProducts);
		$("#tablist li a[product='"+ currentProduct +"'").text(productName);
	});
});

