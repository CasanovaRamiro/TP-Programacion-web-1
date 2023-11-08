const USUARIO = JSON.parse(localStorage.getItem('session'));
let sectionAlbumes = document.querySelector('.albumes');
handleMisAlbumsFav(USUARIO, sectionAlbumes);

function handleMisAlbumsFav(user, secAlbumes){
    
    if(secAlbumes != null | secAlbumes != undefined){
        let albumsFav = user.albumsFav;
        
        if (albumsFav.length > 0) {
            let articleToBeErased = document.getElementById('article-noContent');
            sectionAlbumes.removeChild(articleToBeErased);
            for (const album in albumsFav) {
                if (Object.hasOwnProperty.call(albumsFav, album)) {
                    const element = albumsFav[album];
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
                    image.src = getSrcForImage(element, image);
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
                    let starClasses = ['fa-regular', 'fa-star', 'fa-2xl', 'fa-solid'];
                    starClasses.forEach(s => star.classList.add(s));
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
    let identifier= event.target.id;
    if(identifier != null || identifier != undefined){
        let articuleToErase = document.getElementById(`article-${identifier}`);
        sectionAlbumes.removeChild(articuleToErase);

        let index = USUARIO.albumsFav.indexOf(event.target.id);
        USUARIO.albumsFav.splice( index, 1);
        localStorage.setItem('session', JSON.stringify(USUARIO));
        USUARIOS_REGISTRADOS[USUARIO.usuario] = USUARIO;
        localStorage.setItem('usuariosRegistrados', JSON.stringify(USUARIOS_REGISTRADOS))
    }
});

function getSrcForImage(stringId, newImage){
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