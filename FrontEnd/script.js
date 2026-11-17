fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    tousLesProjets = data;
    const galerie = document.querySelector(".gallery");
    data.forEach((article) => {
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
  });

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    const filtres = document.querySelector(".filtres");
    const filtreTous = document.createElement("button");
    filtreTous.textContent = "Tous";
    filtres.appendChild(filtreTous);
    filtreTous.classList.add("active");
    categories.forEach((categorie) => {
      const filtre = document.createElement("button");
      filtre.textContent = categorie.name;
      filtres.appendChild(filtre);

      filtre.addEventListener("click", () => {
        document.querySelectorAll(".filtres button").forEach((bouton) => {
          bouton.classList.remove("active");
        });

        filtre.classList.add("active");
      });
    });
  });
