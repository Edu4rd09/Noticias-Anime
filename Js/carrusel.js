const maxNews = 8; // Establecer el límite máximo de noticias
        let newsCount = 0; // Contador de noticias
        let intervalId; // Identificador del intervalo

        document.getElementById('next').onclick = function(){
            let lists = document.querySelectorAll('.item');
            document.getElementById('slide').appendChild(lists[0]);
        }

        document.getElementById('prev').onclick = function(){
            let lists = document.querySelectorAll('.item');
            document.getElementById('slide').prepend(lists[lists.length - 1]);
        }

        // Función para mostrar la fecha de la noticia (solo la fecha, sin hora)
        function displayNewsDate(date) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('news-date');

            // Formatea la fecha en el formato "DD/MM/AAAA" (cambia el formato según tus preferencias)
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const formattedDate = new Date(date).toLocaleDateString('es-ES', options);

            dateElement.textContent = formattedDate;
            return dateElement;
        }

        // Function to fetch news from NewsAPI and display them
        async function fetchNews() {
            const apiKey = '3c5d6187e83042718c80428e32da2508'; // Reemplaza con tu clave de API de NewsAPI
            let date = new Date();
date.setDate(date.getDate() - 7);
let sevenDaysAgo = date.toISOString().split('T')[0];

const newsApiUrl = `https://newsapi.org/v2/everything?q=anime&language=es&from=${sevenDaysAgo}&apiKey=${apiKey}`;

            try {
                const response = await fetch(newsApiUrl);
                const data = await response.json();

                if (data.articles) {
                    data.articles.forEach(article => {
                        if (!containsExactText(article.title, 'KINNIKUMAN - Primer Trailer') &&
                            !containsExactText(article.description, 'KINNIKUMAN - Primer Trailer') &&
                            !containsJsonContent(article) && // Evitar contenido JSON
                            newsCount < maxNews) {
                            // Create a new news item
                            const newsItem = document.createElement('div');
                            newsItem.classList.add('item');
                            newsItem.style.backgroundImage = `url(${article.urlToImage})`;

                            // Create news content
                            const content = document.createElement('div');
                            content.classList.add('content');
                            const name = document.createElement('div');
                            name.classList.add('name');
                            const titleText = article.title.length > 50 ? article.title.substring(0, 50) + '...' : article.title;
                            name.innerText = titleText;

                            const description = document.createElement('div');
                            description.classList.add('des');
                            const descText = article.description.length > 100 ? article.description.substring(0, 100) + '...' : article.description;
                            description.innerText = descText;

                            const newsDate = displayNewsDate(article.publishedAt); // Mostrar la fecha de la noticia

                            const link = document.createElement('a');
                            link.innerText = 'See more';
                            link.href = article.url;
                            link.target = '_blank'; // Abrir enlace en una nueva ventana o pestaña

                            content.appendChild(name);
                            content.appendChild(newsDate);
                            content.appendChild(description);
                            content.appendChild(link);
                            newsItem.appendChild(content);

                            document.getElementById('slide').appendChild(newsItem);
                            newsCount++;
                        }
                    });
                } else {
                    console.error('Failed to fetch news');
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        }

        // Función para verificar si el contenido es JSON
        function containsJsonContent(article) {
            // Verificar si el contenido del artículo contiene claves específicas de JSON
            const jsonKeys = ["videoId", "autoplay", "title", "tag"];
            for (const key of jsonKeys) {
                if (article.title.includes(key) || article.description.includes(key)) {
                    return true;
                }
            }
            return false;
        }

        function containsExactText(text, searchText) {
            return text.includes(searchText);
        }

        // Iniciar el carrusel automáticamente
        window.onload = () => {
            fetchNews(); // Cargar noticias iniciales
            intervalId = setInterval(() => {
                document.getElementById('next').click(); // Simular un clic en el botón "next" automáticamente
            }, 10000); // Avanzar cada 5 segundos (ajusta el intervalo según tus preferencias)
        }

        // Detener el carrusel cuando el usuario interactúa
       

        document.getElementById('prev').addEventListener('click', () => {
            clearInterval(intervalId); // Detener el intervalo cuando el usuario hace clic en "prev"
        });