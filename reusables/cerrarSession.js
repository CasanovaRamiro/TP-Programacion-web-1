// Función para cerrar la sesión
function handleLogout(event) {
    event.preventDefault(); // Evita que el enlace redireccione automáticamente

    let datosUsuario = JSON.parse(localStorage.getItem("session"));
    let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados"));
    if(datosUsuario.logueado){
        datosUsuario.logueado = false;
        usuariosRegistrados[datosUsuario.usuario] = datosUsuario;
        localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));
    }
    // Elimina los datos de sesión del localStorage
    localStorage.removeItem("session");

    // Redirige al usuario a la página de inicio
    window.location.href = "index.html";
}

// Agrega un listener al enlace de "cerrarsesion" para ejecutar la función de logout 
const cerrarSesion = document.querySelector(".cerrarsesion");
cerrarSesion.addEventListener("click", handleLogout);

