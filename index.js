//Constants
let inputDir = {x: 0, y: 0};
const foodsound = new Audio('snakeeat.wav');
const gameoverSound =  new Audio('gameover.wav');
const movesound = new Audio('move.wav');
const musicsound = new Audio('bgmusic.mp3');
let speed = 6;
let lastPaintTime = 0;
let snakeArr = [
    {x: 10, y: 10}
]
let food = {x: 4, y:5};
let score=0;

//Game function starts here
function main(ctime)
{
    //to render frame this method used
    window.requestAnimationFrame(main);
    //console.log(ctime)
    //to control rendering this loop used - 1000 because time is in ms.
    //1/speed is after how many times you want render
    //ctime = is used to get the timestamp when the file status has been changed last time
    if((ctime - lastPaintTime)/1000 < 1/speed)
   {
        return ;
   }
    lastPaintTime = ctime;
    gameEngine();

} 

function isCollide(snake)
{
    //musicsound.play();
    //if you bump into yourself
    for(let i=1; i<snakeArr.length; i++)
    {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
         {
                return true;
         }
    }

    //if you bump into wall
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0 )
        {
                return true;

        }
}

//to run the game 
function gameEngine()
{
        //1:Update snake array and food
        if(isCollide(snakeArr))
        {
            gameoverSound.play();
            //musicsound.pause();
            inputDir = {x:0, y:0};
            alert("GAME OVER!!! press any key to play again");
            snakeArr = [{x: 10, y: 10}];
           // musicsound.play();
            score=0;

        }

        //you have eaten food score increment and return food
        if(snakeArr[0].y === food.y && snakeArr[0].x === food.x)
        {
            foodsound.play();
            score += 1;
            if(score > hiscoreval)
            {
                hiscoreval = score;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                highscoreBox.innetHTML ="High Score :" + hiscoreval;
            }
            scoreBox.innerHTML ="Score : " + score;
            //adding segment when snake eat food in front of head , unshift add element at start
            snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
            //
            let a = 2;
            let b = 16;

            food = {x: Math.round( a + (b-a) * Math.random()), y: Math.round( a+ (b-a) * Math.random()) };
            
        }

        //movesnake
        for(let i= snakeArr.length-2; i>=0; i--)
        {
        
            snakeArr[i+1]= {...snakeArr[i]};//object created to avoid reference problem
        }
            snakeArr[0].x += inputDir.x;
            snakeArr[0].y += inputDir.y;


        //to make board empty if there is snake
        bgboard.innerHTML = "";       

        //2 :display the snake and food
        snakeArr.forEach((e, index)=>
        {
            //snake head position
            snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;
            //here we add css using javascript
            //we add this because we have to make some designing on class

            //if 0 snake display
            if(index === 0)
             {
                    snakeElement.classList.add('snakehead'); 
             }
            else
             {
                    snakeElement.classList.add('snake');
             }

            bgboard.appendChild(snakeElement);
        });

            //display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        //here we add css using javascript
        //we add this because we have to make some designing on class
        foodElement.classList.add('snakefood'); 
        bgboard.appendChild(foodElement);
}



//Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore == null)
{
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    highscoreBox.innerHTML= "High score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
   inputDir = {x: 0, y: 1}  //start the game
    movesound.play();
    switch(e.key)
    {
            case "ArrowUp":
                console.log("ArrowUp");
                inputDir.x = 0;
                inputDir.y = -1;
                break;

            case "ArrowDown":
                console.log("ArrowDown");
                inputDir.x = 0;
                inputDir.y = 1;
                break;

            case "ArrowLeft":
                console.log("ArrowLeft");
                inputDir.x = -1;
                inputDir.y = 0;
                break;

            case "ArrowRight":
                console.log("ArrowRight");
                inputDir.x = 1;
                inputDir.y = 0;
                break;
            default:
                break;
           
    }

});

