const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

app.engine('mustache', mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')
app.use('/css',express.static("css"))
app.use(express.urlencoded())
app.use(bodyParser.urlencoded())

var pgp = require('pg-promise')();
var connectionString = 'postgres://yjgevibv:1xxm0eV7yIkqiOYWhRU73zcuB90NlOVE@raja.db.elephantsql.com:5432/yjgevibv';
var db = pgp(connectionString);



app.get('/',(req,res) => {
   
    res.render('index')
})

app.post('/',(req,res) => {
    db.any('SELECT uselessid,uselessbody FROM chuck ORDER BY RANDOM () LIMIT 1;')
    .then((chuck) => {
        res.render('index',{chuck: chuck})
    }).catch(error => {
        console.log('catch')
        res.render('index', {message: 'You will not be entertained!'})
    })
})

app.listen(3000,() => {
    console.log("Server is Active")
})