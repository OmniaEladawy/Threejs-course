import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const cubeTextureLoader = new THREE.CubeTextureLoader();

const scene = new THREE.Scene();

const canvas = document.querySelector('canvas.webgl');

const environmentMap = cubeTextureLoader.load([
	'./cube-map/px.png',
	'./cube-map/nx.png',
	'./cube-map/py.png',
	'./cube-map/ny.png',
	'./cube-map/pz.png',
	'./cube-map/nz.png',
]);

scene.environmentMap = environmentMap;
scene.background = environmentMap;

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener('resize', () => {
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);

camera.position.z = 20;

scene.add(camera);

const controls = new OrbitControls(camera, canvas);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const tick = () => {
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};

tick();
