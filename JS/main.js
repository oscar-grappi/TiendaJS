
// - checkout

let checkout = [];

let checkoutArray = (clave, valor) => { localStorage.setItem(clave, valor) };
let totalCompra = (clave,valor) => {sessionStorage.setItem(clave,valor)}

class listaCheckout {
    constructor(id, nombre, precio, cantidad, subtotal) {
        this.id = id
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
    }
}

// - variables
let i = 1;
let total = 0;
let cantidad = 1;
let idBebida;


// ------------------------------ Funciones ------------------------------------ //

function printCheckOut() {

    checkout.forEach(producto => {

        let tablaCheckOut = document.getElementById("tablaCheckOut")
        let lista = document.createElement("tr");
        lista.classList.add("row-productos")
        lista.innerHTML =
            `<tr>
        <th scope="row"> ${i++} </th>
        <td class="nombre-producto"> ${producto.nombre} </td>
        <td class="precio-producto"> $ ${producto.precio} </td>
        <td class ="cantidad-producto"> 
        <input class="cantidadProductos" type="number" value = ${producto.cantidad} >
        </td>
        <td> <button type="button" class="btn btn-danger btn-eliminar" id="btn-eliminar${producto.id}">eliminar</button> </td>
        </tr>`
        tablaCheckOut.appendChild(lista);

    });
};

function guardarTotalCompra() {
    totalCompra("precioTotal", JSON.stringify(totalCheckOut)) || [];
};

function guardarCarritoJSON() {
    checkoutArray("listaArray", JSON.stringify(checkout)) || [];
};

function bajarCarritoJSON() {
    checkout = JSON.parse(localStorage.getItem("listaArray")) || [];
}

function borrarCarrito() {
    localStorage.clear();
    checkout = []
    checkoutArray = (clave, valor) => { localStorage.setItem(clave, valor) };
    guardarCarritoJSON();
    let tablaCheckOut = document.getElementById("tablaCheckOut")
    tablaCheckOut.remove()
    totalCheckOut = 0
    document.getElementById("totalCheckOut").innerText = "total:  $" + totalCheckOut
}

function actualizarCarrito() {
    let listaCheckOut = document.getElementsByClassName("tablaCheckOut")[0]
    let lineaProductosCheckOut = listaCheckOut.getElementsByClassName("row-productos")
    totalCheckOut = 0
    for (let i = 0; i < lineaProductosCheckOut.length; i++) {
        let lineaProductos = lineaProductosCheckOut[i]
        let productoNombre = lineaProductos.getElementsByClassName("nombre-producto")[0]
        let productoPrecio = lineaProductos.getElementsByClassName("precio-producto")[0]
        let productoCantidad = lineaProductos.getElementsByClassName("cantidadProductos")[0]
        let precio = parseFloat(productoPrecio.innerText.replace("$", ""))
        let cantidad = productoCantidad.value
        let nombre = productoNombre.innerText
        totalCheckOut = totalCheckOut + (precio * cantidad)
    }
    document.getElementById("totalCheckOut").innerText = "total:  $" + totalCheckOut
}
// -------------------------------- Ejecuciones ---------------------------------- //

bajarCarritoJSON()