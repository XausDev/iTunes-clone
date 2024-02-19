const ul = document.getElementById('music-list');

function pintarResultados(items) {

    ul.innerHTML = "";//Esto hace que se "recargue" el listado

    ordenarResultados(items);

    console.log(items);

    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.id = 'item-' + index; // Genera un ID único para cada elemento li
        
        if (item.kind == 'song') {
            li.innerHTML = `<img src="images/musica.png" alt="Icono" width="12" height="12">
                        <span>${item.artistName} - ${item.trackName}</span>`;
        }else {
            li.innerHTML =`<img src="images/camara-de-video.png" alt="Icono" width="12" height="12">
                           <span>${item.artistName} - ${item.trackName}</span>`;
        }

        ul.appendChild(li);

        li.addEventListener('click', () => {
            li.style.backgroundColor = '#EDEEEE';
            let controls = document.getElementById('display-controls'); // Accede al elemento li que fue clickeado
            let previewUrl = item.previewUrl;
            if (item.kind == 'song') {
                controls.innerHTML = `
                <div class="col-3">
                    <img src="${item.artworkUrl100}" alt="portada del album" width="100" height="100">
                </div>
                <div class="col-1"></div>
                <div class="col-8">
                    <div class="row">${item.trackName}</div>
                    <div class="row">${item.artistName}</div>
                </div>
                <div class="row-12 controles">
                    <audio class="col-12" src="${previewUrl}" controls><source></audio>
                </div>`;
            } else if (item.kind == 'tv-episode') {
                controls.innerHTML = `
                <div id="videoContent" class="col-12">
                    <iframe src="${previewUrl}" width="100%" height="100%" frameborder="0"></iframe>
                </div>`;
            }
        });
    });
}

function ordenarResultados(items){ //Se asigna un atributo ordenación segun kind y luego se ordena

    items.forEach((item) => {
        if (item.kind === "song") {
            item.ordenacion = 1;
        } else if (item.kind === "tv-episode") {
            item.ordenacion = 2;
        } else {
            item.ordenacion = 3;
        }
    });

    items.sort((a,b) =>{

        if (a.ordenacion > b.ordenacion) {
            return 1;
        }
        if (a.ordenacion < b.ordenacion) {
            return -1;
        }
        return 0;
    });

}




/*const url='https://itunes.apple.com/search?term=queen';

fetch(url)
    .then((response) => response.json())
    .then((data) => {console.log(data.results);})
    .catch(error => console.log('Request failed:', error))
    /*.then(json => console.log(json));*/


function buscarAPI() {
    let searchText = document.getElementById("searchText").value;
    let busqueda = searchText.replaceAll(" ", "+");

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://itunes.apple.com/search?term=" + busqueda);
    xhr.onload = function() {
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            //console.log(response);
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