// Setup the gameboard module.
let gameBoardModule = (() => 
{
    let gameBoard = ["x"];
    return {gameBoard};
})();

// Setup the displayController module.
let displayControllerModule = (() => 
{
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

// Set up the render module for array display to the gameboard.
let renderArrayToScreenModule = (() => 
{
    const gridBoxes = document.querySelectorAll(".grid-box");
    gridBoxes[0].textContent = gameBoardModule.gameBoard;
    console.log("Show me the array as seen inside of renderArrayToScreenModule...", gameBoardModule.gameBoard);
    console.log("Show me the node list of the gridBoxes as seeninside of renderArrayToScreenModule...", gridBoxes);
    return {};
})();

// TODO: Create inputs for name, and assignedXO - asking them for their preference.
// TODO: Do I need to assign player numbers?

let Chad = createPlayer("Chad", 1, "x");
let Kandy = createPlayer("Kandy", 2, "o");

renderArrayToScreenModule;