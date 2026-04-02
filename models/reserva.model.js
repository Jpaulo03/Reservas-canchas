const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Reserva = sequelize.define(
        'Reserva',
        {
            estado: {
                type: DataTypes.STRING,
                defaultValue: 'confirmada',
                allowNull: false
            }
        }
    );

    return Reserva;
}