const borneVue = 10;

function init() {
    var stats = initStats();

    let rendu = new THREE.WebGLRenderer({ antialias: true });
    rendu.shadowMap.enabled = true;
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
    rendu.setClearColor(new THREE.Color(0xFFFFF0));
    rendu.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9);

    const tableLength = 2.74; // meters
    const tableWidth = 1.525; // meters
    const tableHeight = 0.76; // meters, height from ground to top of table

    function createTableTennisSetup(scene) {
        createNet(scene);
        createTableLegs(scene);
        createTableTop(scene);


        const tableWidth = 1.525; // meters
        const tableLength = 2.74; // meters
        const tableHeight = 0.76; // meters

        // Create rackets on the middle of their respective sides and exactly at the edge of the table
        createTableTennisRacket(scene, new THREE.Vector3(-tableLength / 2, 0, tableHeight + 0.25), new THREE.Euler(0, Math.PI / 2, 0));
        createTableTennisRacket(scene, new THREE.Vector3(tableLength / 2, 0, tableHeight + 0.25), new THREE.Euler(0, -Math.PI / 2, 0));
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

        // Add a thick black line at the top of the net
        const topLineThickness = 0.02; // meters, thickness of the top line
        const topLineLength = tableWidth; // The length of the line is equal to the table width
        const topLineGeometry = new THREE.BoxGeometry(topLineLength, topLineThickness, topLineThickness);
        const topLineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const topLineMesh = new THREE.Mesh(topLineGeometry, topLineMaterial);

        // Rotate the line π/2 around the z-axis
        topLineMesh.rotation.z = Math.PI / 2;

        // Set the position of the line
        topLineMesh.position.set(0, 0, tableHeight + netHeight + topLineThickness / 2);

        // Add the line to the scene
        scene.add(topLineMesh);


        // Add support holders on each side of the net
        const holderHeight = 0.2; // meters, height of the holder, slightly taller than the net
        const holderThickness = 0.05; // meters, thickness of the holders
        const holderGeometry = new THREE.BoxGeometry(holderThickness, holderThickness, holderHeight);
        const holderMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

        // Left holder
        const leftHolderMesh = new THREE.Mesh(holderGeometry, holderMaterial);
        leftHolderMesh.position.set(0, -tableWidth / 2 - holderThickness / 2, tableHeight + holderHeight / 2);
        scene.add(leftHolderMesh);

        // Right holder
        const rightHolderMesh = new THREE.Mesh(holderGeometry, holderMaterial);
        rightHolderMesh.position.set(0, tableWidth / 2 + holderThickness / 2, tableHeight + holderHeight / 2);
        scene.add(rightHolderMesh);
    }

    function createTableTennisRacket(scene, position, rotation) {
        // Dimensions for the blade and handle
        const bladeRadius = 0.075; // meters, roughly the half-width of the blade
        const bladeThickness = 0.005; // meters, thickness of the blade
        const handleLength = 0.1; // meters, length of the handle
        const handleWidth = 0.02; // meters, width of the handle
        const handleDepth = 0.01; // meters, depth of the handle

        // Materials
        const rubberMaterialRed = new THREE.MeshBasicMaterial({ color: 0xFF0000 }); // Red rubber
        const rubberMaterialBlack = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Black rubber
        const woodMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Wood for the handle

        // Blade geometry (a flat cylinder)
        const bladeGeometry = new THREE.CylinderGeometry(bladeRadius, bladeRadius, bladeThickness, 32);
        bladeGeometry.rotateX(Math.PI / 2); // Rotate the geometry to be perpendicular to the handle

        // Handle geometry (a box)
        const handleGeometry = new THREE.BoxGeometry(handleWidth, handleDepth, handleLength);
        handleGeometry.translate(0, -handleLength / 2 - bladeThickness / 2, 0); // Translate the geometry so the handle aligns with the blade

        // Create the meshes
        const bladeMeshRed = new THREE.Mesh(bladeGeometry, rubberMaterialRed);
        const bladeMeshBlack = new THREE.Mesh(bladeGeometry, rubberMaterialBlack);
        const handleMesh = new THREE.Mesh(handleGeometry, woodMaterial);

        // Position and rotate the meshes
        bladeMeshRed.position.copy(position);
        bladeMeshBlack.position.copy(position);
        handleMesh.position.copy(position);

        bladeMeshRed.rotation.copy(rotation);
        bladeMeshBlack.rotation.copy(rotation);
        handleMesh.rotation.copy(rotation);

        // The black side of the blade should face down, rotate it by PI
        bladeMeshBlack.rotation.z += Math.PI;

        // Add the meshes to the scene
        scene.add(bladeMeshRed);
        scene.add(bladeMeshBlack);
        scene.add(handleMesh);
    }
    


    function createTableLegs(scene) {
        const tableHeight = 0.76; // Height from ground to top of table
        const legHeight = tableHeight;
        const legBottomRadius = 0.05; // Radius at the bottom of the leg
        const legMiddleRadius = 0.035; // Intermediate radius for the middle section
        const legTopRadius = 0.02; // Radius at the top of the leg, smaller for a tapered effect
        const legSegments = 24; // Increased for smoothness of the lathe
        const tableLength = 2.74; // meters
        const tableWidth = 1.525; // meters
        
        // Define the profile of the leg with at least three surfaces of revolution
        const points = [
            new THREE.Vector2(legBottomRadius, 0),
            new THREE.Vector2(legBottomRadius, legHeight * 0.3), // End of first surface
            new THREE.Vector2(legMiddleRadius, legHeight * 0.5), // Middle surface starts
            new THREE.Vector2(legTopRadius, legHeight * 0.7), // Middle surface ends
            new THREE.Vector2(legTopRadius, legHeight) // Top surface ends
        ];
        
        // Create lathe geometry for the leg
        const legGeometry = new THREE.LatheGeometry(points, legSegments);
        const legMaterial = new THREE.MeshPhongMaterial({ color: 0xCCCCCC });
        
        // Positions for the legs relative to the corners of the table
        const offsets = [
            { x: -tableLength / 2 + legBottomRadius, y: -tableWidth / 2 + legBottomRadius },
            { x: tableLength / 2 - legBottomRadius, y: -tableWidth / 2 + legBottomRadius },
            { x: -tableLength / 2 + legBottomRadius, y: tableWidth / 2 - legBottomRadius },
            { x: tableLength / 2 - legBottomRadius, y: tableWidth / 2 - legBottomRadius }
        ];
        
        // Adding each leg to the scene and storing it in the global array
        offsets.forEach(offset => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(offset.x, offset.y, tableHeight);
            leg.rotation.x = - Math.PI / 2;
            scene.add(leg);
            tableLegs.push(leg); // Store the leg for later reference
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
    ajoutCameraGUI(gui, menuGUI, camera);
    gui.add(menuGUI, "actualisation");
    addControlPointsToGUI(gui);
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
