let tousLesProjets = [];

function afficherProjets(projets) {
  const galerie = document.querySelector(".gallery");

  galerie.innerHTML = "";

  projets.forEach((article) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = article.imageUrl;
    img.alt = article.title;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = article.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    galerie.appendChild(figure);
  });
}

// Récupérer les projets
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    tousLesProjets = data;
    afficherProjets(tousLesProjets);
  });

// Récupérer les catégories
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    const filtres = document.querySelector(".filtres");

    const filtreTous = document.createElement("button");
    filtreTous.textContent = "Tous";
    filtres.appendChild(filtreTous);
    filtreTous.classList.add("active");
    filtreTous.addEventListener("click", () => {
      document.querySelectorAll(".filtres button").forEach((bouton) => {
        bouton.classList.remove("active");
      });

      filtreTous.classList.add("active");
      afficherProjets(tousLesProjets);
    });

    categories.forEach((categorie) => {
      const filtre = document.createElement("button");
      filtre.textContent = categorie.name;
      filtres.appendChild(filtre);

    filtre.addEventListener("click", () => {
      const projetsFiltres = tousLesProjets.filter((article) => {
      return article.categoryId === categorie.id;
        });

        afficherProjets(projetsFiltres);
        document.querySelectorAll(".filtres button").forEach((bouton) => {
          bouton.classList.remove("active");
        });

        filtre.classList.add("active");
      });
    });
  });
