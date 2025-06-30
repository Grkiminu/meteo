var https = require('https');
var http = require('http');
var sockets = require('socket.io');
var fs = require('fs');
var cors = require('cors');
var JSONStream = require('JSONStream');
var express = require('express');
var app = express();
//var mongoDB = require('mongoDB');
var path = require('path');

var random = require('./random');

/* var options = {
	key:fs.readFileSync('server.key'),
	cert:fs.readFileSync('server.cert')
}; */
//console.log(options);


var acceuil = function(req,res){
	var data=[];
	var rstream = fs.createReadStream('database/mesures.json');
	//console.log(rstream);
	rstream.pipe(JSONStream.parse()).on('data',function(obj){
		data.push(obj);
		if(data.length>20){
			data.shift();
		}
	})
	.on('end',function(){
		
		console.log('requette vers la bdd');
		res.render('index.ejs',{data :data});
	});
};
var graphics = function(req,res){
	res.render('graphics.ejs');
	console.log('Acces aux graphiques');
};
var collecte = function(req,res){
	//var dataString = req.body.postData;
	console.log(req.body);
	var dataString = '{"temperature":'+24+',"humidity":'+random.rand(30,90,1)+',"pressure":'+random.rand(1000,1050)+',"windspeed":'+random.rand(0,100,1)+',"direction":'+random.rand(0,359)+'}';
	var data = JSON.parse(dataString);
	var validation = typeof data.temperature=='number' || typeof data.humidity=='number' || typeof data.pressure=='number' || typeof data.windSpeed=='number' || typeof data.direction=='number';
	if(true){
		var wstream = fs.createWriteStream('database/mesures.json',{flags:'a'});
		data["date"] = new Date();
		var newData = JSON.stringify(data);
		wstream.write(newData);
		console.log('nouvelle mesure ajoute dans la bdd\n'+newData+'\n');
		res.writeHead(200);
		res.end();
	}else{
		console.log('le fichier de mesure recu n\'est pas valide');
	}

	io.emit('newData',data);
};

//var server = https.createServer(options,app);

var httpserver = http.createServer(app);

var io = sockets(httpserver,{cors:{origine:'*',methods:['GET','POST']}});
io.sockets.on('connection', function (socket) {
	socket.emit('confirm','voulez vous avoir acces aux donnees en temps reel?');
	
	socket.on('confirmation',function(cvalue){
		console.log(cvalue?'client connecte ':'Client non connecte ');
	});
});

var MongoClient = mongoDB.MongoClient;
var Db = mongoDB.Db;

app.set('view engine','ejs');
app.use(express.static('public'));
app.use('/lib/chart.js',express.static(path.join(__dirname,'node_modules/chart.js/dist/chart.umd.js')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',acceuil);
app.get('/index',acceuil);
app.get('/index.ejs',acceuil);
app.get('/index.html',acceuil);
app.get('/etage/:etagenum/', function(req, res){
	res.setHeader('Content-Type', 'text/html');
	res.end('<a href ="http://localhost">cliquez ici pour etre redirige vers la page d\'acceuil</a>');
});
app.get('/graphics',graphics);
app.get('/about',function(req,res){
	res.render('about.ejs');
});
app.post('/datas',collecte);
//app.get('/datas',collecte);
app.use(function(req,res,next){
	res.redirect('/');
});
var PORT = process.env.PORT || 8080;

//server.listen(8443);
//.listen(8080,'0.0.0.0');
httpserver.listen(PORT,function(){
	console.log('le serveur tourne');
});
