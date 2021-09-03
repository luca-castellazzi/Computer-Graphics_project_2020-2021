// init variables
var canvas;
var toolsGUI;
var scoreLabel;
var startingGameLabel;
var restartingGameLabel;
var gl;
var baseDir;
var shaderDir;
var programs = []; // 0 = ring, 1 = xwing, 2 = terrain

var models = []; // 0 = ring, 1 = xwing, 2 = terrain

var aspectRatio;
var posLocations = []; // 0 = ring,  1 = xwing, 2 = surface
var projLocations = []; // Same indexing as before
var normLocations = []; // Same indexing as before
var vaos = []; // Same indexing as before

var texLocations = []; // 0 = xwing, 1 = surface
var uvLocations = []; // Same indexing as before
var textures = []; // Same indexing as before

var lightDirLocations = []; // 0 = ring, 1 = xwing, 2 = surface
var lightColorLocations = []; // Same indexing as before
var ambientLightColorLocations = []; // Same indexing as before
var lightPositionLocations = []; // Same indexing as before
var normalMatrixLocations = []; // Same indexing as before
var viewWorldMatrixLocations = []; // Same indexing as before
var specShineLocations = []; // Same indexing as before
var reflectionFlagLocations = []; // Same indexing as before
var betaDecayLocations = []; // Same indexing as before
var targetDistanceLocations = []; // Same indexing as before
var lightTypeLocations = []; // Same indexing as before
var coneInLocations = []; // Same indexing as before
var coneOutLocations = []; // Same indexing as before
var spotFlagLocations = []; // Same indexing as before

var delta = 0.5;

var keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

var cameraEl = -5.0;
var cameraAng = 0.0;

var xwingTx = 0.0;
var xwingTy = 0.0;
var xwingTz = 35.0;
var xwingRx = 0.0;
var xwingRy = 90.0;
var xwingRz = 0.0;
var xwingS = 0.3;

var surfaceTx = 0.0;
var surfaceTy = -32.0;
var surfaceTz = 30.0;
var surfaceRx = 0.0;
var surfaceRy = 0.0;
var surfaceRz = 0.0;
var surfaceS = 30.0;

var lastUpdateTime = (new Date).getTime();

var defaultAlpha = -66;
var dirLightAlpha = utils.degToRad(defaultAlpha); // top-bottom
var defaultBeta = -86;
var dirLightBeta = utils.degToRad(defaultBeta); // left-right
var directionalLight = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
                        Math.sin(dirLightAlpha), 
                        Math.cos(dirLightAlpha) * Math.sin(dirLightBeta)];
var directionalLightColor = [1.0, 1.0, 1.0];
var ambientLightColor = [0.0, 0.0, 0.0];

var defaultLightX = 48.0;
var defaultLightY = 62.0;
var defaultLightZ = 20.0;

var lightPosition = [defaultLightX, defaultLightY, defaultLightZ];
var specShines = [2.0, 2.0, 50.0]
var betaDecay = 0.0;
var targetDistance = 20.0;

var coneOut = 9.0;
var coneIn = 0.75;

var lightType = 0; // 0 = direct, 1 = point, 2 = spot
var usePhong = 1;

var gameOn = false;
var easyModeOn = true;
var gravityFactor = 2.0;


// drawScene variables
var lightDebugging = false;

var worldMatrices = []; // 0 = ring,  1 = xwing, 2 = terrain

var ringNum = 10;
var rings = [];
for(let i = 0; i < ringNum; i++) {
    var ring = new Ring();
    if(i == 0) {
        ring.activate();
    }
    rings.push(ring);
}


// animate variables
var ringVelFactor = 0.5;
var surfaceVelFactor = 0.3;
var ringGenDist = -60.0;
var ringRotation = 0.0;


// collisions variables
var threshold = 1.5;
var score = 0;

// controlsGUI variables
var defaultLightColor = '#ffffff'
var defaultAmbientColor = '#000000'
var defaultBetaDecay = 0.0;
var defaultTarget = 20.0;
var defaultConeIn = 0.75;
var defaultConeOut = 9.0;
var defaultSpotLightX = -2.5;