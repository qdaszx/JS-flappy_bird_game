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
  bird.setAttribute("class", "bird");
  wing.setAttribute("class", "wing");
  bird.appendChild(wing);
  gameArea.appendChild(bird);
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
