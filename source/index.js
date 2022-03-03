// Hello World em Three.js

import * as THREE from '../three.js-master/build/three.module.js';
import { BoxLineGeometry } from '../three.js-master/examples/jsm/geometries/BoxLineGeometry.js';
import { OrbitControls } from '../three.js-master/examples/jsm/controls/OrbitControls.js';
// import { FlyControls } from '../three.js-master/examples/jsm/controls/FlyControls.js';
import { OBJLoader } from '../three.js-master/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from '../three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { ARButton } from '../three.js-master/examples/jsm/webxr/ARButton.js';



function main() {

	var scene 		= new THREE.Scene();
	var render;
	// var renderer 	= new THREE.WebGLRenderer();
	var renderer 	= new THREE.WebGLRenderer({ antialias: true, alpha: true });
	var controls,clock;

	let controller;

	const container = document.createElement( 'div' );
	document.body.appendChild( container );
	
	//var camera 		= new THREE.Camera();
	//const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -1, 1000 );
	const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100 );
	renderer.setClearColor(new THREE.Color(0.4, 0.4, 0.4));
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(window.innerWidth*0.8, window.innerHeight*0.8);
	renderer.xr.enabled = true;
	container.appendChild( renderer.domElement );
	document.body.appendChild( ARButton.createButton( renderer ) );
	scene.background= new THREE.Color(0xcccccc);


	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	controls = new OrbitControls( camera, renderer.domElement );
	
	clock = new THREE.Clock();

	var keyStates={}

	var object;
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
	const helper = new THREE.CameraHelper( camera );
	scene.add( helper );

	var goobgltf;
	
	camera.position.set( 0, 3.6, 2 );
	// camera.lookAt(0,4,6);
	// controls = new FlyControls( camera, renderer.domElement );
	controls.update();
	controls.object.position.set(-1.8, 1.5, 1.5);
	controls.target= new THREE.Vector3(-1.5,1.4,-3);

	

	var texture_loader = new THREE.TextureLoader();
	var texture = texture_loader.load('../images/madeira2.jpg');

	var texture_loader_goob = new THREE.TextureLoader();
	var textureGoob = texture_loader_goob.load('../images/goob1.JPG');

	scene.add( new THREE.AxesHelper(  15 ) );


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

	function onSelect(){
		// materialGoob = new THREE.MeshLambertMaterial({color: 0xffffff, map: textureGoob})
		materialGoob = new THREE.MeshPhongMaterial({color: 0xffffff * Math.random()})
		goob = new THREE.Mesh(geometrygoob,materialGoob);
		// goob.geometry.translate(-1.5,1.2,-2.7);
		// goob.userData.clickable = true;
		goob.position.set( 0, 0, - 0.5 ).applyMatrix4( controller.matrixWorld );
		// goob.position.set( -1.5, 1.2, - 2.7 ).applyMatrix4( controller.matrixWorld );
		goob.quaternion.setFromRotationMatrix( controller.matrixWorld );
		scene.add(goob);
	}
	controller = renderer.xr.getController(0);
	controller.addEventListener('select',onSelect);
	scene.add(controller);

	

	// controls.movementSpeed = 10;
	// controls.domElement = renderer.domElement;
	// controls.rollSpeed = Math.PI / 6;
	// controls.autoForward = false;
	// controls.dragToLook = true;
	window.addEventListener("keydown", function(event) {
		if (event.defaultPrevented) {
		  return; // Do nothing if event already handled
		}
		keyStates[ event.code ] = true;
	  
		switch(event.code) {
		  case "KeyC":
			  helper.visible= !helper.visible;
			  break;
		  case "KeyS":
		  case "ArrowDown":
			// Handle "back"
			// updatePosition(-moveRate);
			camera.position.z+=0.050;
			
			
			break;
		  case "KeyW":
		  case "ArrowUp":
			// Handle "forward"
			// updatePosition(moveRate);
			camera.position.z-=0.05
			break;
		  case "KeyA":
		  case "ArrowLeft":
			// Handle "turn left"
			// angle -= turnRate;
			camera.rotation.y -= Math.PI/48;
			camera.position.x -=0.05;
			// camera.rotation.x -= Math.PI/24;
			// camera.update();
			break;
		  case "KeyD":
		  case "ArrowRight":
			// Handle "turn right"
			// angle += turnRate;
			camera.rotation.y += Math.PI/48;
			camera.position.x +=0.1;
			
			// controls.update();
			// controls.target.position.x += 0.1;
			
			
			break;
		}
	window.addEventListener( 'keyup', ( event ) => {

		keyStates[ event.code ] = false;

	} );
		// refresh();
	  
		// Consume the event so it doesn't get handled twice
		event.preventDefault();
	  }, true);




	controls.keys = {
		LEFT: 'ArrowLeft', //left arrow
		UP: 'ArrowUp', // up arrow
		RIGHT: 'ArrowRight', // right arrow
		BOTTOM: 'ArrowDown' // down arrow
	}
	
	// instantiate a loader
	const loaderobj = new OBJLoader();

	// load a resource
	loaderobj.load(
		// resource URL
		'../models/obj.obj',
		// called when resource is loaded
		function ( object ) {
			object.scale.x=0.05;
			object.scale.y=0.05;
			object.scale.z=0.05;
			object.position.x = -1.5;
			object.position.y = 1.45;
			object.position.z = -2.7;
			object.rotation.y= -Math.PI/2;
			//(new THREE.Vector3 (0.5,0.5,0.5));
			scene.add( object );

		},
		// called when loading is in progresses
		function ( xhr ) {

			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},
		// called when loading has errors
		function ( error ) {

			console.log( 'An error happened' );

		}
	);
	// object.position.x=0;
	// object.position.y=0;
	// object.position.z=0;
	
	const loader = new GLTFLoader();
	// Load a glTF resource
	loader.load(
		// resource URL
		'../models/222.glb',
		// called when the resource is loaded
		function ( glb ) {
			goobgltf = glb.scene;
			scene.add( goobgltf );
			goobgltf.position.x = 0;
			goobgltf.position.y = 0;
			goobgltf.position.z = 0;

			animate();

			// gltf.animations; // Array<THREE.AnimationClip>
			// gltf.scene; // THREE.Group
			// gltf.scenes; // Array<THREE.Group>
			// gltf.cameras; // Array<THREE.Camera>
			// gltf.asset; // Object

		},
		// called while loading is progressing
		function ( xhr ) {

			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},
		// called when loading has errors
		function ( error ) {

			console.log( 'An error happened' );

		}
	);








	
	function animate(){
		const delta = clock.getDelta();
		renderer.render(scene, camera);
		controls.update(delta);
		// controls.movementSpeed = 0.33;
		requestAnimationFrame(animate);	
		renderer.setAnimationLoop( render );
	}
	animate();
	//renderer.render(scene, camera);
};

main()
