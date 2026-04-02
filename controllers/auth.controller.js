const sha1 = require('sha1');

module.exports = (app, db) => {
    
    app.get('/register', (req, res) => {
        res.render('auth/form-register', { error: null });
    });

    app.post('/register', async (req, res) => {
        const { nombre, email, contrasena } = req.body;

        const usuarioExistente = await db.Usuario.findOne({
            where: { email: email }
        });

        if (usuarioExistente) {
            return res.render('auth/form-register', { error: 'Email existente.' });
        }

        const contrasenaEncriptada = sha1(contrasena);

        await db.Usuario.create({
            nombre: nombre,
            email: email,
            contrasena: contrasenaEncriptada,
            rol: 'cliente'
        });

        res.redirect('/login');
    });

    app.get('/login', (req, res) => {
        res.render('auth/form-login', { error: null });
    });

    app.post('/login', async (req, res) => {
        const { email, contrasena } = req.body;

        const usuario = await db.Usuario.findOne({
            where: { email: email }
        });

        if (!usuario) {
            return res.render('auth/form-login', { error: 'Usuario o contraseña incorrectas' });
        }

        const contrasenaEncriptada = sha1(contrasena);

        if (contrasenaEncriptada !== usuario.contrasena) {
            return res.render('auth/form-login', { error: 'Usuario o contraseña incorrectas' });
        }

        req.session.user = {
            id: usuario.id,
            email: usuario.email,
            nombre: usuario.nombre,
            rol: usuario.rol
        };

        res.redirect('/canchas');
    });

    app.get('/logout', (req, res) => {
        req.session.user = null; 
        res.redirect('/login');
    });
}