function cameraLumiere(scene, camera) {
  camera.up = new THREE.Vector3(0, 0, 1);
  var xPos = -6.35;
  var yPos = -1.25;
  var zPos = 4.45;
  var xDir = 0;
  var yDir = 0;
  var zDir = 0;
  camera.position.set(xPos, yPos, zPos);
  camera.lookAt(xDir, yDir, zDir);
  actuaPosCameraHTML(xPos, yPos, zPos, xDir, yDir, zDir);
}

function actuaPosCameraHTML(xPos, yPos, zPos, xDir, yDir, zDir) {
  document.forms["controle"].PosX.value = xPos;
  document.forms["controle"].PosY.value = yPos;
  document.forms["controle"].PosZ.value = zPos;
  document.forms["controle"].DirX.value = xDir;
  document.forms["controle"].DirY.value = yDir;
  document.forms["controle"].DirZ.value = zDir;
} 

function ajoutCameraGui(gui, menuGUI, camera) {
  let guiCamera = gui.addFolder("Camera");

  guiCamera.add(menuGUI, "cameraxPos", -borneVue, borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos * testZero(menuGUI.cameraZoom), menuGUI.camerayPos * testZero(menuGUI.cameraZoom), menuGUI.camerazPos * testZero(menuGUI.cameraZoom));
    actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos, menuGUI.cameraxDir, menuGUI.camerayDir, menuGUI.camerazDir);
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
  });

  guiCamera.add(menuGUI, "camerayPos", -borneVue, borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos * testZero(menuGUI.cameraZoom), menuGUI.camerayPos * testZero(menuGUI.cameraZoom), menuGUI.camerazPos * testZero(menuGUI.cameraZoom));
    actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos, menuGUI.cameraxDir, menuGUI.camerayDir, menuGUI.camerazDir);
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
  });

  guiCamera.add(menuGUI, "camerazPos", -borneVue, borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos * testZero(menuGUI.cameraZoom), menuGUI.camerayPos * testZero(menuGUI.cameraZoom), menuGUI.camerazPos * testZero(menuGUI.cameraZoom));
    actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos, menuGUI.cameraxDir, menuGUI.camerayDir, menuGUI.camerazDir);
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
  });

  guiCamera.add(menuGUI, "cameraZoom", 0.1, 10).onChange(function () {
    camera.position.set(menuGUI.cameraxPos * testZero(menuGUI.cameraZoom), menuGUI.camerayPos * testZero(menuGUI.cameraZoom), menuGUI.camerazPos * testZero(menuGUI.cameraZoom));
    actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos, menuGUI.cameraxDir, menuGUI.camerayDir, menuGUI.camerazDir);
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
  });

  guiCamera.add(menuGUI, "cameraxDir", -borneVue, borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos * testZero(menuGUI.cameraZoom), menuGUI.camerayPos * testZero(menuGUI.cameraZoom), menuGUI.camerazPos * testZero(menuGUI.cameraZoom));
    actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos, menuGUI.cameraxDir, menuGUI.camerayDir, menuGUI.camerazDir);
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
  });

  guiCamera.add(menuGUI, "camerayDir", -borneVue, borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos * testZero(menuGUI.cameraZoom), menuGUI.camerayPos * testZero(menuGUI.cameraZoom), menuGUI.camerazPos * testZero(menuGUI.cameraZoom));
    actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos, menuGUI.cameraxDir, menuGUI.camerayDir, menuGUI.camerazDir);
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
  });

  guiCamera.add(menuGUI, "camerazDir", -borneVue, borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos * testZero(menuGUI.cameraZoom), menuGUI.camerayPos * testZero(menuGUI.cameraZoom), menuGUI.camerazPos * testZero(menuGUI.cameraZoom));
    actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos, menuGUI.cameraxDir, menuGUI.camerayDir, menuGUI.camerazDir);
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
  });

  // Define other camera-specific features as needed


}

function lumiere(scene) {
  let lumPt1 = new THREE.PointLight(0xffffff);
  lumPt1.castShadow = true;
  lumPt1.position.set(5, 5, 15);
  lumPt1.intensity = 1;
  scene.add(lumPt1);

  // Define other lighting as needed, excluding vector-specific features
}
