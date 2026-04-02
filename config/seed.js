const sha1 = require('sha1');

module.exports = async (db) => {
    const cantidadTipos = await db.TipoCancha.count();
    if (cantidadTipos === 0) {
        await db.TipoCancha.bulkCreate([
            { nombre: 'Voleibol' },
            { nombre: 'Fútbol Sintético' },
            { nombre: 'Tenis' },
            { nombre: 'Básquetbol' }
        ]);
        console.log("Tipos de cancha iniciales creados.");
    }

    const adminExistente = await db.Usuario.findOne({ where: { rol: 'admin' } });
    if (!adminExistente) {
        await db.Usuario.create({
            nombre: 'Administrador',
            email: 'admin@test.com',
            contrasena: sha1('admin123'),
            rol: 'admin'
        });
        console.log("Administrador por defecto creado");
    }
};