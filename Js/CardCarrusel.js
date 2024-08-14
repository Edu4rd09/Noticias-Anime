const apiKey = '3c5d6187e83042718c80428e32da2508';
const cardWrapper = document.getElementById('card-wrapper');
const maxNewsToShow = 10; // Definir el límite de noticias

// Obtén la fecha de hace un mes
let date = new Date();
date.setMonth(date.getMonth() - 1);
let lastMonth = date.toISOString();

// Fetch news articles from the NewsAPI
axios.get(`https://newsapi.org/v2/everything?q=anime&language=es&from=${lastMonth}&apiKey=${apiKey}`)
    .then(response => {
        const articles = response.data.articles.slice(0, maxNewsToShow); // Limitar el número de noticias

        articles.forEach(article => {
            // Create a card for each article
            const card = document.createElement('article');
            card.className = 'card__article swiper-slide';

            // Obtén el título del artículo y limita su longitud
            const articleTitle = article.title;
            const limitedTitle = articleTitle.length > 50 ? articleTitle.substr(0, 80) + '...' : articleTitle;

            card.innerHTML = `
        <div class="card__image">
            <img src="${article.urlToImage}" alt="image" class="card__img">
            <div class="card__shadow"></div>
        </div>
        <div class="card__data">
            <h3 class="card__name">${limitedTitle}</h3>
            <a href="${article.url}" class="card__button" target="_blank">Leer Mas</a>
        </div>
    `;
            cardWrapper.appendChild(card);

        });

    })

    .catch(error => {
        console.error('Error fetching news articles', error);
    });