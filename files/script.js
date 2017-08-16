var canvas = document.getElementById("myCanvas"); // Obtiene la variable canvas del documento html
var ctx = canvas.getContext("2d"); // variable que define el contexto del canvas
var ballRadius = 10; // radio de la pelota
var x = canvas.width/2; //posición eje x inicial de la pelota
var y = canvas.height-30; //posición eje y inicial de la pelota
var dx = 3; //velocidad horizontal de la pelota
var dy = -3; //velocidad vertical de la pelota
var paddleHeight = 10; //altura de la raqueta
var paddleWidth = 75;//ancho de la raqueta
var paddleX = (canvas.width-paddleWidth)/2; //centrar la posición inicial de la raqueta
var rightPressed = false; //determina si se presiona la tecla derecha
var leftPressed = false; //determina si se presiona la tecla izquierda
var brickRowCount = 7; // número horizontal de ladrillos 
var brickColumnCount = 6; //número vertical de ladrillos
var brickWidth = 75; //ancho del ladrillo
var brickHeight = 20; //altura del ladrillo
var brickPadding = 10; //espacio entre ladrillo
var brickOffsetTop = 30; //margen vertical para dibujar los ladrillos
var brickOffsetLeft = 30; //margen horizontal para dibujar los ladrillos
var score = 0;//puntaje inicial
var lives = 3;// número de intentos

//función para ponerle a cada ladrillo status 1, visible
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

//funciones para saber si se presionó alguna tecla
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//si se presiona la tecla izquierda o derecha el boolean cambia a cierto
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

//función que determina que sucede en colisión pelota-ladrillo
function collisionDetection() {

    //se itera dos veces, una para la posición horizontal y otra para la vertical
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];

            //si el status del ladrillo es visible entonces busca determinar si es golpeado por la pelota
            if(b.status == 1) {

                //determina si la posición de la pelota (x,y) coincide con la posición de algún ladrillo
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy; // invertir la dirección vertical hace el efecto de rebote
                    b.status = 0;// al ser golpeado el ladrillo cambia el status a 0 para ser invisible
                    score++;//cuando se golpea un ladrillo el puntaje incrementa por 1

                    //si el puntaje es igual al total de ladrillos, el juego para para anunciar que ganaste y se reinicia 
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

//función de dibujo de la pelota
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);//se observa que depende de la posición inicial y radio determinado
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//función de dibujo de la raqueta
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);//se observa como depende de las variables iniciales
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//función de dibujo de los ladrillos
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//función para el texto del puntaje
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

//función para el texto de la vida
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

//función global de dibujo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    
    //movimiento de la pelota


    

    requestAnimationFrame(draw);
}

draw();