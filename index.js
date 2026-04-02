const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const session = require('express-session');

const db = require('./models');
const seed = require('./config/seed');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'clave_secreta_para_reservas_super_segura',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'clave_secreta_para_reservas_super_segura',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.get('/', (req, res) => {
    res.redirect('/canchas');
});

require('./controllers')(app, db);

db.sequelize.sync({
    // force: true
}).then(async() => {
    console.log("Base de datos sincronizada.");
    
    await seed(db);

    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
});