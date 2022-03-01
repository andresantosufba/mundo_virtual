// Hello World em Three.js

import * as THREE from '../three.js-master/build/three.module.js';
import { BoxLineGeometry } from '../three.js-master/examples/jsm/geometries/BoxLineGeometry.js';
import { OrbitControls } from '../three.js-master/examples/jsm/controls/OrbitControls.js';


function main() {

	var scene 		= new THREE.Scene();

	var renderer 	= new THREE.WebGLRenderer();
	
	//var camera 		= new THREE.Camera();
	//const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -1, 1000 );
	const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100 );
	renderer.setClearColor(new THREE.Color(0.4, 0.4, 0.4));
	renderer.setSize(window.innerWidth*0.8, window.innerHeight*0.8);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	const controls = new OrbitControls( camera, renderer.domElement );


	camera.position.x=0;
	camera.position.y=1.5;
	camera.position.z=2;
	var room,gondola;
	var geometryGondola;
	var materialGondola;

	var prateleira;
	var geometryPrateleira;

	var goob;
	var geometrygoob;
	var materialGoob;

	
	camera.position.set( 0, 3.6, 2 );
	camera.lookAt(0,4,6);
	controls.update();
	controls.object.position.set(-1.8, 1.5, 1.5);
	controls.target= new THREE.Vector3(-1.5,1.4,-3);

	var texture_loader = new THREE.TextureLoader();
	var texture = texture_loader.load('../images/madeira2.jpg');

	var texture_loader_goob = new THREE.TextureLoader();
	var textureGoob = texture_loader_goob.load('../images/goob1.JPG');




	room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);
	room.geometry.translate( 0, 3, 0 );
	scene.add( room );

	scene.add( new THREE.HemisphereLight( 0x606060, 0x404040 ) );

	const light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 1, 1, 1 ).normalize();
	scene.add( light );
	
	geometryGondola = new THREE.BoxGeometry(1.5,1.5,0.1);
	//materialGondola = new THREE.MeshPhongMaterial( { color: 0x444444, side: THREE.DoubleSide});
	materialGondola = new THREE.MeshLambertMaterial( { color: 0xffffff, side: THREE.DoubleSide, map:texture});
	gondola = new THREE.Mesh(geometryGondola,materialGondola);
	gondola.geometry.translate(-1.5,1,-2.95);
	scene.add(gondola);
	
	geometryPrateleira = new THREE.BoxGeometry(1.5,0.1,0.3);
	//prateleira = new THREE.Mesh(geometryPrateleira,new THREE.MeshPhongMaterial( { color: 0x11dddd, side: THREE.DoubleSide}));
	prateleira = new THREE.Mesh(geometryPrateleira,new THREE.MeshLambertMaterial( { color: 0xffffff, side: THREE.DoubleSide, map:texture}));
	prateleira.geometry.translate(-1.5,1,-2.75);
	scene.add(prateleira);
	
	
	//prateleira = new THREE.Mesh(geometryPrateleira, new THREE.MeshPhongMaterial( { color: 0xdddd11, side: THREE.DoubleSide}) );
	prateleira = new THREE.Mesh(geometryPrateleira,new THREE.MeshLambertMaterial( { color: 0xffffff, side: THREE.DoubleSide, map:texture}));
	prateleira.position.y = 0.4;
	scene.add(prateleira);

	//prateleira = new THREE.Mesh(geometryPrateleira, new THREE.MeshPhongMaterial( { color: 0xdd11dd, side: THREE.DoubleSide}) );
	prateleira = new THREE.Mesh(geometryPrateleira,new THREE.MeshLambertMaterial( { color: 0xffffff, side: THREE.DoubleSide, map:texture}));
	prateleira.position.y = -0.4;
	scene.add(prateleira);
	
	geometrygoob = new THREE.CylinderGeometry(0.1,0.1,0.3);
	materialGoob = new THREE.MeshLambertMaterial({color: 0xffffff, map: textureGoob})
	goob = new THREE.Mesh(geometrygoob,materialGoob);
	goob.geometry.translate(-1.5,1.2,-2.7);
	goob.userData.clickable = true;
	scene.add(goob);







	
	function animate(){
		renderer.render(scene, camera);
		controls.update();
		requestAnimationFrame(animate);	
	}
	animate();
	//renderer.render(scene, camera);
};

main()
