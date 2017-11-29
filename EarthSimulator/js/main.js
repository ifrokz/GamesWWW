/* /////////////////// /*
    Author: FroKz
    Date: 27/03/17
/* /////////////////// */  


var objetopadre = new THREE.Object3D();
objetopadre.rotation.x = 0.2
var cameraNow = 2;

/* PARTICULAS */
var group = null;
var particle = null;
/* PARTICULAS */
var stats;
var c, ctx;

$(document).ready(function(){
    init();
    animate(); 
    
    //
    mainControls()
});

function init(){
    
    // Creo una escena
    scene = new THREE.Scene();
    
    /* PARTICULAS */
    group = new THREE.Group();
    objetopadre.add(group);
    
    var program = function(ctx){
        ctx.beginPath();
        ctx.arc(0,0,4,0,Math.PI*2,true);
        ctx.fill();
    }
    
    var asteroid = new THREE.ImageUtils.loadTexture("imagenes/asteroid.png");
    var material = new THREE.SpriteMaterial({
       
        map: asteroid,
        program: program
    });
    
    for(var i = 0;i<100;i++){
        particle = new THREE.Sprite(material);
        particle.position.set(Math.random()*800-400,Math.random()*800-400,Math.random()*800-400);
        group.add(particle);
    }
    /* PARTICULAS */
    
    // Creo la cámara principal
    
    camera = new THREE.PerspectiveCamera(80,window.innerWidth/window.innerHeight,1,1000);
    camera.position.set(0,0,0);
    camera.position.z = 100;
    
    
   
    
    objetopadre.position.x = 0;
    scene.add(objetopadre);
    
    //Creo un elemento enla escena.
    moonsphere = new THREE.SphereGeometry(2,25,25);
    moonmap = new THREE.ImageUtils.loadTexture("imagenes/moon.jpg");
    materialmoon = new THREE.MeshPhongMaterial({
        map: moonmap,
        bumpMap: moonmap,
        displacementMap: moonmap,
        displacementScale: 0.01,
        refractionRatio: 1
    });
    moon = new THREE.Mesh(moonsphere, materialmoon);
    moon.position.x = 50;
    moon.parent = objetopadre;
    objetopadre.add(moon);
    
    
    // Bola del mundo
    maparelieve = THREE.ImageUtils.loadTexture("imagenes/relievetierra.jpg");
    colormap = THREE.ImageUtils.loadTexture("imagenes/ColorMap.jpg");
    bola = new THREE.SphereGeometry(20,50,50);
    materialbola = new THREE.MeshPhongMaterial({
        map:colormap,
        bumpMap:maparelieve,
        displacementMap:maparelieve,
        displacementScale: 1,
        refractionRatio:0.95
    });
    mibola = new THREE.Mesh(bola,materialbola);
    mibola.matrixAutoUpdate = false;
    mibola.parent = objetopadre;
    objetopadre.add(mibola);
    
    
    
    // CIELO
    sphereuniverse = new THREE.SphereGeometry(500,100,100);
    mapauniverso = new THREE.ImageUtils.loadTexture("imagenes/universe.jpg");
    materialuniverse = new THREE.MeshPhongMaterial({
        map: mapauniverso,
        side: THREE.DoubleSide
    });
    universe = new THREE.Mesh(sphereuniverse,materialuniverse);
    scene.add(universe);
    
    /*
	var shader = THREE.ShaderLib[ "cube" ];
	shader.uniforms[ "tCube" ].value = textureCube;

	var material = new THREE.ShaderMaterial( {

		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		depthWrite: false,
		side: THREE.DoubleSide

	} ),

	mesh = new THREE.Mesh( new THREE.BoxGeometry( 10000, 10000, 10000 ), material );
	scene.add( mesh );*/
       
    // Creación de luces.
    ambiental = new THREE.AmbientLight(0x222222);
    scene.add(ambiental);
    
    light = new THREE.PointLight( 0xffffff, 5, 100, 2);
    light.position.set( 50, 0, 50 );
    scene.add( light );
    
    var sphereSize = 1;
    var pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
    scene.add( pointLightHelper );
    
    
    // Creamos el renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(1);
    renderer.setSize(window.innerWidth,window.innerHeight);
    // Pongo el render dentro del div container
    addRenderToContainer = document.getElementById("container").appendChild(renderer.domElement);  
    var canvas = document.getElementsByTagName("canvas");
    console.log(canvas);
    canvas[0].id ="canvas";
    c = document.getElementById("canvas");
    console.log(c);
    ctx = c.getContext("2d");
    console.log(ctx);
    
    stats = new Stats();
	container.appendChild( stats.dom );
    
         // CREAMOS UNA PERSPECTIVE CAMERA
    camera2 = new THREE.PerspectiveCamera(30,window.innerWidth/window.innerHeight,1,1000);
    camera2.position.x = 0;
    camera2.position.y = 0;
    // AÑADIMOS LOS CONTROLES PREDETERMINADOS DE THREE.JS PARA LA CAMARA ORBITAL
    controlscamera2 = new THREE.OrbitControls(camera2,renderer.domElement);
    //controls.addEventListener('change',render);
    controlscamera2.enableZoom = true;
    controlscamera2.minDistance = 100;
    controlscamera2.maxDistance = 450;
    camera2.position.z = 100;
}


function animate(){
    //camera2.aspect = window.innerWidth / window.innerHeight;
    camera2.updateProjectionMatrix();
    
    stats.update();
    
    /*for(var p in group.children){
        group.children[p].scale.x += Math.random()*0.1-0.05;
        group.children[p].scale.y += Math.random()*0.1-0.05;
        group.children[p].scale.z += Math.random()*0.1-0.05;
    }*/
    moon.rotation.y += 0.005;
    objetopadre.rotation.y += 0.005;
    
    universe.rotation.y += 0.0003;
    // Bucle
    requestAnimationFrame(animate);
    render();
}


function render(){
    controlscamera2.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.setSize(window.innerWidth,window.innerHeight);
    //console.log("render");
    // Renderizo en el container la vista de la cámara principal en la escena.
    if(cameraNow == 1){
        console.log("camara1");
        camera.aspect = window.innerWidth/window.innerHeight;
        renderer.render(scene,camera);
    }else if(cameraNow == 2){
        camera2.aspect = window.innerWidth/window.innerHeight;
        renderer.render(scene,camera2)
    }
    
}