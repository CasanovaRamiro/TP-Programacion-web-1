
const favoritos = [];
const USER = JSON.parse(localStorage.getItem("session"));
const USUARIOS_REGISTRADOS = JSON.parse(localStorage.getItem("usuariosRegistrados"));

if(USER.albumsFav.length != 0){
    let albums = USER.albumsFav;
    albums.forEach(element => {
        let star = document.getElementById(element);
        if(star != null){
         star.classList.add('fa-solid');
        }
    });
}

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
   if(window.location.href.includes('vistabuscar')) return;
    //AL HACER CLICK EN LA ESTRELLA SE AGREGA AL ARRAY DE FAVORITOS
      const idObjetivo = event.target.id;
     if (document.getElementById(idObjetivo)) {
        var listaEstrellas = document.getElementsByClassName('fa-star');
         let listaEstrellasHermanas = [];
        for (const st in listaEstrellas) {
         if (Object.hasOwnProperty.call(listaEstrellas, st)) {
            const element = listaEstrellas[st];
            if(element.id.includes(idObjetivo)){
               listaEstrellasHermanas.push(element);
            }
            
         }
        }
        //SI JUSTO LA ESTRELLA Q DAMOS CLICK ES DE UN DISCO SONANDO
        if(listaEstrellasHermanas.length > 1){
         listaEstrellasHermanas.forEach(str => addOrRemoveStar(str, idObjetivo))
         }
         //SI NO, SI ES UNA ESTRELLA DE UN DISCO CUALQUIERA
         else if(!idObjetivo.includes('sonando')){
            let estrellaDiscoNormal = document.getElementById(idObjetivo);
            addOrRemoveStar(estrellaDiscoNormal, idObjetivo);
         }
         // SI NO PUEDE SER DESDE LA VISTA DE MUSICA SONANDO
         else{
            let estrellaId = idObjetivo.slice(8,idObjetivo.length);
            addOrRemoveStarFromMusicaSonando(listaEstrellasHermanas[0], estrellaId);
         }
     }
});

function addOrRemoveStar(estrella, targetId){

   if(estrella.classList.contains("fa-solid"))
   {
      estrella.classList.remove("fa-solid");
      //esto previene que se guarde un valor de disco incorrecto
      if (!estrella.id.includes('sonando')) {
         let index = USER.albumsFav.indexOf(targetId);
         USER.albumsFav.splice( index, 1);
         localStorage.setItem('session', JSON.stringify(USER));
         USUARIOS_REGISTRADOS[USER.usuario] = USER;
         localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
         return true;
      }
   }
   else{
      estrella.classList.add("fa-solid");
      if (!estrella.id.includes('sonando')) {
         USER.albumsFav.push(targetId);
         localStorage.setItem('session', JSON.stringify(USER));
         USUARIOS_REGISTRADOS[USER.usuario] = USER;
         localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
         return true;
      }
   }
}
function addOrRemoveStarFromMusicaSonando(estrella, targetId){

   if(estrella.classList.contains("fa-solid"))
   {
      estrella.classList.remove("fa-solid");
      //esto previene que se guarde un valor de disco incorrecto
      if (estrella.id.includes('sonando')) {
         let index = USER.albumsFav.indexOf(targetId);
         USER.albumsFav.splice( index, 1);
         localStorage.setItem('session', JSON.stringify(USER));
         USUARIOS_REGISTRADOS[USER.usuario] = USER;
         localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
      }
   }
   else{
      estrella.classList.add("fa-solid");
      if (estrella.id.includes('sonando')) {
         USER.albumsFav.push(targetId);
         localStorage.setItem('session', JSON.stringify(USER));
         USUARIOS_REGISTRADOS[USER.usuario] = USER;
         localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
      }
   }
}