import * as THREE from 'https://cdn.skypack.dev/three@0.133/build/three.module.js';

var camera, scene, renderer, container;

var objectRotationGroup = new THREE.Object3D();

const clock = new THREE.Clock()

var objectDummy = new THREE.Object3D();
var cTopRock = new THREE.Object3D(),
    cBottomRock = new THREE.Object3D(),
    cShards1 = new THREE.Object3D(),
    cShards2 = new THREE.Object3D(),
    cBoats = new THREE.Object3D(),
    cTinyHuman = new THREE.Object3D();
    
let portraitMode = false;

var lightIntensity = 1;

if (window.innerWidth / window.innerHeight < 1) {
    portraitMode = true;
};

init();

scene.add(objectDummy);

animate();

if(portraitMode)
{
    var tinyHumanHeight = 2;
}
else
{
    var tinyHumanHeight = 0;
}


const loadingManager = new THREE.LoadingManager();

loadingManager.onLoad = function () {
    console.log("Loading finished")
}

// MODEL loader

const loader = new THREE.ObjectLoader(loadingManager);
loader.load("https://cdn.jsdelivr.net/gh/micaparat/mic-server/cracked/scene3.json", function (obj) {
    // Add the loaded object to the scene
    objectDummy.add(obj);

    cTopRock.add(objectDummy.getObjectByName('top_rock'), objectDummy.getObjectByName('top_pink'));
    cBottomRock.add(objectDummy.getObjectByName('bottom_rock'), objectDummy.getObjectByName('bottom_pink'));
    cShards1.add(objectDummy.getObjectByName('shards1'));
    cShards2.add(objectDummy.getObjectByName('shards2'));
    cBoats.add(objectDummy.getObjectByName('boats'));

    scene.add(cTopRock);
    scene.add(cBottomRock);
    scene.add(cShards1);
    scene.add(cShards2);
    scene.add(cBoats);

},
);
loader.load("https://cdn.jsdelivr.net/gh/micaparat/mic-server/cracked/tinyhuman.json", function (obj) {
    // Add the loaded object to the scene
    objectDummy.add(obj);

    cTinyHuman.add(objectDummy.getObjectByName('human'));

    scene.add(cTinyHuman);
},
);

cTinyHuman.position.set(0,tinyHumanHeight,15);
cTinyHuman.rotation.set(0,Math.PI+0.5,0);
cTinyHuman.scale.set(0.6,0.6,0.6);

const light1 = new THREE.PointLight(0x0c5f4a,lightIntensity);
light1.position.set(15.8,12,0);
const light2 = new THREE.PointLight(0x674af7,lightIntensity);
light2.position.set(-29.085,-17.7,0);
const light3 = new THREE.PointLight(0xd33eea,lightIntensity);
light3.position.set(-21.5,18.5,-42);

scene.add(light1,light2,light3);

objectRotationGroup.add(cTopRock, cBottomRock, cShards1, cShards2)
scene.add(objectRotationGroup);

if (!portraitMode) {
    cBottomRock.position.y = -0.03;
}
else {
    cBottomRock.position.y = -0.05;
}

// MODEL loader ends

function init() {
    //scene setup
    scene = new THREE.Scene();
    container = document.getElementById('threebg');
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    // renderer.outputEncoding = THREE.sRGBEncoding;
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.01, 10000);


    if (!portraitMode) {
        camera.position.set(0, 0.5, 25);
    }
    else {
        camera.position.set(0, 0.5, 45);
    }

    // console.log(portraitMode);

    window.addEventListener('resize', onWindowResize, false);
    //scene setup
}

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
    immediateRender: false,
    scrub: 1.5
});

let mainAnim = gsap.timeline({
    // duration: 1,
    scrollTrigger: {
        trigger: "#fullpage",
        start: "top top",
        end: "bottom bottom",
        // markers: true,
        toggleActions: "restart pause resume pause"
    },

})

if (!portraitMode) {
    mainAnim
        .to(cTopRock.position, { y: 0.6, ease: "power1.inOut" })
        .to(cBottomRock.position, { y: -0.6, ease: "power1.inOut" }, "<")

        .to(camera.position, { x: -4, ease: "power1.inOut" })
        .to(cTopRock.position, { y: 1.6, ease: "power1.inOut" }, "<")
        .to(cBottomRock.position, { y: -1.6, ease: "power1.inOut" }, "<")

        .to(cTopRock.position, { y: 10, ease: "power1.inOut" })
        .to(cBottomRock.position, { y: -3, ease: "power1.inOut" }, "<")
        .to(cShards1.position, { y: 0.5, ease: "power1.inOut" }, "<")
        .to(cShards2.position, { y: 0.2, ease: "power1.inOut" }, "<")
        .to(cBoats.position, { y: 0.8, ease: "power1.inOut" }, "<")
        .to(cTinyHuman.position, { x: 5, z: 11, ease: "power1.inOut" }, "<")
        .to(camera.position, { x: 4, ease: "power1.inOut" }, "<")
        .to(camera.position, { z: 15, ease: "power1.inOut" }, "<");
}
else {
    mainAnim
        .to(cTopRock.position, { y: 0.8, ease: "power1.inOut" })
        .to(cBottomRock.position, { y: -0.8, ease: "power1.inOut" }, "<")

        .to(camera.position, { x: -4, ease: "power1.inOut" })
        .to(cTopRock.position, { y: 2, ease: "power1.inOut" }, "<")
        .to(cBottomRock.position, { y: -2, ease: "power1.inOut" }, "<")

        .to(cTopRock.position, { y: 30, ease: "power1.inOut" })
        .to(cBottomRock.position, { y: -3, ease: "power1.inOut" }, "<")
        .to(cShards1.position, { y: 0.5, ease: "power1.inOut" }, "<")
        .to(cShards2.position, { y: 0.2, ease: "power1.inOut" }, "<")
        .to(cBoats.position, { y: 0.8, ease: "power1.inOut" }, "<")
        .to(cTinyHuman.position, { x: 2.4, z: 18, ease: "power1.inOut" }, "<")
        .to(camera.position, { x: 2, ease: "power1.inOut" }, "<")
        .to(camera.position, { y: 4, ease: "power1.inOut" }, "<")
        .to(camera.position, { z: 28, ease: "power1.inOut" }, "<");
}

function onWindowResize() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}
function animate() {

    const elapsedTime = clock.getElapsedTime()

    cTopRock.rotation.y += 0.001;
    cBottomRock.rotation.y += 0.001;
    cShards1.rotation.y += 0.001;
    cShards2.rotation.y += 0.001;
    cBoats.rotation.y += 0.001;
    cTinyHuman.position.y = Math.sin(elapsedTime)/20 + tinyHumanHeight;

    // console.log(cTinyHuman.position.y);


    requestAnimationFrame(animate);




    renderer.render(scene, camera);
}