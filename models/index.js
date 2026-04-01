const { sequelize, Sequelize } = require('../config/db.config');

const Usuario = require('./usuario.model')(sequelize);
const TipoCancha = require('./tipo_cancha.model')(sequelize);

module.exports = {
    Usuario,
    TipoCancha,
    sequelize,
    Sequelize
}