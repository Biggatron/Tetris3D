// ======
// BLOCK
// ======


function Block() {
    this.setup();
};

Block.prototype.setup = function() {
    this.blockType = 0;
    this.color = getRandomColor();
    this.pos = [2, 2, 19];
    this.newpos;
    this.rotation = 0;
    this.newRotation = this.rotation;
    this.dropTimer = 0;
};

Block.prototype.update = function() {
    this.dropTimer += 1;
    if (this.dropTimer >= 60) {
        this.dropTimer = 0;
        this.pos[2] -= 1;
    }
    if (!isLegal(this)) {
        this.pos[2] += 1;
        this.freeze();
        return;
    }
};

Block.prototype.render = function() {
    var mv = modelViewMatrix;

    // -1 í x hnitinu er til að miðju kubburinn sé í miðjunni. Það einhfaldar slatta
    mv = mult(mv, translate(this.pos[0]-1, this.pos[2], this.pos[1]));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(mv));
    gl.drawArrays(gl.LINES, currIndex, lineBlockIndex);
}

Block.prototype.freeze = function() {
    var pos = this.getOccupiedBlocks()
    addToGrid(pos[0], pos[1], pos[2], this.color);
    console.log(playFieldGrid);
    blocks = [];
}

Block.prototype.getOccupiedBlocks = function() {
    var pos1 = this.pos;
    var pos2 = this.pos;
    var pos3 = this.pos;
    if (this.blockType === 0) {
        switch (this.rotation) {
            case 0:
                pos1[0] -= 1;
                pos3[0] += 1;
                break;
            case 1:
                pos1[1] -= 1;
                pos3[1] += 1;
                break;
            case 2:
                pos1[2] -= 1;
                pos3[2] += 1;
                break;
        }
    }
    return [pos1, pos2, pos3]
}

function getRandomColor() {
    return Math.floor(Math.random()*6);
}
