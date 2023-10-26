let productos = [];
let carrito = [];

const selectProductos = document.querySelector("#productos");
const botonAgregar= document.querySelector("#agregar");
const conteBtn = document.querySelector("#contenedor-btn");


function traerItemsStorage() {
    productos = JSON.parse(localStorage.getItem(`productos`)) || [];
    carrito =JSON.parse(localStorage.getItem(`carrito`)) || [];

}
function cargarDatos() {
    fetch(`mis-productos.json`)
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        productos=[...data];
        localStorage.setItem(`productos`,JSON.stringify(productos));
        traerItemsStorage()
    })
}

function rellenarDropdow() {
    productos.forEach(({nombre,marca,precio,id}) =>{
        const option = document.createElement("option");
        option.textContent = `${nombre}-${marca} $${precio}`;
        option.value= --id;
        selectProductos.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", () =>{
    cargarDatos()
    traerItemsStorage();
    rellenarDropdow();
    dibujarTabla(); 
    botonAgregar.addEventListener("submit", (e) =>{
        e.preventDefault();
        const productoSeleccionado=productos.find((item,index) => 
            index === +selectProductos.value
        );
       
        if ( productoSeleccionado ===undefined){ 
            alert("debe seleccionar un producto");
            return;
        }
        const indiceCarrito = carrito.findIndex((item) => item.producto.nombre === productoSeleccionado.nombre);
        if (indiceCarrito !== -1) {
            carrito[indiceCarrito].cantidad++;
        }
        else{
            const item = new Item(productoSeleccionado,1); 
            carrito.push(item)

        }
        
        localStorage.setItem(`carrito`,JSON.stringify(carrito));
        dibujarTabla()
    });
});


function dibujarTabla() {
    const miTabla= document.querySelector("#item");
    const total = document.querySelector("#total");
    miTabla.innerHTML = ``;
    carrito.forEach(({producto:{nombre,marca,precio},cantidad},index) =>{
        miTabla.innerHTML += `
        <tr>
            <td>${nombre || ""}</td>
            <td>${marca || ""}</td>
            <td>$${precio || ""}</td>
            <td>${cantidad || ""}</td>
            <td>$${precio*cantidad || ""}</td>
            <td><button class ="btn btn-danger">eliminar</button></td>
            
        </tr>
        `;
        if(carrito.length != 0 ) {
            boton = conteBtn.children;
            if(boton.length <= 1){
                const botonComprar = document.createElement("button");
                botonComprar.textContent="Comprar";
                botonComprar.className = "btn btn-primary comprar";
                botonComprar.id = "comprar";
                conteBtn.appendChild(botonComprar);
            }
        }
        const eliminar = document.querySelectorAll(`.btn.btn-danger`);
        eliminar.forEach((eliminarBoton,index) =>{
            eliminarBoton.addEventListener("click",()=>{
                    Swal.fire({
                    title: '¿esta seguro que quiere eliminar este producto?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'si, estoy seguro',
                    cancelButtonText:`no, gracias`
                    }).then((result) => {
                    if (result.isConfirmed) {
                        carrito.splice(index,1);
                        dibujarTabla();
                        localStorage.setItem("carrito",JSON.stringify(carrito));
                        if (carrito.length == 0) {
                            conteBtn.innerHTML=`
                            <button id="vaciar" class="btn btn-primary">Vaciar</button>
                            `;
                        }
                        Swal.fire(
                            'Producto eliminado',
                            '',
                            'warning'
                        )
                    }
                })
            });
        });
        const vaciar= document.querySelector("#vaciar");
        
        vaciar.addEventListener("click",()=>{
            
            Swal.fire({
                title: '¿esta seguro que quiere vaciar el carrito?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'si, estoy seguro',
                cancelButtonText:`no, gracias`
              }).then((result) => {
                if (result.isConfirmed) {
                    conteBtn.innerHTML=`
                        <button id="vaciar" class="btn btn-primary">Vaciar</button>
                    `;
                    carrito= [];
                    dibujarTabla();
                    localStorage.setItem("carrito",JSON.stringify(carrito));
                    Swal.fire(
                        'Ya tiene su carrito vacio',
                        '',
                        'warning'
                    )
                }
            })
            
        });
        const comprar = document.querySelector("#comprar");
        comprar.addEventListener("click",() =>{
            funcionComprar();
        })
        
    });
    total.textContent=(`$${carrito.reduce((accu,item)=> accu+ item.producto.precio*item.cantidad,0)}`);
    
}

function funcionComprar() {
    console.log("comprando");
}