function initGUI() {
    // Score label
    scoreLabel.style.display = "none";

    // Restarting game label
    restartingGameLabel.style.display = "none";

    // Light color
    let lightColorButton = document.getElementById('light_color_button');
    lightColorButton.value = defaultLightColor;

    // Different type of lights radio buttons
    let dirRadioButton = document.getElementById("directional_radio");
    dirRadioButton.checked = true;
    let pointRadioButton = document.getElementById("point_radio");
    pointRadioButton.checked = false;
    let spotRadioButton = document.getElementById("spot_radio");
    spotRadioButton.checked = false;

    // Different type of lights params
    let dirFieldset = document.getElementById("dir_fieldset");
    dirFieldset.style.display = "block";
    let pointFieldset = document.getElementById("point_fieldset");
    pointFieldset.style.display = "none";
    let spotFieldset = document.getElementById("spot_fieldset");
    spotFieldset.style.display = "none";

    // Directional light params sliders
    let dirLightAlphaSlider = document.getElementById('dir_light_alpha_slider');
    dirLightAlphaSlider.value = defaultAlpha;
    let dirLightBetaSlider = document.getElementById('dir_light_beta_slider');
    dirLightBetaSlider.value = defaultBeta;

    // Point light params sliders
    let lightXSlider = document.getElementById("point_light_x_slider");
    lightXSlider.value = defaultLightX;
    let lightYSlider = document.getElementById("point_light_y_slider");
    lightYSlider.value = defaultLightY;
    let lightZSlider = document.getElementById("point_light_z_slider");
    lightZSlider.value = defaultLightZ;
    let pointLightDecaySlider = document.getElementById("point_light_decay_slider");
    pointLightDecaySlider.value = defaultBetaDecay;
    let pointLightTargetSlider = document.getElementById("target_dist_slider");
    pointLightTargetSlider.value = defaultTarget;

    // Spot light params sliders
    let coneInSlider = document.getElementById("cone_in_slider");
    coneInSlider.value = defaultConeIn;
    let coneOutSlider = document.getElementById("cone_out_slider");
    coneOutSlider.value = defaultConeOut;

    // Models' shine coefficients sliders
    let ringShineSlider = document.getElementById('ring_shine_slider');
    ringShineSlider.value = specShines[0];
    let xwingShineSlider = document.getElementById('xwing_shine_slider');
    xwingShineSlider.value = specShines[1];
    let surfaceShineSlider = document.getElementById('surface_shine_slider');
    surfaceShineSlider.value = specShines[2];

    // Phong/Blinn radio button
    let phongRadioButton = document.getElementById('phong_radio');
    phongRadioButton.checked = true;
    let blinnRadioButton = document.getElementById('blinn_radio');
    blinnRadioButton.checked = false;

    // Ambient Color
    let ambientColorButton = document.getElementById('ambient_color_button');
    ambientColorButton.value = defaultAmbientColor;

    // Mode selection radio
    let easyModeRadio = document.getElementById("easy_mode_radio");
    easyModeRadio.checked = true;
    let hardModeRadio = document.getElementById("hard_mode_radio");
    hardModeRadio.checked = false;
}

function changeDirLightColor(color) {
    let newColor = color.match(/[A-Za-z0-9]{2}/g);                            // #RRGGBB --> RR, GG, BB in str
    newColor = newColor.map(function(x) { return parseInt(x, 16) / 255.0 });  // RR, GG, BB in str --> nR, nG, nB in float (0.0 to 1.0)

    directionalLightColor = newColor;
}

function changeAmbientColor(color) {
    let newColor = color.match(/[A-Za-z0-9]{2}/g);                            // #RRGGBB --> RR, GG, BB in str
    newColor = newColor.map(function(x) { return parseInt(x, 16) / 255.0 });  // RR, GG, BB in str --> nR, nG, nB in float (0.0 to 1.0)

    ambientLightColor = newColor;
}

function changeLightAlpha(alpha) {
    let newAlpha = parseInt(alpha, 10);
    dirLightAlpha = utils.degToRad(newAlpha);
    
    directionalLight = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
                        Math.sin(dirLightAlpha), 
                        Math.cos(dirLightAlpha) * Math.sin(dirLightBeta)];
}

function changeLightBeta(beta) {
    let newBeta = parseInt(beta, 10);
    dirLightBeta = utils.degToRad(newBeta);

    directionalLight = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
                        Math.sin(dirLightAlpha), 
                        Math.cos(dirLightAlpha) * Math.sin(dirLightBeta)];
}

function changeRingShine(ringSpecShine) {
    let newRingSpecShine = parseFloat(ringSpecShine);
    specShines[0] = newRingSpecShine;
}

function changeXWingShine(xwingSpecShine) {
    let newXWingSpecShine = parseFloat(xwingSpecShine);
    specShines[1] = newXWingSpecShine;
}

function changeSurfaceShine(surfaceSpecShine) {
    let newSurfaceSpecShine = parseFloat(surfaceSpecShine);
    specShines[2] = newSurfaceSpecShine;
}

function changeToPhong() {
    usePhong = 1;
}

function changeToBlinn() {
    usePhong = 0;
}

function enableDirectLightParam() {
    lightType = 0;

    let dirFieldset = document.getElementById("dir_fieldset");
    dirFieldset.style.display = "block";
    let pointFieldset = document.getElementById("point_fieldset");
    pointFieldset.style.display = "none";
    let spotFieldset = document.getElementById("spot_fieldset");
    spotFieldset.style.display = "none";
}

function enablePointLightParam() {
    lightType = 1;

    let dirFieldset = document.getElementById("dir_fieldset");
    dirFieldset.style.display = "none";
    let pointFieldset = document.getElementById("point_fieldset");
    pointFieldset.style.display = "block";
    let spotFieldset = document.getElementById("spot_fieldset");
    spotFieldset.style.display = "none";

    let lightXSlider = document.getElementById("point_light_x_slider");
    lightXSlider.value = defaultLightX;
    lightPosition[0] = defaultLightX;
}

function enableSpotLightParam() {
    lightType = 2;

    let dirFieldset = document.getElementById("dir_fieldset");
    dirFieldset.style.display = "block";
    let pointFieldset = document.getElementById("point_fieldset");
    pointFieldset.style.display = "block";
    let spotFieldset = document.getElementById("spot_fieldset");
    spotFieldset.style.display = "block";

    let lightXSlider = document.getElementById("point_light_x_slider");
    lightXSlider.value = defaultSpotLightX;
    lightPosition[0] = defaultSpotLightX;
}

function changeLightX(x) {
    let newX = parseFloat(x);
    lightPosition[0] = newX;
}

function changeLightY(y) {
    let newY = parseFloat(y);
    lightPosition[1] = newY;
}

function changeLightZ(z) {
    let newZ = parseFloat(z);
    lightPosition[2] = newZ;
}

function changeLightDecay(newBetaDecay) {
    betaDecay = parseFloat(newBetaDecay);
}

function changeTargetDist(newTargetDist) {
    targetDistance = parseFloat(newTargetDist);
}

function changeConeIn(newConeIn) {
    coneIn = parseFloat(newConeIn);
}

function changeConeOut(newConeOut) {
    coneOut = parseFloat(newConeOut);
}

function startGame() {
    gameOn = true;
    startingGameLabel.style.display = "none";
    scoreLabel.style.display = "block";

    document.getElementById("mode_selection_fieldset").disabled = true;
}

function displayGameOverScreen() {
    restartingGameLabel.style.display = "block";
    scoreLabel.style.display = "none";
    document.getElementById('final_score').innerHTML = score;
    gameOn = false;
}

function restartGame() {
    window.location.reload();
}

function setEasyMode() {
    easyModeOn = true;
}

function setHardMode() {
    easyModeOn = false;
}