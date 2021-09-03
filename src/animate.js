function animate() {
    var currentTime = (new Date).getTime();

    animateSurfaceTex(currentTime, lastUpdateTime);
    animateRing(currentTime, lastUpdateTime);

    lastUpdateTime = currentTime;
}

function animateSurfaceTex(currentTime, lastUpdateTime) {
    if(lastUpdateTime) {   
        var deltaC = (30 * (currentTime - lastUpdateTime)) / 1000.0;
        // texX += deltaC;
        surfaceRx += surfaceVelFactor * deltaC;
    }
    // surfaceTexTransformation = utils.MakeTranslateMatrix(texVelFactor * texX, 0.0, 0.0); 
    worldMatrices[ringNum + 1] = utils.MakeWorld(surfaceTx, surfaceTy, surfaceTz, surfaceRx, surfaceRy, surfaceRz, surfaceS); // surface
}

function animateRing(currentTime, lastUpdateTime) {
    if(lastUpdateTime) {   
        var deltaC = (30 * (currentTime - lastUpdateTime)) / 1000.0;

        for(let i = 0; i < ringNum; i++) {
            if(rings[i].isActive()) {
                rings[i].incrementTz(ringVelFactor * deltaC);
                // rings[i].setY();
            }
            // if (rings[i].getTz() >= (ringStartingPoint + cameraZ) / ringNum) {
            if(rings[i].getTz() >= ringGenDist) {
                if(i != (ringNum - 1)) {
                    rings[i + 1].activate();    
                }
                else {
                    rings[0].activate();
                }
            }
            if((checkRingCollision(rings[i])) || (rings[i].getTz() >= xwingTz + 10.0)) {
                rings[i].deactivate();
                rings[i].setRandomTx();
                rings[i].setRandomTy();
                // rings[i].resetY();
                rings[i].resetTz();
            }
            
        }

        ringRotation += 5 * deltaC;
    }

    for(let i = 0; i < ringNum; i++) {
        worldMatrices[i] = utils.MakeWorld(rings[i].getTx(), rings[i].getTy(), rings[i].getTz(), 90.0, 0.0, ringRotation, 1.0); 
    }
}