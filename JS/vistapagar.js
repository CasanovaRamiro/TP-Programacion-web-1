// Obtener el nombre del plan de la URL
var urlParams = new URLSearchParams(window.location.search);
var planNombre = urlParams.get("plan");
var descripcion = "";
const USER = JSON.parse(localStorage.getItem('session'));
const USUARIOS = JSON.parse(localStorage.getItem('usuariosRegistrados'));

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

//trae todos los campos para pago
var cardNumberInput = document.getElementById("card-number-input");
var cvcInput = document.getElementById("cvc-input");
var vencimientoInput = document.getElementById("vencimiento-input");
var nombreInput = document.getElementById("nombre-input");
var registrarmeButton = document.querySelector("button");



//validaciones en accion
registrarmeButton.addEventListener("click", event  =>{
    var cvc = cvcInput.value;
    var cardNumber = cardNumberInput.value.replace(/\s/g, ''); // Elimina espacios en blanco
    var vencimiento = new Date(vencimientoInput.value);
    var hoy = new Date();
    // Obtén el modal
    let modal = document.getElementById("modal");
    //trae el boton de volver al home
    let goHome = document.getElementById("goHome");
    if (
        nombreInput.value.trim() === "" ||
        cardNumber.trim() === "" ||
        vencimientoInput.value === "" ||
        cvc.trim() === ""
    ) {
        alert("Por favor, completa todos los campos antes de registrarte.");
        event.preventDefault(); // Evita la redirección si no se completan los campos
        return;
    } 
  
    //validacion nros tarjeta
    if (cardNumber.length !== 16) {
        cardNumberInput.setCustomValidity("El número de tarjeta debe tener exactamente 16 dígitos.");
        return;
    }
    else{
        cardNumberInput.setCustomValidity("");
    }

    //validacion de cod se seguridad
    if (!/^\d{3}$/.test(cvc) || cvc === "000" || cvc === "999" || cvc === null) {
        cvcInput.setCustomValidity("El CVC debe tener 3 dígitos y no puede ser '000' o '999'.");
        return;
    }
    else{
        cardNumberInput.setCustomValidity("");
    }

    // Validación del vencimiento
    if (vencimientoInput.value === "") {
        vencimientoInput.setCustomValidity("Debes ingresar la fecha de vencimiento.");
        return;
    } else if (vencimiento < hoy) {
        vencimientoInput.setCustomValidity("La fecha de vencimiento debe ser posterior a hoy.");
        return;
    }
    else{
        cardNumberInput.setCustomValidity("");
    }

    event.preventDefault();
    
    //Agrega datos de abono

    // Agrega un evento de clic al botón "Ir a inicio" en el modal
    if(USER == null || USER == undefined || USUARIOS == null || USUARIOS == undefined){
        alert('Atención: Problemas al hallar el usuario en sesión. Refresque la página' );
    }
    USER.datosPremium = {
        "premium" : true,
        "tipoPremium" :  planNombre,
    };
    USUARIOS[USER.usuario] = USER;
    localStorage.setItem('session', JSON.stringify(USER));

    localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS));

    modal.showModal();
    goHome.addEventListener("click", e => {
        window.location.href = "vistapantallaprincipa.html";
    });
});