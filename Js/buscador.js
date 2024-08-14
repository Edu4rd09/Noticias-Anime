//Cantida de noticias que se cargaran cada vez que se presione siguiente (5 + 1)
let cantidadNoticias = 7;
let pageFinal = cantidadNoticias;
let pageInicial = 0;
let temaActual = "anime";

let noticias = {
    "apiKey":"3c5d6187e83042718c80428e32da2508",
    fetchNoticias:function(categoria){
        fetch(
            "https://newsapi.org/v2/everything?q="
            +categoria+
            "&language=es&apiKey="+this.apiKey
        )
        .then((response)=>response.json())
        .then((data)=>this.displayNoticias(data));
    },
    displayNoticias: function(data){
        if(pageInicial==0){
            document.querySelector(".container-noticias").textContent ="";
        }

        let filteredArticles = data.articles.filter(article => {
            return article.source.name !== 'Hipertextual' && article.url 
        });
        

        for(i=pageInicial;i<=pageFinal;i++){
            const {title, description, urlToImage, publishedAt, url} = filteredArticles[i];

            let item = document.createElement("div");
            item.className = "item";

            let img = document.createElement("img");
            img.setAttribute("src", urlToImage);
            item.appendChild(img);

            let fecha = document.createElement("span");
            let date = publishedAt;
            date=date.split("T")[0].split("-").reverse().join("-");
            fecha.className = "fecha";
            fecha.textContent = date;
            item.appendChild(fecha); 

            let h2 = document.createElement("h2");
            h2.textContent = title;
            item.appendChild(h2); 
            
            let btnLeerMas = document.createElement("a");
            btnLeerMas.textContent = "Leer más";
            btnLeerMas.className = "btn-leer-mas";
            btnLeerMas.target = '_blank';
            btnLeerMas.href = url;
            item.appendChild(btnLeerMas);

         
            
            document.querySelector(".container-noticias").appendChild(item);
        }

        let btnSiguiente = document.createElement("span");
        btnSiguiente.id = "btnSiguiente";
        btnSiguiente.textContent = "Ver más";
        btnSiguiente.setAttribute("onclick","siguiente()");
        document.querySelector(".container-noticias").appendChild(btnSiguiente);
    }
}

function buscar(cat){
    pageInicial = 0;
    pageFinal = cantidadNoticias;
    temaActual = cat;
    noticias.fetchNoticias(cat);
}

function buscarTema(){
    pageInicial = 0;
    pageFinal = cantidadNoticias;

    let tema = document.querySelector("#busqueda").value;
    temaActual = tema;
    noticias.fetchNoticias(temaActual);
}

function siguiente(){
    pageInicial = pageFinal + 1;
    pageFinal = pageFinal + cantidadNoticias + 1;

    document.querySelector("#btnSiguiente").remove();
    noticias.fetchNoticias(temaActual);

}

noticias.fetchNoticias(temaActual);
 