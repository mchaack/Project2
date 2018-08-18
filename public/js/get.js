$(document).ready(function () {
	let ftrLoc;
	let str;
	const att = world.features;
	console.log(att);

	// This function grabs todos from the database and updates the view
	mapDisplay();
	function mapDisplay() {

		let map = L.map("map").setView([37.8, -96], 4);

		L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoianJuZWxzMTAiLCJhIjoiY2prenI0cGpyMHg5bDN3bGU3bnd2eWZlMCJ9.3APPzTqzXC9bF-V3Up6z3w", {
			maxZoom: 18,
			attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, " +
				"<a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, " +
				"Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
			id: "mapbox.light"
		}).addTo(map);


		// // control that shows state info on hover
		// let info = L.control();

		// info.onAdd = function (map) {
		// 	this._div = L.DomUtil.create("div", "info");
		// 	this.update();
		// 	return this._div;
		// };

		// info.update = function (props) {
		// 	this._div.innerHTML = "<h4>People interested in visiting this country</h4>" + (props ?
		// 		"<b>" + props.name + "</b><br />" + props.density + " people / mi<sup>2</sup>"
		// 		: "Hover over a country");
		// };

		// info.addTo(map);

		// get color depending on user density value
		let geojson;
		function getColor(d) {
			return d > 20 ? "#801026" :
				d > 16 ? "#BD0026" :
					d > 13 ? "#E31A1C" :
						d > 9 ? "#FC4E2A" :
							d > 5 ? "#FD8D3C" :
								d > 3 ? "#FEB24C" :
									d >= 1 ? "#FED976" :
										"#FFEDA0";
		}
		function style(myMap) {
			return {
				weight: 2,
				opacity: 1,
				color: "white",
				dashArray: "3",
				fillOpacity: 0.7,
				fillColor: getColor(myMap)
			};
		}
		L.geoJson(world, { style: style }).addTo(map);



		let countrySelect;
		let results = [];
		let str;
		let myMap = new Map();
		$.get("/api/future_locations", function (data) {
			ftrLoc = data;
			console.log(ftrLoc)

			function storedCountries() {
				for (i = 0; i < ftrLoc.length; i++) {
					str = ftrLoc[i].future_location;
					for (let j = 0; j < att.length; j++) {
						if (str.includes(att[j].id)) {
							// console.log(att[j].id);
							if (myMap.get(att[j].id)) {
								myMap.set(att[j].id, myMap.get(att[j].id) + 1);
							}
							else {
								myMap.set(att[j].id, 1);

							}
						}

					}
				}
			}
			storedCountries();
			let style;
			myMap.forEach(function (value, key) {
				// let countryColor;
				for (let j = 0; j < att.length; j++) {
					if (key == att[j].id) {
						let cntplace = { key: key, value: value };
						// let countryColor = value;
						console.log(cntplace);
						// return {
						// 	weight: 2,
						// 	opacity: 1,
						// 	color: "white",
						// 	dashArray: "3",
						// 	fillOpacity: 0.7,
						// 	fillColor: getColor(cntplace)
						// };
					}
				}
				console.log("key:" + key + " value: " + value);
				console.log(myMap);
				L.geoJson(world, { style: style }).addTo(map);
			});
		});







		function getCountries(e) {
			$("#sidecol").empty();
			countrySelect = e.target.feature;
			console.log(e.target.feature.id)
			// console.log(data)
			for (i = 0; i < ftrLoc.length; i++) {
				str = ftrLoc[i].future_location;
				if (str.includes(countrySelect.id)) {
					console.log(countrySelect.id)
					results.push(ftrLoc[i]);
					let userBlock = $("<button>");
					userBlock.addClass("people");
					userBlock.html("<div class='user'>" + ftrLoc[i].id + "</div><div class='name'>" + ftrLoc[i].username + "</div>");

					$("#sidecol").append(userBlock);
				}
			}
		}






		function onEachFeature(feature, layer) {
			layer.on({
				// mouseover: highlightFeature,
				// mouseout: resetHighlight,
				click: getCountries
			});
		}

		geojson = L.geoJson(world, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);


		// function highlightFeature(e) {
		// 	let layer = e.target;

		// 	layer.setStyle({
		// 		weight: 5,
		// 		color: "#677",
		// 		dashArray: "",
		// 		fillOpacity: 0.7
		// 	});

		// 	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		// 		layer.bringToFront();
		// 	}

		// 	info.update(layer.feature.properties);
		// }

		// function resetHighlight(e) {
		// 	geojson.resetStyle(e.target);
		// 	info.update();
		// }

		// let countryArray = [];

		// function arrayStyle() {
		// 	for (let i = 0; i < countryArray.length; i++) {
		// 		countryArray[i].setStyle({ fillColor: "blue" });
		// 		console.log("clicked: " + countryArray[i]);
		// 	}
		// }


		// let legend = L.control({ position: "bottomright" });

		// legend.onAdd = function (map) {

		// 	let div = L.DomUtil.create("div", "info legend"),
		// 		grades = [0, 10, 20, 50, 100, 200, 500, 1000],
		// 		labels = [],
		// 		from, to;

		// 	for (let i = 0; i < grades.length; i++) {
		// 		from = grades[i];
		// 		to = grades[i + 1];

		// 		labels.push(
		// 			"<i style=\"background:" + getColor(from + 1) + "\"></i> " +
		// 			from + (to ? "&ndash;" + to : "+"));
		// 	}

		// 	div.innerHTML = labels.join("<br>");
		// 	return div;
		// };

		// legend.addTo(map);
	}

});
