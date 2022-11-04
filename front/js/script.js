/* On appelle l'api du serveur pour récupérer les produits */

fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then((listProducts) => {
        kanap(listProducts);
    })
/* récupère la réponse en JSON, éléments traités sont ensuite appelés listProducts */
    .catch((err) => {
        document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>"
        console.log("erreur 404, absence de ressource API:" + err);
    });
/* dans le cas d'une erreur, fait afficher un titre H1 d'erreur et un console.log d'erreur 404 */ 

/* affichage des produits de l'api sur la page (forEach qui s'occupe de chaque produit pour lui créer ses elements) */
function kanap(listProducts) { 
    listProducts.forEach(products =>{
        const {_id, imageUrl, altTxt, name, description} = products;
       
        const anchor = createAnchor(_id); 

        const article = document.createElement("article");

        const image = createImage(imageUrl, altTxt);
        const h3 = createTitle(name)
        const p = createDescription(description)

        appendArticleToAnchor(anchor, article);
        appendElementsToArticle(article, [image, h3, p]);
    })
}

/* creation de la balise <a> et de son id */

function createAnchor(id) {
    const anchor = document.createElement("a");
    anchor.href ="./product.html?id=" + id;
    return anchor;
}

/* création des élements enfants d'article qui s'afficheront pour chaque produits */

/* création de la balise <img>, affichage de l'image et de ses élements */
function createImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

/* création du titre, ajout de sa class */
function createTitle(name){
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

/* création de la description, ajout de sa class */
function createDescription(description){
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}

/* fonction qui ajoute la balise <a> à la section et qui ajoute l'article */
function appendArticleToAnchor(anchor, article) {
    let items = document.getElementById("items")
    items.appendChild(anchor)
    anchor.appendChild(article)
}

/* fonction qui ajoute les elements à l'article et permet leur affichage */

function appendElementsToArticle(article, array) {
    array.forEach(elements => {
        article.appendChild(elements)
    });
}

