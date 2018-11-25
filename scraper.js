var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){


	/*--- LISTA DE URLS ---*/
	var urls = [
		'https://www.imdb.com/title/tt0068646/',
		'https://www.imdb.com/title/tt1229340/',
		'https://www.imdb.com/title/tt0816692/',
		'https://www.imdb.com/title/tt0482571/',
		'https://www.imdb.com/title/tt5884052/'
	];

	var json = [];

	urls.forEach((url)=>{

		request(url, function(error, response, html){
			if(!error){

				var $ = cheerio.load(html);


				/*--- DATA A EXTRAER ---*/

				// Formato
				var item = { 
					title: "", 
					rating: "" 
				};

				// Targets
				item.title = $('.title_wrapper h1').text().trim();
				item.rating = $('.ratings_wrapper .imdbRating .ratingValue strong').text();

				
				// Guarda data en variable JSON
				json.push(item)
			}

			if(json.length === urls.length) {
				fs.writeFile('output.json', JSON.stringify(json), function(err){

					console.log('File successfully written! - Check your project directory for the output.json file');

				})

				res.send('Check your console!')
			}

		})	
	})

})

app.listen('8080')
console.log('Magic happens on port 8080');


