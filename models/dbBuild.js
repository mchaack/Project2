module.exports = function (sequelize, DataTypes) {
	var TravelTable = sequelize.define("TravelTable", {
		text: DataTypes.STRING,
		complete: DataTypes.BOOLEAN
	});
	return TravelTable,
};
