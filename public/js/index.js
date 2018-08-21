$(document).ready(function () {
	let userName;
	let eMail;
	$(".submit").on("click", function () {
		event.preventDefault();
		userName = $("#user-name").val().trim();
		eMail = $("#email").val().trim();
		console.log(userName);
		insertUser();
	})
	function insertUser() {
		const userAccnt = {
			username: userName,
			email: eMail
		}
		$.post("/api/future_locations", userAccnt).then(function (res) {
			console.log(res)
			window.location.replace("/user_map?" + "username=" + res.username);
			// window.location.replace(data.redirect); than window.location.href = data.redirect;
		});

	}
})