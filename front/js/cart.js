const cart = []
// définit le cart, les items
getItemsFromCache()
cart.forEach((item) => displayItem(item))
//on les affiche ensuite
// boutton order qui va etre ensuite appeller et définit plus tard
const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

// on affiche les items qui sont dans le localStorage et on les push et on les parse 
function getItemsFromCache() {
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++) {
      const item = localStorage.getItem(localStorage.key(i)) || ""
      const itemObject = JSON.parse(item)
      cart.push(itemObject)
    }
}

// Affichage des items
function displayItem(item) {
    const article = createArticle(item)
    const imageDiv = createImage(item)
    const cardItemContent = createCartContent(item)
      
    article.append(imageDiv, cardItemContent)
      
    displayArticle(article)
    displayTotalQuantity()
    displayTotalPrice()
} 

// appen de l'article à cart__items
function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

// création de l'article
function createArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
// comparer avec le dataset.id et le dataset.color, si élément trouvé mettre à jour le panier
}

// créer l'image de l'item
function createImage(item) {
    const divImage = document.createElement("div")
    divImage.classList.add("cart__item__img")
        
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt

    divImage.appendChild(image)
    return divImage
}

// création du content des items qui va contenir la description et les settings       
function createCartContent(item) {
    const divContent = document.createElement("div")
    divContent.classList.add("cart__item__content")
        
    const description = createCartDescription(item)
    const settings = createCartSettings(item)
        
    divContent.append(description, settings)
    return divContent
}

// la description du produit contenant son prix, son nom, sa couleur
function createCartDescription(item) {
    const divDescription = document.createElement("div")
    divDescription.classList.add("cart__item__content__description")
        
    const h2 = document.createElement("h2")
    h2.textContent = item.name

    const p = document.createElement("p")
    p.textContent = item.color
    
    const p2 = document.createElement("p")
    p2.textContent = item.price + " €"
    
    divDescription.append(h2, p, p2)
    return divDescription
}

// settings du cart et gestion de la quantité des produits et la fonctionnalité de suprression
function createCartSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")
    
    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

// gestion de la quantité des produits 
function addQuantityToSettings(settings, item) {
    const divQuantity = document.createElement("div")
    divQuantity.classList.add("cart__item__content__settings__quantity")

    const p = document.createElement("p")
    p.textContent = "Qté : "

    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item, item.color))
    divQuantity.append(p, input)
    settings.appendChild(divQuantity)
}

// Update du cart et du localStorage
function saveNewDataToCache(item) {
    const dataToSave = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(key, dataToSave)
}

// update du prix et de la quantité des produits
function updatePriceAndQuantity(id, newValue, item, color) {
// va chercher le premier item qui a un id et une color === à id et color
    const itemToUpdate = cart.find((item) => item.id === id && item.color === color)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity

    displayTotalQuantity()
    displayTotalPrice()
    saveNewDataToCache(item)
}

// on affiche la quantité total de produits
function displayTotalQuantity() {
    const spanQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    spanQuantity.textContent = total
}

// on affiche le prix total
function displayTotalPrice() {
    const spanPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    spanPrice.textContent = total
}

// Création de la div pour la suppression d'un article
function addDeleteToSettings(settings, item) {
    const divDelete = document.createElement("div")
    divDelete.classList.add("cart__item__content__settings__delete")
    divDelete.addEventListener("click", () => {
        if (confirm("Êtes vous certain de vouloir supprimer cet article ") == true){
        deleteCartItem(item)
        } 
    })

    const p = document.createElement("p")
    p.textContent = "Supprimer"
    divDelete.appendChild(p)
    settings.appendChild(divDelete)
}

// Fonction principale de suppression d'article
function deleteCartItem(item) {
    const itemToDelete = cart.findIndex(
        (product) => product.id === item.id && product.color === item.color
        )
    cart.splice(itemToDelete, 1)
    displayTotalPrice()
    displayTotalQuantity()
    deleteDataFromCache(item)
    deleteArticleFromPage(item)
}

// suppression du localStorage
function deleteDataFromCache(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}

// suppression de l'affichage du produit sur la page
function deleteArticleFromPage(item) {
    const articleToDelete = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`
        )
    articleToDelete.remove()
}
                      
// FORM CART

// définit l'ensemble des variables qui vont être utiliser
const firstName = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")
const address = document.querySelector("#address")
const city = document.querySelector("#city")
const email = document.querySelector("#email")
const errorFirstName = document.querySelector("#firstNameErrorMsg")
const errorLastName = document.querySelector("#lastNameErrorMsg")
const errorAddress = document.querySelector("#addressErrorMsg")
const errorCity = document.querySelector("#cityErrorMsg")
const errorEmail = document.querySelector("#emailErrorMsg")
// permet de gérer les inputs du formulaire
let validInputs = 0
// contact renvoyer par le formulaire compléter
let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: ""
};
// doit renvoyer un array de product id
let products = [];
// fonction qui va vérifier le first name
function checkFirstName() {
    let nameRegex = /^[A-Za-za`\s]+$/gi;
    validInputs
// ajoute un +1 a validInputs pour vérifier l'ensemble des inputs
    firstName.addEventListener("change", e => {
        firstName.value = e.target.value
        
        if(nameRegex.test(firstName.value)) {
            validInputs++; // on ajoute +1 si c'est == true
            contact.firstName = firstName.value; // on ajoute le firstName à contact
            errorFirstName.innerText = "" // on n'affiche pas l'erreur
        } else if (!nameRegex.test(firstName.value) || firstName.value === "" || firstName.value === null) {
            validInputs > 0 ? validInputs-- : validInputs; // si la valeur est nulle alors == false
            contact.firstName = "" // pas d'info contact
            errorFirstName.innerText = "Vous devez indiquer votre prénom en toute lettre." // on renvoit le message d'erreur
            errorFirstName.style.fontWeight = "bold"
            errorFirstName.style.color = "#BA1D1A"
            errorFirstName.style.fontSize = "1.3rem"
        }
        
    })
    
}
checkFirstName()

// fonction qui vérifie le last name
function checkLastName() {
    let nameRegex = /^[A-Za-za`\s]+$/gi;
    validInputs
    
    lastName.addEventListener("change", e => {
        lastName.value = e.target.value
        
        if(nameRegex.test(lastName.value)) {
            validInputs++; // on ajoute +1 si c'est == true
            contact.lastName = lastName.value; // on ajoute le lastName à contact
            errorLastName.innerText = ""
        } else if (!nameRegex.test(lastName.value) || lastName.value === "" || lastName.value === null) {
            validInputs > 0 ? validInputs-- : validInputs; // si la valeur est nulle alors == false
            contact.lastName = "" // pas d'info contact
            errorLastName.innerText = "Vous devez indiquer votre nom de famille en toute lettre." // on renvoit le message d'erreur
            errorLastName.style.fontWeight = "bold"
            errorLastName.style.color = "#BA1D1A"
            errorLastName.style.fontSize = "1.3rem"
        }
        
    })
}
checkLastName()

// fonction qui vérifier l'adresse
function checkAddress() {
    let addressRegex = /^[a-zA-Z0-9\s,'-]*$/gi; 
    validInputs
    
    address.addEventListener("change", e => {
        address.value = e.target.value
        
        if(addressRegex.test(address.value)) {
            validInputs++; // on ajoute +1 si c'est == true
            contact.address = address.value; // on ajoute le address à contact
            errorAddress.innerText = ""
        } else if (!addressRegex.test(address.value) || address.value === "" || address.value === null) {
            validInputs > 0 ? validInputs-- : validInputs; // si la valeur est nulle alors == false
            contact.address = "" // pas d'info contact
            errorAddress.innerText = "Vous devez indiquer votre adresse avec des lettres et des chiffres" // on renvoit le message d'erreur
            errorAddress.style.fontWeight = "bold"
            errorAddress.style.color = "#BA1D1A"
            errorAddress.style.fontSize = "1.3rem"
        }
        
    })
}
checkAddress()

// fonction qui vérifie la ville
function checkCity() {
    let cityRegex = /^[A-Za-za`\s]+$/gi;
    validInputs
    
    city.addEventListener("change", e => {
        city.value = e.target.value
        
        if(cityRegex.test(city.value)) {
            validInputs++; // on ajoute +1 si c'est == true
            contact.city = city.value // on ajoute le city à contact
            errorCity.innerText = ""
        } else if (!cityRegex.test(city.value) || city.value === "" || city.value === null){
            validInputs > 0 ? validInputs-- : validInputs; // si la valeur est nulle alors == false
            contact.city = "" // pas d'info contact
            errorCity.innerText = "Vous devez indiquer votre ville en toute lettre" // on renvoit le message d'erreur
            errorCity.style.fontWeight = "bold"
            errorCity.style.color = "#BA1D1A"
            errorCity.style.fontSize = "1.3rem"
        }
    })
}
checkCity()

// on vérifie l'email
function checkEmail() {
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    validInputs
    
    email.addEventListener("change", e => {
        email.value = e.target.value
        
        if(emailRegex.test(email.value)) {
            validInputs++; // on ajoute +1 si c'est == true
            contact.email = email.value // on ajoute le email à contact
            errorEmail.innerText = ""
        } else if(!emailRegex.test(email.value) || email.value === "" || email.value === null){
            validInputs > 0? validInputs-- : validInputs; // si la valeur est nulle alors == false
            contact.email = "" // pas d'info contact
            errorEmail.innerText = `Votre adresse email doit contenir un "@" et un "." afin de pouvoir être valider.` // on renvoit le message d'erreur
            errorEmail.style.fontWeight = "bold"
            errorEmail.style.color = "#BA1D1A"
            errorEmail.style.fontSize = "1.3rem"
        }
        
    })
}
checkEmail()

// récupération de l'id depuis le localStorage
function getIdsFromCache() {
// va correspondre au products renvoyer par le body
    const ids = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const id = key.split("-")[0]
        ids.push(id)
        }
    return ids
    }  
  
// on vérifier l'order et le body 
function checkOrder(){
    const body = { contact, products:getIdsFromCache()}
// fetch method POST des données pour afficher les orders
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then((res) => res.json())
    .then((data) => 
    {
// on se dirige vers la page order ou sera afficher notre orderID
        window.location = `confirmation.html` + "?orderId=" + data.orderId;
    })
    .catch((error) => {
        console.log("Une erreur semble s'ettre produite à la récupération de données de l'API")
        console.log(error)
    })      
}
    
function submitForm(e) {
    e.preventDefault()
// on vérifier que les validInputs sont bien à +5 pour vérifier que l'ensemble des inputs sont corrects
        if(validInputs === 5 && confirm('Voulez-vous valider votre commande ?')){
// on lance la fonction checkOrder
            checkOrder()
        } else if (validInputs === 0){
            alert("Veuillez remplir le formulaire pour confirmer la commande.")
        }
    }