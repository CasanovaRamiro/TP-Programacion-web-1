const discosDataJson = JSON.parse(JSON.stringify(CANCIONES));
const USER_EN_SONANDO = JSON.parse(localStorage.getItem('session'));
let seccion = document.getElementById("sectionMusicaSonando");
let oldImage = seccion.querySelector('#imgNav');
let albumActual = localStorage.getItem('albumSonando');
let data = discosDataJson.discos.filter(d => d.disco.includes(albumActual));
let cancionesEnSonando = data[0].canciones;
let seccionCanciones = document.querySelector('.canciones');

function handleMusicaSonando(){
    let discoId = data[0].disco;
    let newParrafo = "";
    let newImage = document.createElement("img");
    newImage.classList.add('imagenbajonav');
    switch (discoId){
        case discosDataJson.discos[0].disco:{
            newImage.src = 'Img/2007 - Thrash Anthems 01.jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[0].comment;
            break;
        }
        case discosDataJson.discos[1].disco:{
            newImage.src = 'Img/Burning Angel (EP).jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[1].comment;
            break;
        }
        case discosDataJson.discos[2].disco:{
            newImage.src = 'Img/Countdown to Extinction.jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[2].comment;
            break;
        }
        case discosDataJson.discos[3].disco:{
            newImage.src = 'Img/Flema.jpeg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[3].comment;
            break;
        }
        case discosDataJson.discos[4].disco:{
            newImage.src = 'Img/Hermetica.jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[4].comment;
            break;
        }
        case discosDataJson.discos[5].disco:{
            newImage.src = 'Img/Horcas.jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[5].comment;
            break;
        }
        case discosDataJson.discos[6].disco:{
            newImage.src = 'Img/Rancid.jpeg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[6].comment;
            break;
        }
        case discosDataJson.discos[7].disco:{
            newImage.src = 'Img/Kataklysm.jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[7].comment;
            break;
        }
        case discosDataJson.discos[8].disco:{
            newImage.src = 'Img/motorhead.jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[8].comment;
            break;
        }
        case discosDataJson.discos[9].disco:{
            newImage.src = 'Img/Nightwish.jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[9].comment;
            break;
        }
        case discosDataJson.discos[10].disco:{
            newImage.src = 'Img/Pantera.jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[10].comment;
            break;
        }
        case discosDataJson.discos[11].disco:{
            newImage.src = 'Img/Sonata artica.jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[11].comment;
            break;
        }
        default : {
            newImage.src = '';
            newImage.alt = '';
            newParrafo = '';
            break;
        }
    }
    
    if(seccion){
        
        let estrella = seccion.childNodes[3].childNodes[1];

        if(discoId == "imagen perfil" || discoId == ""){
            
            seccion.childNodes[5].textContent = newParrafo;
            seccion.removeChild(oldImage);
            seccion.childNodes[2].removeChild(estrella);
            return;
        }
        let user = JSON.parse(localStorage.getItem('session'));
        let discosArray = user.albumsFav;
        estrella.id = `sonando-${data[0].disco}`;
        let esFavorito = discosArray.includes(discoId);
        if(esFavorito){
            estrella.classList.add('fa-solid');
        }
        else{estrella.classList.remove('fa-solid');}
        
        seccion.childNodes[5].textContent = newParrafo;
        
        seccion.replaceChild(newImage, oldImage);
        return;
    }
}

function handleCancionesFromAlbum(listaCanciones, albumFromfav = 0){
    let index = 0;
    
    let duraciones = data[0].duraciones;
    let reproducciones = data[0].reproducciones;
    if(!seccionCanciones) return;

    for (const cancion of listaCanciones) {
        
        let playArticle = createPlayArticle(cancion);
        let cancionArticle = createArticleDeCancion(cancion)
        let albumArticle = createArticleDeCancion(data[0].disco);
        let duracionArticle = createDuraRepArt(duraciones[index])
        let reproArticle = createDuraRepArt(reproducciones[index])

        seccionCanciones.appendChild(playArticle);
        seccionCanciones.appendChild(cancionArticle);
        seccionCanciones.appendChild(albumArticle);
        seccionCanciones.appendChild(duracionArticle);
        seccionCanciones.appendChild(reproArticle);
        index++;
    }
}
function createDuraRepArt(duracOrRep){
    let nuevoArticleDeDuracOrRep = document.createElement('article');
    nuevoArticleDeDuracOrRep.classList.add('article-canciones');
    // nuevoArticleDeDuracOrRep.id = `articleDuracRep-${duracOrRep}`;

    let nuevaDurOrRep = document.createElement('p');
    nuevaDurOrRep.textContent = duracOrRep;
    nuevoArticleDeDuracOrRep.appendChild(nuevaDurOrRep);
    return nuevoArticleDeDuracOrRep;
}

function createArticleDeCancion(nombre){
    
    let nuevoArticleDeCancion = document.createElement('article');
    nuevoArticleDeCancion.classList.add('article-canciones');
    let estrellaId = nombre.replace(/\s/g, '');
    nuevoArticleDeCancion.id = `article-cancionAlbum-${estrellaId}`;

    let nuevoTexto = document.createElement('p');
    nuevoTexto.textContent = nombre;
    nuevoArticleDeCancion.appendChild(nuevoTexto);

    let nuevoSpan = document.createElement('span');
    nuevoSpan.classList.add('estrella-cancion');
    nuevoArticleDeCancion.appendChild(nuevoSpan);
    
    let nuevoIconEstrella = document.createElement('i');
    nuevoIconEstrella.id = estrellaId;
    let cancionIconClasses = ['fa-regular', 'fa-star', 'fa-lg'];
    let discoActual = data[0].disco;
    
    cancionIconClasses.forEach(c => nuevoIconEstrella.classList.add(c))
    //COLOCAR ESTRELLAS TILDADAS O NO SEGUN ESTEN COMO FAVS
    if(nombre == discoActual && USER_EN_SONANDO.albumsFav.includes(albumActual)){
        nuevoIconEstrella.classList.add('fa-solid');
    }
    else if(USER_EN_SONANDO.cancionesFav.find(c => c.cancion.includes(estrellaId)) != undefined){
        nuevoIconEstrella.classList.add('fa-solid');
    }
    nuevoSpan.appendChild(nuevoIconEstrella);

    return nuevoArticleDeCancion;
}

function createPlayArticle(nombreCancion){
    let nuevoArticleDePlay = document.createElement('article');
    nuevoArticleDePlay.classList.add('article-canciones');
    nuevoArticleDePlay.id = `article-${nombreCancion.replace(/\s/g, '')}`;
    let nuevoSpan = document.createElement('span');
    nuevoSpan.classList.add('play-cancion');

    nuevoArticleDePlay.appendChild(nuevoSpan);

    let nuevoAncla = document.createElement('a');
    nuevoAncla.href = '#';
    nuevoSpan.appendChild(nuevoAncla);

    let nuevoIconPlay = document.createElement('i');
    nuevoIconPlay.id = `play-${nombreCancion}`
    let playIconClasses = ['fa-solid', 'fa-play', 'fa-lg'];
    playIconClasses.forEach(c => nuevoIconPlay.classList.add(c));
    
    nuevoAncla.appendChild(nuevoIconPlay);

    return nuevoArticleDePlay;
}
document.onclick = e => {
    if (e.target.classList.contains('fa-play')) {
        
        e.target.classList.add('fa-solid');
        e.target.classList.add('fa-fade');
        setTimeout(()=> {
            e.target.classList.remove("fa-fade");
        }, 500)
        let seccionSonando = document.querySelector('.cancionSonando');
        
        let reproduciendo = seccionSonando.firstElementChild;
        let nombreCancionSonando = e.target.id.slice(5,e.target.id.length);
        reproduciendo.textContent = `${nombreCancionSonando}`;
        let dataDisco = CANCIONES.discos.find(d => d.canciones.find(c => c.includes(nombreCancionSonando)));

        let disco = seccionSonando.lastElementChild;
        disco.textContent = `${dataDisco.disco}`;
        return;
    }
    return;
    // let estrellaCancion = seccionCanciones.getElementById(e.target.id);
    // addOrRemoveStar(estrellaCancion, estrellaCancion.id);
};

window.addEventListener("load", (event) => {
    //PREVIENE QUE SE DISPARE DESDE VISTA BUSCAR
    if(window.location.href.includes('vistabuscar')) return;
    else if(window.location.href.includes('cancionesfavoritass')) return;
    handleCancionesFromAlbum(cancionesEnSonando)
    handleMusicaSonando();
});

