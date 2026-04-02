const { checkAdmin } = require("../middlewares/check-admin");

module.exports = (app, db) => {
    
    app.get('/admin/tipos', checkAdmin, async (req, res) => {
        const tipos = await db.TipoCancha.findAll();
        res.render('tipos/list-tipos', { tipos: tipos });
    });

    app.get('/admin/tipos/nuevo', checkAdmin, (req, res) => {
        res.render('tipos/form-tipo', { tipo: null }); 
    });

    app.post('/admin/tipos/nuevo', checkAdmin, async (req, res) => {
        const { nombre } = req.body;
        
        await db.TipoCancha.create({ nombre: nombre });
        res.redirect('/admin/tipos');
    });

    app.get('/admin/tipos/editar/:id', checkAdmin, async (req, res) => {
        const idDelTipo = req.params.id;
        const tipo = await db.TipoCancha.findByPk(idDelTipo);
        res.render('tipos/form-tipo', { tipo: tipo });
    });

    app.post('/admin/tipos/editar/:id', checkAdmin, async (req, res) => {
        const idDelTipo = req.params.id;
        const { nombre } = req.body;
        
        await db.TipoCancha.update(
            { nombre: nombre },
            { where: { id: idDelTipo } }
        );
        res.redirect('/admin/tipos');
    });

    app.post('/admin/tipos/eliminar/:id', checkAdmin, async (req, res) => {
        const idDelTipo = req.params.id;
        await db.TipoCancha.destroy({
            where: { id: idDelTipo }
        });
        res.redirect('/admin/tipos');
    });
}