const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const TipoCancha = sequelize.define(
        'TipoCancha',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );

    return TipoCancha;
}