document.addEventListener("DOMContentLoaded", function () {
    const articleListContainer = document.getElementById("articleListContainer");
    const searchInput = document.getElementById("searchInput");

    let articles = []; // Variable globale pour stocker les articles chargés

    // JSON chargement
    fetch("articles.json")
        .then(response => response.json())
        .then(data => {
            articles = data;
            // Trie par année
            articles.sort((a, b) => b.year - a.year);

            // Chargement initial
            displayArticles(articles);
        })
        .catch(error => console.error("Erreur de chargement des articles:", error));

    // Affichage d'articles
    function displayArticles(articles) {
        articleListContainer.innerHTML = ""; // Reinitialise

        let currentYear = null;

        articles.forEach(article => {
            const listItem = document.createElement("div");

            // Regroupement par année
            if (article.year !== currentYear) {
                const yearHeading = document.createElement("h3");
                yearHeading.textContent = article.year;
                articleListContainer.appendChild(yearHeading);
                currentYear = article.year;
            }

            // Contenu
            listItem.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.authors.join(", ")} | ${article.venue}</p>
            `;

            // Click on Articles
            listItem.addEventListener("click", function () {
                window.location.href = article.siteLink;
            });

            listItem.classList.add("clickable");

            articleListContainer.appendChild(listItem);
        });
    }

    // EventListener Barre de Recherche
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();

        // Fonction pour rendre la recherche insensible aux accents
        const normalizeString = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const filteredArticles = articles.filter(article =>
            normalizeString(article.title.toLowerCase()).includes(normalizeString(searchTerm)) ||
            article.authors.some(author => normalizeString(author.toLowerCase()).includes(normalizeString(searchTerm))) ||
            article.keywords.some(keyword => normalizeString(keyword).includes(normalizeString(searchTerm))) ||
            normalizeString(article.year.toString()).includes(normalizeString(searchTerm))
        );
        displayArticles(filteredArticles);
    });
});
//Scroll to Top BTn
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

function scrollToTop() {
    const scrollDuration = 200; // Durée de l'animation en millisecondes
    const scrollStep = -window.scrollY / (scrollDuration / 15); // Calcul de l'incrément pour chaque étape

    const scrollInterval = setInterval(function () {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
}