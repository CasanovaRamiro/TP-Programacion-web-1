// Obtener el nombre del plan de la URL
var urlParams = new URLSearchParams(window.location.search);
var planNombre = urlParams.get("plan");
var descripcion = "";

if (planNombre) {
    // Mostrar el nombre del plan en el título
    document.getElementById("planElegido").textContent = "Has elegido el plan " + planNombre;
    if (planNombre === "mensual") {
        descripcion = "Este es el plan mensual sin descuentos.";
    } else if (planNombre === "semestral") {
        descripcion = "Este es el plan semestral con un 10% de descuento.";
    } else if (planNombre === "anual") {
        descripcion = "Este es el plan anual con un 20% de descuento.";
    }
    document.getElementById("descripcionPlan").textContent = descripcion;
} else {
    document.getElementById("planElegido").textContent = "No se ha seleccionado un plan.";
}

document.addEventListener("DOMContentLoaded", function() {
    var cardNumberInput = document.getElementById("card-number-input");
    var cvcInput = document.getElementById("cvc-input");
    var vencimientoInput = document.getElementById("vencimiento-input");
    var nombreInput = document.getElementById("nombre-input");
    var registrarmeButton = document.querySelector("button");


    cardNumberInput.addEventListener("input", function() {
        var cardNumber = cardNumberInput.value.replace(/\s/g, ''); // Elimina espacios en blanco
        if (cardNumber.length !== 16) {
            cardNumberInput.setCustomValidity("El número de tarjeta debe tener exactamente 16 dígitos.");
        } else {
            cardNumberInput.setCustomValidity("");
        }
    });

    cvcInput.addEventListener("input", function() {
        var cvc = cvcInput.value;
        if (!/^\d{3}$/.test(cvc) || cvc === "000" || cvc === "999" || cvc === null) {
            cvcInput.setCustomValidity("El CVC debe tener 3 dígitos y no puede ser '000' o '999'.");
        } else {
            cvcInput.setCustomValidity("");
        }
    });

    vencimientoInput.addEventListener("input", function() {
        // Validación del vencimiento
        var vencimiento = new Date(vencimientoInput.value);
        var hoy = new Date();

        if (vencimientoInput.value === "") {
            vencimientoInput.setCustomValidity("Debes ingresar la fecha de vencimiento.");
        } else if (vencimiento < hoy) {
            vencimientoInput.setCustomValidity("La fecha de vencimiento debe ser posterior a hoy.");
        } else {
            vencimientoInput.setCustomValidity(""); 
        }
    });

    nombreInput.addEventListener("input", function(){
        var nombre = nombreInput.value;
        if(nombreInput.value === ""){
            nombreInput.setCustomValidity("Debes ingresar nombre y apellido.");
        }
        else {
            vencimientoInput.setCustomValidity("");
        }
    }); 
    
    

    registrarmeButton.addEventListener("click", function(event) {
        event.preventDefault();

         // Obtén el modal
        let modal = document.getElementById("modal");
        if (
            nombreInput.value.trim() === "" ||
            cardNumberInput.value.trim() === "" ||
            vencimientoInput.value === "" ||
            cvcInput.value.trim() === ""
        ) {
            alert("Por favor, completa todos los campos antes de registrarte.");
        } else {
            modal.showModal();
        }
    });

    // Agrega un evento de clic al botón "Ir a inicio" en el modal
    let goHome = document.getElementById("goHome");
    goHome.addEventListener("click", function () {
        window.location.href = "vistapantallaprincipa.html";
    });
});