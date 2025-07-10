let board=[];
let currentPlayer="X";
let gameActive=false;
let playerXName="";
let playerOName="";
const statusText=document.getElementById("statusText");
const boardContainer=document.getElementById("board");
function startGame(){
  playerXName=document.getElementById("playerX").value ||"Player 1";
  playerOName=document.getElementById("playerO").value ||"Player 2";
  currentPlayer="X";
  board=Array(9).fill("");
  gameActive=true;
  statusText.textContent=`${playerXName}'s Turn (X)`;
  renderBoard();
}
function renderBoard(){
  boardContainer.innerHTML="";
  board.forEach((cell, index)=>{
    const cellDiv=document.createElement("div");
    cellDiv.classList.add("cell");
    if (cell==="X") cellDiv.classList.add("x");
    if (cell==="O") cellDiv.classList.add("o");
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click",()=>handleCellClick(index));
    boardContainer.appendChild(cellDiv);
  });
}
function handleCellClick(index){
  if (!gameActive) return;
  if (board[index]!=="") {
    statusText.textContent="This box is already occupied!";
    setTimeout(()=>{
      const name = currentPlayer==="X" ? playerXName:playerOName;
      statusText.textContent = `${name}'s Turn (${currentPlayer})`;
    }, 1500);
    return;
  }
  board[index]=currentPlayer;
  renderBoard();
  checkResult();
  if (gameActive) {
    currentPlayer = currentPlayer==="X"?"O":"X";
    const name=currentPlayer==="X" ?playerXName:playerOName;
    statusText.textContent=`${name}'s Turn (${currentPlayer})`;
  }
}
function checkResult(){
  const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let pattern of winPatterns){
    const [a,b,c]=pattern;
    if (board[a] && board[a]===board[b] && board[a]===board[c]){
      const cells = document.querySelectorAll(".cell");
      cells[a].classList.add("winning");
      cells[b].classList.add("winning");
      cells[c].classList.add("winning");
      const winnerName=currentPlayer==="X" ?playerXName:playerOName;
      statusText.textContent=`${winnerName} Won the Game!`;
      gameActive=false;
      return;
    }
  }
  if (!board.includes("")){
    statusText.textContent="It is a Draw..Please play again!";
    gameActive=false;
  }
}
function resetGame(){
  document.getElementById("playerX").value="";
  document.getElementById("playerO").value="";
  board = Array(9).fill("");
  boardContainer.innerHTML="";
  statusText.textContent="Enter names and press Start";
  gameActive=false;
}