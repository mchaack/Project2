$(document).ready(function () {
	let att = world;
	console.log(att);

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

	let countryArray = [];

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
	function insertTodo(e) {
		const aryCntry = []
		for (let i = 0; i < countryArray.length; i++) {
			aryCntry.push(countryArray[i].feature.id)
		}
		aryCntry.toString;
		console.log(aryCntry.toString());
		const ftrLoc = {
			username: "person",
			email: "email",
			image: "none",
			future_location: aryCntry.toString(),
		};

		$.post("/api/future_locations", ftrLoc);
	}

	$(".submit").on("click", function (e) {
		insertTodo(e);
	});
	// This function inserts a new todo into our database and then updates the view

});
// Getting a reference to the input field where user adds a new todo
// var userInput = $(".location-visited").val().trim();
// console.log(userInput);
// Our new todos will go inside the todoContainer
//     var $todoContainer = $(".todo-container");
//     // Adding event listeners for deleting, editing, and adding todos
//     $(document).on("click", "button.delete", deleteTodo);
//     $(document).on("click", "button.complete", toggleComplete);
//     $(document).on("click", ".todo-item", editTodo);
//     $(document).on("keyup", ".todo-item", finishEdit);
//     $(document).on("blur", ".todo-item", cancelEdit);
//     $(document).on("submit", "#todo-form", insertTodo);

//     // Our initial todos array
//     var todos = [];

//     // Getting todos from database when page loads
//     getTodos();

//     // This function resets the todos displayed with new todos from the database
//     function initializeRows() {
//         $todoContainer.empty();
//         var rowsToAdd = [];
//         for (var i = 0; i < todos.length; i++) {
//             rowsToAdd.push(createNewRow(todos[i]));
//         }
//         $todoContainer.prepend(rowsToAdd);
//     }

//     // This function grabs todos from the database and updates the view
//     function getTodos() {
//         $.get("/api/todos", function (data) {
//             todos = data;
//             initializeRows();
//         });
//     }

//     // This function deletes a todo when the user clicks the delete button
//     function deleteTodo(event) {
//         event.stopPropagation();
//         var id = $(this).data("id");
//         $.ajax({
//             method: "DELETE",
//             url: "/api/todos/" + id
//         }).then(getTodos);
//     }

//     // This function handles showing the input box for a user to edit a todo
//     function editTodo() {
//         var currentTodo = $(this).data("todo");
//         $(this).children().hide();
//         $(this).children("input.edit").val(currentTodo.text);
//         $(this).children("input.edit").show();
//         $(this).children("input.edit").focus();
//     }

//     // Toggles complete status
//     function toggleComplete(event) {
//         event.stopPropagation();
//         var todo = $(this).parent().data("todo");
//         todo.complete = !todo.complete;
//         updateTodo(todo);
//     }

//     // This function starts updating a todo in the database if a user hits the "Enter Key"
//     // While in edit mode
//     function finishEdit(event) {
//         var updatedTodo = $(this).data("todo");
//         if (event.which === 13) {
//             updatedTodo.text = $(this).children("input").val().trim();
//             $(this).blur();
//             updateTodo(updatedTodo);
//         }
//     }

//     // This function updates a todo in our database
//     function updateTodo(todo) {
//         $.ajax({
//             method: "PUT",
//             url: "/api/todos",
//             data: todo
//         }).then(getTodos);
//     }

//     // This function is called whenever a todo item is in edit mode and loses focus
//     // This cancels any edits being made
//     function cancelEdit() {
//         var currentTodo = $(this).data("todo");
//         if (currentTodo) {
//             $(this).children().hide();
//             $(this).children("input.edit").val(currentTodo.text);
//             $(this).children("span").show();
//             $(this).children("button").show();
//         }
//     }

//     // This function constructs a todo-item row
//     function createNewRow(todo) {
//         var $newInputRow = $(
//             [
//                 "<li class='list-group-item todo-item'>",
//                 "<span>",
//                 todo.text,
//                 "</span>",
//                 "<input type='text' class='edit' style='display: none;'>",
//                 "<button class='delete btn btn-danger'>x</button>",
//                 "<button class='complete btn btn-primary'>✓</button>",
//                 "</li>"
//             ].join("")
//         );

//         $newInputRow.find("button.delete").data("id", todo.id);
//         $newInputRow.find("input.edit").css("display", "none");
//         $newInputRow.data("todo", todo);
//         if (todo.complete) {
//             $newInputRow.find("span").css("text-decoration", "line-through");
//         }
//         return $newInputRow;
//     }

// // This function inserts a new todo into our database and then updates the view
// function insertTodo(event) {
//     event.preventDefault();
//     var todo = {
//         text: $newItemInput.val().trim(),
//         complete: false
//     };

//     $.post("/api/todos", todo, getTodos);
//     $newItemInput.val("");
// }
// });