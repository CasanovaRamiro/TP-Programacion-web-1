function handleLogin() {
    // Obtener el usuario y la contraseña del formulario
    let usuarioIngresado = document.getElementById("usuario").value;
    let contraseñaIngresada = document.getElementById("contraseña").value;

    // Obtener los datos de usuarios registrados desde localStorage
    let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || {};

    // Obtener los datos del usuario registrado
    let datosUsuario = usuariosRegistrados[usuarioIngresado];

    if(datosUsuario == null || datosUsuario == undefined){
        alert("El usuario y/o contraseña es incorrecto");
        return;
    }
    let contraseñaAlmacenada = datosUsuario.contraseña;

    // Verificar si la contraseña ingresada coincide con la contraseña almacenada
    let contraseñaTransformada = contraseñaIngresada.slice(contraseñaIngresada.length / 2) + contraseñaIngresada.slice(0, contraseñaIngresada.length / 2).split('').reverse().join('');

    if (contraseñaTransformada === contraseñaAlmacenada) {
        // Iniciar la sesión del usuario en localStorage
        datosUsuario.logueado = true;
        localStorage.setItem("session", JSON.stringify(datosUsuario));

        localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados))
        // Redirigir a la página principal
        window.location.href = "vistapantallaprincipa.html";
    } else if(contraseñaTransformada != contraseñaAlmacenada || datosUsuario == null ){
        // Contraseña incorrecta
        alert("El usuario y/o contraseña es incorrecto");
    }
}
