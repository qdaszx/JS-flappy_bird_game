import "./styles.css";

const score = document.querySelector(".score");
const startBtn = document.querySelector(".startBtn");
const gameArea = document.querySelector(".gameArea");
const gameMessage = document.querySelector(".gameMessage");

// 게임 시작 및 재시작시 hide클래스 실행
startBtn.addEventListener("click", start);
gameMessage.addEventListener("click", start);

function start() {
  gameMessage.classList.add("hide");
  startBtn.classList.add("hide");
  // 플레이어 만들기
  bird.setAttribute("class", "bird");
  wing.setAttribute("class", "wing");
  bird.appendChild(wing);
  gameArea.appendChild(bird);
  // 움직임 처리 함수
  player.x = bird.offsetLeft;
  player.y = bird.offsetTop;
  window.requestAnimationFrame(playGame);
}

// 방향키 감지 함수
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);
// 사용자 입력키 저장 객체
let keys = {};

function pressOn(e) {
  console.log(e.code);
  keys[e.code] = true;
}

function pressOff(e) {
  console.log(e.code);
  keys[e.code] = false;
}

// 플레이어 생성
let bird = document.createElement("div");
let wing = document.createElement("div");

// 플레이어 정보를 담을 객체
let player = {
  x: 0,
  y: 0,
  speed: 2
};

// 애니메이션 구현 함수
function playGame() {
  if (keys.ArrowLeft) {
    player.x -= player.speed;
  }
  if (keys.ArrowRight) {
    player.x += player.speed;
  }
  if (keys.ArrowUp) {
    player.y -= player.speed;
  }
  if (keys.ArrowDown) {
    player.y += player.speed;
  }
  bird.style.left = player.x + "px";
  bird.style.top = player.y + "px";
  window.requestAnimationFrame(playGame);
}
