var mongoose = require('mongoose'),
    url = require('url'),
    path = require("path"),
    HistoryModel = require('./historyModel'),
    searchService = require('./searchService');

var db_url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/imagesearch';
mongoose.connect(db_url);

const getTerm = function(req_url){
  var parsed = url.parse(req_url);
  return decodeURI( path.basename(parsed.pathname) );
}

exports.index = function(req, res){
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('index', {url: fullUrl } )
};

exports.search = function(req, res){
  var term = getTerm(req.url) ;
  var offset = req.query.offset || 1 ;
  
  new HistoryModel({
    term : term
  }).save();

  searchService.getResults(res, {term: term, offset: offset} );
};

exports.latest = function(req, res){
    HistoryModel.find({}, '-_id term when', function (err, histories) {
      if ( err ) {
          return res.json({Error: 'Sorry, something went wrong!'});
      }
      return res.json(histories); 
    });
};
