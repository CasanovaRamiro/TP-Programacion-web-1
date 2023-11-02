// import { getUserEnSesion } from '../reusables/getNombreUsuario.js'
const favoritos = [];
const USER = JSON.parse(localStorage.getItem("session"));
const USUARIOS_REGISTRADOS = JSON.parse(localStorage.getItem("usuariosRegistrados"));

document.addEventListener('mouseover', (event) => {
    //SI EL MOUSE SE POSA SOBRE LA ESTRELLA, SE AGITA POR 1 SEG
     if (document.getElementById(event.target.id)) {
        var star = document.getElementById(event.target.id);
        if(star.classList.contains("fa-shake")){
           star.classList.remove("fa-shake");
        }
        else{
           star.classList.add("fa-shake");
           setTimeout(()=> {
               star.classList.remove("fa-shake");
           }, 500)
        }
     }
});

document.addEventListener('click', (event) => {

    //AL HACER CLICK EN LA ESTRELLA SE AGREGA AL ARRAY DE FAVORITOS

     if (document.getElementById(event.target.id)) {
        var star = document.getElementById(event.target.id);
        if(star.classList.contains("fa-solid")){
           star.classList.remove("fa-solid");
           USER.albumsFav.splice(favoritos.indexOf(event.target.id), 1);
           localStorage.setItem('session', JSON.stringify(USER));
           USUARIOS_REGISTRADOS[USER.usuario] = USER;
           localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
           console.log(USER);
           console.log(USUARIOS_REGISTRADOS);
        }
        else{
           star.classList.add("fa-solid");
           USER.albumsFav.push(event.target.id);
           localStorage.setItem('session', JSON.stringify(USER));
           USUARIOS_REGISTRADOS[USER.usuario] = USER;
           localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
           console.log(USER);
           console.log(USUARIOS_REGISTRADOS);
        }
     }
});