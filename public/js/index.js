$(document).ready(function () {
	let userName;
	let eMail;
	$(".submit").on("click", function () {
		userName = $("#user-name").val().trim();
		eMail = $("#email").val().trim();
		console.log(userName);
		insertUser();
	})
	function insertUser() {
		const userAccnt = {
			username: userName,
			email: eMail,
		}
		$.post("/api/future_locations", userAccnt);
	}
})