const discosDataJson = JSON.parse(JSON.stringify(canciones));

document.addEventListener('click', (event) => {

    let discoId = event.target.alt;

    if(discoId != undefined) localStorage.setItem('albumSonando', discoId);

});

window.addEventListener("load", (event) => {
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
    }
    let seccion = document.getElementById("sectionMusicaSonando");
    if(seccion){
        let user  = JSON.parse(localStorage.getItem('session'));
        let discosArray = user.albumsFav;
        let estrella = seccion.childNodes[3].childNodes[1];
        estrella.id = `sonando-${discoId}`;
        let esFavorito = discosArray.includes(discoId);
        if(esFavorito){
            estrella.classList.add('fa-solid');
        }
        else{estrella.classList.remove('fa-solid');}

        let oldImage = seccion.querySelector('#imgNav');
        seccion.childNodes[5].textContent = newParrafo;
        seccion.replaceChild(newImage, oldImage);
    }
  });
  
  