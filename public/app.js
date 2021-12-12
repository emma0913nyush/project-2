//open and connect to socket
let socket = io();
let SelectC = "pink";
let s =30;
let timeleft;
let count=0;
let countdown=false;

let fillC ={
    r:0,
    g:0,
    b:0,
}

socket.on('connect', () => {
    console.log("connected to the server");
})

//direction for left or right side
socket.on('message', function(data){
    document.getElementById("direction").innerHTML = data;
    if (data=="Draw on the right side!!"){
        document.getElementById("direction").style.color = "green";
    }
});

//timer
document.getElementById("gameStart").addEventListener("click", function() {
    clearArtboard();
    countdown=true;
    timeleft = 8;
    socket.emit('timer', timeleft);
    
    var downloadTimer = setInterval(function function1() {
       document.getElementById("countdown").innerHTML = timeleft +
          "s";
 
       timeleft -= 1;
       
       if (timeleft < 0) {
          clearInterval(downloadTimer);
          document.getElementById("countdown").innerHTML = "STOP!!!"
          countdown=false;
          document.getElementById("gameStart").innerHTML = "Draw Again"
       }
    
    }, 1000);

 });


//Slider
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.oninput = function() {
  output.innerHTML = this.value;
  s = this.value;
}

//color selection
function colorSelection(selColor){
    var c = selColor.options[selColor.selectedIndex].text;
    SelectC = c;
}

function setup() {
    let cnv =createCanvas(800,350);
    background(230,210,240);
    cnv.parent('canvas-container1');

    //drawing data
    socket.on('mousePositionServer',(data)=>{
        console.log(data);
            fill(data.c.r,data.c.g,data.c.b);
            ellipse(data.x,data.y,data.z,data.z);
    })

    //timer data
    socket.on('timerServer',(data)=>{
       clearArtboard();
       countdown=true;
       var downloadTimer = setInterval(function function1() {
        document.getElementById("countdown").innerHTML = data +
           "s";
  
        data -= 1;
        if (data < 0) {
           clearInterval(downloadTimer);
           document.getElementById("countdown").innerHTML = "STOP!!!";
           document.getElementById("gameStart").innerHTML = "Draw Again";
           countdown=false;
        }
     }, 1000);
    })

    //divide the artboard
    noStroke();
    fill(214,252,230);
    rect(width/2, 0, width/2,height);
    
}
//clear
function clearArtboard(){
    clear();
    background(230,210,240);
    noStroke();
    fill(214,252,230);
    rect(width/2, 0, width/2,height);
} 

//draw
function mouseDragged(){

    if(countdown==true){

        if (SelectC =="pink"){
            noStroke();
            fillC.r=255;
            fillC.g=192;
            fillC.b=203;
        }

        else if(SelectC =="blue"){
            noStroke();
            fillC.r=171;
            fillC.g=205;
            fillC.b=239;
        }

        else if(SelectC =="orange"){
            noStroke();
            fillC.r=255;
            fillC.g=160;
            fillC.b=122;
        }

        else{
            noStroke();
            fillC.r=238;
            fillC.g=232;
            fillC.b=170;
        }

        fill(fillC.r, fillC.g,fillC.b);
        ellipse(mouseX,mouseY,s,s);

        let mousePos = {
            x: mouseX,
            y: mouseY,
            z: s,
            c: fillC,
        }
        socket.emit('mousePosition', mousePos);
    }

}



