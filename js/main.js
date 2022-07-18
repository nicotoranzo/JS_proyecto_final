

let cantidadPrestamos = prompt("¿Cuantos prestamos queres solicitar?")


for(let i = 0; i < cantidadPrestamos; i++){

    let capital = parseInt(prompt("ingresa el monto a pedir prestado (minimo $10.000)"))
    let cantidadCuotas = parseInt(prompt("ingresa la cantidad de cuotas que queres pagar (maximo 60)"))
    let interes = parseFloat(prompt("ingresa el interes anual que queres pagar"))

    let interesReal = interes / 100

    let tasaMensual
    let resultado

    function tasa (primerNumero){
    tasaMensual = (1 + interesReal) ** (1/12) - 1
    } 

    function cuotaMensual (primerNumero, segundoNumero, tercerNumero){
    resultado = (tasaMensual * capital) / (1 - (1 + tasaMensual) ** - cantidadCuotas)
    } 

    if(capital >= 10000){
        if(cantidadCuotas <=60){
        alert("el monto que pediste prestado es: $" + capital)
        alert("la cantidad de cuotas que elegiste son: " + cantidadCuotas)
        alert("el interes que queres pagar es: " + interes + "%")
        tasa(interesReal)
        cuotaMensual(capital, tasaMensual, cantidadCuotas); 
        alert("tu cuota es $" + resultado.toFixed(2));
        let devolucionTotal = resultado * cantidadCuotas
        alert("el total que vas a devolver es $" + devolucionTotal.toFixed(2)) 
       }
       else{
         alert("Excediste la cantidad de cuotas")
       } 
    }
    else{
        alert("el monto solicitado es insuficiente.")
    }
}





