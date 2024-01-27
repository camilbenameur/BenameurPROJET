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

    function createWhiteLine(scene, position, dimensions, rotation) {
        const lineMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF }); // White
        const lineGeometry = new THREE.BoxGeometry(dimensions.x, dimensions.y, dimensions.z);
    
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.set(position.x, position.y, position.z);
        line.rotation.z = rotation;
    
        scene.add(line);
    }
    
    
    
    function createTableQuarter(scene, position, color) {
        const quarterTableLength = 2.74 / 2; // Half the length for a quarter
        const quarterTableWidth = 1.525 / 2; // Half the width for a quarter
        const tableThickness = 0.05;
        
        const material = new THREE.MeshLambertMaterial({ color: color });
        const tableGeometry = new THREE.BoxGeometry(quarterTableLength, quarterTableWidth, tableThickness);
        const tableTop = new THREE.Mesh(tableGeometry, material);
        
        tableTop.position.set(position.x, position.y, position.z + tableThickness / 2);
        
        scene.add(tableTop);
    }
    
    function createTableTop(scene) {
        const tableLength = 2.74; // meters
        const tableWidth = 1.525; // meters
        const tableThickness = 0.05; // meters
        const tableHeight = 0.76; // meters, height from ground to top of table
        const lineHeight = tableHeight + tableThickness;
        const lineThickness = 0.015; // Adjust thickness as needed
        
        const positions = [
            { x: -tableLength / 4, y: tableWidth / 4, z: tableHeight },
            { x: tableLength / 4, y: tableWidth / 4, z: tableHeight },
            { x: -tableLength / 4, y: -tableWidth / 4, z: tableHeight },
            { x: tableLength / 4, y: -tableWidth / 4, z: tableHeight }
        ];
    
        const colors = [0xF2F28F, 0xB68381, 0x8EBD86, 0x8080BA];
    
        for (let i = 0; i < positions.length; i++) {
            createTableQuarter(scene, positions[i], colors[i]);
        }
            

    // Lines on the player sides borders of the table
    createWhiteLine(scene, { x: -tableLength / 2, y: 0, z: lineHeight }, { x: 0.01, y: tableWidth, z: lineThickness }, 0);
    createWhiteLine(scene, { x: tableLength / 2, y: 0, z: lineHeight }, { x: 0.01, y: tableWidth, z: lineThickness }, 0);

    // Outer white lines for the table borders
    createWhiteLine(scene, { x: 0, y: tableWidth / 2, z: lineHeight }, { x: tableLength + 0.01, y: lineThickness, z: lineThickness }, 0);
    createWhiteLine(scene, { x: 0, y: -tableWidth / 2, z: lineHeight }, { x: tableLength + 0.01, y: lineThickness, z: lineThickness }, 0);

    // Vertical line on the middle of the table
    createWhiteLine(scene, { x: 0, y: 0, z: lineHeight }, { x: lineThickness, y: tableLength, z: lineThickness }, Math.PI / 2);

    // Line in the middle of the table
    createWhiteLine(scene, { x: 0, y: 0, z: lineHeight }, { x: lineThickness, y: tableWidth, z: lineThickness }, 0);

    }
        
    
    function createNet(scene) {
        const tableWidth = 1.525; // meters, the full width of the table
        const netHeight = 0.1525; // meters, height of the net
        const tableHeight = 0.76; // meters, height from ground to top of table
        
        const numVerticalLines = 60; // Number of vertical lines in the net grid
        const numHorizontalLines = 30; // Number of horizontal lines in the net grid
        const verticalSpacing = tableWidth / (numVerticalLines - 1);
        const horizontalSpacing = netHeight / (numHorizontalLines - 1);
    
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
        
        // Create vertical lines (along the length of the table)
        for (let i = 0; i < numVerticalLines; i++) {
            const verticalLineGeometry = new THREE.Geometry();
            verticalLineGeometry.vertices.push(
                new THREE.Vector3(0, -tableWidth / 2 + i * verticalSpacing, tableHeight),
                new THREE.Vector3(0, -tableWidth / 2 + i * verticalSpacing, tableHeight + netHeight)
            );
            const verticalLine = new THREE.Line(verticalLineGeometry, lineMaterial);
            scene.add(verticalLine);
        }
        
        // Create horizontal lines (across the width of the table)
        for (let i = 0; i < numHorizontalLines; i++) {
            const horizontalLineGeometry = new THREE.Geometry();
            horizontalLineGeometry.vertices.push(
                new THREE.Vector3(0, -tableWidth / 2, tableHeight + i * horizontalSpacing),
                new THREE.Vector3(0, tableWidth / 2, tableHeight + i * horizontalSpacing)
            );
            const horizontalLine = new THREE.Line(horizontalLineGeometry, lineMaterial);
            scene.add(horizontalLine);
        }
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
