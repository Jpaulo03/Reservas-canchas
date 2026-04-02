const { sequelize, Sequelize } = require('../config/db.config');

const Cancha = require('./cancha.model')(sequelize);
const Usuario = require('./usuario.model')(sequelize);
const TipoCancha = require('./tipo_cancha.model')(sequelize);

TipoCancha.hasMany(Cancha, { foreignKey: 'tipo_id' });

Cancha.belongsTo(TipoCancha, { foreignKey: 'tipo_id' });

module.exports = {
    Usuario,
    TipoCancha,
    Cancha,
    sequelize,
    Sequelize
}