

let cantidadPrestamos = prompt("¿Cuantos prestamos queres solicitar? (Maximo 2)")

function Prestamo(capital, cantidadCuotas, interes, cuotaMes, devolucionTotal) {
    this.capital = capital
    this.cantidadCuotas = cantidadCuotas
    this.interes = interes
    this.cuotaMes = cuotaMes
    this.devolucionTotal = devolucionTotal
}

if(cantidadPrestamos<=2){

    let prestamo = new Prestamo(0,0,0,0,0)
    let Prestamos = []

    for(let i = 0; i < cantidadPrestamos; i++){

        prestamo.capital = parseInt(prompt("ingresa el monto a pedir prestado (minimo $10.000)"))
        prestamo.cantidadCuotas = parseInt(prompt("ingresa la cantidad de cuotas que queres pagar (maximo 60)"))
        prestamo.interes = parseFloat(prompt("ingresa el interes anual que queres pagar")) / 100

        function tasa (interes){
        return (1 + prestamo.interes) ** (1/12) - 1
        }; 

        function cuotaMensual (capital, interes, cuotas){
        prestamo.cuotaMes = (tasa(prestamo.interes) * prestamo.capital) / (1 - (1 + tasa(prestamo.interes)) ** - prestamo.cantidadCuotas)
        }; 

        function devolucionTotal(cuotaMensual, cuotas){
        prestamo.devolucionTotal = prestamo.cuotaMes * prestamo.cantidadCuotas    
        };

        if(prestamo.capital >= 10000){
            if(prestamo.cantidadCuotas <=60){
                tasa(prestamo.interes)
                cuotaMensual(prestamo.capital, tasa(prestamo.interes), prestamo.cantidadCuotas)
                devolucionTotal(prestamo.cuotaMes, prestamo.cantidadCuotas) 
                Prestamos.push(prestamo)  
                for (const prestamo of Prestamos){
                    /*alert("los datos de tu prestamo son: \n Capital: $ " + prestamo.capital + 
                        "\n Interes: " + prestamo.interes * 100 + "%" 
                        + "\n Cantidad de Cuotas: " + prestamo.cantidadCuotas
                        + "\n Cuota Mensual: $ " + prestamo.cuotaMes.toFixed(2) + 
                        "\n Devolución total: $" + prestamo.devolucionTotal.toFixed(2))*/
                        let card = document.createElement("div")
                        card.innerHTML=`<h3>Solicitaste: $${prestamo.capital}</h3>
                                        <p>vas a pagar: $${prestamo.cuotaMes.toFixed(2)}</p>
                                        <p>en: ${prestamo.cantidadCuotas} cuotas</p>`
                        document.body.append(card) 
                }
           }
           else{
             alert("Excediste la cantidad de cuotas")
           } 
        }
        else{
            alert("el monto solicitado es insuficiente.")
        }
    }    
}
else{
    alert("Excediste el maximo de prestamos posibles")
}






