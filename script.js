const toggleSelector = document.getElementById("dropdown-toggle");
const difficulty_Btn_Level = document.getElementById("levels-btn");
const times_Btn_Level = document.getElementById("times-btn");
const difficulty_List_Level = document.getElementById("levels-list");
const times_List_Level = document.getElementById("times-list");
const difficulty_Level = document.getElementById("levels");
// const color_piece = document.getElementById("color-piece");
const score_Inside_Game = document.getElementById("score-inside-game");
const clock_time = document.getElementById("clock-time");
const game_box = document.getElementById("game-box");
const fullModal = document.getElementById("full-modal");
const scoreContainer = document.getElementById("score-container");

let timer = 0;
let score = 0;
let level = 3000;
let color_piece;
let playGame, gamePiece;
let scoreArray = (localStorage.getItem("scoreArray") != null) ? localStorage.getItem("scoreArray") : localStorage.setItem("scoreArray", new Array(5).fill('_'));

window.onclick = function(event){
    if(event.target !== difficulty_Btn_Level){        
        if(difficulty_List_Level.classList.contains("show")){
            difficulty_List_Level.classList.remove("show");
        }
    }
    if(event.target !== times_Btn_Level){        
        if(times_List_Level.classList.contains("show")){
            times_List_Level.classList.remove("show");
        }
    }
    updateScore(event);
}

window.onload = function(){
    setRecentScore();
}

function captureLevel(val){
    if(val.toLowerCase() == "hard"){
        level = 1000;
    }
    else if(val.toLowerCase() == "medium"){
        level = 2000;
    }
    else{
        level = 3000;
    }
}

function toggleDropdown(val) {
    if(val == "levels"){
        difficulty_List_Level.classList.toggle("show");
    }
    if(val == "times"){
        times_List_Level.classList.toggle("show");
    }
}

function closeModal(){
    fullModal.classList.remove("show");
    clearInterval(playGame);
    clearInterval(gamePiece);
    captureRecentScore();
    setRecentScore();
    timer = 0;
    score = 0;
    clock_time.innerHTML = `${Math.floor(timer / 60)} : ${timer % 60}`;
    game_box.innerHTML = `<h1 class="game-box-text">Starting...</h1>`;
}

function captureRecentScore(){
    scoreArray.unshift(score);
    scoreArray = scoreArray.slice(0,5);
    localStorage.setItem("scoreArray", scoreArray);
}

function setRecentScore(){
    scoreArray = localStorage.getItem("scoreArray").split(",");
    scoreContainer.innerHTML = `Recent Scores `;
    for(let i = 0; i < scoreArray.length; i++){
        scoreContainer.innerHTML += `<span class="recent-score-container">${scoreArray[i]}</span>`;
    }
}

function updateButtonName(selectionName, optionName){
    if(selectionName.toLowerCase() == "levels"){
        difficulty_Btn_Level.innerHTML = optionName;
    }
    if(selectionName.toLowerCase() == "times"){
        times_Btn_Level.innerHTML = optionName;
    }
}

function initTimer() {
    playGame = setInterval(() => {
        clock_time.innerHTML = `${Math.floor(timer / 60)} : ${timer % 60}`;
        timer -= 1;
        console.log(timer)
        if(timer <= 0){
            closeModal();
        }
    }, 1000);
}

function createColorPiece() {
    game_box.innerHTML = `<div style="background-color: rgb(${Math.floor(Math.random()*100)}, ${Math.floor(Math.random()*100)}, ${Math.floor(Math.random()*100)});" class="color-container" id="color-piece"></div>`;
    color_piece = document.getElementById("color-piece");
}

function updateScore(event){
    if(event.target == game_box && event.target !== color_piece && timer >! 0){
        score -= 1;
    }
    if(event.target == color_piece && timer >! 0){
        score += 1;
    }
    score_Inside_Game.innerHTML = score; 
}

function initColorPiece() {
    gamePiece = setInterval(() => {
        createColorPiece();
        color_piece.style.top = `${Math.random()*1000}px`
        color_piece.style.left = `${Math.random()*1000}px`    
    }, level);
}

function startGame() {
    score_Inside_Game.innerHTML = score
    fullModal.classList.toggle("show");
    captureLevel(difficulty_Btn_Level.innerHTML);
    timer = times_Btn_Level.innerHTML.split(' ')[0] * 60;
    initColorPiece(difficulty_Btn_Level.innerHTML);
    setTimeout(() => { initTimer() }, level - 1000);
}

// color_piece.addEventListener('click', () => {
//     score += 1;
//     score_Inside_Game.innerHTML = score;    
// });
