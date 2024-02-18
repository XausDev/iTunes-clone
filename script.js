const ul = document.getElementById('music-list');

function pintarResultados(items) {
    let str = '';
    items.forEach((cur, index) => {
        const li = document.createElement('li');
        li.id = 'item-' + index; // Genera un ID único para cada elemento li
        li.innerHTML = `<img src="images/musica.png" alt="Icono" width="12" height="12">
                        <span>${cur.artistName} - ${cur.trackName}</span>`;

        ul.appendChild(li);

       

        li.addEventListener('click', () => {
            let controls = document.getElementById('display-controls'); // Accede al elemento li que fue clickeado
            let previewUrl = cur.previewUrl;
            
            console.log(cur.kind);
            controls.innerHTML = `
                <div class="col-3">
                    <img src="${cur.artworkUrl100}" alt="portada del album" width="100" height="100">
                </div>
                <div class="col-1"></div>
                <div class="col-8">
                    <div class="row">${cur.trackName}</div>
                    <div class="row">${cur.artistName}</div>
                </div>
                <div class="row-12 controles">
                    <audio class="col-12" src="${previewUrl}" controls><source></audio>
                </div>`;
        });
    });
}




/*const url='https://itunes.apple.com/search?term=queen';

fetch(url)
    .then((response) => response.json())
    .then((data) => {console.log(data.results);})
    .catch(error => console.log('Request failed:', error))
    /*.then(json => console.log(json));*/


function buscarAPI() {
    var searchText = document.getElementById("searchText").value;
    var busqueda = searchText.replaceAll(" ", "+");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://itunes.apple.com/search?term=" + busqueda);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            pintarResultados(response.results);
        } else {
            console.log("Error" + xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.log("Error de red");
    };
    xhr.send();
};

//Boton search

/*document.getElementById('search-btn').addEventListener
('click', ()=>{
    const controls = document.getElementById('display-controls');
    controls.innerHTML = `<div class="col-3">
        <img src="images/ramones.png" alt="portada del album" width="100" height="100">
        </div>
        <div class="col-1"></div>
        <div class="col-8">
            <div class="row">titulo</div>
            <div class="row">artista</div>
        </div>
        <div class="row-12 controles">
            <audio class="col-12" src="" controls><source></audio>
        </div>`;
})*/