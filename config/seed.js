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

    const cantidadCanchas = await db.Cancha.count();
    if (cantidadCanchas === 0) {
        const tipoFutbol = await db.TipoCancha.findOne({ where: { nombre: 'Fútbol Sintético' } });
        const tipoTenis = await db.TipoCancha.findOne({ where: { nombre: 'Tenis' } });

        await db.Cancha.bulkCreate([
            { 
                nombre: 'Cancha Pro Fútbol 1', 
                precio_por_hora: 150, 
                tipo_id: tipoFutbol ? tipoFutbol.id : 2,
                estado: 'activa' 
            },
            { 
                nombre: 'Court Central Tenis', 
                precio_por_hora: 100, 
                tipo_id: tipoTenis ? tipoTenis.id : 3, 
                estado: 'activa' 
            },
            { 
                nombre: 'Cancha Voley Playa', 
                precio_por_hora: 70, 
                tipo_id: 1, 
                estado: 'activa' 
            }
        ]);
        console.log("Canchas creadas exitosamente.");
    }
};