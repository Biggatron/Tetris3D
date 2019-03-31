// ==========================
// 3D TETRIS
// TÖLVUGRAFFÍK - VERKEFNI 3
//
// BIRGIR ÓLI SNORRASON
// KRISTJÁN PÉTUR ÞÓRARINSSON
// ==========================

var canvas;
var gl;

var currIndex;
var index = 0;
var lineIndex = 0;
var linePlayFieldIndex = 24;
var lineBlockIndex = 40;
var cubeLineIndex = 24;
var cube1TriIndex = 36;
var cube2TriIndex = 60;

var pointsArray = [];
var normalsArray = [];

var movement = false; // Do we rotate?
var spinX = 0;
var spinY = 0;
var origX;
var origY;

var zDist = -30.0;

var fovy = 50.0;
var near = 0.2;
var far = 100.0;
var aspectRatio;

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;

var normalMatrix, normalMatrixLoc;

var eye;
var at = vec3(0.0, 10.0, 0.0);
var up = vec3(0.0, 1.0, 0.0);

var cube = [
    vec4(0.0, 0.0, 0.0, 1),
    vec4(1.0, 0.0, 0.0, 1),
    vec4(1.0, 0.0, 1.0, 1),
    vec4(0.0, 0.0, 1.0, 1),

    vec4(0.0, 1.0, 0.0, 1),
    vec4(1.0, 1.0, 0.0, 1),
    vec4(1.0, 1.0, 1.0, 1),
    vec4(0.0, 1.0, 1.0, 1),
]

var pFV = [
    vec4(0.0, 20.0, 6.0, 1),
    vec4(0.0, 20.0, 0.0, 1),
    vec4(6.0, 20.0, 6.0, 1),
    vec4(6.0, 20.0, 0.0, 1),

    vec4(0.0, 0.0, 6.0, 1),
    vec4(0.0, 0.0, 0.0, 1),
    vec4(6.0, 0.0, 6.0, 1),
    vec4(6.0, 0.0, 0.0, 1),
]

var b1V = [
    vec4(0.0, 1.0, 0.0, 1),
    vec4(0.0, 1.0, 1.0, 1),
    vec4(1.0, 1.0, 0.0, 1),
    vec4(1.0, 1.0, 1.0, 1),
    vec4(2.0, 1.0, 0.0, 1),
    vec4(2.0, 1.0, 1.0, 1),
    vec4(3.0, 1.0, 0.0, 1),
    vec4(3.0, 1.0, 1.0, 1),

    vec4(0.0, 0.0, 0.0, 1),
    vec4(0.0, 0.0, 1.0, 1),
    vec4(1.0, 0.0, 0.0, 1),
    vec4(1.0, 0.0, 1.0, 1),
    vec4(2.0, 0.0, 0.0, 1),
    vec4(2.0, 0.0, 1.0, 1),
    vec4(3.0, 0.0, 0.0, 1),
    vec4(3.0, 0.0, 1.0, 1)
]

var b2V = [
    vec4(-1.0, 0.5, -1.0, 1),
    vec4(0.0, 0.5, -1.0, 1),
    vec4(-1.0, 0.5, 0.0, 1),
    vec4(0.0, 0.5, 0.0, 1),
    vec4(-1.0, 0.5, 1.0, 1),
    vec4(0.0, 0.5, 1.0, 1),
    vec4(1.0, 0.5, 1.0, 1),
    vec4(1.0, 0.5, 0.0, 1),


    vec4(-1.0, -0.5, -1.0, 1),
    vec4(0.0, -0.5, -1.0, 1),
    vec4(-1.0, -0.5, 0.0, 1),
    vec4(0.0, -0.5, 0.0, 1),
    vec4(-1.0, -0.5, 1.0, 1),
    vec4(0.0, -0.5, 1.0, 1),
    vec4(1.0, -0.5, 1.0, 1),
    vec4(1.0, -0.5, 0.0, 1),
]

function triangle(a, b, c) {

    pointsArray.push(a);
    pointsArray.push(b);
    pointsArray.push(c);

    // normals are vectors
    /*
        normalsArray.push(a[0], a[1], a[2], 0.0);
        normalsArray.push(b[0], b[1], b[2], 0.0);
        normalsArray.push(c[0], c[1], c[2], 0.0);
    */
    index += 3;

}

function line(a, b) {
    pointsArray.push(a);
    pointsArray.push(b);
}

function playField() {
    line(pFV[0], pFV[1]);
    line(pFV[1], pFV[3]);
    line(pFV[3], pFV[2]);
    line(pFV[2], pFV[0]);

    line(pFV[4], pFV[5]);
    line(pFV[5], pFV[7]);
    line(pFV[7], pFV[6]);
    line(pFV[6], pFV[4]);

    line(pFV[0], pFV[4]);
    line(pFV[1], pFV[5]);
    line(pFV[2], pFV[6]);
    line(pFV[3], pFV[7]);
}

function block1() {

    line(b1V[0], b1V[6]);
    line(b1V[1], b1V[7]);
    line(b1V[8], b1V[14]);
    line(b1V[9], b1V[15]);

    line(b1V[0], b1V[1]);
    line(b1V[1], b1V[9]);
    line(b1V[9], b1V[8]);
    line(b1V[8], b1V[0]);

    line(b1V[2], b1V[3]);
    line(b1V[3], b1V[11]);
    line(b1V[11], b1V[10]);
    line(b1V[10], b1V[2]);

    line(b1V[4], b1V[5]);
    line(b1V[5], b1V[13]);
    line(b1V[13], b1V[12]);
    line(b1V[12], b1V[4]);

    line(b1V[6], b1V[7]);
    line(b1V[7], b1V[15]);
    line(b1V[15], b1V[14]);
    line(b1V[14], b1V[6]);

    triangle(b1V[0], b1V[6], b1V[1]);
    triangle(b1V[1], b1V[6], b1V[7]);

    triangle(b1V[8], b1V[14], b1V[0]);
    triangle(b1V[0], b1V[14], b1V[6]);

    triangle(b1V[9], b1V[15], b1V[8]);
    triangle(b1V[8], b1V[15], b1V[14]);

    triangle(b1V[1], b1V[7], b1V[9]);
    triangle(b1V[9], b1V[7], b1V[15]);

    triangle(b1V[9], b1V[8], b1V[1]);
    triangle(b1V[1], b1V[8], b1V[0]);

    triangle(b1V[14], b1V[15], b1V[6]);
    triangle(b1V[6], b1V[15], b1V[7]);
}

function block2() {
    // top
    line(b2V[0], b2V[4]);
    line(b2V[1], b2V[5]);
    line(b2V[2], b2V[7]);
    line(b2V[4], b2V[6]);
    line(b2V[0], b2V[1]);
    line(b2V[6], b2V[7]);

    // bot
    line(b2V[8], b2V[12]);
    line(b2V[9], b2V[13]);
    line(b2V[10], b2V[15]);
    line(b2V[12], b2V[14]);
    line(b2V[8], b2V[9]);
    line(b2V[14], b2V[15]);

    // Top to bot
    line(b2V[0], b2V[8]);
    line(b2V[1], b2V[9]);
    line(b2V[2], b2V[10]);
    line(b2V[3], b2V[11]);
    line(b2V[4], b2V[12]);
    line(b2V[5], b2V[13]);
    line(b2V[6], b2V[14]);
    line(b2V[7], b2V[15]);

    triangle(b2V[0], b2V[4], b2V[1]);
    triangle(b2V[1], b2V[4], b2V[5]);

    triangle(b2V[5], b2V[6], b2V[3]);
    triangle(b2V[3], b2V[6], b2V[7]);

    triangle(b2V[8], b2V[12], b2V[0]);
    triangle(b2V[0], b2V[12], b2V[4]);

    triangle(b2V[12], b2V[14], b2V[4]);
    triangle(b2V[4], b2V[14], b2V[6]);

    triangle(b2V[9], b2V[8], b2V[1]);
    triangle(b2V[1], b2V[8], b2V[0]);

    triangle(b2V[14], b2V[15], b2V[6]);
    triangle(b2V[6], b2V[15], b2V[7]);

    triangle(b2V[11], b2V[9], b2V[3]);
    triangle(b2V[3], b2V[9], b2V[1]);

    triangle(b2V[15], b2V[11], b2V[7]);
    triangle(b2V[7], b2V[11], b2V[3]);

    triangle(b2V[8], b2V[9], b2V[12]);
    triangle(b2V[12], b2V[9], b2V[13]);

    triangle(b2V[11], b2V[15], b2V[13]);
    triangle(b2V[13], b2V[15], b2V[14]);
}

function buildCube() {
    line(cube[0], cube[1]);
    line(cube[1], cube[2]);
    line(cube[2], cube[3]);
    line(cube[3], cube[0]);

    line(cube[4], cube[5]);
    line(cube[5], cube[6]);
    line(cube[6], cube[7]);
    line(cube[7], cube[4]);

    line(cube[0], cube[4]);
    line(cube[1], cube[5]);
    line(cube[2], cube[6]);
    line(cube[3], cube[7]);

    //Bot face
    triangle(cube[0], cube[1], cube[2]);
    triangle(cube[0], cube[2], cube[3]);

    triangle(cube[3], cube[2], cube[6]);
    triangle(cube[3], cube[6], cube[7]);

    triangle(cube[0], cube[3], cube[7]);
    triangle(cube[0], cube[7], cube[4]);

    triangle(cube[1], cube[0], cube[4]);
    triangle(cube[1], cube[4], cube[5]);

    triangle(cube[2], cube[1], cube[5]);
    triangle(cube[2], cube[5], cube[6]);

    // top face
    triangle(cube[7], cube[6], cube[5]);
    triangle(cube[7], cube[5], cube[4]);
}

var cube = [
    vec4(0.0, 0.0, 0.0, 1),
    vec4(1.0, 0.0, 0.0, 1),
    vec4(1.0, 0.0, 1.0, 1),
    vec4(0.0, 0.0, 1.0, 1),

    vec4(0.0, 1.0, 0.0, 1),
    vec4(1.0, 1.0, 0.0, 1),
    vec4(1.0, 1.0, 1.0, 1),
    vec4(0.0, 1.0, 1.0, 1),
]

window.onload = function init() {

    canvas = document.getElementById("gl-canvas");
    resizeCanvasToDisplaySize(canvas);
    aspectRatio = canvas.width / canvas.height;

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.9, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    playField();
    block1();
    block2();
    buildCube();

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    var nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);

    var vBuffer = gl.createBuffer();
    console.log(pointsArray)
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");
    normalMatrixLoc = gl.getUniformLocation(program, "normalMatrix");

    colorVecLoc = gl.getUniformLocation(program, "colorVec");

    projectionMatrix = perspective(fovy, aspectRatio, near, far);

    //event listeners for mouse
    canvas.addEventListener("mousedown", function(e) {
        movement = true;
        origX = e.offsetX;
        origY = e.offsetY;
        e.preventDefault(); // Disable drag and drop
    });

    canvas.addEventListener("mouseup", function(e) {
        movement = false;
    });

    canvas.addEventListener("mousemove", function(e) {
        if (movement) {
            spinY = (spinY + (e.offsetX - origX)) % 360;
            spinX = (spinX + (origY - e.offsetY)) % 360;
            origX = e.offsetX;
            origY = e.offsetY;
        }
    });


    // Event listener for mousewheel
    window.addEventListener("wheel", function(e) {
        if (e.deltaY > 0.0) {
            zDist += 3;
        } else {
            zDist -= 3;
        }
    });

    render();
}

function resizeCanvasToDisplaySize(canvas) {
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // If it's resolution does not match change it
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }

    return false;
}


function render() {

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    updateBlocks();

    modelViewMatrix = lookAt(vec3(0.0, 10.0, zDist), at, up);
    modelViewMatrix = mult(modelViewMatrix, translate(3, 10, 3));
    modelViewMatrix = mult(modelViewMatrix, rotateY(spinY));
    modelViewMatrix = mult(modelViewMatrix, rotateX(spinX));
    modelViewMatrix = mult(modelViewMatrix, translate(-3, -10, -3));

    // normal matrix only really need if there is nonuniform scaling
    // it's here for generality but since there is
    // no scaling in this example we could just use modelView matrix in shaders
    normalMatrix = [
        vec3(modelViewMatrix[0][0], modelViewMatrix[0][1], modelViewMatrix[0][2]),
        vec3(modelViewMatrix[1][0], modelViewMatrix[1][1], modelViewMatrix[1][2]),
        vec3(modelViewMatrix[2][0], modelViewMatrix[2][1], modelViewMatrix[2][2])
    ];

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix));

    // Draw the playfield grid
    gl.uniform4fv(colorVecLoc, vec4(0.0, 0.0, 0.0, 1.0));
    currIndex = 0;
    gl.drawArrays(gl.LINES, currIndex, linePlayFieldIndex);
    currIndex += linePlayFieldIndex;

    renderBlocks();
    renderGrid();


    window.requestAnimFrame(render);
}
