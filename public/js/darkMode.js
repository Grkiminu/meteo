var body = document.body;
var mode = document.createElement('input');
var label = document.createElement('label');
var head = document.getElementsByTagName('header')[0];
var mesure = document.getElementById('mesure');
var prev = document.getElementById('prevision');
var anc = document.getElementsByClassName('ancienne_mesure');

mode.type = 'checkbox';
mode.value = 'Mode sombre';
mode.id = 'dm';
mode.style.type ='inline-block';
var darkMode = false;
label.innerText='sombre';
label.for = 'dm';
label.style.color='white';
label.style.fontWeight='bold';
label.style.paddingBottom='5px';
var navlist = document.getElementById('nav').getElementsByTagName('ul')[0];
var i;
var footer = document.getElementsByTagName('footer')[0];

navlist.appendChild(mode);
navlist.appendChild(label);

function dark(darkMode){
	if(darkMode){
		body.style.backgroundColor='#333';
		body.style.color='#ddd';
		mesure.style.backgroundColor='#555';
		prev.style.backgroundColor='#555';
		head.style.backgroundColor='#444';
		footer.style.backgroundColor='#222';
		for(i = 0;i<anc.length;i++){
			anc[i].style.backgroundColor='#555';
		}
	}else{
		body.style.backgroundColor='';
		body.style.color='';
		mesure.style.backgroundColor='';
		prev.style.backgroundColor='';
		head.style.backgroundColor='';
		footer.style.backgroundColor='';
		for(i = 0;i<anc.length;i++){
			anc[i].style.backgroundColor='';
		}
	}
}

mode.addEventListener('change',function(e){
	
	if(darkMode){
		darkMode=false;
		dark(darkMode);
	}else{
		darkMode=true;
		dark(darkMode);
	}
	/* alert(e);
	var v='';
	for (ev in e){
		v=v+ev+' : '+e[ev]+'\n';
	}
	alert(v); */
});