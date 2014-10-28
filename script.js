var currentDemo;

slideshow.on('afterShowSlide', function(slide) {
  console.log(slide.properties);
  switch (slide.properties.demo) {
    case 'rotate-cube':
      currentDemo = rotateCube();
      break;
    case 'show-sphere':
      currentDemo = showSphere();
      break;
    case 'show-sphere-mesh':
      currentDemo = showSphereMesh();
      break;
  }
});

slideshow.on('hideSlide', function(slide) {
  if (currentDemo) currentDemo.stop();
});

function rotateCube() {
  var renderer = new THREE.WebGLRenderer({ antialias : true });
  var container = document.querySelector('#rotate-cube');
  console.log(container.offsetWidth);
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  var camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 1, 1000);
  camera.position.z = 300;

  var scene = new THREE.Scene();

  var geometry = new THREE.CubeGeometry(200, 200, 200);
  var material = new THREE.MeshLambertMaterial({
      color: 0xff0000
  });

  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  var light = new THREE.PointLight(0xffffff);
  light.position = new THREE.Vector3(0,100,400);
  scene.add(light);

  var pause = false;

  function animate() {
    !pause && requestAnimationFrame(animate);

    mesh.rotation.x += .005;
    mesh.rotation.y += .005;

    renderer.render(scene, camera);
  }
  animate();
  return {
    stop: function() {
      pause = true;
      container.innerHTML = "";
    }
  };
}

function showSphere() {
  var camera, scene, renderer;
  var geometry, material, cube;

  renderer = new THREE.WebGLRenderer({alpha: true});
  var container = document.querySelector('#show-sphere');
  console.log(container.offsetWidth);
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 1, 1000);
  camera.position.z = 250;

  scene = new THREE.Scene();

  // Set up geometries, materials and meshes here
  var geo = new THREE.SphereGeometry(100, 10, 10);
  var mat = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe:true, wireframeLinewidth:2});
  cube = new THREE.Mesh(geo, mat);
  scene.add(cube);

  var light = new THREE.PointLight(0xffffff);
  light.position.set(0, 100, 400);
  scene.add(light);

  var pause = false;

  function animate() {
    !pause && requestAnimationFrame(animate);

    var t = Date.now() / 1000; // Seconds elapsed since 1st of January 1970

    // TODO: Add animation

    cube.rotation.y = t/2;
    cube.rotation.z = t/10;

    renderer.render(scene, camera);
  }

  animate();
  return {
    stop: function() {
      pause = true;
      container.innerHTML = "";
    }
  };
}
function showSphereMesh() {
  var camera, scene, renderer;
  var geometry, material, cube;

  renderer = new THREE.WebGLRenderer({alpha: true});
  var container = document.querySelector('#show-sphere-mesh');
  console.log(container.offsetWidth);
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 1, 1000);
  camera.position.z = 250;

  scene = new THREE.Scene();

  // Set up geometries, materials and meshes here
  var geo = new THREE.SphereGeometry(100, 20, 20);
  var mat = new THREE.MeshLambertMaterial({color: 0xff0000});
  cube = new THREE.Mesh(geo, mat);
  scene.add(cube);

  var light = new THREE.PointLight(0xffffff);
  light.position.set(0, 100, 400);
  scene.add(light);

  var pause = false;

  function animate() {
    !pause && requestAnimationFrame(animate);

    var t = Date.now() / 1000; // Seconds elapsed since 1st of January 1970

    // TODO: Add animation

    cube.rotation.y = t/10;
    cube.rotation.z = t/25;

    renderer.render(scene, camera);
  }

  animate();
  return {
    stop: function() {
      pause = true;
      container.innerHTML = "";
    }
  };
}
