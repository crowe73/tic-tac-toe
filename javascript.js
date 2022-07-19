// Setup the gameboard module.
let gameBoardModule = (() => 
{
    let gameBoard = ["x"];
    return {gameBoard};
})();

// Setup the displayController module to control whose turn it is.
let displayControllerModule = (() => 
{
    const makeMove = document.querySelectorAll(".game-board-button");

    // Start indexing and looping through each button node.
    let index = 0;
    makeMove.forEach(makeMoves => 
        {
            makeMoves.dataset.linkedButton = index;
            makeMoves.addEventListener("click", renderArrayToScreen);

            function renderArrayToScreen()
            {
                const gridBoxes = document.querySelectorAll(".grid-box");

                // Start indexing and looping through each grid box node.
                let index = 0;
                gridBoxes.forEach(gridBox => 
                    {
                        gridBox.dataset.linkedButton = index;

                        // Render clicked play on the correct grid box and display.
                        if (gridBox.getAttribute("data-linked-button") == makeMoves.getAttribute("data-linked-button"))
                        {
                            gridBox.textContent = gameBoardModule.gameBoard[gameBoardModule.gameBoard.length -1];
                            console.log("Show me my makeMoves linked button value...", makeMoves.dataset.linkedButton);
                            console.log("Show me my gridBox linked button value...", gridBox.dataset.linkedButton);
                        }
                    index++;
                    })
            }
        index++;
        })

    let testF = () => 
    {
        console.log("testing private function call inside of a module object...")
    };
    return {testF};
})();

// Setup the player factory function.
let createPlayer = (playerName, playerNumber, assignedXO) => 
{
    let getPlayerName = () => 
    {
        playerName;
        console.log("This the name of player " + playerNumber + "..." + playerName);
    }
    return {getPlayerName, playerName, playerNumber, assignedXO};
};

// TODO: Create inputs for name, and assignedXO - asking them for their preference.
// TODO: Do I need to assign player numbers?

let Chad = createPlayer("Chad", 1, "x");
let Kandy = createPlayer("Kandy", 2, "o");