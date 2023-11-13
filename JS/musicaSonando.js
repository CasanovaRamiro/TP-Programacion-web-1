const discosDataJson = JSON.parse(JSON.stringify(canciones));
let seccion = document.getElementById("sectionMusicaSonando");
let oldImage = seccion.querySelector('#imgNav');

function handleMusicaSonando(){
    discoId = localStorage.getItem('albumSonando');
    let newParrafo = "";
    let newImage = document.createElement("img");
    newImage.classList.add('imagenbajonav');
    switch (discoId){
        case "destruction":{
            newImage.src = 'Img/2007 - Thrash Anthems 01.jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[0].comment;
            break;
        }
        case "archEnemy":{
            newImage.src = 'Img/Burning Angel (EP).jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[1].comment;
            break;
        }
        case "megadeth":{
            newImage.src = 'Img/Countdown to Extinction.jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[2].comment;
            break;
        }
        case "flema":{
            newImage.src = 'Img/Flema.jpeg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[3].comment;
            break;
        }
        case "hermetica":{
            newImage.src = 'Img/Hermetica.jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[4].comment;
            break;
        }
        case "horcas":{
            newImage.src = 'Img/Horcas.jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[5].comment;
            break;
        }
        case "rancid":{
            newImage.src = 'Img/Rancid.jpeg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[6].comment;
            break;
        }
        case "katalysm":{
            newImage.src = 'Img/Kataklysm.jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[7].comment;
            break;
        }
        case "motorhead":{
            newImage.src = 'Img/motorhead.jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[8].comment;
            break;
        }
        case "nightwish":{
            newImage.src = 'Img/Nightwish.jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[9].comment;
            break;
        }
        case "pantera":{
            newImage.src = 'Img/Pantera.jpg';
            newImage.alt = discoId;
            newParrafo = discosDataJson.discos[10].comment;
            break;
        }
        case "sonataArtica":{
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
        estrella.id = `sonando-${discoId}`;
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

function handleCancionesFromAlbum(){
    let albumActual = localStorage.getItem('albumSonando');
    let data = discosDataJson.discos.filter(d => d.artistaId.includes(albumActual));
    let seccionCanciones = document.querySelector('.canciones');
    let canciones = data[0].canciones;
    let duraciones = data[0].duraciones;
    let reproducciones = data[0].reproducciones;
    if(!seccionCanciones) return;
    for (const cancion of canciones) {
        let index = 0;
        let playArticle = createPlayArticle();
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
    let nuevaDurOrRep = document.createElement('p');
    nuevaDurOrRep.textContent = duracOrRep;
    nuevoArticleDeDuracOrRep.appendChild(nuevaDurOrRep);
    return nuevoArticleDeDuracOrRep;
}

function createArticleDeCancion(nombre){
    let nuevoArticleDeCancion = document.createElement('article');
    nuevoArticleDeCancion.classList.add('article-canciones');
    let nuevoTexto = document.createElement('p');
    nuevoTexto.textContent = nombre;
    nuevoArticleDeCancion.appendChild(nuevoTexto);

    let nuevoSpan = document.createElement('span');
    nuevoSpan.classList.add('estrella-cancion');
    nuevoArticleDeCancion.appendChild(nuevoSpan);

    
    let nuevoIcon = document.createElement('i');
    let cancionIconClasses = ['fa-regular', 'fa-star', 'fa-lg'];
    cancionIconClasses.forEach(c => nuevoIcon.classList.add(c))
    nuevoSpan.appendChild(nuevoIcon);

    return nuevoArticleDeCancion;
}

function createPlayArticle(){
    let nuevoArticleDePlay = document.createElement('article');
    nuevoArticleDePlay.classList.add('article-canciones');

    let nuevoSpan = document.createElement('span');
    nuevoSpan.classList.add('play-cancion');

    nuevoArticleDePlay.appendChild(nuevoSpan);

    let nuevoAncla = document.createElement('a');
    nuevoAncla.href = '#'
    nuevoSpan.appendChild(nuevoAncla);

    let nuevoIcon = document.createElement('i');
    let playIconClasses = ['fa-solid', 'fa-play', 'fa-lg'];
    playIconClasses.forEach(c => nuevoIcon.classList.add(c));
    nuevoAncla.appendChild(nuevoIcon);

    return nuevoArticleDePlay;
}

window.addEventListener("load", (event) => {
    //PREVIENE QUE SE DISPARE DESDE VISTA BUSCAR
    if(window.location.href.includes('vistabuscar')) return;
    handleCancionesFromAlbum()
    handleMusicaSonando();
});

