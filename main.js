/*
    Cargar comidas en memoria desde el JSON
*/


fetch('./data/comidas-extended.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;                   // Asignar el JSON a la variable comidas
    mostrarComidas(comidas)
    actualizarFiltros()
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

 const ingredientesInputs= document.querySelectorAll(".ingrediente")
 let ingredientes = []
 ingredientesInputs.forEach(input => {
  ingredientes.push(input.value)
 })

 let nuevaComida= {
  nombre: event.target.nombre.value,
  provincia: event.target.provincia.value,
  categoria: event.target.categoria.value,
  ingredientes: ingredientes
 }

 comidas.push(nuevaComida)

 mostrarComidas(comidas)

 ingredientesContainer.innerHTML=
  `<input type="text" id="ingredientes" class="ingrediente" placeholder="Pon los ingredientes" required>`

  actualizarFiltros()

 event.target.reset()
})

const filtrarCategoria=document.getElementById("filtrarCategoria")
const filtrarProvincia=document.getElementById("filtrarProvincia")
const busqueda = document.getElementById("buscador")

function filtrar() {
  let comidasFiltradas = comidas.filter(comida => {
    return comida.categoria.includes(filtrarCategoria.value)
    && comida.provincia.includes(filtrarProvincia.value)
  })

  mostrarComidas(comidasFiltradas)
}

function buscar () {
  let comidasFiltradas = comidas.filter(comida /*comida es cada elemento del array */=> {
    return comida.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
    || comida.provincia.toLowerCase().includes(busqueda.value.toLowerCase())
    || comida.categoria.toLowerCase().includes(busqueda.value.toLowerCase())
  })

  mostrarComidas(comidasFiltradas)
}

const botonIngredientes = document.getElementById("boton-ingredientes")
const ingredientesContainer = document.querySelector(".contenedor-ingredientes") //El primero que ve de esa clase

botonIngredientes.addEventListener("click", () => {
  ingredientesContainer.innerHTML+=
  `<input type="text" id="ingredientes" class="ingrediente" placeholder="Pon los ingredientes" required>`
})

filtrarCategoria.addEventListener ("change", filtrar)
filtrarProvincia.addEventListener("change", filtrar)
busqueda.addEventListener("input", buscar)


function actualizarFiltros () {
  let categorias = []
  let provincias = []
  comidas.forEach(comida =>{
    if (!categorias.includes(comida.categoria)) {
      categorias.push(comida.categoria)
    }
    if (!provincias.includes(comida.provincia)) {
      provincias.push(comida.provincia)
    }
  })

  categorias.forEach (categoria => {
    filtrarCategoria.innerHTML += `<option value="${categoria}">${categoria}</option>`
  })
  provincias.forEach (provincia => {
    filtrarProvincia.innerHTML += `<option value="${provincia}">${provincia}</option>`
  })
}