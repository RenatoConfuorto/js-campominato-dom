// ELEMENTI DEL DOM  
const main = document.getElementById('main');
const difficultyDisplay = document.getElementById('difficulty');
const actionBtn = document.getElementById('action-btn');

//dati inseriti dall'utente da raccogliere
let difficulty;
let gridSize;

const activeCells = [];
//generare la griglia al click del bottone
actionBtn.addEventListener('click', startGame);

function startGame(){
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

  createGrid();
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
  const cellsNumber = gridSize * gridSize;
  createCells(grid, cellsNumber);

  main.append(grid);
}

function createCells(element, number){
  for(let i = 0; i < number; i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.innerHTML = i + 1;

    cell.addEventListener('click', function(){
      this.classList.add('active');
      activeCells.push(cell);

      //controllare se sono finite le celle cliccabili
      checkForWin(activeCells, cellsNumber);
    });

    element.append(cell);
  }
}

function checkForWin(array, number){

  if(array.length === number){
    alert('Hai Vinto');
  }

}