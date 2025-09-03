
var mongoDB = require('mongoDB');
var mongoClient = mongoDB.MongoClient;
var mongoURL = 'mongodb://localost:27017/mesures';
var dbName = 'mesures';

var fs = require('fs');

var stream = fs.readFileSync('database/mesures.json');
stream = stream.replace('}{','},\n{');
fs.CreateWriteStream('database/mesures.json').write(stream);

/*var date = new Date();

mongoClient.connect(mongoURL,function(error,db){
	if(error){
		console.log('Erreur '+error);
		return 0;
	}
	db.collection(dbName).insert({date:date,temperature:26,humidite:80,pression:1013,vitesse:10,direction:60},function(err){
		if(error){
			console.log('error :'+err);
			return 0;
		}
		console.log('element insere');
	});
	db.close();
});*/

//code pour gerer mongodb
/*try{
		MongoClient.connect(mongoURL, function(err,db){
			db.collection('mesures').insert({date:'2025-02-02T00:20:20Z',temperature:26,humidite:80,pression:1013,vitesse:10,direction:60},function(err){
				if(error){
					console.log('error :'+err);
					return 0;
				}
				console.log('element insere');
			});
			//var results = result.find().toArray();
			console.log('tout va bien');
		});
		
		//var db = mc.db;
		//var results=Db.collection('local').find().toArray();
		//console.log(results);
		
	}catch(e){
		console.log('bla :'+e);
	}
	*/