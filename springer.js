var boardSize = 8;

var _currentMax = -1;

function getMovesForPosition(x, y) {
    var moves = [
        { x: x+1, y: y+2 },
        { x: x+2, y: y+1 },
        { x: x+2, y: y-1 },
        { x: x+1, y: y-2 },
        { x: x-1, y: y-2 },
        { x: x-2, y: y-1 },
        { x: x-2, y: y+1 },
        { x: x-1, y: y+2 }
    ].filter(function(elem) {
        return elem.x >= 0 && elem.x < boardSize && elem.y >= 0 && elem.y < boardSize;
    });
    return moves;
}

function tryPath(board, x, y, n) {
    if(_currentMax < n) {
        console.log("new max:", n);
        _currentMax = n;
    }
    
    board[convertToIndex(x,y)] = n;

    if(n === (boardSize*boardSize - 1))
        return board;

    var possibleMoves = getMovesForPosition(x, y);
    var nonTakenMoves = possibleMoves.filter(function(move) {
        return board[convertToIndex(move.x, move.y)] === -1;
    });

    if(nonTakenMoves.length === 0) return false; // Pfad ist zu Ende
    
    var pathResult;
    for(var i = 0; i < nonTakenMoves.length; ++i) {
        var move = nonTakenMoves[i];
        pathResult = tryPath(board.slice(), move.x, move.y, n+1);
        if(pathResult !== false)
            return pathResult;
    }
    return false;
}

function convertToIndex(x, y) {
    return y*boardSize+x;
}

function twoDigits(num) {
    return (" " + num).slice(-2);
}

function renderBoard(board) {
    console.log("|" + "---".repeat(boardSize) + "|");
    for(var y = 0; y < boardSize; ++y) {
        var line = "|";
        for(var x = 0; x < boardSize; ++x) {
            line += twoDigits(board[convertToIndex(x,y)]) + " ";
        }
        line += "|"
        console.log(line);
    }
    console.log("|" + "---".repeat(boardSize) + "|");
}

function knightsTour() {
    var board = Array(boardSize*boardSize);
    board.fill(-1);
    var result = tryPath(board, 0, 0, 0);
    if(result !== false) {
        console.log("########## FOUND PATH ###########");
        renderBoard(result);
    } else {
        console.log("Keine Lösung gefunden :(");
    }
}

knightsTour();