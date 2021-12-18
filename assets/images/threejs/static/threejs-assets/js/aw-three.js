const canvas = document.querySelector("canvas.threejsholder");

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;
camera.position.x = -2;
// let renderer = new THREE.WebGLRenderer({ antialias: true });
let renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setClearColor(new THREE.Color("#060019"));

renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// mouse
let mouseX = 0;
let mouseY = 0;
let mouseX2 = 0;
let mouseY2 = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  mouseX2 = (e.clientX / innerWidth) * 2 - 1;
  mouseY2 = (e.clientY / innerHeight) * 2 - 1;
});

const earthGeometry = new THREE.SphereGeometry(1, 50, 50);

let earthTexture = new THREE.TextureLoader().load("/assets/images/threejs/eath.jpg");

const earthMaterial = new THREE.MeshLambertMaterial({ map: earthTexture, overdraw: 0.1 });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// let geometry4 = new THREE.SphereGeometry(0.4, 100, 100);
// let texture = new THREE.TextureLoader().load("/images/image.jpg");
// let material4 = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.1 });
// let mesh = new THREE.Mesh(geometry4, material4);
// mesh.position.z = 2;
// mesh.position.x = 1;
// scene.add(mesh);
const vertices = [];

for (let i = 0; i < 10000; i++) {
  const x = THREE.MathUtils.randFloatSpread(1000);
  const y = THREE.MathUtils.randFloatSpread(1000);
  const z = +THREE.MathUtils.randFloatSpread(1000);

  vertices.push(x, y, z);
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

const material = new THREE.PointsMaterial({ color: 0x888888 });

const points = new THREE.Points(geometry, material);

scene.add(points);

const clock = new THREE.Clock();

// light source
const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

let render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};
render();

document.addEventListener("scroll", (event) => {
  // camera.position.x = -window.scrollY / 200 + -2;
  // light.position.set(-window.scrollY / 340 + 0, 2, 4);
  // camera.position.z = window.scrollY / 200 + 3;
  // camera.position.y = -window.scrollY / 1000 + 0;
  camera.rotation.y = window.scrollY / 1000 + 0;
});

/* texture loading */

// const controls = new THREE.DragControls([earth], camera, canvas);
// controls.update();

// add event listener to highlight dragged objects

// controls.addEventListener("dragstart", function (event) {
//   event.object.rotation.x = mouseY * 0.005;
//   event.object.rotation.y = mouseX * 0.005;
//   // event.object.material.emissive.set(0xaaaaaa);
// });

// controls.addEventListener("dragend", function (event) {
//   event.object.rotation.x = mouseY * 0.005;
//   event.object.rotation.y = mouseX * 0.005;
//   // mesh.position.x = 1;
//   // event.object.material.emissive.set(0x000000);
// });

const tick = () => {
  let time = clock.getElapsedTime();
  // cube.rotation.y = 0.15 * time;
  earth.rotation.z = 0.125 * time;
  // earth.rotation.x = mouseY * 0.005;
  // earth.rotation.y = mouseX * 0.005;

  gsap.to(earth.rotation, {
    x: -mouseY2 * 0.5,
    y: mouseX2 * 0.5,
    duration: 2,
  });
  gsap.to(points.rotation, {
    x: -mouseY2 * 0.5,
    y: mouseX2 * 0.5,
    duration: 2,
  });
  // points.rotation.z = time * 0.05;
  // points.rotation.y = 0.005 * mouseX;
  points.position.z = 1 * time;
  // cube3.rotation.z = 0.05 * time;
  // mesh.rotation.y = 0.05 * time;
  // mesh.rotation.x = 0.05 * time;
  // sphere.rotation.y = 0.05 * time;
  // sphere.rotation.z = 0.05 * time;

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();

let raycaster = new THREE.Raycaster();
var intersects = raycaster.intersectObject(scene, true);

if (intersects.length > 0) {
  console.log(object);
  console.log("object");
  var object = intersects[0].object;

  object.material.color.set(Math.random() * 0xffffff);
}
