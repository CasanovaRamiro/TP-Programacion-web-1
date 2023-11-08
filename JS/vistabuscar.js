let buscarsearchBox = document.getElementById('inputBuscador');

let albumes = document.getElementsByClassName('albumes')[0];

let articleIds = [];

let albumArticles = albumes.children;
for (let album of albumArticles) {
    articleIds.push(album.id);
}
let albumsFiltrados = [];

buscarsearchBox.addEventListener('keyup', event => {
    
    var albumAbuscar = buscarsearchBox.value;

    let newArray = articleIds.filter(art =>
        art.slice(8, art.length).includes(albumAbuscar))
        albumes.innerHTML = "";
    handleCreacionArticleDeAlbums(newArray, albumes)
    
});