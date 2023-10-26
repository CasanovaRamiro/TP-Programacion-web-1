// Verificar si hay una sesión de usuario activa
let usuarioEnSesion =  JSON.parse(localStorage.getItem("session"));

// Obtener el elemento donde deseas mostrar el nombre de usuario
let nombreUsuarioElement = document.querySelector(".nombre-usuario");

if (usuarioEnSesion && nombreUsuarioElement) {
    // Mostrar el nombre de usuario en la página
    nombreUsuarioElement.textContent = usuarioEnSesion.usuario;
}
