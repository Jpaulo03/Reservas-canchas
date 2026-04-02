const { checkUser } = require("../middlewares/check-user");

module.exports = (app, db) => {
    
    
    app.get('/horarios/nuevo/:cancha_id', checkUser, async (req, res) => {

        const idDeLaCancha = req.params.cancha_id;

        const cancha = await db.Cancha.findByPk(idDeLaCancha);

        res.render('horarios/form-horario', { cancha: cancha });
    });

    app.post('/horarios/nuevo/:cancha_id', checkUser, async (req, res) => {
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

}