var state = { currentGame: [], savedGames: [], board: [] };

function start() {
  readLocalStorage();
  createBoard();
  newGame();
}

function readLocalStorage() {
  if (!window.localStorage) {
    return;
  }

  var savedGames = window.localStorage.getItem('saved-games');

  if (savedGames) {
    state.savedGames = JSON.parse(savedGames);
  }
}

function writeLocalStorage() {
  window.localStorage.setItem('saved-games', JSON.stringify(state.savedGames));
}

function createBoard() {
  state.board = [];

  for (var i = 1; i <= 60; i++) {
    state.board.push(i);
  }
}

function newGame() {
  state.currentGame = [];
  render();
}

function render() {
  renderBoard();
  renderButtons();
  renderSavedGames();
}

function renderBoard() {
  var divGame = document.querySelector('#megasena-numbers');
  divGame.innerHTML = '';

  var ulGames = document.createElement('ul');
  ulGames.classList.add('numbers');

  for (var i = 0; i < state.board.length; i++) {
    var currentNumber = state.board[i];

    var liGame = document.createElement('li');
    liGame.textContent = currentNumber.toString().padStart(2, '0');
    liGame.classList.add('number');

    liGame.addEventListener('click', handleNumberClick);

    if (state.currentGame.includes(currentNumber)) {
      liGame.classList.add('selected-number');
    }

    ulGames.appendChild(liGame);
  }

  divGame.appendChild(ulGames);
}

function handleNumberClick(event) {
  var element = event.currentTarget;
  var clickedNumber = Number(element.textContent);

  var numberInGame = state.currentGame.includes(clickedNumber);
  var totalNumbers = state.currentGame.length;

  if (numberInGame) {
    removeNumberFromGame(clickedNumber);
  } else {
    if (totalNumbers === 6) {
      return;
    } else {
      addNumberToGame(clickedNumber);
    }
  }

  render();
}

function removeNumberFromGame(numberToRemove) {
  var newGame = [];

  for (var i = 0; i < state.currentGame.length; i++) {
    var currentNumber = state.currentGame[i];

    if (currentNumber === numberToRemove) {
      continue;
    }

    newGame.push(currentNumber);
  }

  state.currentGame = newGame;
}

function addNumberToGame(numberToAdd) {
  state.currentGame.push(numberToAdd);
  state.currentGame.sort();
}

function renderButtons() {
  var divButtons = document.querySelector('#megasena-buttons');
  divButtons.innerHTML = '';

  var ulButtons = document.createElement('ul');
  ulButtons.classList.add('buttons');

  var liNewGameButton = renderNewGameButton();
  var liRandomGameButton = renderRandomGameButton();
  var liSaveGameButton = renderSaveGameButton();

  ulButtons.appendChild(liNewGameButton);
  ulButtons.appendChild(liRandomGameButton);
  ulButtons.appendChild(liSaveGameButton);

  divButtons.appendChild(ulButtons);
}

function renderNewGameButton() {
  var li = document.createElement('li');
  li.classList.add('button');

  var button = document.createElement('button');

  button.textContent = 'Novo jogo';
  button.addEventListener('click', newGame);

  li.appendChild(button);

  return li;
}

function renderRandomGameButton() {
  var li = document.createElement('li');
  li.classList.add('button');

  var button = document.createElement('button');

  button.textContent = 'Jogo aleatório';
  button.addEventListener('click', function () {
    randomGame();
  });

  li.appendChild(button);

  return li;
}

function renderSaveGameButton() {
  var li = document.createElement('li');
  li.classList.add('button');

  var button = document.createElement('button');

  button.textContent = 'Salvar jogo';
  button.disabled = state.currentGame.length !== 6;

  button.addEventListener('click', handleSaveGame);

  li.appendChild(button);

  return li;
}

function handleSaveGame() {
  state.savedGames.push(state.currentGame);
  writeLocalStorage();
  newGame();
}

function renderSavedGames() {
  var divSavedGames = document.querySelector('#megasena-saved-games');
  divSavedGames.innerHTML = '';

  if (state.savedGames.length === 0) {
    divSavedGames.innerHTML = '<p>Nenhum jogo gravado até o momento.</p>';
  } else {
    var h2 = document.createElement('h2');
    h2.textContent = 'Jogos salvos';

    var ul = document.createElement('ul');
    ul.classList.add('saved-games');

    for (var i = 0; i < state.savedGames.length; i++) {
      var currentGame = state.savedGames[i];

      var li = document.createElement('li');

      var numbers = currentGame
        .map(number => number.toString().padStart(2, '0'))
        .join(' ');

      li.textContent = numbers;

      ul.appendChild(li);
    }

    divSavedGames.appendChild(h2);
    divSavedGames.appendChild(ul);
  }
}

function randomGame() {
  state.currentGame = [];

  while (state.currentGame.length < 6) {
    var newNumber = Math.ceil(Math.random() * 60);
    newNumber = Math.max(newNumber, 1);

    if (!state.currentGame.includes(newNumber)) {
      state.currentGame.push(newNumber);
    }
  }

  state.currentGame.sort();

  render();
}

start();
