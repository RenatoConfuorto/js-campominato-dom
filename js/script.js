// ELEMENTI DEL DOM  
const main = document.getElementById('main');
const difficultyDisplay = document.getElementById('difficulty');
const actionBtn = document.getElementById('action-btn');

//dati inseriti dall'utente da raccogliere
let difficulty;
let gridSize;
let cellsNumber;
let safeCells;

let activeCells = [];
//generare la griglia al click del bottone
actionBtn.addEventListener('click', startGame);

//generare le bombe
const bombCount = 16;
let bombPosition = [];
let foundBomb = false;

function generateBomb(number, size){
  while(bombPosition.length < number){
    const randomNumber = generateRandomInteger(1, size);
    if(!bombPosition.includes(randomNumber)){
      bombPosition.push(randomNumber);
    }
  }
}


function generateRandomInteger(min, max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function startGame(){
  //reimpostare i valori di partenza se si comincia una nuova partita
  foundBomb = false;
  activeCells = [];
  bombPosition = [];
  //raccogliere i dati dell'utente e creare la griglia
  difficulty = difficultyDisplay.value;
  switch(difficulty){
    case 'easy': 
      gridSize = 10;
      break;
  
    case 'medium':
      gridSize = 9;
      break;
  
    case 'hard':
      gridSize = 7;
      break;
  
  }

  cellsNumber = gridSize * gridSize;
  safeCells = cellsNumber - bombCount;

  createGrid();
  generateBomb(bombCount, cellsNumber);
  console.log(bombPosition);
  
}


function createGrid(){
  //resettare l'elemento
  main.innerHTML = '';
  main.className = difficulty;
  //creare il div della griglia
  const grid = document.createElement('div');
  grid.classList.add('container');
  grid.setAttribute('id', 'grid');
  //creare le celle
  createCells(grid, cellsNumber);

  main.append(grid);
}

function createCells(element, number){
  for(let i = 0; i < number; i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.innerHTML = i + 1;

    cell.addEventListener('click', clickEvent);

    element.append(cell);
  }
}


function clickEvent(){
  const activatedCellNumber = parseInt(this.textContent);
  //interrompere se è già stata cliccata
  console.log('cella cliccata');
  //controllare se cìè la bomba
  if(bombPosition.includes(activatedCellNumber)){
    this.classList.add('active', 'bomb');
    foundBomb = !foundBomb;
    endGame();
  }else{
    this.classList.add('active');
    activeCells.push(this);
    endGame();
  }
}


function endGame(){
  if(activeCells.length === safeCells){
    main.innerHTML += `<h2>Hai Vinto!!!</h2>`
  }

  if(foundBomb){
    main.innerHTML += `<h2>Hai Perso! Hai scoperto ${activeCells.length} celle su ${safeCells}</h2>`
    //mostrare tutte le bombe
    showBombs();
  }
}

function showBombs(){
  for(let i = 0; i < bombPosition.length; i++){
    const currentElement = document.querySelector(`div:nth-child(${bombPosition[i]})`);
    // console.log(currentElement);
    currentElement.classList.add('bomb');
  }
}
