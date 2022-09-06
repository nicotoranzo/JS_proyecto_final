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
        customClass: {
            container: "swal",
        }, 
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


if (localStorage.getItem('name') !== null){
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
        contenedor.className= "container principal subtitulos p-3 mb-3"
        lista.className="list-group list-group-flush"
    }


function prestamoNuevo(){    
    
    if(localStorage.getItem('name') !== null){
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
                customClass: {
                    container: "swal",
                },
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
                title: "Hola",
                text: 'Por favor carga tu nombre antes de continuar',
                icon: 'error',
                confirmButtonText: 'Cerrar',
                customClass: {
                    container: "swal",
                },
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


function prestar(){
        let saveButton = document.getElementById("save-button")
        saveButton.className="container btn btnModified"
        saveButton.addEventListener("click", guardarPrestamos)

        function guardarPrestamos(){
        Swal.fire({
            title: "Hola " + name + ",",
            text: 'Guardamos tu prestamo',
            icon: 'success',
            confirmButtonText: 'Cerrar',
            customClass: {
                container: "swal",
            },
            backdrop: "true",
            timer: 3000,
            timerProgressBar: true,
            color: "#2B4BEB",
            confirmButtonColor: "#2B4BEB",
        })    
        localStorage.setItem("guardaPrestamos", JSON.stringify(prestamos))
        }
        if (prestamos.length < 2){
        /*este if es para que no pueda crear mas prestamos despues de 2
        pero si pone 1 le deja llegar a 2, falta resolver*/        
            if(prestamo.capital >= 10000){
                if(prestamo.cantidadCuotas <=60){
                    if (prestamo.interes >=(20/100)){    
                        tasa(prestamo.interes)
                        cuotaMensual(prestamo.capital, tasa(prestamo.interes), prestamo.cantidadCuotas)
                        devolucionTotal(prestamo.cuotaMes, prestamo.cantidadCuotas) 
                        prestamos.push({...prestamo})
                    }
                    else{
                        Swal.fire({
                        title: "Hola " + name + ",",
                        text: 'El interes anual minimo es 20%',
                        icon: 'error',
                        confirmButtonText: 'Cerrar',
                        customClass: {
                            container: "swal",
                        },
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
                        text: 'Excediste la cantidad de cuotas habilitadas',
                        icon: 'error',
                        confirmButtonText: 'Cerrar',
                        customClass: {
                            container: "swal",
                        },
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
                        customClass: {
                            container: "swal",
                        },
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
                        customClass: {
                            container: "swal",
                        },
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
            let node= document.createElement("li")
            node.className= "list-group-item"
            node.innerHTML = `<h3>Solicitaste: 
            $${prestamo.capital}</h3>
            <p>El interés que queres pagar es ${(prestamo.interes * 100).toFixed(2)}%</p>
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


let prestamosLS 

function cargarPrestamos(){
    if (localStorage.getItem('guardaPrestamos') !== null) {
                Swal.fire({
                title: "Hola " + name + ",",
                text: '¿Querés cargar el prestamo guardado o borrarlo?',
                icon: 'warning',
                showDenyButton: true,
                confirmButtonText: 'Cargar',
                denyButtonText: "Borrar",
                backdrop: "true",
                color: "#2B4BEB",
                confirmButtonColor: "#2B4BEB",
                customClass: {
                    container: "swal",
                }, 
        }).then((result) => {
            if(result.isConfirmed){
                Swal.fire({
                    title:"Cargamos los prestamos que simulaste la ultima vez!",
                    customClass: {
                        container: "swal",
                    },
                    backdrop: "true",
                    color: "#2B4BEB",
                    confirmButtonColor: "#2B4BEB",
                    icon:"success",
                })
                prestamosLS = JSON.parse(localStorage.getItem('guardaPrestamos'));
                for (const prestamo of prestamosLS){
                   
                classContenedor()
                let node= document.createElement("li")
                node.className= "list-group-item"
                node.innerHTML = `<h3>La última vez solicitaste: 
                $${prestamo.capital}</h3>
                <p>El interés que querés pagar es ${(prestamo.interes * 100).toFixed(2)}%</p>
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
            else if(result.isDenied){
                Swal.fire({
                    title: "Borramos el prestamo.",
                    text:'Completa tu nombre y podes simular uno nuevo.',
                    customClass: {
                        container: "swal",
                    },
                    backdrop: "true",
                    color: "#2B4BEB",
                    confirmButtonColor: "#2B4BEB",
                    icon:"info",
                })
                localStorage.removeItem("guardaPrestamos")
                localStorage.removeItem("name")
            }
        })
    }
}             


cargarPrestamos()


fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales").
then( (resp) => resp.json() )
.then( (data) => {
        data.forEach((post) => {
            if(post.casa.venta != 0 && post.casa.nombre !== "Argentina" && post.casa.nombre !== "Dolar"){
            let dolar = document.getElementById("dolar")
            let cotizaciones = document.getElementById("cotizaciones")
            let nodeDolar = document.createElement('li')
            nodeDolar.className= "list-group-item"
            nodeDolar.innerHTML = `
                <p>${post.casa.nombre}: $${post.casa.venta}</p>
            `
            cotizaciones.append(nodeDolar)
            dolar.append(cotizaciones)
            }
        })

    })



                
                   

        


       
        

     





