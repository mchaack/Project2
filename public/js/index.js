let modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};
function insertTodo(e) {
	const aryCntry = []
	for (let i = 0; i < countryArray.length; i++) {
		aryCntry.push(countryArray[i].feature.id)
	}
	aryCntry.toString;
	console.log(aryCntry.toString())
	const ftrLoc = {
		username: "person",
		email: "email",
	};

	$.post("/api/future_locations", ftrLoc);
}
$(".submit").on("click", function () {
	const usr = $("#user-name").val().trim();
	const eml = $("#email").val().trim();

	console.log("Username: " + usr);
	console.log("Username: " + eml);
	return;
});