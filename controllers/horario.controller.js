const { checkUser } = require("../middlewares/check-user");
const { checkAdmin } = require("../middlewares/check-admin");

module.exports = (app, db) => {
    
    
    app.get('/horarios/nuevo/:cancha_id', checkAdmin, async (req, res) => {

        const idDeLaCancha = req.params.cancha_id;

        const cancha = await db.Cancha.findByPk(idDeLaCancha);

        res.render('horarios/form-horario', { cancha: cancha });
    });

    app.post('/horarios/nuevo/:cancha_id', checkAdmin, async (req, res) => {
        const idDeLaCancha = req.params.cancha_id;
        
        const { fecha, hora_inicio, hora_fin } = req.body;

        await db.Horario.create({
            fecha: fecha,
            hora_inicio: hora_inicio,
            hora_fin: hora_fin,
            cancha_id: idDeLaCancha
        });

        res.redirect('/canchas');
    });

    app.post('/horarios/eliminar/:id', checkAdmin, async (req, res) => {
        const idDelHorario = req.params.id;

        await db.Horario.destroy({
            where: { id: idDelHorario }
        });

        res.redirect('/canchas');
    });
}