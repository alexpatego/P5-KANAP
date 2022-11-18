// récupération de l'id du produit grâce à l'url
const params = new URLSearchParams(window.location.search)
const id = params.get('id')
let itemPrice = 0
let imagUrl, altText, itemName

// appel de l'api avec un fetch pour obtenir les produits et l'id 

fetch(`http://localhost:3000/api/products/${id}`)
 .then(response => response.json())
 .then((productItem) => {
    kanap(productItem);
})
// récupère la réponse en JSON, éléments traités sont ensuite appelés productItem via la fonction kanap
.catch((error) => {
    document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>"
    console.log("erreur 404, absence de ressource API:" + error);
});
// dans le cas d'une erreur, fait afficher un titre H1 d'erreur et un console.log d'erreur 404  

// appel de l'API, affichage du produits et de ses élements
function kanap(productItem) {
    const {imageUrl, altTxt, name, price, description, colors} = productItem
    itemName = name
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    createImage(imageUrl, altTxt)
    createName(name)
    createPrice(price)
    createDescription(description)
    createColors(colors)
};

// création de l'image et ajout à la div
function createImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    document.querySelector(".item__img").appendChild(image)
};

// création du titre de l'article
function createName(name) {
    const title = document.getElementById("title")
    title.innerHTML = name
};

// création du prix 
function createPrice(price) {
    const span = document.getElementById("price")
    span.innerHTML = price
};

// création de la description
function createDescription(description) {
    const p = document.getElementById("description")
    p.innerHTML= description
};

// création de l'option color 
function createColors(colors) {
    const select = document.getElementById("colors")
    colors.forEach(color => {
        const option = document.createElement("option")
        option.value = color
        option.innerHTML = color
        select.appendChild(option)
    })
};

// boutton addToCart
const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick)

// handleClick fonction 
function handleClick() {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    if (orderIsInvalid(color, quantity)) return
    saveOrder(color, quantity)
    redirectToCart()
}

// redirection avec confirmation ou non
function redirectToCart() {
    if (confirm("Commande enregistrée, voulez vous accédez au panier ?") == true) {
        window.location.href = "../html/cart.html";
    }
}

// on enregristre la commande
function saveOrder(color, quantity) {
    const key = `${id}-${color}`
    const dataCart = {
        id: id,
        color: color,
        quantity: Number(quantity),
        name: itemName,
        price: itemPrice,
        imageUrl: imgUrl,
        altTxt: altText
    }
    localStorage.setItem(key, JSON.stringify(dataCart))
}

// la commande est invalide, retourne ceci 
function orderIsInvalid(color, quantity) {
    if (color == null || color === "" || quantity == null || quantity == 0) {
        alert("Veuillez sélectionner une couleur et une quantité")
        return true
    }
}