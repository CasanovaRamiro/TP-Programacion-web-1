var index = 0;
const favoritos = [];
var albumesTotales = [];
const USER = JSON.parse(localStorage.getItem("session"));
const USUARIOS_REGISTRADOS = JSON.parse(localStorage.getItem("usuariosRegistrados"));

let ALBUMS_TOTAL = document.querySelectorAll('.albumes')[0]
const discosData = JSON.parse(JSON.stringify(CANCIONES));

if(ALBUMS_TOTAL != undefined){
   const listAlbumes = ALBUMS_TOTAL.children;
   for (const album of listAlbumes) {
      albumesTotales.push(album.lastElementChild.firstElementChild.id)
   }

   ALBUMS_TOTAL.addEventListener('click', e => {
      //BUSCA POR IDENTIFICACION DE LA IMAGEN
      let dataAlbum = discosData.discos.find(d => d.artistaId.replace(/\s/g, '').includes(e.target.alt));
      if(dataAlbum != undefined || dataAlbum != null) {
          localStorage.setItem('albumSonando', dataAlbum.disco);
      }
   });

   ALBUMS_TOTAL.addEventListener('mouseover', (event) => {
      //SI EL MOUSE SE POSA SOBRE LA ESTRELLA, SE AGITA POR 1 SEG
      var star = document.getElementById(event.target.id);
      if(star == null || star == undefined) return;
      let starId = star.id;
       if (albumesTotales.includes(starId)) {
          
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
       return;
  });
}

if(USER.albumsFav.length != 0){
    let albums = USER.albumsFav;
    albums.forEach(element => {
        let star = document.getElementById(element);
        if(star != null){
         star.classList.add('fa-solid');
        }
    });
}



document.addEventListener('click', (event) => {
   if(window.location.href.includes('cancionesfavoritas')) return;
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

   if(!estrella.classList.contains("fa-star")) return false;

   if(estrella.classList.contains("fa-solid"))
   {
      if(window.location.href.includes('musicasonando') || window.location.href.includes('cancionesfavoritas')){
                  
         handleMusicaSonandoOrFav(estrella, targetId)
         return true;
      }
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
   //ESTO ES CUANDO TILDA UNA ESTRELLA A UNA CANCION DESDE ALBUM SONANDO O ESTRELLA DE ALBUM DESDE FAVS 
   else if(window.location.href.includes('musicasonando') || window.location.href.includes('cancionesfavoritas')){
      handleMusicaSonandoOrFav(estrella, targetId);
      return true;
   }
   else{
      estrella.classList.add("fa-solid");
      if (!estrella.id.includes('sonando') && !USER.albumsFav.includes(targetId)) {
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

function handleMusicaSonandoOrFav(estrella, targetId){
   const albumSonando = localStorage.getItem("albumSonando");
   estrella.classList.contains("fa-solid") ? estrella.classList.remove("fa-solid") : estrella.classList.add("fa-solid");;

   //SI ES QUE ES UNA ESTRELLA DE ALBUM
   let dataAlbum = discosDataJson.discos.find(d => d.disco.replace(/\s/g, '').includes(targetId));

   //SI ES QUE YA NO LO TIENE EN SU LISTA DE FAVS
   
   if (USER.albumsFav.includes(albumSonando) && targetId == albumSonando.replace(/\s/g, '')) return;
   else if(USER.albumsFav.includes(targetId)) return;
   else if(USER.cancionesFav.includes(targetId)) return;

   let dataDiscoActual = discosData.discos.filter(d => d.disco.includes(albumSonando));
   let discoActual = dataDiscoActual[0].disco.replace(/\s/g, '');
   let discoDeFilaEnFavs = discosData.discos.filter(d => d.disco.replace(/\s/g, '').includes(targetId));
   let discoDeFilaId = null;
   if(discoDeFilaEnFavs.length != 0){
      discoDeFilaId = discoDeFilaEnFavs[0].disco.replace(/\s/g, '');
   }
   //SI ES ESTRELLA DE DISCO
   if(targetId == discoActual ){
      USER.albumsFav.push(albumSonando);
      localStorage.setItem('session', JSON.stringify(USER));
      USUARIOS_REGISTRADOS[USER.usuario] = USER;
      localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
      return true;
   }
   else if(discoDeFilaId != null && targetId == discoDeFilaId){
      USER.albumsFav.push(discoDeFilaEnFavs);
      localStorage.setItem('session', JSON.stringify(USER));
      USUARIOS_REGISTRADOS[USER.usuario] = USER;
      localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
      return true;
   }

   //SI ES ESTRELLA DE CANCION
   //BUSCA EL INDEX DE LA CANCION PARA SABER LOS DEMAS DATOS
   let nroIndexCancion = dataDiscoActual[0].canciones.findIndex(c => c.replace(/\s/g, '').includes(targetId));
   let valorDurac = dataDiscoActual[0].duraciones[nroIndexCancion];
   let valorReprod = dataDiscoActual[0].reproducciones[nroIndexCancion];
   let cancionFav = {
      "cancion": targetId,
      "album": discoActual,
      "duracion": valorDurac,
      "reproducciones": valorReprod
   };
   //CHEQUEANDO SI YA ESTA LA CANCION
   let dataCancion = USER.cancionesFav.findIndex(c => c.cancion.includes(targetId));
   if ( dataCancion != -1) {
      //SI YA ESTA LA ELIMINA DE LA LISTA
      USER.cancionesFav.splice(dataCancion, 1);
      localStorage.setItem('session', JSON.stringify(USER));
      USUARIOS_REGISTRADOS[USER.usuario] = USER;
      localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
      return true;
   }
   //SI NO, LA AGREGA
   USER.cancionesFav.push(cancionFav);
      localStorage.setItem('session', JSON.stringify(USER));
      USUARIOS_REGISTRADOS[USER.usuario] = USER;
      localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
      return true;
}