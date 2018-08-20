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





		// L.geoJson(world, { style: style }).addTo(map);



		let countrySelect;
		let testArray = [];
		let styleArray = {
			"type": "FeatureCollection", "features": testArray
		};
		let results = [];
		let str;
		let val;
		let newAtt;
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
			let cntplace;
			let jsonString;
			myMap.forEach(function (value, key) {
				// let countryColor;
				for (let j = 0; j < att.length; j++) {
					if (key == att[j].id) {
						// console.log(att[j].geometry)
						att[j].properties.name = value;
						// val = value;
						cntplace = { "type": "feature", "id": att[j].id, "properties": att[j].properties, "geometry": att[j].geometry, "value": val };
						// let countryColor = value;
						testArray.push(cntplace);
						// console.log(att[j]);
					}
					newStyle(att[j]);
				}
				newAtt = att;
				// console.log("key:" + key + " value: " + value);
				// jsonString = JSON.stringify(styleArray)
				// console.log(newAtt)
			});

			// console.log(jsonString)
			// console.log(styleArray);
			// console.log(val)
		});
		// function colorCode() {
		// 	if (value > 5) {

		// 	}

		// m.forEach(function(p){
		// 	p.name= m.name;
		// });
		// fs.writeFile('countries.geo.js', JSON.stringify(m));


		function getColor(d) {
			return d > 20 ? "#801026" :
				d > 16 ? "#BD0026" :
					d > 13 ? "#E31A1C" :
						d > 9 ? "#FC4E2A" :
							d > 5 ? "#FD8D3C" :
								d > 3 ? "#FEB24C" :
									d >= 1 ? "#FED116" :
										"#6aed6c";
		}
		function newStyle(features) {
			// console.log()
			return {
				weight: 2,
				opacity: 1,
				color: "green",
				dashArray: "3",
				fillOpacity: 0.7,
				fillColor: getColor(features.properties.name)
			};
		}
		// }
		// function style(myMap) {
		// 	return {
		// 		weight: 2,
		// 		opacity: 1,
		// 		color: "white",
		// 		dashArray: "3",
		// 		fillOpacity: 0.7,
		// 		fillColor: getColor(myMap)
		// 	};
		// }
		L.geoJson(att, { style: newStyle }).addTo(map);

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
					userBlock.html("<div class='user'>" + ftrLoc[i].id + "</div><img src='" + ftrLoc[i].image + "'><div class='name'>" + ftrLoc[i].username + "</div>");
					// popup.setContent(userBlock)
					$("#sidecol").append(userBlock);
				
				}
			}
		}


		function onEachFeature(feature, layer) {
			layer.on({

				click: getCountries
			});
		}
		geojson = L.geoJson(att, {
			// style: newStyle,
			onEachFeature: onEachFeature
		}).addTo(map);
	}

});