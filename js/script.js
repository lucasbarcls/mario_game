// Lucas Cândido Barcelos RA: 2022007290

const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

function gameOverScreen() {
  var gameOver = document.getElementById("game-over");
  gameOver.style.display = "block";
}

var score = 0;
const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");
  const cloudsPosition = +window
    .getComputedStyle(clouds)
    .right.replace("px", "");

  score += 1;

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
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
    score = score / 150;
    getscore.textContent = "Score: " + parseInt(score);

    gameOverScreen();

    clearInterval(loop);
  }
}, 10);

document.getElementById("play-again").addEventListener("click", function () {
  location.reload();
});

document.addEventListener("keydown", jump);
