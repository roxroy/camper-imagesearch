// Config
// If undefined in our process load our local file
// (i.e. we aren't on an external server where we set these differently)
if(!process.env.API_KEY) {
  var env = require('../env.js')
}

const getContent = function(url) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http');
    const request = lib.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load page, status code: ' + response.statusCode));
       }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
    })
};

const projection = function(data) {
    return data.items.map(function(item){
        return {
                snippet : item.snippet, url: item.link, thumbnail: item.image.thumbnailLink,
                context : item.image.contextLink,
               }
    });
}

const make_search_url = function(option) {
   return 'https://www.googleapis.com/customsearch/v1?searchType=image&alt=json'  +
     '&key='+ process.env.API_KEY +
     '&cx='+ process.env.CX_KEY +
     '&q=' + option.term +
     '&start=' + option.offset;
}

function getResults (res, option) {
  var url = make_search_url(option);
  
  //return res.json(projection(mockData)); 
  getContent(url)
    .then((str) => {
        var json = JSON.parse(str);
        if (json.hasOwnProperty('items'))
          return res.json(projection(JSON.parse(str))); 
        else    
          return res.json({Error: 'No images found'}); 
    })
    .catch((err) => console.error(err));
};

module.exports = {
    getResults
}