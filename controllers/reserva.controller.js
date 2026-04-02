const { checkUser } = require("../middlewares/check-user");

module.exports = (app, db) => {
    
    app.get('/reservar/:cancha_id', checkUser, async (req, res) => {
        const idDeLaCancha = req.params.cancha_id;

        const cancha = await db.Cancha.findByPk(idDeLaCancha);

        const horariosDisponibles = await db.Horario.findAll({
            where: {
                cancha_id: idDeLaCancha,
                disponible: true
            }
        });

        res.render('reservas/form-reserva', { cancha: cancha, horarios: horariosDisponibles });
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
}