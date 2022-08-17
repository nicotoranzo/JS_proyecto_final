function Prestamo(capital, cantidadCuotas, interes, cuotaMes, devolucionTotal) {
    this.capital = capital
    this.cantidadCuotas = cantidadCuotas
    this.interes = interes
    this.cuotaMes = cuotaMes
    this.devolucionTotal = devolucionTotal
}

let cantidadPrestamos = 0
let name

let prestamo = {...new Prestamo(0,0,0,0,0)}
let prestamos=[]

const username = document.getElementById("username")
username.addEventListener("submit", validateUsername)
function validateUsername(event) {
    event.preventDefault()
    let form = event.target
    name = form[0].value
    
    localstorage()
    Swal.fire({
        title: "¡Gracias " + name + "!",
        icon: 'success',
        confirmButtonText: 'Cerrar',
        width: "40%",
        backdrop: "true",
        timer: 2000,
        color: "#2B4BEB",
        confirmButtonColor: "#2B4BEB",
    })
    
}

function localstorage(){
localStorage.setItem("name",name)
name = localStorage.getItem("name")
}

const formulario = document.getElementById("formulario")
formulario.addEventListener("submit", validateForm)
function validateForm(event){
    event.preventDefault()
    let form = event.target
    cantidadPrestamos = form[0].value
    prestamoNuevo()
}

const contenedor = document.getElementById("contenedor")
const lista = document.getElementById("lista")
function classContenedor() {
        contenedor.className= "container principal subtitulos p-3"
        lista.className="list-group list-group-flush"
    }


function prestamoNuevo(){    
    
    if(cantidadPrestamos<=2){

    let display = document.getElementById("display")
    display.classList.remove("d-none")        
    }
    else{
        Swal.fire({
            title: "Hola " + name + ",",
            text: 'Solo podes solicitar hasta 2 prestamos',
            icon: 'error',
            confirmButtonText: 'Cerrar',
            width: "40%",
            backdrop: "true",
            timer: 3000,
            timerProgressBar: true,
            color: "#2B4BEB",
            confirmButtonColor: "#2B4BEB",
        })
    }
}

let formPrestamo = document.getElementById("formPrestamo")
formPrestamo.addEventListener("submit", validateFormPrestamo)
function validateFormPrestamo(event){
    event.preventDefault()
    let formPrestamo = event.target
    prestamo.capital = formPrestamo[0].value
    prestamo.cantidadCuotas = formPrestamo[1].value
    prestamo.interes = formPrestamo[2].value / 100
    prestar()
                
}  

function tasa (interes){
return (1 + interes) ** (1/12) - 1
}; 
function cuotaMensual (capital, interes, cuotas){
prestamo.cuotaMes = (tasa(interes) * capital) / (1 - (1 + tasa(interes)) ** - cuotas)
}; 
function devolucionTotal(cuotaMensual, cuotas){
prestamo.devolucionTotal = cuotaMensual * cuotas    
};

function deployPrestamos(){
    let node= document.createElement("li")
    node.className= "list-group-item"
    node.innerHTML = `<h3>Solicitaste: 
    $${prestamo.capital}</h3>
    <p>El interes que queres pagar es ${(prestamo.interes * 100).toFixed(2)}%</p>
    <p>En: ${prestamo.cantidadCuotas} cuotas</p>
    <p>Cada cuota será de: 
    $${prestamo.cuotaMes.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2})}</p>
    <p>Vas a devolver en total 
        $${prestamo.devolucionTotal.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2})}</p>`
    lista.append(node)
    contenedor.append(lista)
}

function prestar(){
        if (prestamos.length < 2){
        /*este if es para que no pueda crear mas prestamos despues de 2
        pero si pone 1 le deja llegar a 2, falta resolver*/        
            if(prestamo.capital >= 10000){
                if(prestamo.cantidadCuotas <=60){
                    tasa(prestamo.interes)
                    cuotaMensual(prestamo.capital, tasa(prestamo.interes), prestamo.cantidadCuotas)
                    devolucionTotal(prestamo.cuotaMes, prestamo.cantidadCuotas) 
                    prestamos.push({...prestamo})
                    console.log(prestamos)//esto despues hay que borrarlo
                }
                else{                        
                    Swal.fire({
                        title: "Hola " + name + ",",
                        text: 'Excediste la cantidad de cuotas habilitadas',
                        icon: 'error',
                        confirmButtonText: 'Cerrar',
                        width: "40%",
                        backdrop: "true",
                        timer: 3000,
                        timerProgressBar: true,
                        color: "#2B4BEB",
                        confirmButtonColor: "#2B4BEB",
                    })
                } 
            }
            else{
                Swal.fire({
                        title: "Hola " + name + ",",
                        text: 'El monto minimo a solicitar es $10.000',
                        icon: 'error',
                        confirmButtonText: 'Cerrar',
                        width: "40%",
                        backdrop: "true",
                        timer: 3000,
                        timerProgressBar: true,
                        color: "#2B4BEB",
                        confirmButtonColor: "#2B4BEB",
                    })
            }
        }
        else{
            Swal.fire({
                        title: "Hola " + name + ",",
                        text: 'Alcanzaste el maximo de prestamos posibles',
                        icon: 'error',
                        confirmButtonText: 'Cerrar',
                        width: "40%",
                        backdrop: "true",
                        timer: 3000,
                        timerProgressBar: true,
                        color: "#2B4BEB",
                        confirmButtonColor: "#2B4BEB",
                    })
        }

        lista.innerHTML = ''

        for (const prestamo of prestamos){

            classContenedor()
            deployPrestamos()    
        }

        let saveButton = document.getElementById("save-button")
        saveButton.className="container pretty-button"
        saveButton.addEventListener("click", guardarPrestamos)

        function guardarPrestamos(){
        localStorage.setItem("guardaPrestamos", JSON.stringify(prestamos))
        }

}

let prestamosLS 

function cargarPrestamos(){
    if (localStorage.getItem('guardaPrestamos') !== null) {
        // Carga la información
        
        prestamosLS = JSON.parse(localStorage.getItem('guardaPrestamos'));
        console.log(prestamosLS)/*Esto despues hay que borrarlo*/
        for (const prestamo of prestamosLS){
        //si uso deployPrestamos() carga en 0 en vez de cargar el guardado    
        classContenedor()
        let node= document.createElement("li")
        node.className= "list-group-item"
        node.innerHTML = `<h3>Solicitaste: 
        $${prestamo.capital}</h3>
        <p>El interes que queres pagar es ${(prestamo.interes * 100).toFixed(2)}%</p>
        <p>En: ${prestamo.cantidadCuotas} cuotas</p>
        <p>Cada cuota será de: 
        $${prestamo.cuotaMes.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2})}</p>
        <p>Vas a devolver en total 
            $${prestamo.devolucionTotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2})}</p>`
        lista.append(node)
        contenedor.append(lista)
        
        }

    }

}

cargarPrestamos()

                                                 
                   

        


       
        

     





