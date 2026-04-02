const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Cancha = sequelize.define(
        'Cancha',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            precio_por_hora: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            estado: {
                type: DataTypes.STRING,
                defaultValue: 'activa',
                allowNull: false
            }
        }
    );
    return Cancha;
}