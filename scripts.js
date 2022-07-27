const gameBoard = (() => {
    let turn = "X";
    let gameBoardArray = Array(9).fill(null);
    let isOver = false;
    let round = 0;

    const getArray = () => {return gameBoardArray};

    const nextTurn = () => { 
        turn = turn === "X" ? "O" : "X";
        round++;
     };

    const getTurn = () => {return turn};

    const getIsOver = () => {return isOver};

    const getRound = () => {return round;}

    const makeMove = index => {
        if(isOver === true){
            return;
        }

        if(round >= 9){
            return;
        }

        if(gameBoardArray[index] !== null) {
            return;
        }

        gameBoardArray[index] = turn;
        nextTurn();
        checkWinner();
    };

    const checkWinner = () => {
        const winningCombination = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]];

        let winnersCombination = [];
    
        for (let index = 0; index < winningCombination.length; index++){
            if(gameBoardArray[winningCombination[index][0]] === gameBoardArray[winningCombination[index][1]] &&
                gameBoardArray[winningCombination[index][1]] === gameBoardArray[winningCombination[index][2]] &&
                gameBoardArray[winningCombination[index][0]] !== null) {
                    isOver = true;
                    winnersCombination = winningCombination[index];
                };
        };

        return winnersCombination;
    };

    const reset = () => {
        for (let i = 0; i < gameBoardArray.length; i++) {
            gameBoardArray[i] = null;
        }
        round = 0;
        turn = "X";
        isOver = false;
        displayBoard.displayReset();
    };

    return { getArray, makeMove, getTurn, getIsOver, checkWinner, getRound, reset };
})();

const displayBoard = (() => {

    const createBoard = function() {
        const announcer = document.createElement('p');
        announcer.classList.add('announcer')
        announcer.textContent = "CLICK TO PLAY";

        const board = document.createElement('div');
        board.classList.add('board');
        board.setAttribute("id", "board")

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            const para = document.createElement("p");
            cell.classList.add("cell");
            para.classList.add("field");
            cell.appendChild(para);
            board.appendChild(cell);
        }

        document.body.appendChild(announcer);
        document.body.appendChild(board);
    }();

    const boardArray = gameBoard.getArray();
    const announcer = document.querySelector(".announcer");
    const fields = document.querySelectorAll(".field");

    const updateGameBoard = () => {
        for (let i = 0; i < boardArray.length; i++) {
            fields[i].textContent = boardArray[i];
        }
        announcer.textContent = `PLAYER ${gameBoard.getTurn()}'s TURN`;

        if(gameBoard.getRound() > 8 && gameBoard.getIsOver() === false){
            updateDraw(); 
        }

        if(gameBoard.getIsOver() === true){
            const winningCombination = gameBoard.checkWinner();
            updateWinner(winningCombination);
        }
    };

    const clickToPlay = (() => {
        const clickToPlayCells = document.querySelectorAll(".cell");
        clickToPlayCells.forEach((cell, index) => {
            cell.addEventListener("click", () => {
                gameBoard.makeMove(index);
                updateGameBoard();
            });
        });
    })();

    const updateWinner = (winningCombination) => {
        const winner = boardArray[winningCombination[0]];
        announcer.textContent = `PLAYER ${winner}'s WIN`;
        announcer.classList.add("winner");
        for (let i = 0; i < winningCombination.length; i++) {
            fields[winningCombination[i]].classList.add("winner")
        }
    } 

    const updateDraw = () => {
        announcer.textContent = "ITS DRAW! Play again";
        announcer.classList.remove("winner");
        announcer.classList.add("draw");
    }

    const displayReset = () => {
        announcer.textContent = "CLICK TO PLAY!"
        announcer.classList.remove("winner", "draw");
        fields.forEach(field => {
            field.classList.remove("winner");
        });
        updateGameBoard();
    }

    return { createBoard, boardArray, updateGameBoard, updateWinner, updateDraw, displayReset };
})();