var boardSize = 8;

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
        return elem.x > 0 && elem.x < boardSize && elem.y > 0 && elem.y < boardSize;
    });
    return moves;
}

function tryPath(board, x, y) {
    console.log("Trying Move", x, y);
    var possibleMoves = getMovesForPosition(x, y);
    var nonTakenMoves = possibleMoves.filter(function(move) {
        return board[move.x * boardSize + move.y] === -1;
    });
    
    
    nonTakenMoves.forEach(function(move) {
        tryPath(board.slice(), move.x, move.y);
    })

}

function knightsTour() {
    var board = Array(boardSize*boardSize);
    board.fill(-1);
    tryPath(board, 0,0);
}

knightsTour();