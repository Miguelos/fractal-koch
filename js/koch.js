var ggbApplet = document.ggbApplet;

var layer=9;

var puntosSigNivel;

var n = 0;
var niveles = 3;

function inicial(){
	var nivelesUsuario = document.getElementById("niveles").value
	if (nivelesUsuario !="") 
		if (nivelesUsuario > 3){
			alert("El valor introducido es demasiado alto. Se dibujaran 3 niveles");				
			niveles = 3;
		}else{
			niveles = nivelesUsuario;
		}
	ggbApplet.reset();
	//inicializacion de variables:
	layer=9;
	n=0;
	koch();
	ggbApplet.setCoordSystem(-3, 7, -3, 7);
}

function koch(){
	//Dibuja el triangulo
	ggbApplet.evalCommand("A_0=(0,0)");
	ggbApplet.setLabelStyle("A_0", 0);
	ggbApplet.setVisible("A_0", false);
	ggbApplet.evalCommand("B_0=(5,0)");
	ggbApplet.setLabelStyle("B_0", 0);
	ggbApplet.setVisible("B_0", false);
	ggbApplet.evalCommand("C_0=Rotate[A_0, -1.05, B_0]");
	ggbApplet.setLabelStyle("C_0", 0);
	ggbApplet.setVisible("C_0", false);
	var puntos = new Array("A_0","B_0","C_0");
	dibujaPoligono(puntos);
	n++;
	dibujaSiguienNivel(puntos);
}

function dibujaSiguienNivel(puntos0){
	puntosSigNivel = new Array();
	
	if( n <= niveles ) {
		var i;
		for (i=0; i<puntos0.length; i++){ 
			if(i < puntos0.length-1){
				calculaPuntos(i, puntos0[i], puntos0[i+1]);
			}else{
				calculaPuntos(i, puntos0[i], puntos0[0]);
			}
		}
		dibujaPoligono(puntosSigNivel);
		n++;
		dibujaSiguienNivel(puntosSigNivel);	
	}
}

function calculaPuntos(i, punto1, punto2){
	var x1 = ggbApplet.getXcoord(punto1);
	var y1 = ggbApplet.getYcoord(punto1);
	var x2 = ggbApplet.getXcoord(punto2);
	var y2 = ggbApplet.getYcoord(punto2);
	
	ggbApplet.evalCommand("A_"+n+""+i+"=(2"+punto1+"+"+punto2+")/3");
	ggbApplet.setLabelStyle("A_"+n+""+i, 0);
	ggbApplet.setVisible("A_"+n+""+i, false);
	ggbApplet.evalCommand("C_"+n+""+i+"=("+punto1+"+2"+punto2+")/3");
	ggbApplet.setLabelStyle("C_"+n+""+i, 0);
	ggbApplet.setVisible("C_"+n+""+i, false);
	ggbApplet.evalCommand("B_"+n+""+i+"=Rotate[A_"+n+""+i+", 1.05, C_"+n+""+i+"]");
	ggbApplet.setLabelStyle("B_"+n+""+i, 0);
	ggbApplet.setVisible("B_"+n+""+i, false);

	/*
	 *       punto1			A_i				C_i				punto2
	 *      
	 * 
	 * 								B_i
	 */		
	puntosSigNivel.push(punto1);
	puntosSigNivel.push("A_"+n+""+i);
	puntosSigNivel.push("B_"+n+""+i);
	puntosSigNivel.push("C_"+n+""+i);
}

function dibujaPoligono(listaPuntos){
	var cmd = "p_"+n+"=Polygon[";
	for ( var i in listaPuntos ){
		if(i < listaPuntos.length-1){
			cmd += listaPuntos[i]+", ";
		}else{
			cmd += listaPuntos[i]+"]";
		}
	}
	console.log("nivel "+n+": "+cmd);
	ggbApplet.evalCommand(cmd);
	ggbApplet.setLayer("p_"+n, layer);
	ggbApplet.setColor("p_"+n, 10*(n+1), 20*(n+1), 40*(n+1));
	if ( layer > 0 ) layer--;
	return;
}

function caracterPermitido(evento){ 
	var caracteresPermitidos = "0123456789";
	var teclasEspeciales = [8, 37, 39, 46];
	var evento = evento || window.event;
	var codigoCaracter = evento.charCode || evento.keyCode;
	var caracter = String.fromCharCode(codigoCaracter);
	var teclaEspecial = false;
	for(var i in teclasEspeciales) {
		if(codigoCaracter == teclasEspeciales[i]) {
			teclaEspecial= true;
			break;
		}
	}
	return caracteresPermitidos.indexOf(caracter) != -1 || teclaEspecial;
}
