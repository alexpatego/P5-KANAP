/* On appelle l'api du serveur */

/* variable locale par fonction */
fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(kanap => listProduct(kanap));

    /* fonction principale avec forEach pour chaque image */
function listProduct(kanap){
    kanap.forEach(products => {
        const {_id, imageUrl, altTxt, name, description} = products

        const image = makeImage(imageUrl, altTxt)
    
        const anchor = makeAnchor(_id)
        const article = document.createElement("article")
        const h3 = makeH3(name)
        const p = makeP(description)
    
        appendElementsToArticle(article, [image, h3, p])
        appendArticleToAnchor(anchor, article)   
        
    });
}

    /* append elements to article */

function appendElementsToArticle(article, array) {
    //article.appendChild(image)
    //article.appendChild(h3)
    //article.appendChild(p)
    array.forEach(elements => {
        article.appendChild(elements)
    });
}

/* création balise <a> */

function makeAnchor(id) {
    let anchor = document.createElement("a");
    anchor.href = "./product.html?id=" + id;
    return anchor  
}

/* Append article à la balise <a> */

function appendArticleToAnchor(anchor, article){ 
    let items = document.getElementById("items")
        items.appendChild(anchor)
        anchor.appendChild(article)
}

/* création des balises enfant de Article */

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}


function makeH3(name){
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

function makeP(description){
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}