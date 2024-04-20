import * as THREE from 'three'; 

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a water surface
const waterGeometry = new THREE.PlaneGeometry(10, 10, 100, 100);
const waterMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
const waterMesh = new THREE.Mesh(waterGeometry, waterMaterial);
waterMesh.rotation.x = -Math.PI / 2;
scene.add(waterMesh);

// Position the camera
camera.position.set(0, 5, 0);
camera.lookAt(waterMesh.position);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update water surface vertices based on physics simulation
  const vertices = waterGeometry.attributes.position.array;
  for (let i = 0; i < vertices.length; i += 3) {
    // Apply wave equations or physics-based calculations here
    // Example: Simple sine wave animation
    const time = Date.now() * 0.001;
    const waveHeight = Math.sin(vertices[i] + time) * 0.1;
    vertices[i + 1] = waveHeight;
  }
  waterGeometry.attributes.position.needsUpdate = true;

  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();