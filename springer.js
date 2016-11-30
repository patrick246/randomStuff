const boardSize = 8;
const printEvery = 25000;

var _currentMax = -1;
var itCnt = 0;
var lastTime = Date.now();


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

function getNonTakenMoves(board, x, y) {
	var possibleMoves = getMovesForPosition(x, y);
	var nonTakenMoves = possibleMoves.filter(function(move) {
		return board[convertToIndex(move.x, move.y)] === -1;
	});
	return nonTakenMoves;
}

var msg = "";
function tryPath(board, x, y, n) {
    itCnt++;
	if(_currentMax < n) {
        //console.log("new max:", n);
        _currentMax = n;
    }
    
    board[convertToIndex(x,y)] = n;
	
	//commented out because stupidly slow due to memory allocation
	/*for(j = 0; j < boardSize; j++) { //check for almost unreachable fields
		for(i = 0; i < boardSize; i++) {
			if(board[convertToIndex(i,j)] === -1){
				var nonTakenMoves = getNonTakenMoves(board, i, j);
				if(nonTakenMoves.length === 0) {
					msg = "found 0 nonTakenMoves for "+i+' '+j;
					return false;
				}
			}
		}
	}*/
	
	
	if(itCnt % printEvery == 0) {
		renderBoard(board);
		renderProgress(n);
		var diff = Date.now() - lastTime;
		lastTime = Date.now();
		console.log((printEvery/(diff/1000)).toFixed(),"iterations per second [IPS] (Took",diff,"ms).\nIteration counter:",itCnt);
	}

    if(n === (boardSize*boardSize - 1))
        return board;

    /*var possibleMoves = getMovesForPosition(x, y);
    var nonTakenMoves = possibleMoves.filter(function(move) {
        return board[convertToIndex(move.x, move.y)] === -1;
    });*/
	var nonTakenMoves = getNonTakenMoves(board, x, y);

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

function convertToXY(index) {
	return {x: index%boardSize, y: index/boardSize};
}

function twoDigits(num) {
    return (" " + num).slice(-2);
}

function renderBoard(board) {
    process.stdout.write('\033c');
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

function renderProgress(n) {
    console.log(
        "["+ "=".repeat((n/(boardSize*boardSize-1)*24)) + 
             " ".repeat(24-(n/(boardSize*boardSize-1)*24)) +"]");
}

function knightsTour() {
    var board = Array(boardSize*boardSize);
    board.fill(-1);
    var result = tryPath(board, 0, 0, 0);
    if(result !== false) {
        renderBoard(result);
        console.log("########## FOUND PATH ###########");
    } else {
        console.log("Keine Lösung gefunden :(");
		console.log(msg);
    }
}

process.stdout._handle.setBlocking(true);
knightsTour();