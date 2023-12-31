document.addEventListener("DOMContentLoaded", function () {
    // Obtén los datos de sesión almacenados en localStorage
    let sessionData = localStorage.getItem("session");
    if (sessionData) {
        // Parsea los datos de sesión de JSON a un objeto JavaScript
        let userData = JSON.parse(sessionData);
        // Obtén los datos de usuarios almacenados en localStorage
        let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || {};


        // Llena los campos del formulario con los datos de sesión
        document.getElementById("usuario").value = userData.usuario;
        document.getElementById("contraseña").value = userData.contraseña;
        document.getElementById("repetircontraseña").value = userData.contraseña;
        document.getElementById("fechanacimiento").value = userData.fechanacimiento;
        document.getElementById("email").value = userData.email;

        // Guarda el nombre de usuario actual para saber cual es el usuario qu esta en session actualmente
        let prevUserName = userData.usuario;

        // Agrega un evento de clic al enlace "Eliminar usuario"
        let eliminarUsuarioLink = document.querySelector(".eliminarusuario");
        eliminarUsuarioLink.addEventListener("click", function (event) {
            event.preventDefault(); // Evita que el enlace redireccione automáticamente

            // Elimina al usuario actual del objeto usuariosRegistrados
            delete usuariosRegistrados[prevUserName];

            // Guarda la lista actualizada en localStorage
            localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));

            // Elimina los datos de la sesión del usuario actual
            localStorage.removeItem("session");

            // Redirige al usuario a la página de inicio
            window.location.href = "index.html";
        });

        // Agrega un evento de clic al botón "Guardar"
        let guardarButton = document.querySelector(".guardar");
        guardarButton.addEventListener("click", function (event) {
            event.preventDefault(); // Evita que el enlace redireccione automáticamente
            // Obtén los datos actualizados del usuario desde el formulario
            let usuarioActualizado = document.getElementById("usuario").value;
            let contraseñaActualizada = document.getElementById("contraseña").value;
            let fechaNacimientoActualizada = document.getElementById("fechanacimiento").value;
            let emailActualizado = document.getElementById("email").value;

            // Verifica si las contraseñas coinciden
            if (contraseñaActualizada !== document.getElementById("repetircontraseña").value) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            // Verifica si el nombre de usuario ya existe
            if (usuariosRegistrados.hasOwnProperty(usuarioActualizado) && usuarioActualizado !== prevUserName) {
                alert("El nombre de usuario ya está en uso.");
                return;
            }

            // verifica que algun campo haya sido cambiado
            if (usuarioActualizado === prevUserName && contraseñaActualizada === userData.contraseña && fechaNacimientoActualizada === userData.fechanacimiento && emailActualizado === userData.email) {
                alert("No se han realizado cambios.");
                return;
            }

            let usuarioQueSeVaAEliminar = usuariosRegistrados[prevUserName];
            // Elimina al usuario anterior del objeto usuariosRegistrados
            delete usuariosRegistrados[prevUserName];

            // Crea un nuevo objeto con los datos actualizados
            let usuarioActualizadoData = {
                ...usuarioQueSeVaAEliminar,
                usuario: usuarioActualizado,
                contraseña: contraseñaActualizada,
                fechanacimiento: fechaNacimientoActualizada,
                email: emailActualizado
            };

            // Agrega el nuevo usuario a usuariosRegistrados
            usuariosRegistrados[usuarioActualizado] = usuarioActualizadoData;

            // Actualiza los datos de la sesión con los nuevos valores
            userData.usuario = usuarioActualizado;
            userData.contraseña = contraseñaActualizada;
            userData.fechanacimiento = fechaNacimientoActualizada;
            userData.email = emailActualizado;

            // Guarda los datos actualizados en localStorage
            localStorage.setItem("session", JSON.stringify(userData));
            localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));
            prevUserName = usuarioActualizado;

             // Obtén el modal
            let modal = document.getElementById("modal");
            modal.showModal();

            // Agrega un evento de clic al botón "Ir a inicio" en el modal
            let goHome = document.getElementById("goHome");
            goHome.addEventListener("click", function () {
                window.location.href = "vistapantallaprincipa.html";
            });

            // Agrega un evento de clic al botón "Cerrar" en el modal
            let closeModalButton = document.getElementById("closeModal");
            closeModalButton.addEventListener("click", function () {
                // Cierra el modal
                modal.close()
            });
        });

        let planesPremium = document.querySelector(".planesPremium");
        if(userData && userData?.datosPremium?.premium){
            planesPremium.textContent = `Cambiar Plan Actual ( ${userData.datosPremium.tipoPremium} )`;
        }
    }
});