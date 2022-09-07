import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.127.0/build/three.module.js'; 

import { FontLoader } from "https://cdn.skypack.dev/three@0.133/examples/jsm/loaders/FontLoader.js";

import { TextGeometry } from "https://cdn.skypack.dev/three@0.133/examples/jsm/geometries/TextGeometry.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/controls/OrbitControls.js";




var camera, scene, renderer, controls, container;

var cameraDummy = new THREE.Object3D();

let currentMonth, paddedCurrentDay;

let mobile = false;

// get mouse pointer position

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

init();

convertDateToString();

animate();

if (window.innerWidth/window.innerHeight < 1) {
mobile = true;
};

const loadingManager = new THREE.LoadingManager();

loadingManager.onProgress = function(url, item, total)
{
	console.log(`started loading: ${total}`);
}

loadingManager.onLoad = function() 
{
console.log("All files loaded");
cameraReturnToDefault();
}


// MODEL loader

const loader = new THREE.ObjectLoader(loadingManager);

loader.load("https://d1sgzpk8wua66w.cloudfront.net/amb-moto/model/room.json", function (obj) 
    {
        // Add the loaded object to the scene
        scene.add(obj);
    },    
);
loader.load("https://d1sgzpk8wua66w.cloudfront.net/amb-moto/model/bike.json", function (obj) 
    {
        // Add the loaded object to the scene
        scene.add(obj);        
    },    
);
loader.load("https://d1sgzpk8wua66w.cloudfront.net/amb-moto/model/bike-parts.json", function (obj) 
    {
        // Add the loaded object to the scene
        scene.add(obj);
    },    
);
loader.load("https://d1sgzpk8wua66w.cloudfront.net/amb-moto/model/objects.json", function (obj) 
    {
        // Add the loaded object to the scene
        scene.add(obj);
    },    
);
loader.load("https://d1sgzpk8wua66w.cloudfront.net/amb-moto/model/bike-models.json", function (obj) 
    {
        // Add the loaded object to the scene
        scene.add(obj);
    },    
);

// MODEL loader ends

// MODEL loader ends

function init() {

    //scene setup

    scene = new THREE.Scene();

    container = document.getElementById('three-bg');

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    renderer.outputEncoding = THREE.sRGBEncoding;

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 1000);
    
    controls = new OrbitControls(camera, renderer.domElement);                                                   //CONTROLS

    camera.position.set(-2.683, 0.893, -3.882);
    cameraDummy.add(camera);

    controls.target.set(-3.43, 0.893, -4.867);
    controls.enableDamping = true;
    controls.enabled = false;

    window.addEventListener('resize', onWindowResize, false);

    //scene setup
}

var butonIntretinere = document.getElementById("intretinere-card");
var butonReparatii = document.getElementById("reparatii-card");
var butonPiese = document.getElementById("piese-card");
var butonCazare = document.getElementById("cazare-card");
var butonCTA = document.getElementById("butonCTA");
var butonCTAmobile = document.getElementById("butonCTA-mobile");
var servicesSection = document.getElementById("section-services");
var contactSection = document.getElementById("section-contact");
// var sceneIsHome = true;

butonCTA.onclick = function () {

    sleep(1000).then(() => {  


    gsap.to(camera.position, {
        x: 0.302,
        y: 1.326,
        z: -0.716,
        duration: 2,
        ease: "power1.inOut"
    });
    gsap.to(controls.target, {
        x: -0.185,
        y: 1.013,
        z: -2.142,
        duration: 2,
        ease: "power1.inOut"
    });
    });
};

butonCTAmobile.onclick = function () {

    gsap.to(camera.position, {
        x: 0.520,
        y: 1.572,
        z: -0.771,
        duration: 2,
        ease: "power1.inOut"
    });
    gsap.to(controls.target, {
        x: -0.185,
        y: 1.013,
        z: -2.142,
        duration: 2,
        ease: "power1.inOut"
    });
};

butonIntretinere.onmouseover = function () {

    gsap.to(camera.position, {
        x: -0.364,
        y: 1.433,
        z: 1.218,
        duration: 2,
        ease: "power1.inOut"
    });
    gsap.to(controls.target, {
        x: -1.234,
        y: 0.988,
        z: 0.656,
        duration: 2,
        ease: "power1.inOut"
    });
};

butonReparatii.onmouseover = function () {

    gsap.to(camera.position, {
        x: 1.522,
        y: 0.514,
        z: 1.356,
        duration: 2,
        ease: "power1.inOut"
    });
    gsap.to(controls.target, {
        x: -0.166,
        y: 0.261,
        z: 0.656,
        duration: 2,
        ease: "power1.inOut"
    });

};

butonPiese.onmouseover = function () {

    gsap.to(camera.position, {
        x: -0.517,
        y: 1.829,
        z: -1.515,
        duration: 2,
        ease: "power1.inOut"
    });
    gsap.to(controls.target, {
        x: -1.590,
        y: 1.773,
        z: -1.529,
        duration: 2,
        ease: "power1.inOut"
    });

};

butonCazare.onmouseover = function () {

    gsap.to(camera.position, {
        x: -0.663,
        y: 1.583,
        z: -1.042,
        duration: 2,
        ease: "power1.inOut"
    });
    gsap.to(controls.target, {
        x: -1.137,
        y: 1.333,
        z: -2.206,
        duration: 2,
        ease: "power1.inOut"
    });
};

servicesSection.onmouseleave = function () {
    cameraReturnToDefault();
};

contactSection.onmouseleave = function () {
    cameraReturnToDefault();
};

function cameraReturnToDefault() {
if(!mobile){
    gsap.to(camera.position, {
        x: 1.544,
        y: 0.945,
        z: 2.854,
        duration: 2,
        ease: "power1.inOut"
    });
    
        gsap.to(controls.target, {
        x: 0,
        y: 0.82,
        z: 1.313,
        duration: 2,
        ease: "power1.inOut"
    });
    }
    else{
    gsap.to(camera.position, {
        x: 2.673,
        y: 1.056,
        z: 3.277,
        duration: 2,
        ease: "power1.inOut"
    });
    
        gsap.to(controls.target, {
        x: -0.286,
        y: 0.913,
        z: 0.335,
        duration: 2,
        ease: "power1.inOut"
    });    
    }
};

document.addEventListener('mousemove', onDocumentMouseMove);

function onDocumentMouseMove(event) {

    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);

}

// CALENDAR STUFF starts here

const textMaterials = [
    new THREE.MeshBasicMaterial({ color: 0x000000 }), // front
    new THREE.MeshBasicMaterial({ color: 0x000000 }) // side
];

const calendarTextLoader = new FontLoader();

var calendarMonth = null;
var calendarDay = null;
var calendarMonthMesh;
var calendarDayMesh;

function convertDateToString() {
    var dt = new Date();   // THE DATE OBJECT.

    // ADD WEEK DAYS IN AN ARRAY.
    var month = new Array('Ian', 'Feb', 'Mar',
        'Apr', 'Mai', 'Iun', 'Jul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec');

    currentMonth = month[dt.getMonth()];

    var currentDay = dt.getDate();

    paddedCurrentDay = currentDay.toString().padStart(2, '0');

}

calendarTextLoader.load('https://d1sgzpk8wua66w.cloudfront.net/amb-moto/fonts/bebas-neue-r.json', function (font) {
    calendarMonth = new TextGeometry(currentMonth, {
        font: font,
        size: 0.12,
        height: 0.01,
        curveSegments: 12
    });

    calendarDay = new TextGeometry(paddedCurrentDay, {
        font: font,
        size: 0.12,
        height: 0.01,
        curveSegments: 12
    });

    calendarMonthMesh = new THREE.Mesh(calendarMonth, textMaterials);
    calendarDayMesh = new THREE.Mesh(calendarDay, textMaterials);

    calendarMonth.computeBoundingBox()
    calendarMonth.center();
    calendarMonthMesh.geometry.dispose();
    calendarMonthMesh.geometry = calendarMonth;

    calendarDay.computeBoundingBox()
    calendarDay.center();
    calendarDayMesh.geometry.dispose();
    calendarDayMesh.geometry = calendarDay;

    calendarMonthMesh.position.y = 0.225;

    const grupTextCalendar = new THREE.Group();

    grupTextCalendar.add(calendarDayMesh, calendarMonthMesh);

    grupTextCalendar.position.set(-0.2, 1.207, -2.132);

    scene.add(grupTextCalendar);
});

// CALENDAR STUFF ends here

function onWindowResize() {

    var width = window.innerWidth;
    var height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);    
}

function animate() {

    requestAnimationFrame(animate);

    targetX = mouseX * .001 * 0.2;
	targetY = mouseY * .001 * 0.06;

	if ( cameraDummy ) {
		if(mobile){    
        cameraDummy.rotation.y = Math.sin(Date.now() * 0.001 * 0.1) * Math.PI * 0.1;    
    }
    else{
				cameraDummy.rotation.y += 0.04 * ( targetX - cameraDummy.rotation.y );
				cameraDummy.rotation.x += 0.01 * ( targetY - cameraDummy.rotation.x );
    }

	}

    controls.update();

    renderer.render(scene, camera);
}
