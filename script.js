


const dino = document.querySelector(".dino");
const background = document.querySelector(".background");

let position = 0; //será a posição inicial do dino
let isJumping = false;

//(event) esta descrevendo que esta função irá ter um parametro de evento
function handleKeyUp(event) {
    //event.keyCode, onde você ira confirmar o evento, ou seja, onde você ver qual tecla deverá ser usada
    if (event.keyCode === 32) {
        if(!isJumping) {
         jump();
        }    
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval); //upInterval => intervalo de subida

            //Descendo
            //setInterval, estamos definindo intervalos, todo codigo dentro, será executado sem intervalo no tempo que definimos
            let downInterval = setInterval(() => { 
            if (position <= 0) {
                 clearInterval(downInterval); //downInterval => intervalo de descida 
                 isJumping = false;
            }else {
                position -= 20;
                dino.style.bottom = position + 'px'; //pegamos a estilização da propriedade BOTTOM para ser manipulada
            }
            }, 20);
        }else {
        //subindo
        position += 20;
        dino.style.bottom = position + 'px'; //pegamos a estilização da propriedade BOTTOM para ser manipulada
        }    
    }, 20);
}


//função para criar os cactus
function creatCactus() {
    const cactus = document.createElement('div'); // criamos uma 'div' pelo javaScript, para gerar Html novos, e colocar em nosso codigo
    let cactusPosition = 1000; // posição do cactus
    let randomTime = Math.random() * 6000; // Math serve para fazer operações matemáticas, Random, serve para gerar um numero aleatorio. 

    cactus.classList.add('cactus'); // pegamos a nossa Const cactus onde criamos a nossa div, e criamos uma class, para ser estilizada no CSS
    cactus.style.left = 1000 + 'px'; // o cactus ira inicar pela direita
    background.appendChild(cactus); // criamos um elemento filho para a nossa div class Background do html

    let leftInterval = setInterval(() => {
        if(cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus); //Estamos removendo o cactus ao sair da tela
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //game over
            clearInterval(leftInterval);
            document.body.innerHTML = `<h1 class="game-over">Fim de jogo</h1>`;
        }else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(creatCactus, randomTime); // Serve para executar uma função, em um determinado tempo.
}

//Quando o jogo iniciar, irá criar um cactus imediatamente 
creatCactus();

//keyup,  é um evento onde você irá usar as teclas de seu teclado
//document.addEventListener estamos criando um evento para essa função
document.addEventListener('keyup', handleKeyUp);
