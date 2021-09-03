// Global variables for Ring's initialization
var minX = -12.0;
var maxX = 12.0;
var minY = 0.0;
var maxY = 4.0;
var ringStartingPoint = -100.0;

class Ring {
    constructor() {
        this.tx = generateRandomNumber(minX, maxX);
        this.ty = generateRandomNumber(minY, maxY);
        this.tz = ringStartingPoint;
        this.active = false;
    }

    getTx() {
        return this.tx;
    }

    getTy() {
        return this.ty;
    }

    getTz() {
        return this.tz;
    }

    isActive() {
        return this.active;
    }

    setRandomTx() {
        this.tx = generateRandomNumber(minX, maxX);
    }

    setRandomTy() {
        this.ty = generateRandomNumber(minY, maxY);
    }

    incrementTz(delta) {
        this.tz += delta;
    }

    resetTz() {
        this.tz = ringStartingPoint;
    }

    activate() {
        this.active = true;
    }

    deactivate() {
        this.active = false;
    }
}

const generateRandomNumber = (min, max) =>  {
    return Math.floor(Math.random() * (max - min) + min);
}
