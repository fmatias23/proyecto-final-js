const botonClick = document.querySelectorAll(".button");
const tbody = document.querySelector(".tbody");

let carrito = [];

botonClick.forEach(btn => {
    btn.addEventListener("click", addCarrito)
    
})

function addCarrito(e) {
    const button = e.target
    const item = button.closest(".card")
    const tituloItem = item.querySelector(".card-title").textContent;
    const itemPrice = item.querySelector(".precio").textContent;
    const imgItem = item.querySelector(".card-img-top").src;

    const nuevoItem = {
        title: tituloItem,
        precio: itemPrice,
        imagen: imgItem,
        cantidad: 1
    }

    addItemCarrito(nuevoItem)
}

function addItemCarrito(nuevoItem) {

    const alert = document.querySelector('.alert')

    setTimeout(function(){
        alert.classList.add('hide')
    }, 2000)
    alert.classList.remove('hide')



    const inputElemento = tbody.getElementsByClassName("input__elment")
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === nuevoItem.title.trim()) {
            carrito[i].cantidad++;
            const inputValue = inputElemento[i]
            inputValue.value++;
            totalCarrito()
            return null;
        }
    }


    
    carrito.push(nuevoItem)
    mostrarCarrito();

    
}

function mostrarCarrito() {
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement("tr")
        tr.classList.add("itemCarrito")
        const content = `
                   
                    <td class="table__Productos">
                      <img src=${item.imagen} alt=">
                      <h6 class="titulo">${item.title}</h6>
                    </td>
                    <td class="table__precio"><span>${item.precio}</span></td>
                    <td class="table__cantidad">
                      <input type="number" min="1" value=${item.cantidad} class="input__elment">
                      <button class="delete btn btn-danger">X</button>
                    </td>`
        tr.innerHTML = content;
        tbody.append(tr)


        tr.querySelector(".delete").addEventListener("click", removeCarrito)
        tr.querySelector(".input__elment").addEventListener("change", sumarCantidad)
    })
    
    totalCarrito()
}

function totalCarrito() {
    let total = 0;
    const totalItems = document.querySelector(".totalItems")
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        total = total + precio * item.cantidad
    })

    totalItems.innerHTML = `total $${total}`
    addStorage()
}

function removeCarrito(e) {
    const botonBorrar = e.target
    const tr = botonBorrar.closest(".itemCarrito")
    const title = tr.querySelector('.table__Productos').textContent;
    for (let i=0; i < carrito.length ; i++){
        if(carrito[i].title.trim() === title.trim()){
            carrito.splice(i, 1)
        }
    }
    
    const alert = document.querySelector('.alert')

    setTimeout(function(){
        alert.classList.add('borrar')
    }, 2000)
    alert.classList.remove('borrar')

    tr.remove()
    totalCarrito()

}



function sumarCantidad(e) {
    const suma = e.target
    const tr = suma.closest(".itemCarrito")
    const title = tr.querySelector(".titulo").textContent;
    carrito.forEach(item => {
        if (item.title.trim() === title) {
            suma.value < 1 ? (suma.value = 1) : suma.value;    // usando operador ternario
            item.cantidad = suma.value;
            totalCarrito()
        }
    })
}



// LOCALSTORAGE 

function addStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

window.onload = function () {
    const lstorage = JSON.parse(localStorage.getItem("carrito"));
    if (lstorage) {
        carrito = lstorage;
        mostrarCarrito()
    }
}



// ------------ FETCH -----------------------

const $form = document.querySelector('#form')

$form.addEventListener('submit', handleSubmit)

 async function handleSubmit(event){
    event.preventDefault()
    const form = new FormData(this)
    const response = await fetch(this.action, {
        method: this.method,
        body: form,
        headers: {
            'Accept': 'application/json'
        }
        
    })

    if(response.ok){
        this.reset()
        alert("gracias, pronto nos comunicaremos con usted")
        
    }
};

let url = 'https://jsonplaceholder.typicode.com/users'
fetch(url)
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error))

const mostrarData = (data) => {
    console.log(data)
    let body = ""
    for (let i = 0; i<data.length; i++){
        body += `<tr><td>${data[i].id}</td>
                     <td>${data[i].name}</td>
                     <td>${data[i].email}</td>
        
                </tr>`
    }

    document.getElementById('data').innerHTML = body
}