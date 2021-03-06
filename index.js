/**
 * IMPORT EXTERNAL
 */
const express = require('express');
const app = express();
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});
const mongoose = require('mongoose');
const session = require('express-session');


/**
 * config session
 */
app.use(session({
    secret: 'alsdh93e9d927d',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10000 }
}));
/**
 * IMPORT INTERNAL
 */
const accountRoute = require('./src/controllers/users');
const productRoute = require('./src/controllers/products');
const transactionRoute = require('./src/controllers/transactions');
const viewRoute = require('./src/controllers');

/**
 * APP CONFIG
 */
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(bodyParser);
app.use(body.json());

app.use('/api/v.1', viewRoute);
app.use('/api/v.1/product', productRoute);
app.use('/api/v.1/account', accountRoute);
app.use('/api/v.1/transaction', transactionRoute);

const port = process.env.PORT || 9256;
const uri = 'mongodb://localhost/nami-hackathon'
mongoose.connect(uri);
mongoose.connection.once('open', ()=>{
    app.listen(port, ()=> console.log(`Server started at port ${port}`));
})