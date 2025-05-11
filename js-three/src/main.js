import * as THREE from 'three';
import { VRMLLoader } from 'three/examples/jsm/loaders/VRMLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


document.querySelectorAll('.renderCanvas').forEach((canvas, index) => {
  const dataset = canvas.dataset;
  const container = canvas.parentElement;

  // 🌐 Configuration from data attributes
  const modelSrc = dataset.modelSrc;
  const bgColor = dataset.bgColor === 'transparent' ? null : dataset.bgColor || (window.matchMedia('(prefers-color-scheme: dark)').matches ? '#0d0d0d' : '#f0f0f0');
  const cameraFar = parseFloat(dataset.cameraFar) || 4000;
  const autoRotate = dataset.autoRotate === 'true';
  const minDistance = parseFloat(dataset.minDistance) || 0.5;
  const maxDistance = parseFloat(dataset.maxDistance) || 3000;
  const lightIntensity = parseFloat(dataset.lightIntensity) || 0.8;
  const lightColor = dataset.lightColor || '#ffffff';
  const lightPos = (dataset.lightPos || '0,1,3').split(',').map(Number);
  const modelAngle = (dataset.modelAngle || '0,1,1').split(',').map(Number);

  // 🎬 Scene
  const scene = new THREE.Scene();
  scene.background = bgColor ? new THREE.Color(bgColor) : null;

  // 🎥 Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.01,
    cameraFar
  );
  camera.position.set(0, 1.5, 3);

  // 💡 Lights
  const hemiLight = new THREE.HemisphereLight(
      0xffffff,
      0x444444,
      1
  );
  hemiLight.position.set(0, 1, 0);
  scene.add(hemiLight);

  const frontLight = new THREE.DirectionalLight(lightColor, lightIntensity);
  frontLight.position.set(...lightPos);
  camera.add(frontLight);
  scene.add(camera); // Important: add camera to scene when attaching lights

  // 🧱 Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true // Enable transparency
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // 🌀 Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.autoRotate = autoRotate;
  controls.autoRotateSpeed = 2.0;
  controls.minDistance = minDistance;
  controls.maxDistance = maxDistance;
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI;
  controls.minAzimuthAngle = -Infinity;  // Allow full horizontal rotation
  controls.maxAzimuthAngle = Infinity;  // Allow full horizontal rotation

  // ⏳ Load Model
  const loader = new VRMLLoader();
  loader.load(modelSrc, (object) => {
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    object.position.sub(center);
    scene.add(object);

    const maxDim = Math.max(size.x, size.y, size.z);
    camera.position.set(modelAngle[0], maxDim * modelAngle[1], maxDim * modelAngle[2]);
    controls.target.set(0, 0, 0);
    controls.update();
  }, undefined, (error) => {
    console.error("Failed to load model:", error);
  });

  // 🔁 Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // 📏 Resize Handling
  window.addEventListener('resize', () => {
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  // Fullscreen button logic
  const fullscreenBtn = container.querySelector('.fullscreenBtn');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        container.requestFullscreen().catch(err => console.error("Fullscreen error:", err));
      }
    });
  }
});
