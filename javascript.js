// Player factory function.
let createPlayer = () => 
{
    // Loop twice to capture the player's first name and auto assign player number.
    for (let i = 0; i < 4; i++)
    {
        if (gameBoardModule.playerArray.length >= 6)
        {
            gameBoardModule.makePlayerMove();
            break;
        }
        else if (gameBoardModule.playerArray.length == 0)
        {
            let playerName = prompt("Player 1, what is your first name?");

            if (playerName == "" || playerName == null)
            {
                alert("Sorry, name cannot be blank");
                continue;
            }

            let playerNumber = 1;
            let assignedXO = "x";
            alert("You are player 1, and your assigned letter is x.");
            gameBoardModule.playerArray.push(playerName, playerNumber, assignedXO);
            console.log("Show me the contents of the playerArray...", gameBoardModule.playerArray);
            //return {playerName, playerNumber, assignedXO};
        }
        else if (gameBoardModule.playerArray.length !== 0)
        {
            let playerName = prompt("Player 2, what is your first name?");

            if (playerName == "" || playerName == null)
            {
                alert("Sorry, name cannot be blank");
                continue;
            }

            let playerNumber= 2;
            let assignedXO = "o";
            alert("You are player 2, and your assigned letter is o");
            gameBoardModule.playerArray.push(playerName, playerNumber, assignedXO);
            console.log("Show me the contents of the playerArray...", gameBoardModule.playerArray);
            //return {playerName, playerNumber, assignedXO};
        }
    }
};

// Gameboard module.
let gameBoardModule = (() => 
{
    let gameBoard = [];
    let playerArray = [];

    // Publicly exposed function to invoke the player's next move.
    let makePlayerMove = () => 
    {
        // Check for two player submission and gameboard array doesn't spill over grid boxes.
        if (playerArray.length == 6 && gameBoard.length < 9)
        {
            // Controls for player moves.
            if (gameBoard.length == 0)
            {
                alert("Player 1, please make your move.");
                gameBoard.push(playerArray[2]);
                console.log("Show me the current gameboard array...", gameBoard);
            }
            else if (gameBoard[gameBoard.length - 1] == "x")
            {
                alert("Player 2, please make your move");
                gameBoard.push(playerArray[5]);
                console.log("Show me the current gameboard array...", gameBoard);
            }
            else if (gameBoard[gameBoard.length - 1] == "o")
            {
                alert("Player 1, please make your move");
                gameBoard.push(playerArray[2]);
                console.log("Show me the current gameboard array...", gameBoard);
            }
        }
    };

    return {gameBoard, playerArray, makePlayerMove};
})();

// Display Controller module.
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

            gameBoardModule.makePlayerMove();
            }

        index++;
        })

        // Listen for click to start the game.
        const startGameButton = document.querySelector(".start-game-button");
        startGameButton.addEventListener("click", createPlayer);
})();