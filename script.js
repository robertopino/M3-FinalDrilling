class Gasto {
    constructor(id, nombre, cantidad){
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }
}

function nuevoGasto(gastos){
    const tr = document.createElement('tr');
    const tbody = document.getElementById('tbody');

    tr.id = `elemento${gastos.id}`
    tr.innerHTML=
    `<tr id="elemento${gastos.id}">
    <td>${gastos.nombre}</td>
    <td>$${gastos.cantidad}</td>
    <td>
        <a onclick="calcular(${gastos.id}, ${gastos.cantidad})">
        <i class="fa-solid fa-trash"></i>
    </td>
    </tr>`
    tbody.appendChild(tr);
}

let presupuesto = 0;
function inputPresupuesto(){
    const button = document.getElementById("enviarPresupuesto");
    presupuesto = document.getElementById("presupuestoInput").value;
    if(presupuesto == null || parseInt(presupuesto)<0 || presupuesto == "" || presupuesto == 0){
        alert("Ingresa un Presupuesto válido!!!");
    } else {
        document.getElementById("cantidadPresupuesto").innerHTML = presupuesto;
        document.getElementById("presupuestoInput").value="";
        button.disabled = true;
    }
}

let sumaGastos = 0;
let gastos =[];
let balance = 0;
function inputGasto(){
    let titulo = document.getElementById("gastoInput").value;
    let cantidad = document.getElementById("cantidadInput").value;
    if((cantidad == null || parseInt(cantidad)<0 || cantidad == "" || cantidad == 0) && (titulo == null || titulo == "")){
        alert("Ingresa un Gasto válido!!!");
    } else {
        let gasto = new Gasto(Math.floor((Math.random()*100)+1), titulo, cantidad);

        sumaGastos = sumaGastos + parseInt(gasto.cantidad);
        if(sumaGastos > parseInt(presupuesto)){
            alert("No tienes saldo suficiente");
            sumaGastos = sumaGastos - parseInt(gasto.cantidad);
        }else {
        document.getElementById("cantidadGasto").innerHTML = sumaGastos;
        gastos.push(gasto);
        balance = parseInt(presupuesto) - sumaGastos;
        document.getElementById("cantidadBalance").innerHTML = balance;
        nuevoGasto(gasto);
        document.getElementById("gastoInput").value="";
        document.getElementById("cantidadInput").value="";
        }
    }
}

function calcular(id, cantidad){
    for(let i = 0; i < gastos.length; i++){
        if(id === gastos[i].id){
            let paraBorrar = document.getElementById("elemento"+id);
            paraBorrar.remove();
            gastos.splice(i, 1);
        }
    }

    sumaGastos = sumaGastos - parseInt(cantidad);
    document.getElementById("cantidadGasto").innerHTML = sumaGastos;
    
    balance = parseInt(presupuesto) - sumaGastos;
    document.getElementById("cantidadBalance").innerHTML = balance;
    nuevoGasto(gasto);
}