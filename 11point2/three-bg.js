import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.127.0/build/three.module.js';
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/controls/OrbitControls.js";
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.17/+esm';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';


const gui = new GUI();
gui.hide();

var camera, scene, renderer, controls, container;
var cameraDummy = new THREE.Object3D();
var objectDummy = new THREE.Object3D();

let mobile = false;

let animMultiplier = 150000;

// get mouse pointer position
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

init();

animate();

if (window.innerWidth / window.innerHeight < 1) {
    mobile = true;
};
const loadingManager = new THREE.LoadingManager();

loadingManager.onLoad = function () {
    afterLoad()
}
loadingManager.onError = function () {
    console.log("Loading failed")
}


const loader = new GLTFLoader(loadingManager);
loader.load("https://cdn.jsdelivr.net/gh/micaparat/mic-server/11point2/color-shape_c_min.glb", function (gltf) {

    const worm = gltf.scene.children[0];

    objectDummy.add(worm);
},
);

scene.add(objectDummy);

// MODEL loader ends

const lightRed = new THREE.AmbientLight(0xff6c6e, 1.3); // soft red light
scene.add(lightRed);
const lightwhite = new THREE.AmbientLight(0xffffff, .6); // soft white light
scene.add(lightwhite);

function init() {
    //scene setup

    container = document.getElementById('threebg');

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(5, 2, 0.01, 150000);
    camera.position.set(-3.9, -1.74, 60);
    cameraDummy.add(camera);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(-2.9, -1.6, 0);
    controls.enableDamping = true;
    controls.enabled = false;

}

const objectPositionFolder = gui.addFolder('Object Position')
const objectRotationFolder = gui.addFolder('Object Rotation')

objectPositionFolder.add(objectDummy.position, 'x', -20, 20)
objectPositionFolder.add(objectDummy.position, 'y', -20, 20)
objectPositionFolder.add(objectDummy.position, 'z', -90, 90)
objectRotationFolder.add(objectDummy.rotation, 'x', -Math.PI / 4, Math.PI / 4)
objectRotationFolder.add(objectDummy.rotation, 'y', -Math.PI / 4, Math.PI / 4)
objectRotationFolder.add(objectDummy.rotation, 'z', -Math.PI / 4, Math.PI / 4)

objectPositionFolder.open();
objectRotationFolder.open();

// GSAP

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
    immediateRender: false,
    scrub: 1.5
});

let mainAnim = gsap.timeline({

    scrollTrigger: {
        trigger: "#fullpage",
        start: "top top",
        end: "bottom bottom",
        ease: "power2.inOut",
        markers: false,
        toggleActions: "restart pause resume pause"
    },

})

function afterLoad()
{
    gsap.from(container, {opacity: 0, y: 100, duration: 1, ease: "power1.inOut"});
}


//section-header initial

if (!mobile) {
    objectDummy.position.set(1.4, -0.32, -16.4);
    objectDummy.rotation.set(0, 0, 0.25);
}
else {
    objectDummy.position.set(0.6, 1.72, -72.18);
    objectDummy.rotation.set(0, 0, 0.25);
}

if (!mobile) {

    mainAnim


        //position2
        .to(objectDummy.position, { duration: 30, x: 13, y: 9.2, z: -33.84, })
        .to(objectDummy.rotation, { duration: 30, x: 0, y: -0.26, z: 0, }, "<")

        .to(container, { opacity: 0 }) //jump opacity

        //position3
        .to(objectDummy.position, { x: -12, y: -5, z: -20, })
        .to(objectDummy.rotation, { x: -0.3, y: 0.02, z: 0.7, }, "<")

        .to(container, { opacity: 1 })

        //position4
        .to(objectDummy.position, { duration: 60, x: -5.08, y: 8.68, z: -38.34, })
        .to(objectDummy.rotation, { duration: 60, x: 0, y: 0, z: 0, }, "<")

        //position5
        .to(objectDummy.position, { duration: 80, x: -5.56, y: 5.24, z: -42.66, })
        .to(objectDummy.rotation, { duration: 80, x: 0.032, y: 0.07, z: -0.141, }, "<")

        //position6
        .to(objectDummy.position, { duration: 10, x: -3.4, y: 1.64, z: 50, })
        .to(objectDummy.rotation, { duration: 10, x: 0.0455, y: -0.1092, z: .026, }, "<")

}
else {

    mainAnim
        //position2
        .to(objectDummy.position, { duration: 15, x: 5, y: 2.8, z: -72.18, })
        .to(objectDummy.rotation, { duration: 15, x: 0.089, y: -0.15, z: 0.54, }, "<")

        .to(container, { opacity: 0 }) //jump opacity

        //position3
        .to(objectDummy.position, { x: -7, y: -7, z: -70, })
        .to(objectDummy.rotation, { x: -0.3, y: -0.1, z: 0.153, }, "<")

        .to(container, { opacity: 1 })

        //position4
        .to(objectDummy.position, { duration: 60, x: -1.08, y: 8.92, z: -90, })
        .to(objectDummy.rotation, { duration: 60, x: 0, y: 0, z: 0, }, "<")

        //position5
        .to(objectDummy.position, { duration: 10, x: -2.72, y: 0.04, z: 20.16, })
        .to(objectDummy.rotation, { duration: 10, x: 0.08, y: -0.042, z: 0.089, }, "<")


}


// END GSAP

function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // set render target sizes here
}

document.addEventListener('mousemove', onDocumentMouseMove);

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

function animate() {

    requestAnimationFrame(animate);

    resizeCanvasToDisplaySize();

    targetX = -mouseX / animMultiplier;
    targetY = -mouseY / 120000;

    cameraDummy.rotation.y += 0.025 * (targetX - cameraDummy.rotation.y);
    cameraDummy.rotation.x += 0.01 * (targetY - cameraDummy.rotation.x);

    controls.update();
    renderer.render(scene, camera);
}

const resizeObserver = new ResizeObserver(resizeCanvasToDisplaySize);

resizeObserver.observe(renderer.domElement, { box: 'content-box' });
