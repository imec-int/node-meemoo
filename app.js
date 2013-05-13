/**
 * Init
 */
var httpreq 	= require('httpreq');
var OAuth       = require('oauth').OAuth;
var querystring = require('querystring');
var config 		= require('./config');
var twitconfig 	= require('./twitter.config');
var uriconfig	= require('./uris.config');
var async 		= require('async');
var cheerio 	= require('cheerio');
var _ 			= require('underscore');
var express 	= require('express');
var http 		= require('http')
var path 		= require('path');
var socketio 	= require('socket.io');
var xmlreader 	= require('xmlreader');
var feedparser  = require('feedparser');
var ent			= require('ent');
var app = express();

var debugtest = false;

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	// app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('123456789987654321'));
	app.use(express.session());
	app.use(app.router);
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  next();
	});
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

var server = http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server);


// authentication for other twitter requests
var twitterOAuth = new OAuth(
	"https://api.twitter.com/oauth/request_token",
	"https://api.twitter.com/oauth/access_token",
	twitconfig.twitter.consumerKey,
	twitconfig.twitter.consumerSecret,
	"1.0",
	null,
	"HMAC-SHA1"
);

// some variable to hold the state of the app
var State = {
	onepercentpictures: [],
	importantpictures: []
};

/**
 * Functies en andere logica
 */

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
 });

// Webserver root page:
app.get('/', function (req, res){
	res.render('index', {
		title: 'Node Meemoo'
	});
});

app.get('/d3', function (req, res){
	res.render('deedrie', {
		title: 'D3 visualization'
	});
});

app.get('/d3basic', function (req, res){
	res.render('d3Basic', {
		title: 'D3 visualization'
	});
});

app.get('/packery', function (req, res){
	res.render('packery', {
		title: 'packery visualization'
	});
});

app.get('/filter', function (req, res){
	res.render('index2', {
		title: 'A thousand twitter pictures'
	});
});

// Javascript die alle urls bevat van pictures die al gevonden zijn:
app.get('/server.js', function (req, res){
	// interweave the important pictures with the onepercentpictures:

	var allpictures = [];

	var offset = 100;

	var insertEveryXpictures = (State.onepercentpictures.length - offset)/State.importantpictures.length;

	var i = 0;
	var n = 1;
	for(var x in State.onepercentpictures){
		if(x > (offset + insertEveryXpictures*n) ){
			n++;
			allpictures.push({url:State.importantpictures[i], important: true});
			i++;
		}

		allpictures.push({url:State.onepercentpictures[x], important: false});
	}

	// possible the rest of the importantpictures
	while(i < State.importantpictures.length){
		allpictures.push({url:State.importantpictures[i], important: true});
		i++;
	}

	res.send("App.alreadyfoundpictures = " + JSON.stringify(allpictures) + ";");
});

app.post('/startOnepercent', function (req, res){
	startTwitterhose();
	res.json("Twitterhose successfully started");
});

app.post('/startOnepercentImages', function (req, res){
	startOnePercentImagehose();
	res.json("Twitter Image hose successfully started");
});

app.post('/startSearch', function (req, res){
	var hString = req.body.hashtags;
	console.log("received update: "+hString);
	if(hString){
		//var hashtags = hString.split(",");
		// start/update search hose
		startTwitterSearchHose(hString);
		res.json("Hashtags updated");
	}
});



// Proxy url for Twitter images (eigenlijk voor alles :p)
app.get('/prox', function (req, res){
	if(!req.query.url) return res.json({err: "no url given"});


	httpreq.get( req.query.url , {binary: true}, function (err, httpres){
		if (err) return res.json({err: "error getting url", error: err});

		// content type dorogeven
		res.setHeader("Content-Type", httpres.headers['content-type']);
		res.send(httpres.body);
	});
});


// Begin met pictures te zoeken:
init();

function init(){
	//startSimpleSearch();
	//startSearchHose();
	//startOnePercenthose();
	//startTwitterhose();

	io.set('log level', 0); // geen socket.io debug info, thx!
	io.on('connection', function(socket){
  		socket.on('message', function(data){
  			console.log(data);
  			io.sockets.emit(data["channel"],data["data"]);
  		});
  	});
}


function startSimpleSearch(){
	// 1.) Zoek naar pictures met bepaald hashtag:
	var parameters = querystring.stringify({
		q: config.app.searchterms.join(' OR '),
		result_type: 'mixed',
		count: 100,
		include_entities: true
	});

	twitterOAuth.getProtectedResource('https://api.twitter.com/1.1/search/tweets.json?' + parameters, "GET", twitconfig.twitter.token, twitconfig.twitter.secret,
		function (err, data, res){
			if(err) return console.log(err);

			data = JSON.parse(data);
			var tweets = data.statuses;

			async.forEach(tweets, function (tweet, c){
				getPictureUrlsFromTweet(tweet, function (err, pictures){
					if(err) return c(err);

					//console.log(pictures);

					for(var i in pictures)
						addPicture(pictures[i], State.importantpictures);

					c(null);
				});
			}, function (err){
				if(err) return console.log(err);
			});
		}
	);
}

// SAM - PICTURE BASED (momenteel niet gebruikt)
function startSearchHose(){
	// 2.) Luister ook naar nieuwe pictures die binnenkomen:
	var parameters = querystring.stringify({
		track: config.app.searchterms.join(',')
	});

	var twitterhose = twitterOAuth.get('https://stream.twitter.com/1.1/statuses/filter.json?' + parameters, twitconfig.twitter.token, twitconfig.twitter.secret);
	twitterhose.addListener('response', function (res){
		console.log("searchhose started");
		res.setEncoding('utf8');
		res.addListener('data', function (chunk){
			try{
				var tweet = JSON.parse(chunk);

				// extract picture urls:
				getPictureUrlsFromTweet(tweet, function (err, pictures){
					if(err) return console.log(err);

					for(var i in pictures)
						addPicture(pictures[i], State.importantpictures);
				});
			}catch(err){}
		});

		res.addListener('end', function(){
			console.log("Twitterhose broke down");
		});
	});
	twitterhose.end();
}

// SAM - PICTURE BASED (momenteel niet gebruikt)
function startOnePercentImagehose(){
	if(twitconfig.twitter2.token && twitconfig.twitter2.secret){
		// need a second account for a second streaming connection:
		var twitterOAuth2 = new OAuth(
			"https://api.twitter.com/oauth/request_token",
			"https://api.twitter.com/oauth/access_token",
			twitconfig.twitter2.consumerKey,
			twitconfig.twitter2.consumerSecret,
			"1.0",
			null,
			"HMAC-SHA1"
		);

		// 3.) de 1% hose
		var onepercenthose = twitterOAuth2.get('https://stream.twitter.com/1.1/statuses/sample.json', twitconfig.twitter2.token, twitconfig.twitter2.secret);
		var chunkbuffer = '';
		onepercenthose.addListener('response', function (res){
			console.log("1% images started");
			res.setEncoding('utf8');
			res.addListener('data', function (chunk){
				chunkbuffer += chunk; //kunnen nog dingen inzitten van de vorige chunk

				//chunk to seperate tweets
				var chunkbits = chunkbuffer.split("\n");
				chunkbuffer = ''; // chunkbuffer alvast leegmaken

				for (var i = 0; i < chunkbits.length; i++) {

					var tweet = parseTweetchunk( chunkbits[i] );
					if(tweet){
						// geen 'delete'-tweets doorsturen:
						if(tweet.hasOwnProperty("created_at"))
							getPictureUrlsFromTweet(tweet, function (err, pictures){
								//console.log(pictures.length);
								if(err) return console.log(err);

								for(var i in pictures)
									addPicture(pictures[i], State.onepercentpictures);
							});
					}else{
						if(i == chunkbits.length-1){
							// is laatste stukje
							// stukje dat niet geparsed raakt terug aan de chunkbuffer toevoegen
							// hopelijk komt het tweede stukje van de tweet dan straks binnen
							chunkbuffer = chunkbits[i];
						}else{
							console.log("corrupt tweet:"); // zou niet niet mogen voorkomen (tenzij twitter echt slecht is :P)
							console.log(chunkbits[i]);
						}
					}
				}
			});

			res.addListener('end', function(){
				console.log("onepercenthose broke down");
			});
		});
		onepercenthose.end();
	}
}

// ROBBY - TWEETS
function startTwitterSearchHose(hashtags){
	console.log("Twitter Search hose with: "+hashtags);

	// 2.) Luister ook naar nieuwe pictures die binnenkomen:
	var parameters = querystring.stringify({
		track: hashtags
	});

	var twitterhose = twitterOAuth.get('https://stream.twitter.com/1.1/statuses/filter.json?' + parameters, twitconfig.twitter.token, twitconfig.twitter.secret);
	twitterhose.addListener('response', function (res){
		console.log("searchhose started");
		res.setEncoding('utf8');

		var chunkbuffer = '';
		res.addListener('data', function (chunk){
			chunkbuffer += chunk; //kunnen nog dingen inzitten van de vorige chunk

			//chunk to seperate tweets
			var chunkbits = chunkbuffer.split("\n");
			chunkbuffer = ''; // chunkbuffer alvast leegmaken

			for (var i = 0; i < chunkbits.length; i++) {

				var tweet = parseTweetchunk( chunkbits[i] );
				if(tweet){
					// geen 'delete'-tweets doorsturen:
					if(tweet.hasOwnProperty("created_at")){
						tweet.image = "";
						getPictureUrlsFromTweet(tweet, function (err, pictures){

							if(err) return console.log(err);

							if(pictures.length >0);
								tweet.image = pictures[0];

							addSearchTweet(tweet);
						});
					}

				}else{
					if(i == chunkbits.length-1){
						// is laatste stukje
						// stukje dat niet geparsed raakt terug aan de chunkbuffer toevoegen
						// hopelijk komt het tweede stukje van de tweet dan straks binnen
						chunkbuffer = chunkbits[i];
					}else{
						console.log("corrupt tweet:"); // zou niet niet mogen voorkomen (tenzij twitter echt slecht is :P)
						console.log(chunkbits[i]);
					}
				}

			}
		});

		res.addListener('end', function(){
			console.log("Twitterhose broke down");
		});
	});
	twitterhose.end();
}

// ROBBY - TWEETS
function startTwitterhose(){
	if(twitconfig.twitter2.token && twitconfig.twitter2.secret){
		// need a second account for a second streaming connection:
		var twitterOAuth2 = new OAuth(
			"https://api.twitter.com/oauth/request_token",
			"https://api.twitter.com/oauth/access_token",
			twitconfig.twitter2.consumerKey,
			twitconfig.twitter2.consumerSecret,
			"1.0",
			null,
			"HMAC-SHA1"
		);

		// 3.) de 1% hose
		var onepercenthose = twitterOAuth2.get('https://stream.twitter.com/1.1/statuses/sample.json', twitconfig.twitter2.token, twitconfig.twitter2.secret);
		var chunkbuffer = '';
		onepercenthose.addListener('response', function (res){
			console.log("twitterhose started");
			res.setEncoding('utf8');
			res.addListener('data', function (chunk){


				chunkbuffer += chunk; //kunnen nog dingen inzitten van de vorige chunk

				//chunk to seperate tweets
				var chunkbits = chunkbuffer.split("\n");
				chunkbuffer = ''; // chunkbuffer alvast leegmaken

				for (var i = 0; i < chunkbits.length; i++) {

					var tweet = parseTweetchunk( chunkbits[i] );
					if(tweet){
						// geen 'delete'-tweets doorsturen:
						if(tweet.hasOwnProperty("created_at")){
							tweet.image = "";
							getPictureUrlsFromTweet(tweet, function (err, pictures){

								if(err) return console.log(err);

								if(pictures.length >0);
									tweet.image = pictures[0];

								addTweet(tweet);
							});
						}
							//addTweet(tweet);
					}else{
						if(i == chunkbits.length-1){
							// is laatste stukje
							// stukje dat niet geparsed raakt terug aan de chunkbuffer toevoegen
							// hopelijk komt het tweede stukje van de tweet dan straks binnen
							chunkbuffer = chunkbits[i];
						}else{
							console.log("corrupt tweet:"); // zou niet niet mogen voorkomen (tenzij twitter echt slecht is :P)
							console.log(chunkbits[i]);
						}
					}

				}

			});

			res.addListener('end', function(){
				console.log("my twitterhose broke down :(");
			});
		});
		onepercenthose.end();
	}
}

function parseTweetchunk(tweetchunk){
	var tweet;
	try{
		tweet = JSON.parse(tweetchunk);
	}catch(err){
		return false;
	}
	return tweet;
}

function addTweet(tweet){
	// profile pic url vervangen:
	tweet.user.profile_image_url = '/prox?url=' + encodeURIComponent(tweet.user.profile_image_url);
	io.sockets.emit('newtweet', tweet);
}

function addSearchTweet(tweet){
	// profile pic url vervangen:
	tweet.user.profile_image_url = '/prox?url=' + encodeURIComponent(tweet.user.profile_image_url);
	io.sockets.emit('newtweetsearch', tweet);
}

function addPicture(picture, array){
	if(picture){

		if(!_.contains(array, picture)){

			/*var arrayname = "";
			var important = false;
			if(array == State.onepercentpictures)
				arrayname = "onepercentpictures";
			if(array == State.importantpictures){
				arrayname = "importantpictures";
				var important = true;
			}*/

			//console.log("Adding to "+arrayname+" " + picture);
			//array.push(picture);
			// stuur maar direct naar de client ook:
			io.sockets.emit('newpicture', {url: picture});

			cleanPictures();
		}
	}
}

function cleanPictures(){
	//cleans up the pictures taking into account the maximumpictures settings from the config file:

	if( State.importantpictures.length > config.app.maximumpictures ){
		State.importantpictures = State.importantpictures.slice(-config.app.maximumpictures);
	}

	var picturesLeftToFill = config.app.maximumpictures - State.importantpictures.length;

	if( State.onepercentpictures.length > picturesLeftToFill ){

		State.onepercentpictures = State.onepercentpictures.slice(-picturesLeftToFill)

		if(picturesLeftToFill == 0)
			State.onepercentpictures = [];
	}
}

/**
 * Picture extraction functions:
 */
function getPictureUrlsFromTweet(tweet, callback){
	var pictureUrls = [];


	//pictures en urls zitten in tweet.entities:
	if(tweet.entities.media){
		for(var j in tweet.entities.media){
			var media = tweet.entities.media[j];
			if(media.type == 'photo'){
				pictureUrls.push(media.media_url);
			}
		}
	}

	// we gaan ook op zoek naar de instagram urls:
	var instagramUrls = [];

	if(tweet.entities.urls){
		for(var j in tweet.entities.urls){
			var url = tweet.entities.urls[j];
			if(url.expanded_url.match(/http(s)?:\/\/instagram\.com\/.+/i)){ // of instagra\.?m  ???
				instagramUrls.push(url.expanded_url);
			}
		}
	}

	// de instagram urls parsen:
	extractInstagramUrls(instagramUrls, function (err, extractedUrls){
		if(err) return callback(err);

		// urls toevoegen aan pictureUrls:
		pictureUrls = pictureUrls.concat(extractedUrls);

		// done:
		callback(null, pictureUrls);
	});
}

function extractInstagramUrls(urls, callback){
	var extractedUrls = [];
	// hiervoor beter async.map gebruiken!!!!
	async.forEach(urls, function (url, c){
		extractInstagramUrl(url, function (err, extractedUrl){
			if(err) return c(err);
			extractedUrls.push(extractedUrl);
			c(null);
		});
	}, function (err){
		if(err) return callback(err);
		callback(null, extractedUrls);
	});
}

function extractInstagramUrl(url, callback){
	httpreq.get(url, function (err, res){
		if(err) return callback(err);

		// check for redirects:
		if(res.headers.location){
			extractInstagramUrl(res.headers.location, callback);
		}else{
			try{
				var error = null;
				var extractedUrl = null;
				var $ = cheerio.load(res.body);
				extractedUrl = $("#media_photo .photo").attr('src');
			}catch(err){
				console.log(err);
				error = err;
			}finally{
				callback(error, extractedUrl);
			}
		}
	});
}

var RSSArticles = {};
var RSSTimeout = null;

app.post('/ajax/rss/start', function(req, res){
	RSSArticles = {};
	clearTimeout(RSSTimeout);
	watchRSSFeed(req.body.feed);
	res.json({err: 0});
});

app.post('/ajax/rss/stop', function(req, res){
	RSSArticles = {};
	clearTimeout(RSSTimeout);

});

function watchRSSFeed(feed){
	feedparser.parseUrl(feed, function(err, meta, articles){
		if(err) console.log(err);
		if(!err && articles) processArticles(articles);
		RSSTimeout = setTimeout(function(){
			watchRSSFeed(feed);
		},10000); //binnen x seconden nog s checken
	});
}

function processArticles(articles){
	for(var i = 0; i < articles.length; i++){
		var article = articles[i];
		if(article.image && article.image.url)
			article.image.url = '/prox?url=' + encodeURIComponent(article.image.url);
		// same fields as PGarticle
		var uniformArticle = {
			title: article.title,
			id: article.guid,
			uri: article.link,
			creationDate: article.pubdate
		};
		if(article.summary) uniformArticle.introduction = ent.decode(article.summary.replace(/(<([^>]+)>)/ig, ""));
		if(article.image && article.image.url) uniformArticle.image = article.image.url;
		if(article.description) uniformArticle.text = ent.decode(article.description.replace(/(<([^>]+)>)/ig, ""));

		if(!RSSArticles[article.guid]){
			RSSArticles[article.guid] = uniformArticle;
			newRSSArticle(uniformArticle);
		}
	}
}

function newRSSArticle(article){
	io.sockets.emit('newRSSarticle', article);
}


// Persgroep feeds: HLN & DeMorgen

var persgroepArticles = {};
persgroepArticles.hln = {};
persgroepArticles.demorgen = {};
persgroepTimeouts = {};
persgroepTimeouts.hln = null;
persgroepTimeouts.demorgen = null;
persgroepUrls = {};
persgroepUrls.hln = uriconfig.HLNfeed;
persgroepUrls.demorgen = uriconfig.DMfeed;
persgroepMessageIdentifiers = {};
persgroepMessageIdentifiers.hln = 'newHLNarticle';
persgroepMessageIdentifiers.demorgen = 'newDeMorgenarticle';

app.post('/ajax/hlnfeed/start', function (req, res){
	console.log('starting hln');
	persgroepArticles.hln = {};
	clearTimeout(persgroepTimeouts.hln);
	watchPersgroepfeed('hln');
	res.json({err:0});
});

app.post('/ajax/hlnfeed/stop', function(req, res){
	console.log('stopping hln');
	persgroepArticles.hln = {};
	clearTimeout(persgroepTimeouts.hln);
	res.json({err:0});
});

app.post('/ajax/demorgenfeed/start', function (req, res){
	console.log('starting demorgen');
	persgroepArticles.demorgen = {};
	clearTimeout(persgroepTimeouts.demorgen);
	watchPersgroepfeed('demorgen');
	res.json({err:0});
});

app.post('/ajax/demorgenfeed/stop', function (req, res){
	console.log('stopping demorgen');
	persgroepArticles.demorgen = {};
	clearTimeout(persgroepTimeouts.demorgen);
	res.json({err:0});
});

app.get('/ajax/fullarticletext', function(req, res){
	httpreq.get(req.query.uri, function(err, resu){
		if(err) return res.json({error: err.stack});
		var sax = require(__dirname+'/node_modules/xmlreader/node_modules/sax');
		var saxparser = sax.parser(true);
		//if cdata and tag = text onder articleDetail; return
		saxparser.oncdata = function(cdata){
			if(this.tags[0].name === 'articleDetail'  && this.tags[1].name === 'text'){
				return res.json({text: ent.decode(cdata.replace(/(<([^>]+)>)/ig, ""))});
			}
		}
		saxparser.write(resu.body).close();
	});
});

function readPersgroepfeed(brand, callback){
	// console.log("checking " + brand + " feed");
	httpreq.get(persgroepUrls[brand], function (err, res){
		if(err) return callback(err);
		xmlreader.read(res.body, function (err, res){
			if(err) return callback(err);

			res.articleList.articles.article.each(function (i, xmlarticle){
				var id =  xmlarticle.uid.id.text();
				var introduction = (typeof xmlarticle.introduction.text === 'function')?xmlarticle.introduction.text():null;
				var image = (xmlarticle.teaserPhoto && xmlarticle.teaserPhoto.uri)?xmlarticle.teaserPhoto.uri.text():null;
				if(image)
					image = '/prox?url=' + encodeURIComponent(image);


				var article = {
					title: xmlarticle.title.text(),
					id: id,
					uri: xmlarticle.uri.text(),
					creationDate: xmlarticle.creationDate.text(),
					introduction: introduction,
					image: image
				};

				if(!persgroepArticles[brand][id]){
					persgroepArticles[brand][id] = article;
					newPersgroepArticle(brand, article);
				}
			});

			return callback();
		});
	});
}


function newPersgroepArticle(brand, article){
	io.sockets.emit(persgroepMessageIdentifiers[brand], article);
}


function watchPersgroepfeed(brand){
	readPersgroepfeed(brand, function(err){
		if(err) console.log(err);
		persgroepTimeouts[brand] = setTimeout(function(){
			watchPersgroepfeed(brand);
		},10000); //binnen x seconden nog s checken
	});
}


app.post('/ajax/generatetagsfromtext/:endpoint', function(req, res){
	httpreq.post(uriconfig.MMLabUri + 'tagger/' + req.params.endpoint,{body: req.body.text},  function(er, tags){
		if(er) return res.json({error: 'error generating tags'});
		console.log(tags.body);
		res.send(tags.body);
	});
});














