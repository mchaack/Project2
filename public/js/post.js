$(document).ready(function () {
	$(".mappin").hide();

	let att = world;
	console.log(att);
	let countryArray = [];

	function addToMap() {
		$(".mappin").show();

		let map = L.map("map").setView([0, 0], 2);

		L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", {
			maxZoom: 18,
			attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, " +
				"<a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, " +
				"Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
			id: "mapbox.light"
		}).addTo(map);


		// control that shows state info on hover
		let info = L.control();

		info.onAdd = function (map) {
			this._div = L.DomUtil.create("div", "info");
			this.update();
			return this._div;
		};

		info.update = function (props) {
			this._div.innerHTML = "<h4>People interested in visiting this country</h4>" + (props ?
				"<b>" + props.name + "</b><br />" + props.density + " people / mi<sup>2</sup>"
				: "Hover over a country");
		};

		info.addTo(map);


		// get color depending on population density value
		function getColor(d) {
			return d == "Brazil" ? "#801026" :
				d == "Costa Rica" ? "#BD0026" :
					d > 200 ? "#E31A1C" :
						d == "Colombia" ? "#FC4E2A" :
							d > 50 ? "#FD8D3C" :
								d > 20 ? "#FEB24C" :
									d == "Mexico" ? "#FED976" :
										"#FFEDA0";
		}

		function style(feature) {
			return {
				weight: 2,
				opacity: 1,
				color: "white",
				dashArray: "3",
				fillOpacity: 0.7,
				fillColor: getColor(feature.properties.name)
			};
		}
		L.geoJson(world, { style: style }).addTo(map);
		let geojson;

		function highlightFeature(e) {
			let layer = e.target;

			layer.setStyle({
				weight: 5,
				color: "#677",
				dashArray: "",
				fillOpacity: 0.7
			});

			if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
				layer.bringToFront();
			}

			info.update(layer.feature.properties);
		}

		function resetHighlight(e) {
			geojson.resetStyle(e.target);
			info.update();
		}


		function arrayStyle() {
			for (let i = 0; i < countryArray.length; i++) {
				countryArray[i].setStyle({ fillColor: "blue" });
				console.log("clicked: " + countryArray[i]);
			}
		}



		function zoomToFeature(e) {
			map.fitBounds(e.target.getBounds());
			console.log(e.target.feature.properties.name);
			let countryBoolean = false;
			for (let i = 0; i < countryArray.length; i++) {
				if (countryArray[i] == e.target) {
					countryBoolean = true;
					console.log(e.target.feature.properties.name + " already included in list");
					countryArray.splice((countryArray[i], countryArray), 1);
					console.log("country removed, new list" + countryArray);
				}
			}
			if (countryBoolean == false) {
				countryArray.push(e.target);
			}
			console.log(countryArray);
			arrayStyle();
		}
		function onEachFeature(feature, layer) {
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight,
				click: zoomToFeature
			});
		}

		geojson = L.geoJson(world, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);


		let legend = L.control({ position: "bottomright" });

		legend.onAdd = function (map) {

			let div = L.DomUtil.create("div", "info legend"),
				grades = [0, 10, 20, 50, 100, 200, 500, 1000],
				labels = [],
				from, to;

			for (let i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1];

				labels.push(
					"<i style=\"background:" + getColor(from + 1) + "\"></i> " +
					from + (to ? "&ndash;" + to : "+"));
			}

			div.innerHTML = labels.join("<br>");
			return div;
		};

		legend.addTo(map);

	}

	let userName;
	let eMail;
	let image;
	$(".create-submit").on("click", function () {
		event.preventDefault();
		userName = $("#user-name").val().trim();
		eMail = $("#email").val().trim();
		image = $("#profile-pic").val().trim()
		console.log(userName);
		$(".login-title").hide();
		// $(".project-title").hide();


		$(".mappin").show();
		addToMap();
	})

	function insertTodo(e) {
		const aryCntry = []
		for (let i = 0; i < countryArray.length; i++) {
			aryCntry.push(countryArray[i].feature.id)
		}
		aryCntry.toString;
		console.log(aryCntry.toString());
		const ftrLoc = {
			username: userName,
			email: eMail,
			image: image,
			future_location: aryCntry.toString()
		};

		$.post("/api/future_locations", ftrLoc);
	}

	$(".submit").on("click", function (e) {
		insertTodo(e);
	});
	// This function inserts a new todo into our database and then updates the view

});
