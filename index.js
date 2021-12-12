//Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);

//initialize socket.io
let io = require('socket.io');
//const { Client } = require('socket.io/dist/client');
io = new io.Server(server);

let Playernum =0;
let name=[];

io.sockets.on('connection', (socket) =>{

    //order of clients
    console.log("We have a new client: " + socket.id);
    if(Playernum==0){
        name[0]=socket.id;
    }else{
        name[1]=socket.id;
    }

    Playernum++;
    console.log("Player number"+ Playernum);
    if (Playernum==1){
        socket.send('Draw on the left side!!');
    } else if(Playernum==2){
        socket.send('Draw on the right side!!');
    }
    
    //Listen for this client to disconnect
    socket.on('disconnect', () => {
        console.log("client left: ", socket.id);
        if(socket.id==name[0]){
            Playernum=0;
            delete name[0];
        }else{
            Playernum=1;
            delete name[1];
        }


    })


    //on receiving 'mousePosition' EMIT/BROADCAST
    socket.on('mousePosition',(data) =>{
        console.log(data);
        io.sockets.emit('mousePositionServer', data);
    })
    //timer EMIT/BROADCAST
    socket.on('timer',(data)=>{
        console.log(data);
        io.sockets.emit('timerServer',data);
    })
})

let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});







