function drawScene() {
    // Constantly check if there is a collision between the xwing and the surface
    checkSurfaceCollision();

    // Animate rings and surface
    animate();

    // Move the xwing with keys
    move();

    // Setup WebGL context
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    var perspectiveMatrix = utils.MakePerspective(30, aspectRatio, 0.1, 100.0);
    if(lightDebugging) {
        // Camera moved for light debugging purposes
        var viewMatrix = utils.MakeView(xwingTx, xwingTy + 2.0, xwingTz + 100.0, -10, cameraAng);
    }
    else {
        var viewMatrix = utils.MakeView(xwingTx, xwingTy + 2.0, xwingTz + 10.0, cameraEl, cameraAng);
    }

    // matrix to transform the light from world space to camera space
    var lightDirMatrix = utils.invertMatrix(utils.transposeMatrix(viewMatrix));

    // worldMatrices[0, ..., ringNum] for the rings are set in animate()
    let xwingTrans = utils.MakeTranslateMatrix(xwingTx, xwingTy, xwingTz);
    let q = Quaternion.fromEuler(utils.degToRad(xwingRz), utils.degToRad(xwingRx), utils.degToRad(xwingRy));
    let xwingQuatRot = q.toMatrix4();
    let xwingScale = utils.MakeScaleMatrix(xwingS);
    worldMatrices[ringNum] = utils.multiplyMatrices(xwingTrans, utils.multiplyMatrices(xwingQuatRot, xwingScale)); // xwing
    // worldMatrices[ringNum + 1] for the surface is set in animate()

    // Draw each object setting up the shaders
    for(k = 0; k < ringNum + 2; k++) { // ringNum + 2 for ring1, ring2, ..., ringN, xwing, surface
        let i; // Variable to use the right locations and constant values
        if(k < ringNum) {
            i = 0;
        }
        else {
            i = k - (ringNum - 1)
        }

        gl.useProgram(programs[i]);
        let viewWorldMatrix = utils.multiplyMatrices(viewMatrix, worldMatrices[k]);
        let projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);
        let normalMatrix = utils.invertMatrix(utils.transposeMatrix(viewWorldMatrix));

        gl.uniformMatrix4fv(projLocations[i], gl.FALSE, utils.transposeMatrix(projectionMatrix));
        gl.uniformMatrix4fv(normalMatrixLocations[i], gl.FALSE, utils.transposeMatrix(normalMatrix));
        
        gl.uniformMatrix4fv(viewWorldMatrixLocations[i], gl.FALSE, utils.transposeMatrix(viewWorldMatrix));
        
        // transforming the light into camera space
        let directionalLightTransformed = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(lightDirMatrix), directionalLight);
        gl.uniform3fv(lightDirLocations[i], directionalLightTransformed);

        gl.uniform3fv(lightColorLocations[i], directionalLightColor);
        gl.uniform3fv(ambientLightColorLocations[i], ambientLightColor);
        gl.uniform3fv(lightPositionLocations[i], lightPosition);
        
        gl.uniform1f(specShineLocations[i], specShines[i]);
        gl.uniform1f(betaDecayLocations[i], betaDecay);
        gl.uniform1f(targetDistanceLocations[i], targetDistance);
        gl.uniform1i(lightTypeLocations[i], lightType);
        gl.uniform1i(reflectionFlagLocations[i], usePhong);
        gl.uniform1f(coneInLocations[i], coneIn);
        gl.uniform1f(coneOutLocations[i], coneOut);

        // Active the right texture
        if(i > 0) {
            if(i == 1) {
                gl.activeTexture(gl.TEXTURE0);
            }
            else {
                gl.activeTexture(gl.TEXTURE1);
            }
            
            gl.bindTexture(gl.TEXTURE_2D, textures[i - 1]);
            gl.uniform1i(texLocations[i - 1], i - 1);
        }

        gl.bindVertexArray(vaos[i]);
        gl.drawElements(gl.TRIANGLES, models[i].indices.length, gl.UNSIGNED_SHORT, 0);
    }

    let cubeMapViewProjMatrix = utils.multiplyMatrices(perspectiveMatrix, viewMatrix);
    let cubeMapInverseViewProjMatrix = utils.invertMatrix(cubeMapViewProjMatrix);

    gl.useProgram(programs[3]);
    gl.activeTexture(gl.TEXTURE2)
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, textures[2]);
    gl.uniform1i(texLocations[2], 2);

    gl.uniformMatrix4fv(projLocations[3], gl.FALSE, utils.transposeMatrix(cubeMapInverseViewProjMatrix));

    gl.bindVertexArray(vaos[3]);
    gl.depthFunc(gl.LEQUAL);
    gl.drawArrays(gl.TRIANGLES, 0, 1*6);

    window.requestAnimationFrame(drawScene);
}