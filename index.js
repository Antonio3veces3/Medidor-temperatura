const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { SerialPort,ReadlineParser } = require('serialport');


const port = new SerialPort({
  path: 'COM3',
  baudRate: 9600,
  //autoOpen: false,
})

server.listen(3000, () => {
  console.log('listening on: 3000');
});




// let ejs = require('ejs');
// let people = ['geddy', 'neil', 'alex'];
// ejs.render('<%= people.join(", "); %>', {people: people});


const io = new Server(server,{
    cors: {
    origin: "http://127.0.0.1:5500",
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  
});

io.on('connection',(socket)=>{
    console.log('Usuario conectado..');
    socket.emit('message','Consola');
    socket.on('disconnect',()=>{
        console.log('Usuario desconectado');
    })
    socket.on('chatmsg',msg=>{
      socket.emit('message',msg);
      console.log('Mensaje del usuario:'+msg);
      if(msg=='prender')
      port.write('prender\n');
      if(msg=='apagar')
      port.write('apagar\n');
       
    })
    socket.on('dato', () =>{
      socket.emit('info', array)
    })
    //intento de mandar una constante a html
    let cont = 1;
    let array = new Array();
    let arrayFull = new Array();
    
    //array = [0,0,0,0,0,0,0,0,0,0,0];
    const parser = new ReadlineParser({delimiter: '\r\n'});
    port.pipe(parser);
    parser.on('data', function (temp){
      array.push({"valor": temp});
      if(cont % 10 == 0 ){
        let print = JSON.stringify({array});
        print = JSON.parse(print);
        console.log(print);
        arrayFull = [];
        arrayFull = array;      
        socket.emit('temperature',arrayFull);
        array = [];
      }
      cont++;
 
    
    /* array.unshift({'valor':temp});
     array.pop()
     let arrayJson = JSON.stringify({array});
     arrayJson = JSON.parse(arrayJson);
     console.log(arrayJson);*/
    })
})



//Code para guardar los valores en JSO
// const SendData = () =>{
//   const html= print = JSON.parse(print)

// }




