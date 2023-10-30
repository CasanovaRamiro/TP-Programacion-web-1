const favoritos = [];

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

    //AL HACER CLICK EN LA ESTRELLA SE AGREGA AL ARRAY DE FAVORITOS

     if (document.getElementById(event.target.id)) {
        var star = document.getElementById(event.target.id);
        if(star.classList.contains("fa-solid")){
           star.classList.remove("fa-solid");
           favoritos.pop('1');
           console.log(favoritos);
        }
        else{
           star.classList.add("fa-solid");
           favoritos.push('1');
           console.log(favoritos);
        }
     }
});