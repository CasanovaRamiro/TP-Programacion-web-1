let seccionCancionesFav = document.querySelector('.canciones');

window.addEventListener("load", (event) => {
    //PREVIENE QUE SE DISPARE DESDE VISTA BUSCAR
    if(window.location.href.includes('vistabuscar')) return;
    handleCancionesFavoritas()
    handleMusicaSonando();
});

function handleCancionesFavoritas(){
    let index = 0;
    if(!seccionCancionesFav) return;
    for (const cancionFav of USER.cancionesFav) {
        let dataDisco = CANCIONES.discos.find(d => d.disco.replace(/\s/g, '').includes(cancionFav.album))
        let nombreCanciones = dataDisco.canciones;
        let nombreCancion = nombreCanciones.find(c => c.replace(/\s/g,'').includes(cancionFav.cancion));

        let playArticle = createPlayArticle(nombreCancion);
        let cancionArticle = createArticleDeCancion(nombreCancion)
        let albumArticle = createArticleDeCancion(dataDisco.disco);
        let duracionArticle = createDuraRepArt(cancionFav.duracion)
        let reproArticle = createDuraRepArt(cancionFav.reproducciones)

        seccionCancionesFav.appendChild(playArticle);
        seccionCancionesFav.appendChild(cancionArticle);
        seccionCancionesFav.appendChild(albumArticle);
        seccionCancionesFav.appendChild(duracionArticle);
        seccionCancionesFav.appendChild(reproArticle);
        index++;
    }
    if(seccionCancionesFav.children.length == 5){
        let articleNoContent = document.createElement('article');
        articleNoContent.className = 'noContent';
        articleNoContent.id = 'article-noContent';
        let h2 = document.createElement('h2');
        h2.textContent = "Aun no tienes canciones favoritas.";
        articleNoContent.appendChild(h2);
        seccionCancionesFav.appendChild(articleNoContent);
    }
}
seccionCancionesFav.addEventListener('click', e=> {
    if(e.target.id == null || e.target.id == undefined || e.target.id == "") return;
    //PRIMERO CHEQUEAMOS QUE LA ESTRELLA TILDADA SEA DE ALBUM
    let dataAlbum = discosDataJson.discos.find(d => d.disco.replace(/\s/g, '').includes(e.target.id));
    
    if(dataAlbum && e.target.classList.contains('fa-star')) {
        let albumArticle = document.getElementById(`article-cancionAlbum-${e.target.id}`);
        let estrellaAlbum = albumArticle.getElementsByTagName('i')[0];
        addOrRemoveStar(estrellaAlbum, estrellaAlbum.id);
        return;
    }
    //LUEGO DESTILDAMOS Y ELIMINAMOS ARTICULO DE FAVS AL SER DESTILDADA LA ESTRELLA.
    //
    let articlePlay = document.getElementById(`article-play-${e.target.id}`);//ICONO PLAY DE LA FILA
    let articuleToErase = document.getElementById(`article-cancionAlbum-${e.target.id}`);
    let articleAlbum = articuleToErase.nextElementSibling;
    let articleDuracion = articleAlbum.nextElementSibling;
    let articleReprod = articleDuracion.nextElementSibling;
    
    var estrellaDeCancionFav = articuleToErase.getElementsByTagName('i')[0];
    let salioDeFavoritos = addOrRemoveStar(estrellaDeCancionFav, estrellaDeCancionFav.id);

    //ELIMINA FILA SI TIENE SOLO UNA ESTRELLA TILDADA
    if(!articuleToErase.lastChild.firstChild.classList.contains('fa-solid') 
    // && !articleAlbum.lastChild.firstChild.classList.contains('fa-solid')
    ){
        seccionCancionesFav.removeChild(articlePlay);
        seccionCancionesFav.removeChild(articuleToErase);
        seccionCancionesFav.removeChild(articleAlbum);
        seccionCancionesFav.removeChild(articleDuracion);
        seccionCancionesFav.removeChild(articleReprod);
    }
    //CUANDO NO HAY FAVORITAS
    if(seccionCancionesFav.children.length == 5){
        let articleNoContent = document.createElement('article');
        articleNoContent.className = 'noContent';
        articleNoContent.id = 'article-noContent';
        let h2 = document.createElement('h2');
        h2.textContent = "Aun no tienes canciones favoritas.";
        articleNoContent.appendChild(h2);
        seccionCancionesFav.appendChild(articleNoContent);
    }

    // let index = USER.cancionesFav.findIndex( c => c.cancion.includes(e.target.id));
    // USER.cancionesFav.splice( index, 1);
    // localStorage.setItem('session', JSON.stringify(USER));
    // USUARIOS_REGISTRADOS[USER.usuario] = USER;
    // localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
});
