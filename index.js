const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const session = require('express-session');

const db = require('./models');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'clave_secreta_para_reservas_super_segura',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    res.send('El sistema de reservas está listo para jugar');
});

require('./controllers')(app, db);

db.sequelize.sync({
    // force: true
}).then(() => {
    console.log("Base de datos sincronizada. Las tablas han sido creadas.");
    
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });

}).catch(error => {
    console.error("Error al sincronizar la base de datos:", error);
});