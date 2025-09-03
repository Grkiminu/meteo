const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
	temperature: {
		type:Number,
		default:null,
		validate: {
			validator: function(v){
				return null || (v>=-40 && v<=90);
			},
			message:'la temperature du bmp n est pas entre -40 et 90'
		},
		set:function(v){
			return (v>=-40 && v<=90)?v:null;
		}
	},
	tempdht: {
		type:Number,
		default:null,
		validate: {
			validator: function(v){
				return null || (v>=0 && v<=50);
			},
			message:'la temperature du dht n est pas entre 0 et 50'
		},
		set:function(v){
			return (v>=0 && v<=50)?v:null;
		}
		
	},
	pressure: {
		type:Number,
		default:null,
		validate: {
			validator: function(v){
				return null || (v>=300 && v<=1100);
			}
		},
		set:function(v){
			return (v>=300 && v<=1100)?v:null;
		}
	},
	humidity: {
		type:Number,
		default:null,
		validate: {
			validator: function(v){
				return null || (v>=0 && v<=90);
			}
		},
		set:function(v){
			return (v>=0 && v<=90)?v:null;
		}
	},
	createdAt:{
		type:Date,
		default:Date.now
	}
});

const model = mongoose.model("Mesure",dataSchema);
module.exports=model;