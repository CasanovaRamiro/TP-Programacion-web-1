function handleLogin() {
    // Obtener el usuario y la contraseña del formulario
    let usuarioIngresado = document.getElementById("usuario").value;
    let contraseñaIngresada = document.getElementById("contraseña").value;

    // Obtener los datos de usuarios registrados desde localStorage
    let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || {};

    if (usuariosRegistrados.hasOwnProperty(usuarioIngresado)) {
        // Obtener los datos del usuario registrado
        let datosUsuario = usuariosRegistrados[usuarioIngresado];
        let contraseñaAlmacenada = datosUsuario.contraseña;

        // Verificar si la contraseña ingresada coincide con la contraseña almacenada
        let contraseñaTransformada = contraseñaIngresada.slice(contraseñaIngresada.length / 2) + contraseñaIngresada.slice(0, contraseñaIngresada.length / 2).split('').reverse().join('');

        if (contraseñaTransformada === contraseñaAlmacenada) {
            // Iniciar la sesión del usuario en localStorage
            localStorage.setItem("session", JSON.stringify(datosUsuario));
            // Redirigir a la página principal
            window.location.href = "vistapantallaprincipa.html";
        } else {
            // Contraseña incorrecta
            alert("El usuario y/o contraseña es incorrecto");
        }
    } else {
        // Usuario no encontrado
        alert("El usuario y/o contraseña es incorrecto");
    }
}

let loginButton = document.querySelector(".boton");
loginButton.addEventListener("click", handleLogin);
