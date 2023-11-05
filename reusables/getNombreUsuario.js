// Verificar si hay una sesión de usuario activa
function getUserEnSesion(){
    return JSON.parse(localStorage.getItem("session"));
}


// Obtener el elemento donde deseas mostrar el nombre de usuario
let nombreUsuarioElement = document.querySelector(".nombre-usuario");
const user = getUserEnSesion();
if (user && nombreUsuarioElement) {
    // Mostrar el nombre de usuario en la página
    nombreUsuarioElement.textContent = user.usuario;
}

// export {getUserEnSesion, user}
