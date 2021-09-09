let express = require('express') ()
let http = require('http').createServer(express)
let io = require('socket.io')(http)
const shortid = require('shortid')
let {rooms} = require('./bin/Room')

express.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

io.sockets.on('connect', (socket)=>{
    console.log('un nuevo usuario conectado con id' + socket.id);
    socket.on('newRoom', ()=>{
        const roomId = shortid.generate()
        rooms.push({
               id: roomId,
               players: []
        })
        console.log('Room created')
        socket.emit('newRoomCreated', {roomId, rooms})
    })
})

http.listen(3000), ()=>{
     console.log('Se está ejecutando en el puerto 3000');
}
