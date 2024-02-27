const ul = document.getElementById('music-list');
let startingX;
const threshold = screen.width / 3;

//Funcion mostrar los resultados en una lista ----------------

function pintarResultados(items) {

    ul.innerHTML = ""; //Esto hace que se "recargue" el listado y poder hacer otro search
    
    //console.log(items);

    ordenarResultados(items);

    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.id = 'item-' + index; // Genera un ID único para cada elemento "li", los ids de los "li" seran "item-1, item-2, etc".

        if (item.kind == 'song') {
            li.innerHTML = `<img src="images/musica.png" alt="Icono" width="12" height="12">
                        <span>${item.artistName} - ${item.trackName}</span>`;
        }else {
            li.innerHTML =`<img src="images/camara-de-video.png" alt="Icono" width="12" height="12">
                           <span>${item.artistName} - ${item.trackName}</span>`;
        }

        ul.appendChild(li); //Agrega el "li" creado dinamicamente como hijo de "ul".


        //Funcion Eliminar con Alert -------------------------------------------------------------------------

        /*li.addEventListener('touchstart', (event)=>{ //Cambiamos color cuando hacemos swipe para eliminar
            startingX = event.touches[0].clientX;
            li.classList.add('seleccionado'); 
        })

        li.addEventListener('touchmove', (event)=>{ //Eliminar mostrando alert
                     
            let confirmacion = confirm("Deseas eliminar este elemento de la lista?");
            li.classList.remove('seleccionado')
            if(confirmacion) {
                li.remove();
            };
        });*/
    

        //Funcion Eliminar con Swipe -------------------------------------------------------------------------

        li.addEventListener('touchmove', (event)=>{
                     
            li.classList.add('seleccionadoSwipe');
            
            li.innerHTML = `<img src="images/musica.png" alt="Icono" width="12" height="12">
            <span>${item.artistName} - ${item.trackName}</span>
            <button id="remove-btn" class="remove-btn">remove</button>`;

            const change = startingX - event.touches[0].clientX;
            if(change >= 0){
                li.style.left = `-${change}px`;
                event.preventDefault();
            }

            const btnRemove = document.getElementById('remove-btn');

            btnRemove.addEventListener(('click'), ()=>{
                li.remove();
            })
        });

        li.addEventListener('touchend', ()=>{
            li.classList.remove('seleccionadoSwipe');
        });

      
        //Función aparece el reproductor al hacer click -------------------------------------------------------

        li.addEventListener('click', () => {

            li.innerHTML = `<img src="images/musica.png" alt="Icono" width="12" height="12">
                <span>${item.artistName} - ${item.trackName}</span>`;

            document.querySelectorAll('li').forEach(function(li) { 
                //Elimina la clase ".seleccionado" de todos los "li" anteriores
                li.classList.remove('seleccionado'); 
            });

            li.classList.add('seleccionado'); //Marcamos el li añadiendo la clase ".seleccionado"
            
            let controls = document.getElementById('display-controls'); // Accede al elemento li que fue clicado
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
            } else if (item.kind == 'tv-episode' || item.kind == 'feature-movie' || item.kind == 'music-video') {
                controls.innerHTML = `
                <div id="videoContent" class="col-12">
                    <video width="100%" height="280px" controls>
                    <source src="${previewUrl}" type="video/mp4">
                    </video>
                </div>
                <div class="row-12">
                    <img src="images/camara-de-video.png" alt="Icono" width="12" height="12">
                    <span class="col-10">${item.trackName} - ${item.artistName}</span>
                </div>`;
            }

            /*document.querySelector("audio").addEventListener('ended', () => {
                console.log("Se ha acabado");
            });
            document.querySelector("video").addEventListener('ended', () => {
                console.log("Se ha acabado");
            });*/

        });
    });

}


//Funcion Ordenar -------------------------------------

function ordenarResultados(items){ //Se asigna un atributo "ordenación" segun el kind y luego se ordena

    items.forEach((item) => {
        if (item.kind === "song") {
            item.ordenacion = 1;
        } else if (item.kind === "tv-episode" || item.kind == 'feature-movie' || item.kind == 'music-video') {
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

//Funcion buscar en API -----------------

function buscarAPI() {

    let searchText = document.getElementById("searchText").value;
    let busqueda = searchText.replaceAll(" ", "+");

    const url='https://itunes.apple.com/search?term='+ busqueda +'&country=ES&attribute=allArtistTerm';

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data.results);
            pintarResultados(data.results);
        })
        .catch(error => console.log('Request failed:', error))
        .then(json => console.log(json));
};