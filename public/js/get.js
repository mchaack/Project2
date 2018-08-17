$(document).ready(function () {
	let ftrLoc;
	let str;
	const att = world;
	console.log(att);

	// This function grabs todos from the database and updates the view
	function getCountries() {
		$.get("/api/future_locations", function (data) {
			ftrLoc = data;
			console.log("from the data" + ftrLoc);
			for (let i = 0; i < ftrLoc.length; i++) {
				console.log(ftrLoc[i]);
				str = ftrLoc[i].future_location;
				str.split(",");
				console.log(str);
			}
		});
	}
	getCountries();
	ftrLoc;
});