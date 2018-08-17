$(document).ready(function () {
	let ftrLoc;
	let str;
	const att = world;
	console.log(att)

	// This function grabs todos from the database and updates the view
	function getCountries() {
		let results = [];

		$.get("/api/future_locations", function (data) {
			ftrLoc = data;
			for (j = 0; j < att.features.length; j++) {
				let country = {};
				if (country[att.features[j].id]) {
					country[att.features[j].id]++;
				}
				else {
					country[att.features[j].id] = 0;
				}

			}
			for (i = 0; i < ftrLoc.length; i++) {
				str = ftrLoc[i].future_location;
				str.split(",");
				console.log(str);
				
			}
		});
	}
	getCountries();
	ftrLoc
})