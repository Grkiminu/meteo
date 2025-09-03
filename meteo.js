
var http = require('http');
var sockets = require('socket.io');
var fs = require('fs');
var cors = require('cors');
var JSONStream = require('JSONStream');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');

var Mesure = require('./my_modules/mesureModel');
var random = require('./my_modules/random');

try{
	mongoose.connect('mongodb+srv://grkiminu2020:nsyhro1vF8QS5IGv@grkiminu.kysotlj.mongodb.net/?retryWrites=true&w=majority&appName=grkiminu');
	console.log('connexion a la bdd reussi');
	
}catch(error){
	console.log('Erreur lors de la connexion');
	console.log(error.message);
}


var acceuil = async function(req,res){
	
	var data=await Mesure.find().sort({createdAt:1}).limit(25);
	console.log('Requete vers la bdd');
	
	res.render('index.ejs',{data :data});
	console.log('Page d\'Acceuil');
};
var graphics = async function(req,res){
	
	var data = await Mesure.find().sort({date:1}).limit(25);
	
	res.render('graphics.ejs',{data:data});
	console.log('Acces aux graphiques');
};
var collecte = async function(req,res){
	//var dataString = req.body.postData;
	console.log('Ca marche');
	console.log(req.body);
	var dataString = '{"tempdht":100,"temperature":'+random.rand(27,27.5,1)+',"humidity":'+random.rand(70,71,1)+',"pressure":999,"windspeed":'+random.rand(0,100,1)+',"direction":'+random.rand(0,359)+'}';
	var data = JSON.parse(dataString);
	
	if(true){

		var newData = await Mesure.create(data);
			
		console.log('nouvelle mesure ajoute dans la bdd\n');
		console.log(newData);
			
		res.writeHead(200);
			
	}else{
		console.log('le fichier de mesure recu n\'est pas valide');
	}
	io.emit('newData',data);
	res.end();

};


var server = http.createServer(app);

var io = sockets(server,{cors:{origine:'*',methods:['GET','POST']}});
io.sockets.on('connection', function (socket) {
	console.log('Un client est connecte a socket.io');
	
	socket.on('nData',async function(data){
		var auth = data[1];
		var mesure = data[0];
			
		var verif = true;
		if (verif){
			var newData = await Mesure.create(mesure);
			socket.broadcast.emit('newData',newData);
			console.log('Nouvelle mesure enregistre');
			console.log(newData);
		}else{
			console.log('Tentative de corruption du canal de la station');
		}
	});
});

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
app.get('/datas',collecte);
app.use(function(req,res,next){
	res.redirect('/');
});
var PORT = process.env.PORT || 8080;  //process.env.PORT ||

server.listen(PORT,function(req,res){
	console.log('le serveur tourne',PORT);
	console.log(req);
});