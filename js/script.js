// Lucas Cândido Barcelos RA: 2022007290

const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");

/*para que haja a animacao de pulo eh necessario adicionar a funcao jump
na classe mario, isso sera feito na funcao jump abaixo*/
const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    /*remove a funcao jump da classe mario sempre que terminar a animacao (duracao da animacao eh de 500ms)
  para que ela possa ser realizada inumeras vezes*/
    mario.classList.remove("jump");
  }, 500);
};

/*funcao para mostrar tela de game over quando o mario colidir com algum cano*/
function gameOverScreen() {
  var gameOver = document.getElementById("game-over");
  gameOver.style.display = "block";
}

var score = 0;

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft; //salva a propriedade left do cano
  const marioPosition = +window //salva a propriedade bottom do mario
    .getComputedStyle(mario)
    .bottom.replace("px", "");
  const cloudsPosition = +window //salva a propriedade right das nuvens
    .getComputedStyle(clouds)
    .right.replace("px", "");
  /*o metodo replace esta sendo chamado pois temos variaveis do tipo string, 
  e para realizarmos calculos devemos modifica-las para variavel numerica*/

  score += 1;

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) { //verifica se houve colisao com o cano
    /*caso haja colisao, a animacao do jogo eh encerrada, 
    adiciona-se a imagem do mario colidindo e mostra a tela de game over*/
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "./images/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "45px";

    clouds.style.animation = "none";
    clouds.style.right = `${cloudsPosition}px`;

    var getscore = document.getElementById("score");
    score = score / 150; /*o score eh incrementado em uma unidade a cada 10ms,
    porem queremos que o score seja aumentada toda vez que o mario pular um cano,
    para isso dividimos seu valor por 150ms, que eh o tempo do pipe-animation*/
    getscore.textContent = "Score: " + parseInt(score);

    gameOverScreen();

    clearInterval(loop);
  }
}, 10);

document.getElementById("play-again").addEventListener("click", function () {
  location.reload(); //funcionalidade do botao play-again
});

document.addEventListener("keydown", jump); //chama a funcao jump sempre que alguma tecla for pressionada
