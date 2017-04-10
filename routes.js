var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/imagesearch');

exports.index = function(req, res){
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('index', {url: fullUrl } )
};

exports.search = function(req, res){
  return res.json('Show search'); 
};

exports.latest = function(req, res){
  return res.json('Show latest'); 
};
