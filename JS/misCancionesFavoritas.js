if (USER.songFav.length != 0) {
    let songs = USER.songFav;
    
    let html = "";
    let i = 0;
    songs.forEach(song => {
       html +=  
       '<div class="rowSong">' +
       '<article class="article-canciones"><span class="play-cancion"><i class="fa-solid fa-play fa-lg"></i></span></article> ' + 
      '<article class="article-canciones">'+song.name + '<span class="estrella-cancion"><i class="fa-regular fa-star fa-lg estrella-cancion fa-solid"></i></span></article>'+
      '<article class="article-canciones">'+song.album+'<span class="estrella-album"><i class="fa-regular fa-star fa-lg estrella-album "></i></span></article>'+
      '<article class="article-canciones">'+song.songLength+'</article>'+
      '<article class="article-canciones">'+song.reprodTime+'</article>'+
      '</div> ' +
      ' '

    });
    let divCont = document.getElementById('favSongs').innerHTML = html
 }
