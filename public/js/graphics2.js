var socket = io('http:// 192.168.76.194:8080');	//connection a socketIO

var ctx = document.getElementById('today').getContext('2d');
var ctxs = document.getElementsByClassName('other');

var hours=[];
for(i=0;i<24;i++){
	hours[i]=i;
}
var chart = new Chart(ctx,{
	type:'line',
	data:{
		labels:[0,0.2,0.4,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
		datasets:[{
			label:'Temperature',
			data:[24,26,29,31,29,28,26,27,28,27,28,29,31,30],
			backgroundColor:'blue',
			borderColor:'rgba(0,0,255,1)',
			borderWidth:1,
			pointRadius:0,
			color:'blue',
			tension:0.3
		},
		{
			label:'Exemple',
			data:[20,19,19,21,23,24,26,27,27,27,28,29,31],
			backgroundColor:'black',
			borderColor:'rgb(0,0,0)',
			borderWidth:1,
			pointRadius:0,
			color:'blue',
			tension:0.3
		}]
	},
	options:{
		responsive:false,
		scales:{
			x:{
				//position:'bottom',
				type:'linear',
				
				max:24,
				ticks:{
					stepSize:1,
					
					callback:function(value){
						return parseInt(value)===value?value+'h':null;
					},
					//autoskip:true
				}
			}
		}
	}
});

socket.on('newData',function(data){
	
	
	
});
