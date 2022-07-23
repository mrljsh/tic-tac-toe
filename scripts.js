let displayBoard = function(){
    const createBoard = function() {
        const board = document.createElement('div');
        board.classList.add('board');
        board.setAttribute("id", "board")
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add("cell");
            cell.setAttribute("data-cell", i);
            board.appendChild(cell);
        }
        document.body.appendChild(board);
    }();

    const clickListener = function() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener("click", () => {
                addXorO(cell);
                gameBoard.makeMove(cell.dataset.cell);
                
            });
        });
    }();

    const addXorO = (cell) => {
            const para = document.createElement("p");
            para.textContent = gameBoard.getTurnSign();
            cell.appendChild(para);
    }

    return {createBoard};
}();

const gameBoard = (() => {

    let turn = "X";
    let board = new Array(9).fill(null);

    const nextTurn = () => {
        turn = turn === "X" ? "O" : "X";
    }

    const makeMove = (index) => {
        if(board[index]){
            return;
        };
        board[index] = turn;
        nextTurn();
        showBoard();
    }

    const showBoard = () => {
        console.log(board);
    };

    const getTurnSign = () => {
        return turn;
    }


    return {showBoard, nextTurn, makeMove, getTurnSign};
})();