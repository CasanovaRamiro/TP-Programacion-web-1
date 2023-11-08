if (USER.albumsFav.length != 0) {
    let albums = USER.albumsFav;
    albums.forEach(element => {
        let star = document.getElementById(element);
        let articleElement = null;
        if (star) {
            articleElement = star.closest('article');
        }
        if (articleElement) {
            articleElement.classList.remove("oculto")
        }
    });
} else {
    showEmptyList()
}

document.removeEventListener('click', addAndRemoveStar)
document.addEventListener('click', (event) => {

    //AL HACER CLICK EN LA ESTRELLA SE AGREGA AL ARRAY DE FAVORITOS


    if (document.getElementById(event.target.id)) {
        var star = document.getElementById(event.target.id);
        const article = star.closest('article')
        if (article) {
            article.classList.add('oculto');
        }
        removeFavoriteAlbum(event.target.id)
        if (USER.albumsFav.length == 0) {
            showEmptyList()
        }
    }

});

function showEmptyList() {
    const mensajeSinAlbumes = document.getElementById("sinAlbums");
    mensajeSinAlbumes.classList.remove("oculto");
}