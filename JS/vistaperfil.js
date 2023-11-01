 document.addEventListener("DOMContentLoaded", function () {
    // Obtén los datos de sesión almacenados en localStorage
    let sessionData = localStorage.getItem("session");
    if (sessionData) {
        // Parsea los datos de sesión de JSON a un objeto JavaScript
        let userData = JSON.parse(sessionData);

        // Llena los campos del formulario con los datos de sesión
        document.getElementById("usuario").value = userData.usuario;
        document.getElementById("contraseña").value = userData.contraseña;
        document.getElementById("repetircontraseña").value = userData.contraseña;
        document.getElementById("fechanacimiento").value = userData.fechanacimiento;
        document.getElementById("email").value = userData.email;
    }
});

