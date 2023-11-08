
const favoritos = [];
const USER = JSON.parse(localStorage.getItem("session"));
const USUARIOS_REGISTRADOS = JSON.parse(localStorage.getItem("usuariosRegistrados"));
const ALBUM_SELECTED = JSON.parse(localStorage.getItem("albumSelected"));


if (USER.albumsFav.length != 0) {
   let albums = USER.albumsFav;
   albums.forEach(element => {
      let star = document.getElementById(element);
      if (star != null) {
         star.classList.add('fa-solid');
         star.classList.add('to-show')
      }
   });
}

document.addEventListener('mouseover', (event) => {
   //SI EL MOUSE SE POSA SOBRE LA ESTRELLA, SE AGITA POR 1 SEG
   if (document.getElementById(event.target.id)) {
      var star = document.getElementById(event.target.id);
      if (star.classList.contains("fa-shake")) {
         star.classList.remove("fa-shake");
      }
      else {
         star.classList.add("fa-shake");
         setTimeout(() => {
            star.classList.remove("fa-shake");
         }, 500)
      }
   }
});

document.addEventListener('click', addAndRemoveStar);

function addAndRemoveStar(event) {

   const clickedElement = event.target;

   if (clickedElement.tagName === 'IMG') {
      event.preventDefault()

      const link = clickedElement.parentElement;

      if (link && link.nextElementSibling) {

         if (link.nextElementSibling.tagName === "SPAN") {

            const span = link.nextElementSibling;
            const icon = span.querySelector('i')

            if (icon.id) {
               ALBUM_SELECTED.push(icon.id)
               localStorage.setItem('albumSelected', JSON.stringify(ALBUM_SELECTED));
               window.location.href = 'vistamusicasonando.html';

            }
         }

      }
   } else {
      if (document.getElementById(event.target.id)) {
         var star = document.getElementById(event.target.id);
         if (star.classList.contains("fa-solid")) {
            star.classList.remove("fa-solid");
            removeFavoriteAlbum(event.target.id)
         }
         else {
            star.classList.add("fa-solid");
            USER.albumsFav.push(event.target.id);
            localStorage.setItem('session', JSON.stringify(USER));
            USUARIOS_REGISTRADOS[USER.usuario] = USER;
            localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
         }
      }

   }
}

function removeFavoriteAlbum(targetId) {
   let index = USER.albumsFav.indexOf(targetId);
   USER.albumsFav.splice(index, 1);
   localStorage.setItem('session', JSON.stringify(USER));
   USUARIOS_REGISTRADOS[USER.usuario] = USER;
   localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
}