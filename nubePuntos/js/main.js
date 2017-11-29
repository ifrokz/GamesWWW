$(document).ready(function(){   
    init();
    animate();
});

var stats;
function init(){
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight,1,1000);

    camera.position.z = 200;
    
    light = new THREE.AmbientLight(0x707070, 2);
    scene.add(light)
    
    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(1);
    renderer.setSize(window.innerWidth,window.innerHeight);
    
    
    $.ajax({
    url : 'php/getPoints.php',
    dataType : 'html',
    success : function(json) {
            var splitted = json.split(";");
            var radio = 8;
            pointSphere = new THREE.SphereGeometry(0.25,1,1);
            pointMaterial = new THREE.MeshPhongMaterial({
                color: 0xff00ff
            });
            for(var i in splitted){
                var v = splitted[i].split(",");
                
                point = new THREE.Mesh(pointSphere,pointMaterial);
                point.position.set(v[0]*radio,v[1]*radio-50,v[2]*radio);
                scene.add(point);
                
                console.log(v[0]);
            }
        }
    });
    
    stats = new Stats();
	container.appendChild( stats.dom );
    
    addRenderToContainer = document.getElementById("container").appendChild(renderer.domElement);
    
    controlscamera = new THREE.OrbitControls(camera,renderer.domElement);
    controlscamera.enableZoom = true;
    controlscamera.minDistance = 100;
    controlscamera.maxDistance = 450;
}

function animate(){
    stats.update();
    
    requestAnimationFrame(animate);
    render();
}

function render(){
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.updateProjectionMatrix();
    
    renderer.render(scene,camera);
}