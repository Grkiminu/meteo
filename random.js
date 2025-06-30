var rand = function (min,max,dec){
	if(!dec) dec=0;
	if(!min) min=0;
	if(!max) max=min+1;
	
	var nb =min +Math.round(Math.pow(10,dec)*(max-min)*Math.random())/Math.pow(10,dec);
	return nb;
}

exports.rand = rand;