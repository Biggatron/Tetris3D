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
    this.rot = 0;
    this.dropTimer = 0;
};

Block.prototype.update = function() {
    this.dropTimer += 1;
    if (this.dropTimer >= 20) {
        this.dropTimer = 0;
        this.pos[2] -= 1;
        if (!isLegal(this)) {
            this.pos[2] += 1;
            this.freeze();
        }
    }

    //var newPos = [pos[0], pos[1], pos[2]];
    if (eatKey(KEY_UP_ARROW)) {
        this.pos[1] += 1;
        if (!isLegal(this)) this.pos[1] -= 1;
    }
    if (eatKey(KEY_DOWN_ARROW)) {
        this.pos[1] -= 1;
        if (!isLegal(this)) this.pos[1] += 1;
    }
    if (eatKey(KEY_LEFT_ARROW)) {
        this.pos[0] += 1;
        if (!isLegal(this)) this.pos[0] -= 1;
    }
    if (eatKey(KEY_RIGHT_ARROW)) {
        this.pos[0] -= 1;
        if (!isLegal(this)) this.pos[0] += 1;
    }

    if (this.blockType === 0) {
        if (eatKey(KEY_ROTATE_X) || eatKey(KEY_ROTATE_X_C)) {
            if (this.rot === 1) {
                this.rot = 2;
                if (!isLegal(this)) this.rot = 1;
            } else if (this.rot === 2) {
                this.rot = 1;
                if (!isLegal(this)) this.rot = 2;
            }
        } else if (eatKey(KEY_ROTATE_Y) || eatKey(KEY_ROTATE_Y_C)) {
            if (this.rot === 0) {
                this.rot = 1;
                if (!isLegal(this)) this.rot = 0;
            } else if (this.rot === 1) {
                this.rot = 0;
                if (!isLegal(this)) this.rot = 1;
            }
        } else if (eatKey(KEY_ROTATE_Z) || eatKey(KEY_ROTATE_Z_C)) {
            if (this.rot === 0) {
                this.rot = 2;
                if (!isLegal(this)) this.rot = 0;
            } else if (this.rot === 2) {
                this.rot = 0;
                if (!isLegal(this)) this.rot = 2;
            }
        }

    }

};

Block.prototype.render = function() {
    var mv = modelViewMatrix;
    // -1 í x hnitinu er til að miðju kubburinn sé í miðjunni. Það einhfaldar slatta
    mv = mult(mv, translate(this.pos[0] - 1, this.pos[2], this.pos[1]));
    mv = mult(mv, translate(1.5, 0.5, 0.5))
    if (this.rot === 1) mv = mult(mv, rotateY(90));
    if (this.rot === 2) mv = mult(mv, rotateZ(90));
    mv = mult(mv, translate(-1.5, -0.5, -0.5))

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(mv));
    gl.uniform4fv(colorVecLoc, colors[this.color]);
    gl.drawArrays(gl.TRIANGLES, 0, cubeTriIndex);
    gl.uniform4fv(colorVecLoc, vec4(0.0, 0.0, 0.0, 1.0));
    gl.drawArrays(gl.LINES, currIndex, lineBlockIndex);
    currIndex += lineBlockIndex;
}

Block.prototype.freeze = function() {
    var pos = this.getOccupiedBlocks()
    addToGrid(pos[0], pos[1], pos[2], this.color);
    console.log(playFieldGrid);
    blocks = [];
}

Block.prototype.getOccupiedBlocks = function() {
    var pos1 = [this.pos[0], this.pos[1], this.pos[2]];
    var pos2 = this.pos;
    var pos3 = [this.pos[0], this.pos[1], this.pos[2]];
    if (this.blockType === 0) {
        switch (this.rot) {
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
    return Math.floor(Math.random() * 6);
}
