var date = new Date('2025-02-02T00:20:20Z');

alert(date);

var x={m1:{date:date,num:2,nb:3,bla:4,dat:date},
	m2:{num:3,nb:8,bla:7,dat:date}
};
var y='';
for(i in x){
	for (j in x[i]){
		y=y+x[i][j]+',';
	}
	y=y+'\n';
}
//Pour un objet js le i dans for in renvoi les index et non leurs valeurs

alert(y);