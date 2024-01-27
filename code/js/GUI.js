const borneVue = 10;

function init() {
    var stats = initStats();

    let rendu = new THREE.WebGLRenderer({ antialias: true });
    rendu.shadowMap.enabled = true;
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
    rendu.setClearColor(new THREE.Color(0xFFFFFF));
    rendu.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9);

    function createTableTennisSetup(scene) {
        createNet(scene);
        createTableLegs(scene);
        createTableTop(scene);
    }

    function createTableQuarter(scene, position, color) {
        const quarterTableLength = 2.74 / 2; // Half the length for a quarter
        const quarterTableWidth = 1.525 / 2; // Half the width for a quarter
        const tableThickness = 0.05;
        const tableHeight = 0.76;
        
        const material = new THREE.MeshLambertMaterial({ color: color });
        const tableGeometry = new THREE.BoxGeometry(quarterTableLength, quarterTableWidth, tableThickness);
        const tableTop = new THREE.Mesh(tableGeometry, material);
        
        tableTop.position.set(position.x, position.y, position.z + tableHeight + tableThickness / 2);
        
        scene.add(tableTop);
    }
    
    function createTableTop(scene) {
        // Position for each quarter of the table
        const positions = [
            { x: -2.74 / 4, y: 1.525 / 4, z: 0 }, // Yellow
            { x: 2.74 / 4, y: 1.525 / 4, z: 0 },  // Red
            { x: -2.74 / 4, y: -1.525 / 4, z: 0 }, // Green
            { x: 2.74 / 4, y: -1.525 / 4, z: 0 }   // Blue
        ];
    
        // Colors for each quarter of the table
        const colors = [0xF2F28F, 0xB68381, 0x8EBD86, 0x8080BA]; // Yellow, Red, Green, Blue
    
        // Create each quarter
        for (let i = 0; i < positions.length; i++) {
            createTableQuarter(scene, positions[i], colors[i]);
        }
    }
    
    function createNet(scene) {
        const tableWidth = 1.525; // meters, the full width of the table
        const netHeight = 0.1525; // meters, height of the net
        const tableHeight = 0.76; // meters, height from ground to top of table
        const netThickness = 0.01; // meters, thickness of the net
        
        // Geometry for the net as a grid
        const netGeometry = new THREE.BoxGeometry(netThickness, tableWidth, netHeight);
        const edges = new THREE.EdgesGeometry(netGeometry);
        
        // White material for the net to contrast against the table
        const netMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
        
        // Creating a grid-like net
        const netMesh = new THREE.LineSegments(edges, netMaterial);
        
        // Positioning the net on the table
        netMesh.position.set(0, 0, tableHeight + netHeight / 2);
        
        scene.add(netMesh);
    }
    
    
    function createNet(scene) {
        const tableWidth = 1.525; // meters, the full width of the table
        const netHeight = 0.1525; // meters, height of the net
        const tableHeight = 0.76; // meters, height from ground to top of table
        const netThickness = 0.01; // meters, thickness of the net
    
        // Geometry for the net as a grid
        const netGeometry = new THREE.BoxGeometry(netThickness, tableWidth, netHeight);
        const edges = new THREE.EdgesGeometry(netGeometry);
    
        // Dark grey material for better visibility against white background
        const netMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
    
        // Creating a grid-like net
        const netMesh = new THREE.LineSegments(edges, netMaterial);
    
        // Positioning the net on the table
        netMesh.position.set(0, 0, tableHeight + netHeight / 2);
    
        scene.add(netMesh);
    }
    
    
    
    function createTableLegs(scene) {
        const tableLength = 2.74;
        const tableWidth = 1.525;
        const tableHeight = 0.76;
        const legThickness = 0.05;
        const legColor = 0x000000;
    
        const legGeometry = new THREE.BoxGeometry(legThickness, legThickness, tableHeight);
        const legMaterial = new THREE.MeshLambertMaterial({ color: legColor });
    
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

    const controls = setupOrbitControls(camera, rendu);    

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
      controls.update();
      requestAnimationFrame(renduAnim);
      rendu.render(scene, camera);
  }

  renduAnim();
}
