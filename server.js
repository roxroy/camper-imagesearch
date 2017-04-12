var express = require('express')
var path = require('path')
var url = require('url'),
    routes = require('./app/routes');

var app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'pug')
app.set('views', __dirname + '/views');

app.get('/', routes.index);
app.get('/search/:term', routes.search);
app.get('/latest', routes.latest);

app.listen(process.env.PORT || 3000)
