

let cantidadPrestamos = 0

let formulario = document.getElementById("formulario")
formulario.addEventListener("submit", validateForm)
function validateForm(event){
    event.preventDefault()
    let form = event.target
    cantidadPrestamos = form[0].value
    prestamo()
}

function Prestamo(capital, cantidadCuotas, interes, cuotaMes, devolucionTotal) {
    this.capital = capital
    this.cantidadCuotas = cantidadCuotas
    this.interes = interes
    this.cuotaMes = cuotaMes
    this.devolucionTotal = devolucionTotal
}



function prestamo(){
    if(cantidadPrestamos<=2){

        let display = document.getElementById("display")
        display.className="container principal mb-2 d-block"
        let prestamos = []

        for(let i = 0; i < cantidadPrestamos; i++){

            let prestamo = new Prestamo(0,0,0,0,0)

            prestamo.capital = 0
            prestamo.cantidadCuotas = 0
            prestamo.interes = 0

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

            function prestar(){

                function tasa (interes){
                return (1 + interes) ** (1/12) - 1
                }; 
                function cuotaMensual (capital, interes, cuotas){
                prestamo.cuotaMes = (tasa(interes) * capital) / (1 - (1 + tasa(interes)) ** - cuotas)
                }; 
                function devolucionTotal(cuotaMensual, cuotas){
                prestamo.devolucionTotal = cuotaMensual * cuotas    
                };

                if(prestamo.capital >= 10000){
                    if(prestamo.cantidadCuotas <=60){
                        tasa(prestamo.interes)
                        cuotaMensual(prestamo.capital, tasa(prestamo.interes), prestamo.cantidadCuotas)
                        devolucionTotal(prestamo.cuotaMes, prestamo.cantidadCuotas) 
                        prestamos.push(prestamo)  

                   }
                   else{
                        let contenedor = document.getElementById("contenedor")
                        contenedor.innerHTML="Excediste la cantidad de cuotas habilitadas"
                        contenedor.className= "container principal subtitulos"
                        contenedor.append(contenedor)
                   } 
                }
                else{
                    let contenedor = document.getElementById("contenedor")
                    contenedor.innerHTML="El monto solicitado es insuficiente. El minimo es $10.000"
                    contenedor.className= "container principal subtitulos"
                    contenedor.append(contenedor) 
                }
             
                for (const prestamo of prestamos){
                    let contenedor = document.getElementById("contenedor")
                        contenedor.innerHTML=`<h3>Solicitaste: $${prestamo.capital}</h3>
                        <p>el interes que queres pagar es ${prestamo.interes * 100}%</p>
                        <p>en: ${prestamo.cantidadCuotas} cuotas</p>
                        <p>vas a pagar: $${prestamo.cuotaMes.toFixed(2)}</p>
                        <p>vas a devolver en total $${prestamo.devolucionTotal.toFixed(2)}</p>`
                    contenedor.className= "container principal"
                    contenedor.append(contenedor) 
                }   
            }
    }
}
    else{
        let contenedor = document.getElementById("contenedor")
        contenedor.innerHTML='El maximo de prestamos a solicitar es 2'
        contenedor.className= "container principal"
        contenedor.append(contenedor)
    }
}





