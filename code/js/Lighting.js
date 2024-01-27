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
  


function lumiere(scene) {
    let lumPt1 = new THREE.PointLight(0xffffff);
    lumPt1.castShadow = true;
    lumPt1.position.set(5, 5, 15);
    lumPt1.intensity = 1;
    scene.add(lumPt1);
  
}