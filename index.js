//Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);

//initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

io.sockets.on('connection', (socket) =>{
    console.log("We have a new client: " + socket.id);
    
    //Listen for this client to disconnect
    socket.on('disconnect', () => {
        console.log("client left: ", socket.id)
    })

    //on receiving 'mousePosition' EMIT/BROADCAST to other clients
    socket.on('mousePosition',(data) =>{
        console.log(data);
        io.sockets.emit('mousePositionServer', data);
    })
})

let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});







