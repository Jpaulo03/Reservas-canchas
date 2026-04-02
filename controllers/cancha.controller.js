const { checkUser } = require("../middlewares/check-user");
const { checkAdmin } = require("../middlewares/check-admin");

module.exports = (app, db) => {
    
    app.get('/canchas', checkUser, async (req, res) => {
        
        const listaCanchas = await db.Cancha.findAll();

        res.render('canchas/list-canchas', { canchas: listaCanchas });
    });

    app.get('/canchas/nueva', checkAdmin, async (req, res) => {
        const tipos = await db.TipoCancha.findAll();
        res.render('canchas/form-cancha', { tipos: tipos });
    });

    app.post('/canchas/nueva', checkAdmin, async (req, res) => {
        const { nombre, precio_por_hora, tipo_id } = req.body;

        await db.Cancha.create({
            nombre: nombre,
            precio_por_hora: precio_por_hora,
            tipo_id: tipo_id
        });

        res.redirect('/canchas');
    });


    app.get('/canchas/editar/:id', checkAdmin, async (req, res) => {
        const idCancha = req.params.id;
        
        const cancha = await db.Cancha.findByPk(idCancha);
        const tipos = await db.TipoCancha.findAll();
        
        res.render('canchas/form-editar', { cancha: cancha, tipos: tipos });
    });

    app.post('/canchas/editar/:id', checkAdmin, async (req, res) => {
        const idCancha = req.params.id;
        const { nombre, precio_por_hora, tipo_id, estado } = req.body;

        await db.Cancha.update(
            {
                nombre: nombre,
                precio_por_hora: precio_por_hora,
                tipo_id: tipo_id,
                estado: estado
            },
            { where: { id: idCancha } }
        );

        res.redirect('/canchas');
    });

    app.post('/canchas/eliminar/:id', checkAdmin, async (req, res) => {
        const idCancha = req.params.id;

        await db.Cancha.destroy({
            where: { id: idCancha }
        });

        res.redirect('/canchas');
    });
}