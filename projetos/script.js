canvas = document.querySelector("#Sketch");
createbtn = document.querySelector("#topbtn");
deletebtn = document.querySelector("#deletebtn");
const redPixel =   "font-weight: bold;color: white;background-color: red  ;display: inline-flex;align-self: center;border: 1px solid gray;box-sizing: border-box;";
const whitePixel = "font-weight: bold;background-color: white;display: inline-flex;align-self: center;border: 1px solid gray;box-sizing: border-box;";
const greenPixel = "font-weight: bold;color: white;background-color: green;display: inline-flex;align-self: center;border: 1px solid gray;box-sizing: border-box;";
const bluePixel = "font-weight: bold;color: white;background-color: blue;display: inline-flex;align-self: center;border: 1px solid gray;box-sizing: border-box;";
let lineStyle = "font-size: 16px;";
var input = 0;
var ratioMines = 0;
let numberMines = 0;
let textNumberMines = 0;
let hasCanvas = false;
let gameState = "start";
let difficulty = "none";
let gameOver = false;
createbtn.addEventListener("click",() => {
    if (gameState === "playing" || gameState === "win" || gameState === "lose") {
        numberMines = 0
        textNumberMines = 0;
        document.querySelector("#score").remove();
    }
    if (hasCanvas === true){
        document.querySelector("#subcanvas").remove();
    }
    generateCanvas(input);

})
deletebtn.addEventListener("click",() =>{
    document.querySelector("#subcanvas").remove();
    hasCanvas = false;
})

function generateCanvas(input){
subcanvas = document.createElement("table");
subcanvas.setAttribute("id","subcanvas");
difficultySelector = document.querySelector("#difficulty");
difficulty = difficultySelector.options[difficultySelector.selectedIndex].text;
console.log(difficulty);
switch (difficulty) {
    case "Fácil":
        input = 6;
        ratioMines = 5;
        break;
    case "Normal":
        input = 15;
        ratioMines = 10;
        break;
    case "Difícil":
        input = 25;
        ratioMines = 15;
        break;
}
size = 80/input;
str = size.toString();
lineStyle = "font-size: "+size/2+"vh;"
pixelSize = "width:"+str+"vh;"+"height:"+str+"vh;";
if(difficulty === "Selecionar a dificuldade"){
    alert("Escolha uma dificuldade");
}else{
for(i = 0;i < input;i++){
    let line = document.createElement("tr");
    line.setAttribute("id","line")
    line.setAttribute("style",lineStyle + "height:"+size+"vh;");
    line.setAttribute("posy",i.toString());
    for(j = 0;j < input;j++){
        let pixel = document.createElement("td");
        pixel.setAttribute("style",whitePixel+pixelSize);
        pixel.setAttribute("id","pixel");
        if(Math.floor(Math.random() * 100) <= ratioMines){
            console.log("teste"+i+j+"\n");
            pixel.setAttribute("hasMine","true");
            numberMines += 1;
        }
        pixel.setAttribute("posx",j.toString());
        pixel.textContent = "?";
        pixel.addEventListener("click",function playerClick() {
            positionX = parseInt(pixel.getAttribute("posx"));
            positionY = parseInt(pixel.parentElement.getAttribute("posy"));
            let bombSize;
            let mine;
            if (pixel.getAttribute("hasMine") === "true") {
                if (gameOver === false) {
                    alert("Você Explodiu!");
                    gameOver = true;
                    gameState = "lose";
                    revealMap();
                }
                paintPixel(positionX, positionY, redPixel);
                pixel.textContent = "";
                mine = document.createElement("img");
                bsize = getLineSize();
                bombSize = 80 / bsize - 3;
                mine.setAttribute("src", "mina.svg");
                mine.setAttribute("style", "witdh:" + bombSize + "vh;" + "height:" + bombSize + "vh;");
                pixel.appendChild(mine);

            } else {
                paintPixel(positionX, positionY, bluePixel);
            }
            sum = countMines(positionX,positionY);
            if(pixel.getAttribute("hasMine") !== "true") {
                pixel.textContent = sum.toString();
            }
            if(sum === 0){
                recursiveClick(positionX,positionY);
            }
            pixel.removeEventListener("click",playerClick);
        })
        pixel.addEventListener("contextmenu",function rightClick(ev){
            ev.preventDefault();
            positionX = parseInt(pixel.getAttribute("posx"));
            positionY = parseInt(pixel.parentElement.getAttribute("posy"));
            if(pixel.getAttribute("hasMine") === "true"){
                numberMines -= 1;
            }
                textNumberMines -= 1;
                paintPixel(positionX,positionY,greenPixel);
                pixel.textContent = "";
                flag = document.createElement("img");
                fsize = getLineSize();
                flagSize = 80 / fsize - 3;
                flag.setAttribute("src", "flag.svg");
                flag.setAttribute("style", "witdh:" + flagSize + "vh;" + "height:" + flagSize + "vh;");
                pixel.appendChild(flag);

                if(numberMines === 0){
                    alert("Você Venceu!");
                    gameState = "win";
                    revealMap();
                }
                score = document.querySelector("#score");
                score.remove();
                generateScore();
                pixel.removeEventListener("click",rightClick);


        })
        line.appendChild(pixel);
}
    subcanvas.appendChild(line);
    canvas.appendChild(subcanvas);

}
    textNumberMines = numberMines;
    generateScore();
    gameState = "playing";
    hasCanvas = true;
}
}
function countMines(posx,posy){
    let sum = 0;
    let pixel;
    let targetPosX;
    let targetPosY;
    for (var i = -1; i <= 1; i++){
        for(var j = -1; j <= 1; j++) {
            if(posy+j < 0){
                continue;
            }
            targetPosX = posx + j;
            targetPosY = posy + i;
            pixel = locatePixel(targetPosX, targetPosY);
            if(pixel !== -1){
                if (pixel.getAttribute("hasMine") === "true") {
                    sum += 1;
                }
            }
        }
    }
    let itself = locatePixel(posx,posy);
    if(itself.getAttribute("hasMine") === "true"){
        sum -= 1;
    }
    return sum;
}
function recursiveClick(posx,posy){
    let pixel;
    let targetPosX;
    let targetPosY;
    for (var i = -1; i <= 1; i++){
        for(var j = -1; j <= 1; j++) {
            targetPosX = posx + j;
            targetPosY = posy + i;
            pixel = locatePixel(targetPosX, targetPosY);
            if(pixel !== -1 && pixel.getAttribute("hasMine") !== "true"){
                pixel.click();
            }
        }
    }
}
function getLineSize(){
    lineSize = difficultySelector.options[difficultySelector.selectedIndex].id;
    lineSize = parseInt(lineSize);
    return lineSize;
}
function generateScore(){
    sidebar = document.querySelector("#Sidebar");
    score = document.createElement("div");
    score.setAttribute("id","score");
    score.textContent = "Minas Restantes:"+textNumberMines;
    sidebar.appendChild(score);
}
function locatePixel(posx,posy){
    lineSize = getLineSize();
    console.log(posx+" "+lineSize);
    if(posx >= 0 && posy >= 0 && posx < lineSize && posy < lineSize){
        finder = 'tr[posy="'+posy+'"]';
        let targetLine = document.querySelector(finder);
        finder = 'td[posx="'+posx+'"]';
        return targetLine.querySelector(finder);
    }
    return -1;
}
function paintPixel(posx,posy,color){
    let pixel = locatePixel(posx,posy);
    console.log(pixel);
    pixel.setAttribute("style",color+pixelSize);
}
function revealMap(){
    for(let i = 0; i < getLineSize(); i++){
        for(let j = 0; j < getLineSize(); j++){
            pixel = locatePixel(i,j);
            if(gameState == "lose"){
                pixel.click();
            }else if(gameState == "win"){
                if(pixel.getAttribute("hasMine") !== "true"){
                    pixel.click();
                }
            }

        }
    }
}