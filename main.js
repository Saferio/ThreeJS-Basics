import * as THREE from "three"
import "./style.css"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

const scene = new THREE.Scene()

const geometry = new THREE.SphereGeometry(3, 64, 64)

// Create a standard material with specific properties
const material = new THREE.MeshStandardMaterial({
  color: "#fc8e3a", // Set the color of the material
  roughness: 0.3, // Set the roughness of the material (0 is smooth, 1 is rough)
})

// Create a mesh with the specified geometry and material
const mesh = new THREE.Mesh(geometry, material)

// Add the mesh to the scene
scene.add(mesh)

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Camera new THREE.PerspectiveCamera(view port,aspect ratio, aspect ratio)
const camera = new THREE.PerspectiveCamera(
  50, // angle
  sizes.width / sizes.height, // aspect ratio
  1, // How close the camera can go to the object
  1000 // How far the camera can go to the object
)

camera.position.z = 300 // Camera closer to object
scene.add(camera)

const canvas = document.getElementById("basicCanvas")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

const pointLight = new THREE.PointLight(0xffffff, 70, 200, 1.7)
pointLight.position.set(10, 10, 10) // (x,y,z)
scene.add(pointLight)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix() // Whenever we change the camera properties we update camera using updateProjectionMatrix
  renderer.setSize(sizes.width, sizes.height)
  renderer.render(scene, camera)
})

// Create an instance of OrbitControls, allowing the camera to orbit around the scene
// Pass the camera and canvas elements to the controls
let controls = new OrbitControls(camera, canvas)

// Enable damping (inertia) for smooth motion
controls.enableDamping = true

// Allow panning (translating the camera parallel to the screen)
controls.enablePan = true

// Allow zooming in and out with the mouse wheel or pinch gesture
controls.enableZoom = true

// Enable automatic rotation of the camera around the target
controls.autoRotate = true

// How big the scene should get displayed

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop) // requestAnimationFrame method is a built-in JavaScript function provided by the browser that tells the browser to call the specified function before the next repaint.
}

loop()

const loader = new GLTFLoader().setPath("public/earth/")
loader.load(
  "scene.gltf",
  (gltf) => {
    const model = gltf.scene
    scene.add(model)
  },
  (xhr) => {
    console.log(`loading ${(xhr.loaded / xhr.total) * 100}%`)
  },
  (error) => {
    console.error(error)
  }
)

const earthLight = new THREE.PointLight(0xffffff, 500, 10000, 0.7)
earthLight.position.set(350, 10, 1000) // (x,y,z)
scene.add(earthLight)

// const ambientLight = new THREE.AmbientLight(0xffffff)
// scene.add(ambientLight)
