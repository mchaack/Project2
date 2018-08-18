module.exports = function (sequelize, DataTypes) {
<<<<<<< HEAD
	var TravelTable = sequelize.define("TravelTable", {
<<<<<<< HEAD
		text: DataTypes.STRING,
		complete: DataTypes.BOOLEAN
	});
	return TravelTable,
=======
=======
	const TravelTable = sequelize.define("TravelTable", {
		username: DataTypes.STRING,
		email: DataTypes.STRING,
>>>>>>> 758a243740884163e305020f7816bc28c25e84dc
		location_visited: DataTypes.STRING,
		future_location: DataTypes.STRING,
		month: DataTypes.STRING,
		interest: DataTypes.STRING
	});
	return TravelTable;
>>>>>>> 99c38f4cc7feedc57cd25e1507eb71b91cfccbab
};
