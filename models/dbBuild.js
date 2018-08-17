module.exports = function (sequelize, DataTypes) {
	const TravelTable = sequelize.define("TravelTable", {
		location_visited: DataTypes.STRING,
		future_location: DataTypes.STRING,
		month: DataTypes.STRING,
		interest: DataTypes.STRING
	});
	return TravelTable;
};
