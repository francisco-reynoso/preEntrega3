let productos = [];
let carrito = [];

productos.push(new Producto(1,"sauvage",105000,"dior"));
productos.push(new Producto(2,"Aqua di gio",185000,"giorgio armani"));
productos.push(new Producto(3,"bleau de chanel",89000,"chanel"));
productos.push(new Producto(4,"one millon",76000,"paco rabbane"));
productos.push(new Producto(5,"212 vip black",102000,"carolina herrera"));
productos.push(new Producto(6,"Y le parfum",95000,"yves saint laurent"));
productos.push(new Producto(7,"homme sport",121000,"dior"));


localStorage.setItem(`productos`,JSON.stringify(productos));


const selectProductos = document.querySelector("#productos");
const botonAgregar= document.querySelector("#agregar");

function traerItemsStorage() {
    productos = JSON.parse(localStorage.getItem(`productos`)) || [];
    carrito =JSON.parse(localStorage.getItem(`carrito`)) || [];
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
            <td><button id="item-${index}" class ="btn btn-danger">eliminar</button></td>
            
        </tr>
        `;

        const eliminar = document.querySelectorAll(`.btn.btn-danger`);
        eliminar.forEach((eliminarBoton,index) =>{
            eliminarBoton.addEventListener("click",()=>{
                carrito.splice(index,1);
                dibujarTabla();
                localStorage.setItem("carrito",JSON.stringify(carrito));
            });
        });
        const vaciar= document.querySelector("#vaciar");
        vaciar.addEventListener("click",()=>{
            carrito= [];
            dibujarTabla();
            localStorage.setItem("carrito",JSON.stringify(carrito));
        });

    });
    total.textContent=(`$${carrito.reduce((accu,item)=> accu+ item.producto.precio*item.cantidad,0)}`);
}