$(document).ready(function () {
	let ftrLoc;
	// let str;
	const att = world.features;

	console.log(att);
	// This function grabs todos from the database and updates the view
	mapDisplay();
	function mapDisplay() {
		$("#user-list").hide();
		let map = L.map("map").setView([10, 0], 2);

		L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoianJuZWxzMTAiLCJhIjoiY2prenI0cGpyMHg5bDN3bGU3bnd2eWZlMCJ9.3APPzTqzXC9bF-V3Up6z3w", {
			maxZoom: 18,
			attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, " +
				"<a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, " +
				"Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
			id: "mapbox.dark"
		}).addTo(map);



		let countrySelect;
		let testArray = [];
		let results = [];
		let str;
		let val;
		let myMap = new Map();
		let newAtt;

		$.get("/api/future_locations", function (data) {

			ftrLoc = data;
			console.log(ftrLoc);

			function storedCountries(e) {
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
			myMap.forEach(function (value, key) {
				// let countryColor;
				for (let j = 0; j < att.length; j++) {
					if (key == att[j].id) {
						// console.log(att[j].geometry)
						att[j].properties.name = value;
						cntplace = { "type": "feature", "id": att[j].id, "properties": att[j].properties, "geometry": att[j].geometry, "value": val };
						testArray.push(cntplace);
					}
				}
				newAtt = att;
				// console.log("key:" + key + " value: " + value);
			});
			// console.log(newAtt)


		}).then(function (res) {
			console.log(res);
			console.log(newAtt);
			function newStyle(features) {
				return {
					weight: 2,
					opacity: 1,
					color: "white",
					dashArray: "3",
					fillOpacity: 0.7,
					fillColor: getColor(features.properties.name)
				};
			}
			L.geoJson(att, { style: newStyle }).addTo(map);

			function getCountries(e) {
				$("#user-list").show();
				$("#user-list").empty();
				
				countrySelect = e.target.feature;
				console.log(e.target.feature.id);
				// console.log(data)
				for (let i = 0; i < ftrLoc.length; i++) {
					let userBlock = $("<button>");
					str = ftrLoc[i].future_location;
					console.log(ftrLoc[i].username)
					if (str.includes(countrySelect.id)) {
						console.log(countrySelect.id);
						results.push(ftrLoc[i]);
						userBlock.attr("data", ftrLoc[i].id);
						userBlock.addClass("people");
						userBlock.html("<div class='user w-100'>" + ftrLoc[i].username + "</div><img class='profile-image' src=" + ftrLoc[i].image + ">");
						// popup.setContent(userBlock)
						$("#user-list").append(userBlock);

					}
				}
				$(".people").on("click", function () {
					console.log("mouseover")
					// $("p").css("background-color", "yellow");
				});
			}


			function getColor(d) {
				return d > 12 ? "#801026" :
					d > 9 ? "#BD0026" :
						d > 7 ? "#E31A1C" :
							d > 4 ? "#FC4E2A" :
								d > 3 ? "#FD8D3C" :
									d > 2 ? "#FEB24C" :
										d > 1 ? "#FED976" :
											"#FFEDA0";
			}


			function onEachFeature(feature, layer) {
				layer.on({
					click: getCountries
				});
			}
			geojson = L.geoJson(att, {
				style: newStyle,
				onEachFeature: onEachFeature
			}).addTo(map);



			let legend = L.control({ position: "bottomright" });
			legend.onAdd = function (map) {
				let div = L.DomUtil.create("div", "legend");
				// let labels = ["Countries selected by more than 1 user"];
				let grades = [0, 1, 2, 3, 4, 7, 9, 12];
				div.innerHTML = "<div class='m-auto text-center'><b>Number of users that selected country</b>";
				// loop through our density intervals and generate a label with a colored square for each interval
				let numb = 0;
				for (let i = 0; i < grades.length; i++) {
					console.log(numb)
					div.innerHTML += "<div class='legend-block m-3'><div id='legend-style-" + numb + "'></div><div class='legend-number'>" +
						grades[i] + "</div></div>";
					numb++;
				}

				return div;
			};
			legend.addTo(map)



		})


	}

});