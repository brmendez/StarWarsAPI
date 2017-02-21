var CHARACTERS;


function get_characters(query) {

	var maleCount = 0;
	var femaleCount = 0;
	var maleOption = $('#gender_dropdown option[value="male"]');
	var femaleOption = $('#gender_dropdown option[value="female"]');
	
	if (!query) {
		console.log('query is blank');
		$('.dataWell').hide();
		$('.emptyState').show();
		$('.results').text('0 Results');
		maleOption.text('Male');
		femaleOption.text('Female');

		return;
	}

	$.ajax({
	  	url: "https://swapi.co/api/people/" + "?search=" + query
	  , data: query

	}).done(function (res) {

		maleOption.text('Male ' + '(' + maleCount + ')');
		femaleOption.text('Female ' + '(' + femaleCount + ')');

		// Reset dropdown and draw table
		$('#gender_dropdown').val('null');
		dataTable.columns(1).search( '' ).draw();
		
		dataTable.clear().draw();
		dataTable.rows.add(res.results).draw();

		$('.emptyState').hide();
		$('.dataWell').show();

		$('.results').text(res.count + ' Results');

		$.each(res.results, function(index, value) {

			if (value['gender'] === 'male') {	
				maleCount++;
				$('#gender_dropdown option[value="male"]').text('Male ' + '(' + maleCount + ')');
			}

			if (value['gender'] === 'female') {	
				femaleCount++;
				$('#gender_dropdown option[value="female"]').text('Female ' + '(' + femaleCount + ')');
				
			}

		});
	});
}


$("input:text:visible:first").focus();

$('#search_character').click(function(e) {
	e.preventDefault();

	$('#gender_dropdown').val('null');
	$("#gender_dropdown").val($("#gender_dropdown option:first").val());
	dataTable.columns().data().search('').draw();
	var character = $('input.character').val();
	get_characters(character)
});

$('#gender_dropdown').change(function(){

	var searchVal = $(this).val();

	if (searchVal == 'null') {
		return dataTable.column(1).search('').draw();
	}
	
	$.fn.dataTable.util.escapeRegex(searchVal);

	// DataTables search( input [, regex = false[ , smart = true[ , caseInsen = true ]]] )
	dataTable.columns(1)
        .search( searchVal ? '^' + searchVal : '', true, false )
        .draw();
});