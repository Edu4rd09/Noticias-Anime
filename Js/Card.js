document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "3c5d6187e83042718c80428e32da2508"; // Reemplaza "TU_CLAVE_DE_API" con tu clave de API de NewsAPI.org
    const apiUrl = "https://newsapi.org/v2/everything?q=anime%20Crunchyroll&language=es&apiKey=" + apiKey;
    
    const maxNews = 6; // Establece el límite de noticias a mostrar

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById("news-container");

            data.articles.slice(0, maxNews).forEach(article => {
                if (article.urlToImage) {
                    const articleElement = document.createElement("article");
                    articleElement.className = "post";

                    const postHeader = document.createElement("div");
                    postHeader.className = "post-img";
                    postHeader.style.backgroundImage = `url(${article.urlToImage})`;

                    const postBody = document.createElement("div");
                    postBody.className = "post-body";

                    const dateSpan = document.createElement("span");
                    dateSpan.textContent = new Date(article.publishedAt).toLocaleDateString();
                    postBody.appendChild(dateSpan);

                    const title = document.createElement("h2");
                    title.textContent = truncateText(article.title, 30); // Limita el título a 30 caracteres
                    postBody.appendChild(title);

                    const description = document.createElement("p");
                    description.className = "descripcion";
                    description.textContent = truncateText(article.description, 100); // Limita la descripción a 100 caracteres
                    postBody.appendChild(description);

                    const readMoreLink = document.createElement("a");
                    readMoreLink.href = article.url;
                    readMoreLink.textContent = "Leer Más";
                    readMoreLink.target = '_blank';
                    postBody.appendChild(readMoreLink);

                    articleElement.appendChild(postHeader);
                    articleElement.appendChild(postBody);

                    newsContainer.appendChild(articleElement);
                }
            });
        })
        .catch(error => {
            console.error("Error al obtener noticias:", error);
        });

    function truncateText(text, limit) {
        if (text.length <= limit) {
            return text;
        }
        return text.slice(0, limit) + '...';
    }
});
