const USERDATA = {
    usuario: "",
    contraseña: "",
    fechanacimiento: "",
    email: "",
    albumsFav: [],
    cancionesFav: []
};
function handleRegistration() {
    // Obtén los datos del formulario
    let usuario = document.getElementById("usuario").value;
    let contraseña = document.getElementById("contraseña").value;
    let repetirContraseña = document.getElementById("repetircontraseña").value;
    let fechaNacimiento = document.getElementById("fechanacimiento").value;
    let email = document.getElementById("email").value;

    // Verifica si las contraseñas coinciden
    if (contraseña !== repetirContraseña) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Asegúrate de que todos los campos estén completos y con una longitud mínima
    if (contraseña.length < 3 || usuario.length < 3 || repetirContraseña.length < 3 || fechaNacimiento.length < 3 || email.length < 3) {
        alert("Hay campos sin completar o con longitud insuficiente.");
        return;
    }

    // Transforma la contraseña para guardarla en el local storage
    let contraseñaTransformada = contraseña.slice(contraseña.length / 2) + contraseña.slice(0, contraseña.length / 2).split('').reverse().join('');

    // Obtén los datos de usuarios almacenados en localStorage
    let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || {};

    // Verifica si el usuario ya existe
    if (usuariosRegistrados.hasOwnProperty(usuario)) {
        alert("El nombre de usuario ya está en uso.");
        return;
    }

    // Crea un objeto con los datos del usuario
    let userData = {
        usuario: usuario,
        contraseña: contraseñaTransformada,
        fechanacimiento: fechaNacimiento,
        email: email,
        albumsFav: [],
        cancionesFav: []
    };

    // Agrega el usuario a la lista de usuarios registrados
    usuariosRegistrados[usuario] = userData;

    // Guarda la lista actualizada en localStorage
    localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));

    // Manda al usuario a la página de inicio de sesión
    window.location.href = "index.html";
}

// Agrega un event listener al botón de registro
let registrationButton = document.querySelector("button");
registrationButton.addEventListener("click", handleRegistration);
