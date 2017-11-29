var camera, controls, scene, renderer, stats, personaje;

personaje = new THREE.Mesh();

$(document).ready(function(){
    if(Detector.webgl){
        init();
    }
});

function init(){
    // CREACIÓN DE LA ESCENA
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xcccccc, 0.001);
    
    // CREAMOS LE RENDERER DE WEBGL
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(scene.fog.color);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // CREACIÓN DINÁMICA DEL CANVAS
    var container = document.getElementById("container");
    container.appendChild(renderer.domElement);
    
    // CREAMOS UNA PERSPECTIVE CAMERA
    camera = new THREE.PerspectiveCamera(30,window.innerWidth/window.innerHeight,1,1000);
    camera.position.x = 0;
    camera.position.y = 250;
    camera.position.z = 100;
    camera.castShadow = true;
    camera.reciveShadow = true;
    // AÑADIMOS LOS CONTROLES PREDETERMINADOS DE THREE.JS PARA LA CAMARA ORBITAL
    controls = new THREE.OrbitControls(camera,renderer.domElement);
    //controls.addEventListener('change',render);
    controls.enableZoom = true;
    controls.minDistance = 250;
    controls.maxDistance = 750;
    
    
   /*/////////////AQUI VOY A IMPORTAR UNA LIBRERIA OBJ/////////////*/
   
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load( 'modelos/personaje.mtl', function( materials ) {

			materials.preload();

			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials( materials );
			
			objLoader.load( 'modelos/personaje.obj', function ( object ) {

				//object.position.y = - 95;
				object.scale.x = 5;
				object.scale.y = 5;
				object.scale.z = 5;
				// Ves nodo a nodo por cada uno de los sub objetos de este archivo
				object.traverse( function( node ) { 
					// Si es cierto que el objeto del que estamos hablando es una malla
					if ( node instanceof THREE.Mesh) { 
						if(node.name == "Group1"){
							// Proyecta sombras
							node.castShadow = true;
							console.log(node)
						}
					} 
					
				} );
				object.position.y = -50;
				personaje = object;
				object.castShadow = true; //default is false
                object.receiveShadow = true; //default
				scene.add( personaje );
				
			}, onProgress, onError );

		});
  
   // Esto es algo que ejecutamos mientras se carga
   function onProgress(){}
   // Esto se lanza si hay algun error en la carga
   function onError(){}
   /*/////////////AQUI VOY A IMPORTAR UNA LIBRERIA/////////////*/
                    
	cubo = new THREE.PlaneGeometry(1000,1000,60);
	material = new THREE.MeshPhongMaterial({color:0x00ff00,shininess: 100});
	micubo = new THREE.Mesh(cubo, material);
	micubo.position.x = 0;
	micubo.position.y = -50;
	micubo.position.z = 0;
	micubo.material.side = THREE.DoubleSide;
	micubo.rotation.x = 0-Math.PI/2;
    micubo.receiveShadow = true; //default
    micubo.castShadow = true;
	scene.add(micubo);
	
/*cubo2 = new THREE.BoxGeometry(5,5,5);
	material2 = new THREE.MeshPhongMaterial({color:0xff0000,shininess: 100});
	micubo2 = new THREE.Mesh(cubo2, material2);
	micubo2.position.x = 0;
	micubo2.position.y = 0;
	micubo2.position.z = 0;
	micubo2.material.side = THREE.DoubleSide;
	micubo2.rotation.x = 0-Math.PI/2;
    micubo2.receiveShadow = true; //default
    micubo2.castShadow = true;
	scene.add(micubo2);*/
    
    /*plano = new THREE.PlaneGeometry(250,250,1,1);
    miplano = new THREE.Mesh(plano, material);
    miplano.position.x = 0;
	miplano.position.y = 0;
	miplano.position.z = -50;
	scene.add(miplano)*/
	// lights

	luz1 = new THREE.SpotLight( 0xffffff );
	luz1.position.set( 50, 75, 50 );
	luz1.castShadow = true;
	luz1.shadowCameraVisible = true;
	
	luz1.shadow.mapSize.width = 8192; // 4096
    luz1.shadow.mapSize.height = 8192;
    
    luz1.shadow.camera.near = 1;
    luz1.shadow.camera.far = 1;
    luz1.shadow.camera.fov = 30;
    luz1.penumbra = 0.4;
	scene.add( luz1 );

	luz2 = new THREE.DirectionalLight( 0xffffff );
	luz2.position.set( -1, -1, -1 );
	luz2.castShadow = true;
	
	//scene.add( luz2 );

	ambiental = new THREE.AmbientLight( 0x222222 );
	scene.add( ambiental );

	//

	stats = new Stats();
	container.appendChild( stats.dom );

	//
	var helper = new THREE.CameraHelper( luz1.shadow.camera );
    scene.add( helper );
	window.addEventListener( 'resize', onWindowResize, false );
    
    
    
    animate();
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true

	stats.update();
	
	var scale = $("#scale").val();
	
    personaje.scale.x = scale;
    personaje.scale.y = scale;
    personaje.scale.z = scale;
    
	render();
}


function render(){
    renderer.render( scene, camera );
    //console.log("RENDER");
}