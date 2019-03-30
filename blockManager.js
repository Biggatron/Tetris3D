// ============
// BLOCKMANAGER
// ============

var blocks = [];

var colors = [
    [],
    [1.0, 0.0, 0.0, 1.0], // red
    [1.0, 1.0, 0.0, 1.0], // yellow
    [0.0, 1.0, 0.0, 1.0], // green
    [1.0, 0.65, 0.0, 1.0], // orange
    [1.0, 0.0, 1.0, 1.0], // magenta
    [0.0, 1.0, 1.0, 1.0], // cyan
];

var EMPTY_ROW = [[0,0,0,0,0,0],
                 [0,0,0,0,0,0],
                 [0,0,0,0,0,0],
                 [0,0,0,0,0,0],
                 [0,0,0,0,0,0],
                 [0,0,0,0,0,0]]

var playFieldGrid = [
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
];

newGame();

function newGame() {
    var field = [];
    for (var i = 0; i < 20; i++){
        field.push([[0,0,0,0,0,0],
                    [0,0,0,0,0,0],
                    [0,0,0,0,0,0],
                    [0,0,0,0,0,0],
                    [0,0,0,0,0,0],
                    [0,0,0,0,0,0]]);
    }
    playFieldGrid = field;
    clearBlocks();
    points = 0;
}

function renderGrid() {
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 6; j++) {
            for (var k = 0; k < 6; k++) {
                if (playFieldGrid[i][j][k] > 0) {
                    var mv = modelViewMatrix;
                    mv = mult(mv, translate(k, i, j));
                    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(mv));
                    gl.uniform4fv(colorVecLoc, colors[playFieldGrid[i][j][k]]);
                    gl.drawArrays(gl.TRIANGLES, cubeTriIndex, cubeTriIndex);
                    gl.uniform4fv(colorVecLoc, vec4(0.0, 0.0, 0.0, 1.0));
                    gl.drawArrays(gl.LINES, currIndex, cubeIndex);
                }
            }
        }
    }
}

function clearBlocks() {
    blocks = [];
}

function updateBlocks() {
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].update();
    }
    if (blocks.length === 0) {
        newBlock();
    }
}

function renderBlocks() {
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].render();
    }
}

function addToGrid(pos1, pos2, pos3, color) {
    console.log(pos1, pos2, pos3);
    playFieldGrid[pos1[2]][pos1[1]][pos1[0]] = color;
    playFieldGrid[pos2[2]][pos2[1]][pos2[0]] = color;
    playFieldGrid[pos3[2]][pos3[1]][pos3[0]] = color;

    var rowsToClear = [];

    if(shouldClearRow(pos1[2])){
        rowsToClear.push(pos1[2]);
    }
    if(shouldClearRow(pos2[2])) {
        if(rowsToClear.indexOf(pos2[2]) === -1)
            rowsToClear.push(pos2[2]);
    }
    if(shouldClearRow(pos3[2])) {
        if(rowsToClear.indexOf(pos3[2]) === -1)
            rowsToClear.push(pos3[2]);    
    }

    rowsToClear.sort().reverse().map(row => clearRow(row));
}

function clearRow(row) {
    playFieldGrid.splice(row, 1);
    playFieldGrid.push(EMPTY_ROW);

    points = points + 1;
}

function shouldClearRow(row) {

    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            if (playFieldGrid[row][i][j] === 0) return false;
        }
    }
    return true;
}

function isLegal(block) {
    pos = block.getOccupiedBlocks();
    for (var i = 0; i < pos.length; i++) {
        if (pos[i][0] < 0 || 5 < pos[i][0]) {
            return false;
        }
        if (pos[i][1] < 0 || 5 < pos[i][1]) {
            return false;
        }
        if (pos[i][2] < 0) {
            return false;
        }
        if (playFieldGrid[pos[i][2]][pos[i][1]][pos[i][0]] > 0) {
            return false;
        }
    }
    return true;
}

function newBlock() {
    var block = new Block();
    if(isLegal(block))
        blocks.push(block);
    else
        newGame();
}
