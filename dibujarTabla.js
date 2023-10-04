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

        const eliminar = document.querySelector(`#item-${index}`);
        eliminar.addEventListener("click", ()=>{

            carrito.splice(index,1);
            dibujarTabla();
            localStorage.setItem("carrito",JSON.stringify(carrito))
        });
    });
    total.textContent=(`$${carrito.reduce((accu,item)=> accu+ item.producto.precio*item.cantidad,0)}`);

}