const { checkUser } = require("../middlewares/check-user");

module.exports = (app, db) => {
    
    app.get('/resenas/nueva/:cancha_id', checkUser, async (req, res) => {
        const idDeLaCancha = req.params.cancha_id;
        
        const cancha = await db.Cancha.findByPk(idDeLaCancha);

        res.render('resenas/form-resena', { cancha: cancha });
    });

    app.post('/resenas/nueva/:cancha_id', checkUser, async (req, res) => {
        const idDeLaCancha = req.params.cancha_id;
        
        const idDelUsuario = req.session.user.id;
        
        const { calificacion, comentario } = req.body;

        await db.Resena.create({
            calificacion: calificacion,
            comentario: comentario,
            usuario_id: idDelUsuario,
            cancha_id: idDeLaCancha
        });

        res.redirect('/canchas');
    });

    app.get('/canchas/:cancha_id/resenas', checkUser, async (req, res) => {
        const idDeLaCancha = req.params.cancha_id;

        const cancha = await db.Cancha.findByPk(idDeLaCancha);

        const resenas = await db.Resena.findAll({
            where: { cancha_id: idDeLaCancha },
            include: [
                { 
                    model: db.Usuario, 
                    attributes: ['nombre'] 
                }
            ],
            order: [['createdAt', 'DESC']] 
        });

        res.render('resenas/list-resenas', { cancha: cancha, resenas: resenas });
    });
}