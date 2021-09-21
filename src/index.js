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
  window.requestAnimationFrame(playGame);
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

// 애니메이션 구현 함수
function playGame() {
  // 인플레이 true (게임 진행 중)
  if (player.inplay) {
    let bird = document.querySelector(".bird");
    let wing = document.querySelector(".wing");
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

    player.y += player.speed * 2;
    // 게임 종료
    if (player.y > gameArea.offsetHeight) {
      playGameOver();
    }

    bird.style.left = player.x + "px";
    bird.style.top = player.y + "px";
    window.requestAnimationFrame(playGame);
    // 스코어
    player.score++;
    score.innerText = "SCORE : " + player.score;
  }
}

// 게임 종료 함수
function playGameOver() {
  player.inplay = false;
  gameMessage.classList.remove("hide");
  gameMessage.innerHTML =
    "GAME OVER<br/>당신의 점수는 " +
    player.score +
    "점 입니다. <br/> 다시 시작하려면 여기를 누르세요";
}
