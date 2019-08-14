const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const VIEWS_PATH = path.join(__dirname,'/views')

app.engine('mustache', mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')
app.use(express.urlencoded())
app.use(bodyParser.urlencoded())

var pgp = require('pg-promise')();
var connectionString = 'postgres://localhost:5432/blogsdb';
var db = pgp(connectionString);

app.post('/add-blog',(req,res) => {
    let title = req.body.title
    let blogbody = req.body.blogbody

    db.none('INSERT INTO blogs(title,blogbody) VALUES($1,$2)',[title,blogbody]).then(() => {
        res.redirect('/')
    })
    
})

app.get('/add-blog',(req,res) => {
    res.render('add-blog')
})

app.get('/',(req,res) => {

    db.any('SELECT blogid,title,blogbody FROM blogs;')
    .then((blogs) => {
        console.log(blogs)
        res.render('index',{blogs: blogs})
    }).catch(error => {
        res.render('index',{message: 'Unable to get trips!'})
    })
})

app.listen(3000,() => {
    console.log("Server is running")
})

