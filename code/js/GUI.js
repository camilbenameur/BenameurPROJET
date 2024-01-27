function actuaPosCameraHTML(xPos, yPos, zPos, xDir, yDir, zDir) {
  document.forms["controle"].PosX.value = xPos;
  document.forms["controle"].PosY.value = yPos;
  document.forms["controle"].PosZ.value = zPos;
  document.forms["controle"].DirX.value = xDir;
  document.forms["controle"].DirY.value = yDir;
  document.forms["controle"].DirZ.value = zDir;
} 


// Global variables
const tableLegs = [];
const legSegments = 24; // Number of segments for smoothness of the lathe

// Shared points array for all legs
const points = [
    new THREE.Vector2(0.05, 0),
    new THREE.Vector2(0.05, 0.228),
    new THREE.Vector2(0.035, 0.456),
    new THREE.Vector2(0.02, 0.684),
    new THREE.Vector2(0.02, 0.76)
];

function updateAllLegGeometries(points, legSegments) {
  const newGeometry = new THREE.LatheGeometry(points, legSegments);
  tableLegs.forEach(leg => {
      leg.geometry.dispose(); // Dispose of the old geometry
      leg.geometry = newGeometry.clone(); // Assign a clone of the new geometry to each leg
      leg.geometry.verticesNeedUpdate = true;
  });
}

function addControlPointsToGUI(gui) {

  const folder = gui.addFolder('Table Leg Control Points');

  points.forEach((point, index) => {
      folder.add(point, 'x', 0, 0.1, 0.001).name(`Radius ${index}`).onChange(() => {
          updateAllLegGeometries(points, legSegments);
      });
      folder.add(point, 'y', 0, 1, 0.001).name(`Height ${index}`).onChange(() => {
          updateAllLegGeometries(points, legSegments);
      });
  });

  folder.open();
}

function ajoutCameraGUI(gui, menuGUI, camera) {
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
}


