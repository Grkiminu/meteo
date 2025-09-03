var url = 'https://meteo-vqrz.onrender.com'
// var url = 'http://localhost:8080'
var socket = io(url);	//connection a socketIO


var date = new Date();

socket.on('connect_error',function(error){
	var errors='';
	for (i in error){
		errors=errors+error[i]+'\n';
	}
	console.log(errors);
});
socket.on('confirm',function(msg){
	tr=confirm(msg);
	alert(tr?'Vous utilisez socketIO':'vous n\'utilisez pas socketIO');
	socket.emit('confirmation',tr);
});
socket.on('newData',function(data){
	var mesure = document.getElementById('mesure');
	var j;
	var i=0;
	var mesures = document.getElementsByClassName('ancienne_mesure');
	var anc_ms=document.getElementById('anciennes_mesures');
	var nb = mesures.length;
	var mesure_cl=mesure.cloneNode(true);
	var valeur = mesure.getElementsByClassName('mesure');
	// Dans l element d affichage principal, on recupere toutes les balises div qui doivent contenir les valeurs

	var length = valeur.length;
	//var anc_valeur=[];

	//var ind;
	
	var i;
	var j;
	var k;
	var it=0;
	
	for (j=1;j<nb;j++){
		mesures[nb-j].getElementsByTagName('h1')[0].innerHTML = mesures[nb-j-1].getElementsByTagName('h1')[0].innerHTML ;
		for(i=0;i<length;i++){
			mesures[nb-j].getElementsByClassName('mesure')[i].innerHTML = mesures[nb-j-1].getElementsByClassName('mesure')[i].innerHTML ;
		}
	}
	
	
	for (k=0;k<length;k++){
		mesures[0].getElementsByClassName('mesure')[k].innerHTML = valeur[k].innerHTML;
	}
	
	for(value in data){
		if(it==length){
			it=0;
			break;
		}
		valeur[it].innerHTML = data[value];	// j utilise innerHTML pour la compatibilite
		it++;
	}
	
	var datePrinter = mesures[0].getElementsByTagName('h1')[0];
	var lastTime = datePrinter.innerHTML.match(/[0-9]{1,2}:[0-9]{1,2}/i);
	
	
	var h1 = mesure.getElementsByTagName('h1')[0];
	
	var h1content = h1.innerHTML;
	var time = h1content.match(/[0-9]{2}:[0-9]{2}/).toString();
	alert(time);
	time = time.split(':');
	alert(data.createdAt);
	
	if(data.createdAt.getHours()==0 && parseInt(time[0]!=0)){
		var dt = data.createdAt.getDate()-1;
		datePrinter.innerHTML = 'Le '+dt+'/'+(data.createdAt.getMonth()+1)+' a '+time[0]+':'+time[1];
	}else{
		datePrinter.innerHTML = 'Le '+(data.createdAt.getDate()<10?'0'+data.createdAt.getDate():data.createdAt.getDate())+'/'+(data.createdAt.getMonth()<9?'0'+(data.createdAt.getMonth()+1):data.createdAt.getMonth()+1)+' a '+time;
	}
	
	//
	
	h1.innerHTML = 'Aujourd\'hui a '+(data.createdAt.getHours()<10?'0'+data.createdAt.getHours():data.createdAt.getHours())+':' +(data.createdAt.getMinutes()<10?'0'+data.createdAt.getMinutes():data.createdAt.getMinutes());
	
});
