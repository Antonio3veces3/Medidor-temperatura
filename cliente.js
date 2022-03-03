let canva = document.getElementById('myChart').getContext("2d");
const labels = ['0s', '10s', '20s', '30s', '40s', '50s', '60s', '70s', '80s', '90s'];
let data2 = {
  labels: labels,
  datasets: [{
    label: 'Temperatura',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [],
  }]
};

let config = {
  type: 'line',
  data: data2,
  options: {}
};

window.grafica = new Chart (canva, config);


const mensajes=document.getElementById('mensajes');
const msgForm=document.getElementById('msgForm');

const socket=io('http://localhost:3000');
let newArray = new Array();

socket.on('message',data=>{
    console.log(data);
  //  alert(data);
    agregarMensaje(data);
})

msgForm.addEventListener('submit',e=>{
    e.preventDefault();
    socket.emit('chatmsg',msgForm.msg.value);
    msgForm.msg.value='';
})

const agregarMensaje = (mensaje) => {
const html=`<div>${mensaje}\n</div>`;
mensajes.innerHTML += html;

}


//aqui intento de mandar datos
socket.on('temperature', data =>{
  newArray = [];
  for(let value of data){
    newArray.push(parseFloat(value.valor));
  }
  console.log(newArray);
  let data2 = {
    labels: labels,
    datasets: [{
      label: 'Temperatura',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [10,20,15,30,35,40,20],
    }]
  };
  
  let config = {
    type: 'line',
    data: data2,
    options: {}
  };
  if( window.grafica ){
    window.grafica.clear();
    window.grafica.destroy();
  }
  window.grafica = new Chart(canva,config);

})
