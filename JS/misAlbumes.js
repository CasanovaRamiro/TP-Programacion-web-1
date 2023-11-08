const USUARIO = JSON.parse(localStorage.getItem('session'));
let sectionAlbumes = document.querySelector('.albumes');
handleCreacionArticleDeAlbums(USUARIO.albumsFav, sectionAlbumes);

function handleCreacionArticleDeAlbums(albumList, secAlbumes){
    
    if(secAlbumes != null | secAlbumes != undefined){

        if (albumList.length > 0 && albumList[0] != 'inputBuscador') {
            let articleToBeErased = document.getElementById('article-noContent');
            if(articleToBeErased){sectionAlbumes.removeChild(articleToBeErased);}
            for (const album in albumList) {
                if (Object.hasOwnProperty.call(albumList, album)) {
                    let element = albumList[album];
                    element = element.includes('article') ? element.slice(8, element.length) : element;
                    //creamos el article
                    let article = document.createElement('article');
                    article.classList.add('article-img');
                    article.id = `article-${element}`;
                    //metemos el link
                    let a = document.createElement('a');
                    a.href = 'vistamusicasonando.html';
    
                    //creamos la imagen
                    let image = document.createElement('img');
                    image.classList.add('img-albumes');
                    image.src = getSrcForImage(element);
                    image.alt = element;
                    //metemos la imagen en el tag de link
                    //y el link en el article
                    a.appendChild(image);
                    article.appendChild(a);
                    
                    //creamos el span q contiene la estrellita
                    let span = document.createElement('span');
                    span.className = 'estrella-album';
                    //creamos la estrellita
                    let star = document.createElement('i');
                    let starClasses = ['fa-regular', 'fa-star', 'fa-2xl'];
                    starClasses.forEach(s => star.classList.add(s));
                    if(USUARIO.albumsFav[album] == element)
                    {star.classList.add('fa-solid');}
                    star.id = element;
                    // star.before() = null;
                    //le metemos la star en el span
                    //y el span en el article
                    span.appendChild(star);
                    article.appendChild(span);
                    //y metemos el article en la section de albums
                    secAlbumes.appendChild(article);
                }
            }
        }
    }
}

sectionAlbumes.addEventListener('click', event => {
    if(window.location.href.includes('vistabuscar')) return;
    let identifier= event.target.id;
    if(identifier != null || identifier != undefined){
        let articuleToErase = document.getElementById(`article-${identifier}`);
        var estrellaDeAlbumFav = articuleToErase.getElementsByTagName('i');

        let salioDeFavoritos = addOrRemoveStar(estrellaDeAlbumFav[0], estrellaDeAlbumFav[0].id);

        sectionAlbumes.removeChild(articuleToErase);
        if(sectionAlbumes.children.length == 0){
            let articleNoContent = document.createElement('article');
            articleNoContent.className = 'noContent';
            articleNoContent.id = 'article-noContent';
            let h2 = document.createElement('h2');
            h2.textContent = "Aun no tienes albums favoritos.";
            articleNoContent.appendChild(h2);
            sectionAlbumes.appendChild(articleNoContent);
        }

        let index = USUARIO.albumList.indexOf(event.target.id);
        USUARIO.albumList.splice( index, 1);
        localStorage.setItem('session', JSON.stringify(USUARIO));
        USUARIOS_REGISTRADOS[USUARIO.usuario] = USUARIO;
        localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
    }
});

function getSrcForImage(stringId){
    switch (stringId){
        case "destruction":{
            return 'Img/2007 - Thrash Anthems 01.jpg';
        }
        case "archEnemy":{
            return 'Img/Burning Angel (EP).jpg';
        }
        case "megadeth":{
            return 'Img/Countdown to Extinction.jpg';
        }
        case "flema":{
            return 'Img/Flema.jpeg';
        }
        case "hermetica":{
            return 'Img/Hermetica.jpg';
        }
        case "horcas":{
            return 'Img/Horcas.jpg';
        }
        case "rancid":{
            return 'Img/Rancid.jpeg';
        }
        case "katalysm":{
            return 'Img/Kataklysm.jpg';
        }
        case "motorhead":{
            return 'Img/motorhead.jpg';
        }
        case "nightwish":{
            return 'Img/Nightwish.jpg';
        }
        case "pantera":{
            return 'Img/Pantera.jpg';
        }
        case "sonataArtica":{
            return 'Img/Sonata artica.jpg';
        }
        default:
            return '';
    }
}