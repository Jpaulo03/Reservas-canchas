const { checkUser } = require("../middlewares/check-user");
const { checkAdmin } = require("../middlewares/check-admin");

module.exports = (app, db) => {
    
    app.get('/reservar/:cancha_id', checkUser, async (req, res) => {
        const idDeLaCancha = req.params.cancha_id;

        const fechaBuscada = req.query.fecha;

        const cancha = await db.Cancha.findByPk(idDeLaCancha);

        let reglasBusqueda = {
            cancha_id: idDeLaCancha,
            disponible: true
        };

        if (fechaBuscada) {
            reglasBusqueda.fecha = fechaBuscada;
        }

        const horariosDisponibles = await db.Horario.findAll({
            where: reglasBusqueda,
            order: [
                ['fecha', 'ASC'], 
                ['hora_inicio', 'ASC']
            ]
        });

        res.render('reservas/form-reserva', { 
            cancha: cancha, 
            horarios: horariosDisponibles,
            fechaSeleccionada: fechaBuscada
        });
    });

    app.post('/reservar/:horario_id', checkUser, async (req, res) => {
        const idDelHorario = req.params.horario_id;
        
        const idDelUsuario = req.session.user.id; 

        await db.Reserva.create({
            estado: 'confirmada',
            usuario_id: idDelUsuario,
            horario_id: idDelHorario
        });

        
        await db.Horario.update(
            { disponible: false },
            { where: { id: idDelHorario } }
        );

        res.redirect('/mis-reservas');
    });

    app.get('/mis-reservas', checkUser, async (req, res) => {
        const idDelUsuario = req.session.user.id;

        const misReservas = await db.Reserva.findAll({
            where: { usuario_id: idDelUsuario },
            include: [
                {
                    model: db.Horario,
                    include: [db.Cancha]
                }
            ]
        });

        res.render('reservas/mis-reservas', { reservas: misReservas });
    });

    app.post('/reservas/cancelar/:reserva_id', checkUser, async (req, res) => {
        const idDeLaReserva = req.params.reserva_id;

        const reserva = await db.Reserva.findByPk(idDeLaReserva);

        if (reserva) {
            await db.Reserva.update(
                { estado: 'cancelada' },
                { where: { id: idDeLaReserva } }
            );

            await db.Horario.update(
                { disponible: true },
                { where: { id: reserva.horario_id } }
            );
        }
        
        res.redirect('/mis-reservas');
    });

    app.get('/admin/reservas', checkAdmin, async (req, res) => {
        
        const todasLasReservas = await db.Reserva.findAll({
            include: [
                { model: db.Usuario },
                {
                    model: db.Horario,
                    include: [db.Cancha]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.render('reservas/admin-reservas', { reservas: todasLasReservas });
    });

    app.post('/admin/reservas/estado/:id', checkAdmin, async (req, res) => {
        const idDeLaReserva = req.params.id;
        const { nuevo_estado } = req.body; 

        await db.Reserva.update(
            { estado: nuevo_estado },
            { where: { id: idDeLaReserva } }
        );

        res.redirect('/admin/reservas');
    });
}