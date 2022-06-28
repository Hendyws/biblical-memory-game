let firstCard = '';
let secondCard = '';
let attempts = 0; //Número de tentativas
let lastPoints = 0;
let user;

const playerName = document.querySelector('.name');
const playerAttempts = document.querySelector('.attempts');
const timerCounter = document.querySelector('.time-counter');
const finish = document.querySelector('.finish');
const select = document.querySelector('#select');

const grid = document.querySelector('.container-cards');

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// OPÇÕES
(function(){
  document.querySelectorAll('.player')[0].style.display = 'none';
  timerCounter.style.display = 'none';
  for(let i = 0; i < localStorage.length; i++) {
    select.innerHTML += `<option value="${localStorage.key(i)}">${localStorage.key(i)}</option>`;
  }

  select.addEventListener('click', (e)=>{
    user = e.target.value;
    btnStart.removeAttribute('disabled');
    btnStart.style.color = '#e36835';
    btnClear.removeAttribute('disabled');
    btnClear.style.color = '#f00';
    playerAttempts.innerHTML = `
      Pontuação ${(localStorage.getItem(e.target.value))<10 ? '0'+localStorage.getItem(e.target.value):localStorage.getItem(e.target.value)}
    `;
  })
  const btnStart = createElement('button', 'start');
  finish.appendChild(btnStart);
  btnStart.innerHTML = 'INICIAR';
  btnStart.setAttribute('disabled', '');
  btnStart.style.cssText = `
      height: 40px;
      width: 90px;
      background-color: #fff;
      border-radius: 5px;
      font-size: .7rem;
  `;
  btnStart.addEventListener('click',()=>{
    timerCounter.style.display = 'block';
    document.querySelectorAll('.player')[0].style.display = 'flex';
    finish.style.display = 'none';
    btnStart.style.display = 'none';
    document.querySelector('.msg').style.display = 'none';
    playerAttempts.innerHTML = 0;
    playerName.innerHTML = user;
    showTimer();
    loadGame();
  })
  const btnReturn = createElement('button', 'return');
  finish.appendChild(btnReturn);
  btnReturn.innerHTML = 'MENU';
  btnReturn.style.cssText = `
      height: 40px;
      width: 90px;
      background-color: #fff;
      color: #e36835;
      border-radius: 5px;
      font-size: .7rem;
      float: left;
  `;
  btnReturn.addEventListener('click', ()=>{
    window.location = '../../index.html';
  })

  const btnClear = createElement('button', 'clear');
  finish.appendChild(btnClear);
  btnClear.innerHTML = 'APAGAR TUDO';
  btnClear.setAttribute('disabled', '');
  btnClear.style.cssText = `
      height: 40px;
      width: 90px;
      background-color: #fff;
      border-radius: 5px;
      font-size: .7rem;
  `;
  btnClear.addEventListener('click', ()=>{
    let answer = confirm(`${user}, você deseja APAGAR todas os jogadores registrados?`)
    if(answer) {
      localStorage.clear();
      window.location = '../../index.html';
    }
  })
})()



const createCard = (person) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'card-face front');
  const back = createElement('div', 'card-face back');

  front.style.backgroundImage = `url(../src/img/${person}.png)`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', ({target})=>{
    if(target.parentNode.className.includes('reveal-card')) {
      return
    }
    if(firstCard == '') {
      target.parentNode.classList.add('reveal-card');
      firstCard = target.parentNode;
    } else if(secondCard == '') {
      target.parentNode.classList.add('reveal-card');
      secondCard = target.parentNode;
      analyzingCards();
    }
  })
  card.setAttribute('data-name', person);
  return card;
}

const loadGame = () => {

  const cards = [...cardsBible, ...cardsBible];
  const cardsShuffled = cards.sort(()=> Math.random()-0.5);

  cardsShuffled.forEach((cardsBible)=>{
    const card = createCard(cardsBible);
    grid.appendChild(card);
  })
}
// loadGame();

//FUNCTION


function analyzingCards () {
  const firstPerson =  firstCard.getAttribute('data-name');
  const secondPerson = secondCard.getAttribute('data-name');
  if(firstPerson === secondPerson) {
    firstCard.firstChild.classList.add('card-ok');
    secondCard.firstChild.classList.add('card-ok');
    firstCard = '';
    secondCard = '';
    
    analyzingVictory();

  } else {
    setTimeout(()=>{
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
      firstCard = '';
      secondCard = '';

      wrongAttempts();
    }, 1000)
  }
}

function analyzingVictory() {
  const cardOk = document.querySelectorAll('.card-ok');
  if(cardOk.length == 24) {
    if(localStorage.getItem(user)>attempts){
      finish.style.display = 'flex';
      finish.innerHTML = `${user}, você tentou ${attempts} vezes. Seu record atual é ${localStorage.getItem(`${user}`)} e será substituído.`;
      localStorage.setItem(`${user}`,`${attempts}`);
      timerCounter.innerHTML = '00:00';
    }else{
      finish.style.display = 'flex';
      finish.innerHTML = `${user}, você tentou ${attempts} vezes. Seu record atual continuará sendo ${localStorage.getItem(`${user}`)}`;
      timerCounter.innerHTML = '00:00';
    }
    window.setTimeout(()=>{
      window.location = '../../index.html';
    }, 10000)
  }
}

//TIME

function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
          // timer = duration;
          timerCounter.innerHTML = '00:00';
          finish.style.display = 'flex';
          finish.innerHTML = `${user} seu tempo acabou!`;
          grid.style.display = 'none';
          window.setTimeout(()=>{
            window.location = '../../index.html';
          }, 10000)
      }
  }, 1000);
}

const showTimer = () => {
  let oneMinutes = 60 * 2;
      startTimer(oneMinutes, timerCounter);
};

//DADOS USUÁRIO

playerAttempts.innerHTML = attempts;
const wrongAttempts = () => {
  attempts++;
  playerAttempts.innerHTML = attempts;
}