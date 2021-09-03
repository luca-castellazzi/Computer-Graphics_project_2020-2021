async function init() {
    // Retrieve canvas, fundamenta GUI elements and WebGL context
    /** @type {HTMLCanvasElement} */ // In order to have auto-completion 
	canvas = document.getElementById("canvas");
    toolsGUI = document.getElementById("tools_GUI");
    scoreLabel = document.getElementById("score_label");
    startingGameLabel = document.getElementById("starting_game_label");
    restartingGameLabel = document.getElementById("game_over_label");

	/** @type {WebGLRenderingContext} */ // In order to have auto-completion
	gl = canvas.getContext("webgl2");
	if(!gl){
		alert("GL context not opened!!");
		return;
	}

    // Initialize GUI elements
    initGUI();

    // Get shaders' directory
    var path = window.location.pathname;
    var page = path.split("/").pop();
    baseDir = window.location.href.replace(page, '');
    shaderDir = baseDir + "src/shaders/";

    // Load shaders from external .glsl files and create programs
    await createPrograms();

    // Load models
    await loadModels();

    // Call the main function
    main();
}

async function createPrograms() {
    await utils.loadFiles([shaderDir + 'vs_ring.glsl', shaderDir + 'fs_ring.glsl'], function(shaderText){
        var ringVS = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        var ringFS = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
        programs[0] = utils.createProgram(gl, ringVS, ringFS);
    });

    await utils.loadFiles([shaderDir + 'vs_xwing.glsl', shaderDir + 'fs_xwing.glsl'], function(shaderText){
        var xwingVS = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        var xwingFS = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
        programs[1] = utils.createProgram(gl, xwingVS, xwingFS);
    });

    await utils.loadFiles([shaderDir + 'vs_surface.glsl', shaderDir + 'fs_surface.glsl'], function(shaderText){
        var surfaceVS = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        var surfaceFS = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
        programs[2] = utils.createProgram(gl, surfaceVS, surfaceFS);
    });

    await utils.loadFiles([shaderDir + 'vs_cubemap.glsl', shaderDir + 'fs_cubemap.glsl'], function(shaderText){
        var cubemapVS = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        var cubemapFS = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
        programs[3] = utils.createProgram(gl, cubemapVS, cubemapFS);
    });
}

async function loadModels() {
    // Load RING model
    var ringStr = await utils.get_objstr("src/assets/new_ring.obj");
    models[0] = new OBJ.Mesh(ringStr);

    // Load X-WING model
    var xwingStr = await utils.get_objstr("src/assets/X-WING.obj");
    models[1] = new OBJ.Mesh(xwingStr);

    //Load SURFACE model
    var surfaceStr = await utils.get_objstr("src/assets/surface.obj");
    models[2] = new OBJ.Mesh(surfaceStr);

    // Load CUBEMAP dict
    models[3] = cubeMapModel;
}

window.onload = init;
