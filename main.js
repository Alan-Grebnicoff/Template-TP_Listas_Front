/*
    Cargar comidas en memoria desde el JSON
*/


fetch('./data/comidas.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;                   // Asignar el JSON a la variable comidas
    mostrarComidas(comidas)
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });


let comidas = [];


const container = document.getElementById('comidaContainer');
function mostrarComidas (lista) {
container.innerHTML = ""
lista.forEach((comida)=>{
  container.innerHTML +=
`
  <section class="producto">
  <h2>${comida.nombre}</h2>
  <h3>${comida.provincia}</h3>
  <p class="">${comida.categoria}</p>
  <ul>
    ${comida.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
  </ul>
  </section>
`
})}


const formAgregarComida = document.getElementById("agregarComidaForm")


formAgregarComida.addEventListener("submit", (event) => {
  event.preventDefault() //El formulario tiene un comportamiento que no nos sirve

 // alert("Comida agregada: " + event.target.nombre.value) //El evento fue disparado por el formulario
 let nuevaComida= {
  nombre: event.target.nombre.value,
  provincia: event.target.pro.value,
  categoria: event.target.categoria.value,
  ingredientes: event.target.ingredientes.value.split(",")
 }

 comidas.push(nuevaComida)

 mostrarComidas(comidas)

 event.target.reset()
})

const filtrarCategoria=document.getElementById("filtrarCategoria")

filtrarCategoria.addEventListener("change", () => {
  let comidasFiltradas = comidas.filter(comida => {
    return comida.categoria.includes(filtrarCategoria.value)
  })

  mostrarComidas(comidasFiltradas)
})