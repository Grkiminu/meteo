var socket = io('http:// 192.168.76.194:8080');	//connection a socketIO

	//on recupere l element article d affichage de la mesure la plus recente
//var mesure_cl=mesure.cloneNode(true);

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
	//ctest.innerHTML = 'BONJOUR';
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
	var anc_valeur=[];

	var ind;
	
	//alert(data.date.getHours());
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
	
	data.date= new Date(data.date);
	
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
	var time = h1content.match(/[0-9]{1,2}:[0-9]{1,2}/i);
	
	if(data.date.getHours()==0 && parseInt(time.split(':')[0]!=0)){
		var dt = data.date.getDate()-1
		datePrinter.innerHTML = 'Le '+dt+'/'+data.date.getMonth()+' a '+time[0]+':'+time[1];
	}else{
		datePrinter.innerHTML = 'Le '+data.date.getDate()+'/'+data.date.getMonth()+' a '+time;
	}
	
	h1.innerHTML = 'Aujourd\'hui a '+data.date.getHours()+':' +data.date.getMinutes();
	
});
