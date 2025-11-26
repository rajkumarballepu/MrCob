import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.getElementById('viewer');

// SCENE
const scene = new THREE.Scene(); // ✅ transparent

// CAMERA
const camera = new THREE.PerspectiveCamera(50, 250 / 250, 0.1, 1000);
camera.position.set(0, 1, 3);

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(250, 250);
renderer.setClearColor(0x000000, 0); // ✅ transparent
container.appendChild(renderer.domElement);

// LIGHTS
scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.3));

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

let shoe;
let clock = new THREE.Clock();

// LOAD MODEL
const loader = new GLTFLoader();
loader.load('images/shoe.gltf', function (gltf) {
    shoe = gltf.scene;

    // Optional scale if needed
    shoe.scale.set(.8, .8, .8);
    shoe.rotation.x = 0.5;
    shoe.rotation.y = -1.2;
    shoe.rotation.z = 0.4;

    shoe.position.set(0, 0, 0);

    scene.add(shoe);
});

// ANIMATION LOOP
function animate() {
    requestAnimationFrame(animate);
    if(shoe) {
        const time = clock.getElapsedTime();

        shoe.position.y = Math.sin(time * 2) * 0.2
    }
    controls.update();
    renderer.render(scene, camera)
}
animate();