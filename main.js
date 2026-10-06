/*
    Cargar comidas en memoria desde el JSON
*/
let comidas = [];

await fetch('./data/comidas.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;                   // Asignar el JSON a la variable comidas
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

const container = document.getElementById('comidaContainer');

comidas.forEach((comida)=>{
  container.innerHTML += 
  '<section class="producto">'+
  '<h2>'+comida.nombre+'</h2>'+
  '<h3>'+comida.categoria+'</h3>'+
  '<p class="ingredientes">'+comida.provincia+'</p>'+
  '<p class="provincia">'+comida.ingredientes + '</p>'
  '</section>'
})