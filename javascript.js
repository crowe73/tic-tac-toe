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

                        // Render clicked play on the correct grid box and display on DOM.
                        if (gridBox.getAttribute("data-linked-button") == makeMoves.getAttribute("data-linked-button"))
                        {
                            gridBox.textContent = gameBoardModule.gameBoard[gameBoardModule.gameBoard.length -1];
                            console.log("Show me my makeMoves linked button value...", makeMoves.dataset.linkedButton);
                            console.log("Show me my gridBox linked button value...", gridBox.dataset.linkedButton);
                        }
                    index++;
                    })

                    // Run local function to check for win/disable gameboard from further play/display winner on DOM.
                    function checkWin(player)
                    {
                        const horizontal = [0,3,6].map(i=>{return[i,i+1,i+2]});
                        const vertical = [0,1,2].map(i=>{return[i,i+3,i+6]});
                        const diagonal = [[0,4,8],[2,4,6]];

                        let allWins = [].concat(horizontal).concat(vertical).concat(diagonal);

                        let results = allWins.some(indices => 
                            {
                                return gridBoxes[indices[0]].textContent == player && 
                                gridBoxes[indices[1]].textContent == player && 
                                gridBoxes[indices[2]].textContent == player
                            })
                            return results;
                    }

                    if (checkWin("x") == true)
                    {
                        console.log(gameBoardModule.playerArray[0], " wins!");
                        const body = document.querySelector("body");
                        const playerWinMessage = document.createElement("h1");
                        playerWinMessage.textContent = (gameBoardModule.playerArray[0] + " wins!");
                        body.appendChild(playerWinMessage);
                        makeMove.forEach(makeMoves => 
                            {
                                makeMoves.remove();
                            });
                        startGameButton.remove();
                        return;
                    }

                    else if (checkWin("o") == true)
                    {
                        console.log(gameBoardModule.playerArray[3], " wins!");
                        const body = document.querySelector("body");
                        const playerWinMessage = document.createElement("h1");
                        playerWinMessage.textContent = (gameBoardModule.playerArray[3] + " wins!");
                        body.appendChild(playerWinMessage);
                        makeMove.forEach(makeMoves => 
                            {
                                makeMoves.remove();
                            });
                        startGameButton.remove();
                        return;
                    }

                    else if (gameBoardModule.gameBoard.length == 9)
                    {
                        console.log("Tie!");
                        const body = document.querySelector("body");
                        const playerWinMessage = document.createElement("h1");
                        playerWinMessage.textContent = ("Tie!");
                        body.appendChild(playerWinMessage);
                        makeMove.forEach(makeMoves => 
                            {
                                makeMoves.remove();
                            });
                        startGameButton.remove();
                        return;
                    }

            gameBoardModule.makePlayerMove();
            }

        index++;
        })

        // Listen for click to start the game.
        const startGameButton = document.querySelector(".start-game-button");
        startGameButton.addEventListener("click", createPlayer);

        // Listen for click to restart the game.
        const clearBoardButton = document.querySelector(".clear-board-button");
        clearBoardButton.addEventListener("click", clearBoard);

        function clearBoard()
        {
            location.reload();
        }
})();