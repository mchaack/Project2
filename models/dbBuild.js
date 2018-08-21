module.exports = function (sequelize, DataTypes) {
	const TravelTable = sequelize.define("TravelTable", {
		username: DataTypes.STRING,
		email: DataTypes.STRING,
		image: DataTypes.STRING,
		future_location: DataTypes.STRING,
	
	});
	return TravelTable;
};
