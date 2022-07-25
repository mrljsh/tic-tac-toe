const gameBoard = (() => {
    let turn = "X";
    let gameBoardArray = Array(9).fill(null);

    const getArray = () => {return gameBoardArray};

    const nextTurn = () => { turn = turn === "X" ? "O" : "X" }

    const makeMove = index => {
        if(gameBoardArray[index] !== null) {
            return;
        }
        gameBoardArray[index] = turn;
        nextTurn();
    };

    return { getArray, makeMove };
})();

const displayBoard = (() => {

    const createBoard = function() {
        const board = document.createElement('div');
        board.classList.add('board');
        board.setAttribute("id", "board")
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            const para = document.createElement("p");
            cell.classList.add("cell");
            para.classList.add("field");
            cell.appendChild(para)
            board.appendChild(cell);
        }
        document.body.appendChild(board);
    }();

    const showArray = console.log(gameBoard.getArray());

    return { createBoard, showArray };
})();