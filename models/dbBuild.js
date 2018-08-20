module.exports = function (sequelize, DataTypes) {
	const TravelTable = sequelize.define("TravelTable", {
		username: DataTypes.STRING,
		email: DataTypes.STRING,
		image: DataTypes.STRING,
<<<<<<< HEAD
		future_location: DataTypes.STRING,
	
=======
		future_location: DataTypes.STRING
>>>>>>> d81c96570a9a4d2d54aa2aab5839bfef91cc735d
	});
	return TravelTable;
};
