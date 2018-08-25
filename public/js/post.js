$(document).ready(function () {

	let att = world;
	console.log(att);
	let countryArray = [];

	function addToMap() {
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
			this._div.innerHTML = "<h4>Select countries that you would like to visit.</h4>" + (props ?
				"<b>" + props.name + "</b><br />"
				: "Hover over a country");
		};

		info.addTo(map);

		function style(feature) {
			return {
				weight: 2,
				opacity: 1,
				color: "white",
				dashArray: "3",
				fillOpacity: 0.7,
				fillColor: "#FFEDA0"
			};
		}
		L.geoJson(world, { style: style }).addTo(map);
		let geojson;

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
		function highlightFeatureSeparate(e) {
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
		function resetHighlightSeparate(e) {
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
			console.log(e.target.feature.properties.name);
			let countryBoolean = false;
			for (let i = 0; i < countryArray.length; i++) {
				console.log(countryArray[i].feature.properties.name);
				if (countryArray[i] == e.target) {
					countryBoolean = true;
					console.log(e.target.feature.properties.name + " already included in list");
					countryArray.splice((countryArray[i], countryArray), 1);
					console.log("country removed, new list" + countryArray);
					resetHighlight(e);
				}
			}
			if (countryBoolean == false) {
				countryArray.push(e.target);
				arrayStyle();
			}
			console.log(countryArray);
		}
		function onEachFeature(feature, layer) {
			layer.on({
				mouseover: highlightFeatureSeparate,
				mouseout: resetHighlightSeparate,
				click: zoomToFeature
			});
		}

		geojson = L.geoJson(world, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);


	}

	let userName;
	let eMail;
	let image;
	addToMap();

	$(".create-submit").on("click", function () {
		event.preventDefault();
		userName = $("#user-name").val().trim();
		eMail = $("#email").val().trim();
		image = $("#profile-pic").val().trim();
		console.log(userName);
		$(".login-title").hide();
		addToMap();
	});

	function insertTodo(e) {
		const countries = [];
		for (let i = 0; i < countryArray.length; i++) {
			countries.push(countryArray[i].feature.id);
		}
		countries.toString;
		console.log(countries.toString());
		const ftrLoc = {
			username: userName,
			email: eMail,
			image: image,
			future_location: countries.toString()
		};

		$.post("/api/future_locations", ftrLoc).then(function (res) {
			console.log(res);
			window.location.replace("/public_map");
		});
		
	}

	$(".submit").on("click", function (e) {
		insertTodo(e);
	});

});
