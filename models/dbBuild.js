module.exports = function (sequelize, DataTypes) {
	const traveltables = sequelize.define("traveltables", {
		username: DataTypes.STRING,
		email: DataTypes.STRING,
		image: DataTypes.STRING,
		future_location: DataTypes.STRING,
	
	});
	return traveltables;
};
