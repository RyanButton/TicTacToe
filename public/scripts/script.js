let board = [
    [-1,-1,-1],
    [-1,-1,-1],
    [-1,-1,-1],
]

let turn = 1;
let turnsMade = 0;
let boardUnlocked = true;
let MAX_MOVES = 9;

let updateGrid = (index) => {
    let i1 = parseInt(index.charAt(0))
    let i2 = parseInt(index.charAt(1))

    if(board[i1][i2] == -1 && boardUnlocked) {
        board[i1][i2] = turn;

        
        if(checkForWin(i1, i2)) {
            processWin();
            updateCell(index);
            boardUnlocked = false;
        } else if(turnsMade >= MAX_MOVES-1) {
            processDraw();
            updateCell(index);
            boardUnlocked = false;
        } else {
            updateCell(index);
            toggleTurn();
            turnsMade++;
        }
    }
}

let toggleTurn = () => {
    (turn == 1) ? document.getElementById('message').innerHTML = 'Naughts turn!' :
                    document.getElementById('message').innerHTML = 'Crosses turn!';
    (turn == 1) ? turn = 0 : turn = 1;
    
}

let updateCell = (index) => {
    (turn == 1) ? document.getElementById(index).innerHTML = 'X' :
                    document.getElementById(index).innerHTML = 'O';
}

let checkForWin = (i1, i2) => {
    if(board[i1][0] == turn && board[i1][1] == turn && board[i1][2] == turn) {
        return true;
    }
    else if(board[0][i2] == turn && board[1][i2] == turn && board[2][i2] == turn) {
        return true;
    }
    else if(i1 == i2) {
        if(board[0][0] == turn && board[1][1] == turn && board[2][2] == turn) {
            return true;
        }
    }
    else if(i1 + i2 == board[0].length-1) {
        if(board[0][2] == turn && board[1][1] == turn && board[2][0] == turn) {
            return true;
        }
    }

    return false;
}

let processWin = () => {
    let message = "";
    switch(turn) {
        case 0:
            message = "Naughts win!"
            break;
        case 1:
            message = "Crosses win!"
            break;
    }

    document.getElementById('message').innerHTML = `${message} <button onClick="reset()">Reset</button>`;
}

let processDraw = () => {
    document.getElementById('message').innerHTML = `Draw! <button onClick="reset()">Reset</button>`;
}

let reset = () => {
    board = [
        [-1,-1,-1],
        [-1,-1,-1],
        [-1,-1,-1],
    ]
    
    turn = 1;
    turnsMade = 0;
    boardUnlocked = true;
    document.getElementById('message').innerHTML = 'Crosses turn!'
    let cells = document.querySelectorAll("div.cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
    }
}