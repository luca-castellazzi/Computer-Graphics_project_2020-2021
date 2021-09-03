function checkRingCollision(ring) {
    let xCond = Math.abs(xwingTx - ring.getTx()) < threshold;
    let yCond = Math.abs(xwingTy - ring.getTy()) < threshold;
    let zCond = Math.abs(xwingTz - ring.getTz()) < threshold;
    
    if(xCond && yCond && zCond && gameOn) {
        score += 50;
        document.getElementById('score').innerHTML = score;
        return true;
    }

    return false;
}

function checkSurfaceCollision() {
    let r = 30.0;
    let dist = Math.sqrt(Math.pow(xwingTx - surfaceTx, 2) + Math.pow(xwingTy - surfaceTy, 2) + Math.pow(xwingTz - surfaceTz, 2));
    if(dist < r && gameOn) {
        displayGameOverScreen();
    }
}