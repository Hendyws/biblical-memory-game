//Elementos selecionados

const inputLogin = document.querySelector('.login-input');
const button = document.querySelector('.login-button');
// const form = document.querySelector('form')

const containerInfo = document.querySelector('.info')
const containerGames = document.querySelector('.games')

const btnClose = document.querySelectorAll('.btn-close');
const btnInfo = document.querySelector('.btn-info');
const btnOtherGame = document.querySelector('.other-games');

//Eventos
//Abertura do Menu e Jogos
if(btnOtherGame){
  btnOtherGame.addEventListener('click', (event) =>{
    event.preventDefault();
    containerGames.style.cssText = `
      width: 100vw;
      visibility: visible;
      overflow-x: auto;
    `;
  });
};

//Abertura das Informações
if(btnInfo){
  btnInfo.addEventListener('click', (event)=>{
    event.preventDefault();
    containerInfo.style.cssText = `
      width: 100vw;
      visibility: visible;
      overflow-x: auto;
    `;
  });
};

//Loop de fechamento dos menus

btnClose.forEach((elem)=>{
  elem.addEventListener('click', ()=>{
    containerInfo.style.cssText = `
    width:  0vw;
  `;
  containerGames.style.cssText = `
    width:  0vw;
  `;
  });
});

//Coleta da entrada do Input
if(inputLogin){
  inputLogin.addEventListener('input', ({target})=>{
    if(target.value.length >= 2) {//Verificação da quantidade de caracteres
      button.removeAttribute('disabled');//Deixa habilitado o Botão de Jogar.
    } else {
      button.setAttribute('disabled', '')//Deixa desabilitado o Botão de Jogar.
    }
  });
};



//Iniciar o Jogo
if(button){
  button.addEventListener('click', (event)=>{
    event.preventDefault();//Retira a atualização da página ao enviar
    validateUser(inputLogin.value);
    window.location = '../../pages/game-memory.html';       
  });
};

const validateUser = (player) => {
  if(0 === localStorage.length) {
    console.log(player,' é o primeiro jogador');
    localStorage.setItem(`${player}`,100);
    return ;
  }
  for(let i = 0; i < localStorage.length; i++) {
    if(localStorage.key(i) === player) {
      console.log('O jogador já existe');
      return;
    }
  }
  for(let e = 0; e <localStorage.length; e++) {
    if(localStorage.key(e) !== player) {
      console.log('Um novo jogador foi adicionado');
      localStorage.setItem(`${player}`,100)
      return;
    }
  }
}

