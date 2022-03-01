// Hello World em Three.js

import * as THREE from '../resources/threejs/build/three.module.js';


function main() {

	var scene 		= new THREE.Scene();

	var renderer 	= new THREE.WebGLRenderer();
	
	//var camera 		= new THREE.Camera();
	//const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -1, 1000 );
	const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100 );
	renderer.setClearColor(new THREE.Color(0.7, 0.7, 0.7));
	renderer.setSize(window.innerWidth*0.8, window.innerHeight*0.8);

	document.getElementById("output").innerHTML = "<h3>Versão do Three.JS => " + THREE.REVISION + "</h3>";	

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera.position.x=0;
	camera.position.y=0;
	camera.position.z=30;
	var px,py,xsen,xcos,Sx,Sy,i;
	var N = 32;
	var v1 = 2*(Math.PI)/N;
	var r = 1;
	xsen = Math.sin(v1);
	xcos = Math.cos(v1);

	var mesh;
	var material;
	
	var pos=[];
	var indices = [];
	var colors = [];
	var nV = 10;
	var tipo="Cicle";
	Sx=1*r;
	Sy=0;

	function circulo(){

		Sx*=5;
		// pos.push(0.0,0.0,0.0);
		// indices.push(0);
		//for(var k = 0;k<nV;k+=0.1)
		for(i=0;i<=N;i++){
			
			px= (Sx*xcos)-(Sy*xsen);
			py= (Sy*xcos)+(Sx*xsen);
			Sx= px;
			Sy= py;
			//r*=1.01;

			pos.push(px,py,0.0);
			indices.push(i);
			colors.push( ( px / r ) + 0.5 );
			colors.push( ( py / r ) + 0.5 );
			colors.push( ( (px*0.2)*(py*0.3) / r ) + 0.5 );
		}
		const geo = new THREE.BufferGeometry();
		geo.setIndex(indices);
		geo.setAttribute( 'position', new THREE.Float32BufferAttribute( pos, 3 ) );
		geo.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
		//var material = new THREE.MeshBasicMaterial({color:0x0000FF,wireframe:true});
		material = new THREE.LineBasicMaterial({vertexColors: true});
		mesh = new THREE.Line(geo,material);
		scene.add(mesh);
	}
	function espiral(){
		// pos.push(0.0,0.0,0.0);
		// indices.push(0);
		var count = 0;
		var plus=1;
		for(var k = 0;k<nV;k+=1){
			for(i=0;i<N-1;i++){
				
				px= plus*(Sx*xcos)-(Sy*xsen);
				py= plus*(Sy*xcos)+(Sx*xsen);
				Sx= px;
				Sy= py;
				plus+=1/(N*500);

				pos.push(px,py,0.0);
				indices.push(count);
				count++;
				colors.push( ( px / r ) + 0.5 );
				colors.push( ( py / r ) + 0.5 );
				colors.push( ( (px*0.2)*(py*0.3) / r ) + 0.5 );
			}
		}
		const geo = new THREE.BufferGeometry();
		geo.setIndex(indices);
		geo.setAttribute( 'position', new THREE.Float32BufferAttribute( pos, 3 ) );
		geo.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
		//var material = new THREE.MeshBasicMaterial({color:0x0000FF,wireframe:true});
		material = new THREE.LineBasicMaterial({vertexColors: true});
		mesh = new THREE.Line(geo,material);
		scene.add(mesh);
		
	}

	// delcaração da GUI
	var gui = new dat.GUI({
		height : 5 * 32 - 1
	});
	// parametros da GUI
	var params = {
		Tipo: tipo,
		Raio : r,
		NumVert : N,
		NumVoltas: nV,

	};

	//adicionando parametros da GUI com restrições
	gui.add(params,"Tipo",["Cicle", "Espiral"]);
	gui.add(params,'Raio',0.5,4,0.1);
	gui.add(params,'NumVert',3,50,1.0);
	gui.add(params,"NumVoltas",1,20,1.0);

	function verifica(){
		if(params.Tipo!= tipo){
			limpascene();			
			
		}
		if(params.Raio!= r){
			limpascene();
			
		}
		if(params.NumVert!= N){
			limpascene();

			
		}
		if(params.NumVoltas!=nV){
			limpascene();
			
		}
	}
	circulo();
	function limpascene(){
		pos=[];
		indices = [];
		colors = [];
		renderer.clear();
		scene.remove(mesh);
		tipo = params.Tipo;
		N=params.NumVert;
		r=params.Raio;
		nV = params.NumVoltas;
		v1 = 2*(Math.PI)/N;
		xsen = Math.sin(v1);
		xcos = Math.cos(v1);
		Sx=1*r;
		Sy=0;
		//circulo();
		if(tipo=="Cicle")
			circulo();
		else
			espiral();

	}
	//circulo();
	function animate(){
		verifica();
		//renderer.clear();
		renderer.render(scene, camera);
		requestAnimationFrame(animate);	
	}
	animate();
	//renderer.render(scene, camera);
};

main()
