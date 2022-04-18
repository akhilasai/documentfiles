var grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
],
    supplyGrid = [1, 2, 3, 4, 5, 6, 7, 8, 9],
    row = 0,
    col = 0,
    value = 0,
    index = 0;


var solveSudoku = function (grid, row, col) {
    if (col > 8) {
        row++;
        col = 0;
        if (row > 8 && col > 8) {
            console.log(grid);
            return;
        }
    }
    if (grid[row][col] === 0) { //
        index = Math.floor(Math.random() * supplyGrid.length);
        value = supplyGrid[index];
        if (isValid(row, col, value)) {
            grid[row][col] = value;
            col++;
            supplyGrid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            solveSudoku(grid, row, col);
        } else {
            supplyGrid.splice(index, 1);
            console.log(supplyGrid);
            if (supplyGrid.length < 1) { 
                //backtrack();
                console.log('Out of numbers');
                return;
            }
            solveSudoku(grid, row, col);
        }
    } else { //row = 3, col = 5
        solveSudoku(grid, row, ++col);
    }
    return this;
}

function isValid(row, col, value) {
    if ((validateColumn(row, col, value)) || (validateRow(row, col, value)) || (validateBox(row, col, value))) {
        return false;
    } else {
        return true;
    }
}

function validateBox(row, col, value) {
    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;
    var isFound = false;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (grid[row + i][col + j] == value) isFound = true;
        }
    }
    return isFound;
}

function validateRow(row, col, value) { 
    var isFound = false;
    for (var i = 0; i < 9; i++) {
        if (grid[row][i] === value) isFound = true;
    }
    return isFound;
}

function validateColumn(row, col, value) { 
    var isFound = false;
    for (var i = 0; i < 9; i++) {
        if (grid[i][col] === value) isFound = true;
    }
    return isFound;
}