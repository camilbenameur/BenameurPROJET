function setupOrbitControls(camera, renderer) {
    const controls =  new THREE.OrbitControls(camera, renderer.domElement);

    controls.target.set(0, 0, 0);
    controls.minDistance = 1; 
    controls.maxDistance = 10; 

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.enableZoom = true;

    return controls;
}
