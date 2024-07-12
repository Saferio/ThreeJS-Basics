import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { AnaglyphEffect } from "three/examples/jsm/effects/AnaglyphEffect.js"

// Scene, Camera, Renderer
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Create a PerspectiveCamera
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 5

// Create a StereoCamera
const stereoCamera = new THREE.StereoCamera()
stereoCamera.aspect = 0.5 // Adjust aspect ratio for left and right eye

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.autoRotate = true
controls.update()

// Sphere Geometry
const geometry = new THREE.SphereGeometry(1, 32, 32)
const material = new THREE.MeshBasicMaterial({
  color: 0x0077ff,
  wireframe: true,
})
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

const pointLight = new THREE.PointLight(0xffffff, 70, 200, 1.7)
pointLight.position.set(10, 10, 10) // (x,y,z)
scene.add(pointLight)

// Anaglyph Effect
const effect = new AnaglyphEffect(renderer)
effect.setSize(window.innerWidth, window.innerHeight)

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  controls.update()

  // Update StereoCamera
  stereoCamera.update(camera)

  // Render with Anaglyph Effect
  effect.render(scene, camera)
}

animate()

// Handle Window Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  effect.setSize(window.innerWidth, window.innerHeight)
})
