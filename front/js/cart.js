const cart = []

getItemsFromCache()
cart.forEach((item) => displayItem(item))

function getItemsFromCache() {
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++) {
      const item = localStorage.getItem(localStorage.key(i)) || ""
      const itemObject = JSON.parse(item)
      cart.push(itemObject)
    }
}
  
  function displayItem(item) {
    const article = createArticle(item)
    const imageDiv = createImage(item)
    const cardItemContent = createCartContent(item)
      
    article.append(imageDiv, cardItemContent)
      
    displayArticle(article)
    displayTotalQuantity()
    displayTotalPrice()
} 

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function createArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
     /* comparer avec le dataset.id et le dataset.color, si élément trouvé mettre à jour le panier */
}

function createImage(item) {
    const divImage = document.createElement("div")
    divImage.classList.add("cart__item__img")
        
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt

    divImage.appendChild(image)
    return divImage
}
       
function createCartContent(item) {
    const divContent = document.createElement("div")
    divContent.classList.add("cart__item__content")
        
    const description = createCartDescription(item)
    const settings = createCartSettings(item)
        
    divContent.append(description, settings)
    return divContent
}
    
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

function createCartSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")
    
    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

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
    console.log(Event)

    divQuantity.append(p, input)
    settings.appendChild(divQuantity)

}

function saveNewDataToCache(item) {
    const dataToSave = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(key, dataToSave)
}

function updatePriceAndQuantity(id, newValue, item, color) {
    const itemToUpdate = cart.find((item) => item.id === id && item.color === color)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity

    displayTotalQuantity()
    displayTotalPrice()
    saveNewDataToCache(item)
}

function displayTotalQuantity() {
    const spanQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    spanQuantity.textContent = total
}

function displayTotalPrice() {
    const spanPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    spanPrice.textContent = total
}

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

function deleteDataFromCache(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}

function deleteArticleFromPage(item) {
    const articleToDelete = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`
        )
    articleToDelete.remove()
}
        
      
        