//open and connect to socket
let socket = io();
let SelectC = "pink";
let s =30;

let fillC ={
    r:0,
    g:0,
    b:0,
}

socket.on('connect', () => {
    console.log("connected to the server");
})

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  s = this.value;
}

function colorSelection(selColor){
    var c = selColor.options[selColor.selectedIndex].text;
    SelectC = c;
}

function setup() {
    let cnv =createCanvas(800,500);
    background(230,210,240);
    cnv.parent('canvas-container1');

    socket.on('mousePositionServer',(data)=>{
        console.log(data);
        fill(data.c.r,data.c.g,data.c.b);
        ellipse(data.x,data.y,data.z,data.z);
    })

    noStroke();
    fill(214,252,230);
    rect(width/2, 0, width/2,height);
}


function mouseDragged(){

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



