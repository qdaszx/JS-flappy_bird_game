import "./styles.css";

const score = document.querySelector(".score");
const startBtn = document.querySelector(".startBtn");
const gameArea = document.querySelector(".gameArea");
const gameMessage = document.querySelector(".gameMessage");

// 게임 시작 및 재시작시 hide클래스 실행
startBtn.addEventListener("click", start);
gameMessage.addEventListener("click", start);

function start() {
  player.inplay = true;
  player.score = 0;
  gameArea.innerHTML = "";
  gameMessage.classList.add("hide");
  startBtn.classList.add("hide");
  // 플레이어 만들기
  let bird = document.createElement("div");
  let wing = document.createElement("div");
  bird.setAttribute("class", "bird");
  wing.setAttribute("class", "wing");
  bird.appendChild(wing);
  gameArea.appendChild(bird);
  // 날개짓
  wing.pos = 15;
  wing.style.top = wing.pos + "px";
  // 움직임 처리 함수
  player.x = bird.offsetLeft;
  player.y = bird.offsetTop;
  // 장애물
  pipe.startPos = 0;
  pipe.spaceBetweenRow = 400;
  pipe.pipeCount = Math.floor(gameArea.offsetWidth / pipe.spaceBetweenRow);
  for (let i = 0; i < pipe.pipeCount; i++) {
    makePipe(pipe.startPos * pipe.spaceBetweenRow);
    pipe.startPos++;
  }

  // re
  window.requestAnimationFrame(playGame);
}

// 장애물 만들기 함수
function makePipe(pipePos) {
  let totalHeight = gameArea.offsetHeight;
  let totalWidth = gameArea.offsetWidth;
  let pipeUp = document.createElement("div");
  pipeUp.classList.add("pipe");
  pipeUp.height = Math.floor(Math.random() * 350);
  pipeUp.style.height = pipeUp.height + "px";
  pipeUp.style.left = totalWidth + pipePos + "px";
  pipeUp.x = totalWidth + pipePos;
  pipeUp.style.top = "0px";
  pipeUp.style.backgroundColor = "red";
  gameArea.appendChild(pipeUp);

  pipe.spaceBetweenCol = Math.floor(Math.random() * 250) + 150;

  let pipeDown = document.createElement("div");
  pipeDown.classList.add("pipe");
  pipeDown.style.height =
    totalHeight - pipeUp.height - pipe.spaceBetweenCol + "px";
  pipeDown.style.left = totalWidth + pipePos + "px";
  pipeDown.x = totalWidth + pipePos;
  pipeDown.style.bottom = "0px";
  pipeDown.style.backgroundColor = "black";
  gameArea.appendChild(pipeDown);
}

// 방향키 감지 함수
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);
// 사용자 입력키 저장 객체
let keys = {};

function pressOn(e) {
  keys[e.code] = true;
}

function pressOff(e) {
  keys[e.code] = false;
}

// 플레이어 정보를 담을 객체
let player = {
  x: 0,
  y: 0,
  speed: 2,
  score: 0,
  inplay: false
};
// 장애물 객체
let pipe = {
  startPos: 0,
  spaceBetweenRow: 0,
  spaceBetweenCol: 0,
  pipeCount: 0
};

function movePipes(bird, score) {
  let pipes = document.querySelectorAll(".pipe");
  let counter = 0;
  pipes.forEach(function (item) {
    item.x -= player.speed;
    item.style.left = item.x + "px";
    if (item.x < 0) {
      item.parentElement.removeChild(item);
      counter++;
    }
    // 충돌 여부
    if (isCollide(item, bird)) {
      playGameOver(bird, score);
    }
  });

  for (let i = 0; i < counter / 2; i++) {
    makePipe(0);
  }
}

function isCollide(pipe, bird) {
  // getBoundingClientRect 좌표 나오는 함수
  let pipeRect = pipe.getBoundingClientRect();
  let birdRect = bird.getBoundingClientRect();
  return (
    pipeRect.bottom > birdRect.top &&
    pipeRect.top < birdRect.bottom &&
    pipeRect.left < birdRect.right &&
    pipeRect.right > birdRect.left
  );
}

// 애니메이션 구현 함수
function playGame() {
  // 인플레이 true (게임 진행 중)
  if (player.inplay) {
    let bird = document.querySelector(".bird");
    let wing = document.querySelector(".wing");
    // 스코어
    player.score++;
    score.innerText = "SCORE : " + player.score;

    movePipes(bird, player.score);
    // 날개짓 불린값
    let move = true;
    // 이동시 해당 x, y 계산
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
      move = true;
    }
    if (keys.ArrowRight && player.x < gameArea.offsetWidth - bird.offsetWidth) {
      player.x += player.speed;
      move = true;
    }
    if ((keys.ArrowUp || keys.Space) && player.y > 0) {
      player.y -= player.speed * 5;
      move = true;
    }
    if (
      keys.ArrowDown &&
      player.y < gameArea.offsetHeight - bird.offsetHeight
    ) {
      player.y += player.speed;
      move = true;
    }

    // 날개 움직임
    if (move) {
      wing.pos = wing.pos === 15 ? 25 : 15;
      wing.style.top = wing.pos + "px";
    }
    // 중력 크기
    player.y += player.speed * 2;

    bird.style.left = player.x + "px";
    bird.style.top = player.y + "px";

    // 게임 종료
    if (player.y > gameArea.offsetHeight) {
      playGameOver(bird, player.score);
    }

    window.requestAnimationFrame(playGame);
  }
}

// 게임 종료 함수
function playGameOver(bird, score) {
  player.inplay = false;
  gameMessage.classList.remove("hide");
  gameMessage.innerHTML =
    "GAME OVER<br/>당신의 점수는 " +
    score +
    "점 입니다. <br/> 다시 시작하려면 여기를 누르세요";
  bird.setAttribute("style", "transform:rotate(180deg)");
}
