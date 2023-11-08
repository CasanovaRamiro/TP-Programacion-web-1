
if(ALBUM_SELECTED.length != 0){  
    let album = ALBUM_SELECTED;
    document.getElementById(album[0]).classList.remove("oculto")
}

let auxiliar = [];

localStorage.setItem("albumSelected", JSON.stringify(auxiliar))

document.removeEventListener('click', addAndRemoveStar);

const conteinerCanciones = document.querySelector('.container-canciones')

conteinerCanciones.addEventListener('click', addAndRemoveFavourite);



if (USER.albumsFav.length != 0) {
    let albums = USER.albumsFav;
    albums.forEach(element => {
       let divElement = document.getElementById(element);
       if (divElement != null) {
        let stars = divElement.querySelectorAll(".estrella-album")
        stars.forEach(star =>{
            star.classList.add('fa-solid');
            star.classList.add('to-show')

        });
       }
    });
 }

 if (USER.songFav.length != 0) {
    let songFav = USER.songFav;
    songFav.forEach(element => {

       let divElement = document.getElementById(element.album);
       if (divElement != null) {
        const articles = divElement.querySelectorAll('article');

        articles.forEach(article => {
           if(article.textContent.includes(element.name.trim())) {
              const span =  article.querySelector('span');
              if(span){
                let starIcon = span.querySelector('i');
                starIcon.classList.add('fa-solid')
              }
           }
        })

       }
    });
 }



function addAndRemoveFavourite(event) {

    const clickedElement = event.target;

    const classes = clickedElement.className.split(' ');

    let albumStarclicked = false;
    let songStarClicked = false;

    classes.forEach(function (className) {
        if (className == 'estrella-album') {
            albumStarclicked = true;
        }
        if (className == "estrella-cancion") {
            songStarClicked = true;
        }
    })

    if (albumStarclicked || songStarClicked) {
        const divElement = clickedElement.parentElement.parentElement.parentElement;

        if (divElement) {
            const song = getArticlesContent(divElement)

            addOrRemoveFavourite(clickedElement, song)

        }


    }



    /*

      if (conteinerCanciones.getElementById(event.target.id)) {
         var star = conteinerCanciones.getElementById(event.target.id);
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
*/



}


function addOrRemoveFavourite(tagElement, song) {
    const songAlbum = song.album;
    if (tagElement.classList.contains("estrella-cancion")) {
        if (tagElement.classList.contains("fa-solid")) {
            tagElement.classList.remove("fa-solid");
            removeFavoriteSong(song)
        }
        else {
            tagElement.classList.add("fa-solid");
            USER.songFav.push(song);
            localStorage.setItem('session', JSON.stringify(USER));
            USUARIOS_REGISTRADOS[USER.usuario] = USER;
            localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
        }
    } else {
        if (tagElement.classList.contains("estrella-album")) { //  si la estrella clickeada es de album, lo agregamos o quitamos de favorito en todas las estrellas
            const everySongAlbum = document.querySelectorAll(".estrella-album")
            if (!tagElement.classList.contains("fa-solid")) { //si no esta en favorito lo agregamos
                everySongAlbum.forEach(function (album) {
                    album.classList.add("fa-solid");
                    USER.albumsFav.push(songAlbum);
                    localStorage.setItem('session', JSON.stringify(USER));
                    USUARIOS_REGISTRADOS[USER.usuario] = USER;
                    localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
                })
            } else {
                everySongAlbum.forEach(function (album) {
                    album.classList.remove("fa-solid");
                    removeFavoriteAlbum(songAlbum)
                })
            }
        }
    }
}


function getArticlesContent(tagElement) {
    const articles = tagElement.querySelectorAll('article');
    let song = {
        name: articles[1].textContent,
        album: articles[2].textContent,
        songLength: articles[3].textContent,
        reprodTime: articles[4].textContent
    };
    return song;
}

function removeFavoriteAlbum(targetId) {
    let index = USER.albumsFav.indexOf(targetId);
    USER.albumsFav.splice(index, 1);
    localStorage.setItem('session', JSON.stringify(USER));
    USUARIOS_REGISTRADOS[USER.usuario] = USER;
    localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
}

function removeFavoriteSong(song) {
    let index = USER.songFav.indexOf(song);
    USER.songFav.splice(index, 1);
    localStorage.setItem('session', JSON.stringify(USER));
    USUARIOS_REGISTRADOS[USER.usuario] = USER;
    localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
}