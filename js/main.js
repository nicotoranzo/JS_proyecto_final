


let cantidadPrestamos = 0
let name
let nombre

const username = document.getElementById("username")
username.addEventListener("submit", validateUsername)
function validateUsername(event) {
    event.preventDefault()
    let form = event.target
    name = form[0].value
    let nombre
    localstorage()
    
}

    function localstorage(){
    localStorage.setItem("name",name)
    nombre = localStorage.getItem("name")
    }

    const formulario = document.getElementById("formulario")
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

        const contenedor = document.getElementById("contenedor")
        const lista = document.getElementById("lista")
        function classContenedor() {
            contenedor.className= "container principal subtitulos p-3"
            lista.className="list-group list-group-flush"
                }

        if(cantidadPrestamos<=2){

            let display = document.getElementById("display")
            display.classList.remove("d-none")

            let prestamos = []

            for(let i = 0; i < cantidadPrestamos -1; i++){ 
                /*Sin el menos 1 creaba dos prestamos con el mismo input en vez
                de esperar uno nuevo (no se porque) */
      
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
                    
            if (prestamos.length < 2){
            /*este if es para que no pueda crear mas prestamos despues de 2
            pero si pone 1 le deja llegar a 2, falta resolver*/        
                if(prestamo.capital >= 10000){
                    if(prestamo.cantidadCuotas <=60){
                        tasa(prestamo.interes)
                        cuotaMensual(prestamo.capital, tasa(prestamo.interes), prestamo.cantidadCuotas)
                        devolucionTotal(prestamo.cuotaMes, prestamo.cantidadCuotas) 
                        prestamos.push(prestamo)
                        console.log(prestamos)//esto despues hay que borrarlo

                    }
                    else{                        
                        contenedor.innerHTML= nombre + ", excediste la cantidad de cuotas habilitadas"
                        classContenedor()
                    } 
                }
                else{
                    contenedor.innerHTML= nombre + ", el monto solicitado es insuficiente. El minimo es $10.000"
                    classContenedor()
                }
            }
            else{
              let maxPrestamo = document.getElementById("maxPrestamo")
              maxPrestamo.className="container principal subtitulos p-3 mb-3"
              maxPrestamo.innerText= nombre + ", alcanzaste el maximo de prestamos posibles"
            }    
                 
                for (const prestamo of prestamos){

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
    }
        else{
            contenedor.innerHTML= nombre + ', El maximo de prestamos a solicitar es 2'
            classContenedor()
        }
    }






