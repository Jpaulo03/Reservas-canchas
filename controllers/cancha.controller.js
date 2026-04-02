const { checkUser } = require("../middlewares/check-user");

module.exports = (app, db) => {
    
    app.get('/canchas', checkUser, async (req, res) => {
        
        const listaCanchas = await db.Cancha.findAll();

        res.render('canchas/list-canchas', { canchas: listaCanchas });
    });

    app.get('/canchas/nueva', checkUser, async (req, res) => {

        const tipos = await db.TipoCancha.findAll();
        
        res.render('canchas/form-cancha', { tipos: tipos });
    });

    app.post('/canchas/nueva', checkUser, async (req, res) => {

        const { nombre, precio_por_hora, tipo_id } = req.body;

        await db.Cancha.create({
            nombre: nombre,
            precio_por_hora: precio_por_hora,
            tipo_id: tipo_id
        });

        res.redirect('/canchas');
    });

}