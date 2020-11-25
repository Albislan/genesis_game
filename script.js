let order = [];
let clickedOrder = [];
let score = 0;
var soundBlue=document.getElementById("t_blue");
var soundRed=document.getElementById("t_red");
var soundGreen=document.getElementById("t_green");
var soundYellow=document.getElementById("t_yellow");
var soundGameOver=document.getElementById("t_gameover");
var soundOK=document.getElementById("t_acertou");
//0 - verde
//1 - vermelho
//2- amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = []

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i)+ 1);
    }
}


let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    })
}

let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        soundOK.play()
        alert('Pontuação: ' + score + '\n Muito Bom \n Voçê acertou! \n Iniciando próximo nível');
        nextLevel();

    }
}

let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected')
        checkOrder();
    }, 250)

    
}

let createColorElement = (color) => {
    if(color == 0) {
        soundGreen.play()
        return green;

    } else if(color == 1) {
        soundRed.play()
        return red;

    } else if(color == 2) {
        soundYellow.play()
        return yellow;

    } else if(color == 3) {
        soundBlue.play()
        return blue
    }
}

let nextLevel = () => {
    score++;
    shuffleOrder();
}


let gameOver = () => {
    soundGameOver.play()
    alert('Pontuação: ' + score + '\n Que Peninha! \n Você perdeu o Jogo!\nClique em OK para iniciar um novo jogo');
    order = [];
    clickedOrder = [];

    playGame();
}

let playGame = () => {
    soundGameOver.pause()
    alert('Bem Vindo ao Genesis! \n Iniciando novo Jogo!');
    score = 0;

    nextLevel();
}

green.addEventListener('click', click(0))
yellow.addEventListener('click', click(2))
red.addEventListener('click', click(1))
blue.addEventListener('click', click(3))

green.onclick = () => click(0);
yellow.onclick = () => click(2);
red.onclick = () => click(1);
blue.onclick = () => click(3);


playGame();