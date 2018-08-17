module.exports = function (sequelize, DataTypes) {
	var TravelTable = sequelize.define("TravelTable", {
<<<<<<< HEAD
		text: DataTypes.STRING,
		complete: DataTypes.BOOLEAN
	});
	return TravelTable,
=======
		location_visited: DataTypes.STRING,
		future_location: DataTypes.STRING,
		month: DataTypes.STRING,
		interest: DataTypes.STRING
	});
	return TravelTable;
>>>>>>> 99c38f4cc7feedc57cd25e1507eb71b91cfccbab
};
