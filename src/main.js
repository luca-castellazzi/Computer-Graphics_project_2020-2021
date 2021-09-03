function main() {
    // Setup initial GUI elements
    startingGameLabel.style.display = 'block';
    adjustGUI();

    // Dynamically adjust GUI
    window.addEventListener("resize", adjustGUI);

    // Set up the canvas and the background
    aspectRatio = canvas.width * 1.0 / canvas.height;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    // Get attributes' locations
    getShadersAttributeLocations();

    // Get uniforms' location
    getShadersUniformLocations();

    // Set buffers
    setBuffers();

    // Textures
    setupXWingTexture();
    setupSurfaceTexture();
    setupCubeMap();

    drawScene();
}

function adjustGUI() {
    canvas.width = 0.75 * window.innerWidth;
    canvas.height = window.innerHeight;
    
    toolsGUI.style.width = `${0.25 * window.innerWidth}px`;
    toolsGUI.style.height = `${canvas.height}px`;
    toolsGUI.style.left = `${canvas.width}px`;

    scoreLabel.style.width = `${0.15 * canvas.width}px`;
    scoreLabel.style.height = `${0.1 * canvas.height}px`;

    startingGameLabel.style.width = `${canvas.width}px`;
    startingGameLabel.style.height = `${canvas.height}px`;
    
    restartingGameLabel.style.width = `${canvas.width}px`;
    restartingGameLabel.style.height = `${canvas.height}px`;
}

function getShadersAttributeLocations() {
    // RING
    posLocations[0] = gl.getAttribLocation(programs[0], 'ringPos');
    normLocations[0] = gl.getAttribLocation(programs[0], 'ringNorm');
    // XWING
    posLocations[1] = gl.getAttribLocation(programs[1], 'xwingPos');
    uvLocations[0] = gl.getAttribLocation(programs[1], 'xwingUV');
    normLocations[1] = gl.getAttribLocation(programs[1], 'xwingNorm');
    //SURFACE
    posLocations[2] = gl.getAttribLocation(programs[2], 'surfacePos');
    uvLocations[1] = gl.getAttribLocation(programs[2], 'surfaceUV');
    normLocations[2] = gl.getAttribLocation(programs[2], 'surfaceNorm');
    // CUBEMAP
    posLocations[3] = gl.getAttribLocation(programs[3], 'cubeMapPos');
}

function getShadersUniformLocations() {
    // RING
    projLocations[0] = gl.getUniformLocation(programs[0], 'ringProjMatrix');
    lightDirLocations[0] = gl.getUniformLocation(programs[0], 'lightDirection');
    lightColorLocations[0] = gl.getUniformLocation(programs[0], 'lightColor');
    ambientLightColorLocations[0] = gl.getUniformLocation(programs[0], 'ambientColor');
    lightPositionLocations[0] = gl.getUniformLocation(programs[0], 'lightPosition');
    normalMatrixLocations[0] = gl.getUniformLocation(programs[0], 'ringNormMatrix');
    viewWorldMatrixLocations[0] = gl.getUniformLocation(programs[0], 'ringWorldMatrix');
    specShineLocations[0] = gl.getUniformLocation(programs[0], 'specShine');
    reflectionFlagLocations[0] = gl.getUniformLocation(programs[0], 'usePhong');
    betaDecayLocations[0] = gl.getUniformLocation(programs[0], 'betaDecay');
    targetDistanceLocations[0] = gl.getUniformLocation(programs[0], 'target');
    lightTypeLocations[0] = gl.getUniformLocation(programs[0], 'lightType');
    coneInLocations[0] = gl.getUniformLocation(programs[0], 'coneIn');
    coneOutLocations[0] = gl.getUniformLocation(programs[0], 'coneOut');
    // XWING
    projLocations[1] = gl.getUniformLocation(programs[1], 'xwingProjMatrix');
    texLocations[0] = gl.getUniformLocation(programs[1], 'xwingTex');
    lightDirLocations[1] = gl.getUniformLocation(programs[1], 'lightDirection');
    lightColorLocations[1] = gl.getUniformLocation(programs[1], 'lightColor');
    ambientLightColorLocations[1] = gl.getUniformLocation(programs[1], 'ambientColor');
    lightPositionLocations[1] = gl.getUniformLocation(programs[1], 'lightPosition');
    normalMatrixLocations[1] = gl.getUniformLocation(programs[1], 'xwingNormMatrix');
    viewWorldMatrixLocations[1] = gl.getUniformLocation(programs[1], 'xwingWorldMatrix');
    specShineLocations[1] = gl.getUniformLocation(programs[1], 'specShine');
    reflectionFlagLocations[1] = gl.getUniformLocation(programs[1], 'usePhong');
    betaDecayLocations[1] = gl.getUniformLocation(programs[1], 'betaDecay');
    targetDistanceLocations[1] = gl.getUniformLocation(programs[1], 'target');
    lightTypeLocations[1] = gl.getUniformLocation(programs[1], 'lightType');
    coneInLocations[1] = gl.getUniformLocation(programs[1], 'coneIn');
    coneOutLocations[1] = gl.getUniformLocation(programs[1], 'coneOut');
    // SURFACE
    projLocations[2] = gl.getUniformLocation(programs[2], 'surfaceProjMatrix');
    texLocations[1] = gl.getUniformLocation(programs[2], 'surfaceTex');
    lightDirLocations[2] = gl.getUniformLocation(programs[2], 'lightDirection');
    lightColorLocations[2] = gl.getUniformLocation(programs[2], 'lightColor');
    ambientLightColorLocations[2] = gl.getUniformLocation(programs[2], 'ambientColor');
    lightPositionLocations[2] = gl.getUniformLocation(programs[2], 'lightPosition');
    normalMatrixLocations[2] = gl.getUniformLocation(programs[2], 'surfaceNormMatrix');
    viewWorldMatrixLocations[2] = gl.getUniformLocation(programs[2], 'surfaceWorldMatrix');
    specShineLocations[2] = gl.getUniformLocation(programs[2], 'specShine');
    reflectionFlagLocations[2] = gl.getUniformLocation(programs[2], 'usePhong');
    betaDecayLocations[2] = gl.getUniformLocation(programs[2], 'betaDecay');
    targetDistanceLocations[2] = gl.getUniformLocation(programs[2], 'target');
    lightTypeLocations[2] = gl.getUniformLocation(programs[2], 'lightType');
    coneInLocations[2] = gl.getUniformLocation(programs[2], 'coneIn');
    coneOutLocations[2] = gl.getUniformLocation(programs[2], 'coneOut');

    // CUBEMAP
    projLocations[3] = gl.getUniformLocation(programs[3], 'inverseViewProjMatrix');
    texLocations[2] = gl.getUniformLocation(programs[3], 'cubeMapTex');
}

function setBuffers() {
    for(let i = 0; i < 4; i++) { // 4 for ring, xwing, surface, cubeMap
        vaos[i] = gl.createVertexArray();
        gl.bindVertexArray(vaos[i]);

        let posBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(models[i].vertices), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(posLocations[i]);
        gl.vertexAttribPointer(posLocations[i], 3, gl.FLOAT, false, 0, 0);

        if(i != 3) {
            if(i > 0) {
                let uvBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(models[i].textures), gl.STATIC_DRAW);
                gl.vertexAttribPointer(uvLocations[i - 1], 2, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(uvLocations[i - 1]);
            }

            let normBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(models[i].vertexNormals), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(normLocations[i]);
            gl.vertexAttribPointer(normLocations[i], 3, gl.FLOAT, false, 0, 0);

            let idxBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(models[i].indices), gl.STATIC_DRAW);
        }
    }
}

function setupXWingTexture() {
    textures[0] = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textures[0]);

    var xwingImage = new Image();
    xwingImage.src = baseDir + 'assets/X-Wing-Colors.png';

    console.log('imageDir: ' + xwingImage.src)

    xwingImage.onload = function() {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textures[0]);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, xwingImage);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
    };
}

function setupSurfaceTexture() {
    textures[1] = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, textures[1]);

    var surfaceImage = new Image();
    surfaceImage.src = baseDir + 'assets/cliff_surface.jpg';

    surfaceImage.onload = function() {
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, textures[1]);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, surfaceImage);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
    };
}

function setupCubeMap() {
    textures[2] = gl.createTexture();
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, textures[2]);
    
    let cubeMapDir = baseDir + 'assets/cubemaps/lightblue/';
 
    const faceInfos = [
        {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, 
            url: cubeMapDir + 'right1.png',
        },
        {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 
            url: cubeMapDir + 'left2.png',
        },
        {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 
            url: cubeMapDir + 'top3.png',
        },
        {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 
            url: cubeMapDir + 'bottom4.png',
        },
        {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 
            url: cubeMapDir + 'front5.png',
        },
        {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 
            url: cubeMapDir + 'back6.png',
        }
    ];
    faceInfos.forEach((faceInfo) => {
        const {target, url} = faceInfo;
        
        // Upload the canvas to the cubemap face.
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 256;
        const height = 256;
        const format = gl.RGBA;
        const type = gl.UNSIGNED_BYTE;
        
        // setup each face so it's immediately renderable
        gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
        
        // Asynchronously load an image
        const image = new Image();
        image.src = url;
        image.addEventListener('load', function() {
            gl.activeTexture(gl.TEXTURE2);
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, textures[2]);
            gl.texImage2D(target, level, internalFormat, format, type, image);
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        });
    });
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
}

function keyFunctionDown(e) {
    if(gameOn) {
        let code = e.keyCode;
        e.preventDefault() // Disables non mapped keys

        if(easyModeOn) {
            if (code == 87) keys.up = true; // key W
            if (code == 83) keys.down = true; // key S
        } else {
            if (code == 32) { // key SPACEBAR
                keys.up = true;
                keys.down = false;
            }
        }
        if (code == 65) keys.left = true; // key A
        if (code == 68) keys.right = true; // key D
    }
}
window.addEventListener('keydown', keyFunctionDown, false);

function keyFunctionUp(e) {
    if(gameOn) {
        let code = e.keyCode;
        e.preventDefault() // Disables non mapped keys

        if(easyModeOn) {
            if (code == 87) keys.up = false; // key W
            if (code == 83) keys.down = false; // key S
        } else {
            if (code == 32) { // key SPACEBAR
                keys.up = false;
                keys.down = true;
            }
        }
        if (code == 65) keys.left = false; // key A
        if (code == 68) keys.right = false; // key D
    }
}
window.addEventListener('keyup', keyFunctionUp, false);

function move() {
    if(gameOn) {
        if(keys.up && xwingTy <= 15.0 - (delta / 3)) {
            if(easyModeOn) {
                xwingTy += delta / 3;
            } else {
                xwingTy += delta / (gravityFactor * 5);
            }
            if(xwingRx < 15.0) {
                xwingRx += 0.1;
            }
        }

        if(keys.down) {
            if(easyModeOn){
                xwingTy -= delta / 3;
            } else {
                xwingTy -= delta / (gravityFactor * 5);
            }
            if(xwingRx > -15.0) {
                xwingRx -= 0.1;
            }
        }

        if(keys.left && xwingTx >= - 14.0 + (delta / 3)) {
            xwingTx -= delta / 3;
            if(xwingRz < 45.0) {
                xwingRz += 0.5;
            }
        }

        if(keys.right && xwingTx <= 14.0 - (delta / 3)) {
            xwingTx += delta / 3;
            if(xwingRz > -45.0) {
                xwingRz -= 0.5;
            }
        }

        if(!keys.left && xwingRz > 0.0){
            xwingRz -= 0.5
        }

        if(!keys.right && xwingRz < 0.0){
            xwingRz += 0.5
        }

        if(!keys.up && xwingRx > 0.0){
            xwingRx -= 0.1;
        }

        if(!keys.down && xwingRx < 0.0){
            xwingRx += 0.1;
        }
    }
}

