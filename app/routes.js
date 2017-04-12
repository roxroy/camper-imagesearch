var mongoose = require('mongoose'),
    HistoryModel = require('./historyModel');

mongoose.connect('mongodb://localhost/imagesearch');

exports.index = function(req, res){
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('index', {url: fullUrl } )
};

exports.search = function(req, res){
  var term = req.params.term;
  var offset = req.query.offset;
  new HistoryModel({
    term : term + ' ' + offset
  }).save();
  
  return res.json('Show search: ' + term + ' ' + offset ); 
};

exports.latest = function(req, res){
    HistoryModel.find({}, '-_id term when', function (err, histories) {
      if ( err ) {
          return res.json({Error: 'Sorry, something went wrong!'});
      }
      return res.json(histories); 
    });
};
