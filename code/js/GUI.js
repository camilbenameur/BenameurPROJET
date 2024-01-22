const borneVue = 10; // Amplitude de déplacement de la camera

function init() {
    var stats = initStats();

    // Creation de rendu et de la taille
    let rendu = new THREE.WebGLRenderer({ antialias: true });
    rendu.shadowMap.enabled = true;
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
    rendu.setClearColor(new THREE.Color(0xFFFFFF));
    rendu.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9);

    function createTableTennisSetup(scene) {
      // Table dimensions and colors
      const tableLength = 2.74;  // meters
      const tableWidth = 1.525;  // meters
      const tableHeight = 0.1525;  // meters
      const netHeight = 0.1525;  // meters
      const legThickness = 0.05; // meters, thickness of the table legs
      const tableColor = 0x008000; // green
      const netColor = 0xFFFFFF; // white
      const legColor = 0x000000; // black
  
      // Create table top
      const tableGeometry = new THREE.BoxGeometry(tableLength, tableWidth, 0.05); // Slight thickness to the table
      const tableMaterial = new THREE.MeshLambertMaterial({ color: tableColor });
      const tableTop = new THREE.Mesh(tableGeometry, tableMaterial);
      tableTop.position.set(0, 0, tableHeight / 2); // Positioning the table top at the correct height
      scene.add(tableTop);
  
      // Create net
      const netGeometry = new THREE.BoxGeometry(0.01, tableWidth, netHeight); // Thin and tall box for net
      const netMaterial = new THREE.MeshLambertMaterial({ color: netColor });
      const net = new THREE.Mesh(netGeometry, netMaterial);
      net.position.set(0, 0, tableHeight + netHeight / 2);
      scene.add(net);
  
      // Create table legs
      const legGeometry = new THREE.BoxGeometry(legThickness, legThickness, tableHeight); // Box geometry for legs
      const legMaterial = new THREE.MeshLambertMaterial({ color: legColor });
      // Position the legs at each corner
      const legPositions = [
          { x: tableLength / 2 - legThickness / 2, y: tableWidth / 2 - legThickness / 2 },
          { x: tableLength / 2 - legThickness / 2, y: -(tableWidth / 2 - legThickness / 2) },
          { x: -(tableLength / 2 - legThickness / 2), y: tableWidth / 2 - legThickness / 2 },
          { x: -(tableLength / 2 - legThickness / 2), y: -(tableWidth / 2 - legThickness / 2) }
      ];
      legPositions.forEach(pos => {
          let leg = new THREE.Mesh(legGeometry, legMaterial);
          leg.position.set(pos.x, pos.y, tableHeight / 2);
          scene.add(leg);
      });
  }
  
    
    cameraLumiere(scene, camera);
    lumiere(scene);
    createTableTennisSetup(scene);

    // Initialize OrbitControls
    const controls = setupOrbitControls(camera, rendu);    


    // Debut Menu GUI
    var gui = new dat.GUI();
    let menuGUI = new function() {
        this.cameraxPos = camera.position.x;
        this.camerayPos = camera.position.y;
        this.camerazPos = camera.position.z;
        this.cameraZoom = 1;
        this.cameraxDir = 0;
        this.camerayDir = 0;
        this.camerazDir = 0;

        this.actualisation = function() {
            posCamera();
            reAffichage();
        };
    };
    ajoutCameraGui(gui, menuGUI, camera);
    gui.add(menuGUI, "actualisation");
    menuGUI.actualisation();

    // Ajout du rendu dans l'element HTML
    document.getElementById("webgl").appendChild(rendu.domElement);
    rendu.render(scene, camera);

    function posCamera() {
        camera.position.set(menuGUI.cameraxPos * testZero(menuGUI.cameraZoom), menuGUI.camerayPos * testZero(menuGUI.cameraZoom), menuGUI.camerazPos * testZero(menuGUI.cameraZoom));
        camera.lookAt(menuGUI.cameraxDir, menuGUI.camerayDir, menuGUI.camerazDir);
        actuaPosCameraHTML();
    }

    function actuaPosCameraHTML() {
        document.forms["controle"].PosX.value = testZero(menuGUI.cameraxPos);
        document.forms["controle"].PosY.value = testZero(menuGUI.camerayPos);
        document.forms["controle"].PosZ.value = testZero(menuGUI.camerazPos);
        document.forms["controle"].DirX.value = testZero(menuGUI.cameraxDir);
        document.forms["controle"].DirY.value = testZero(menuGUI.camerayDir);
        document.forms["controle"].DirZ.value = testZero(menuGUI.camerazDir);
    }

    function reAffichage() {
        setTimeout(function() {
            posCamera();
        }, 200);
        rendu.render(scene, camera);
    }

    function renduAnim() {
      stats.update();
      controls.update(); // Update the controls every frame
      requestAnimationFrame(renduAnim);
      rendu.render(scene, camera);
  }

  renduAnim();
}
