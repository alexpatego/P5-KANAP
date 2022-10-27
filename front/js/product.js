const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
let itemPrice = 0
let imagUrl, altText = 0
let itemName = ""

fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then(res => productItem(res))

function productItem(kanap){
    const {altTxt, colors, description, imageUrl, name, price} = kanap
    itemName = name
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    createImage(imageUrl, altTxt)
    createH1(name)
    createPrice(price)
    createP(description)
    createColors(colors)
}

function createImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)
}

function createH1(name){
    const h1 = document.getElementById("title")
    h1.textContent = name
}

function createPrice(price){
    const prix = document.getElementById("price")
    prix.textContent = price
}

function createP(description){
    const p = document.getElementById("description")
    p.textContent = description
}

function createColors(colors) {
    const select = document.getElementById("colors")
    colors.forEach(color => {
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        select.appendChild(option)
    })
}

const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick)

function handleClick() {
    const color = document.getElementById("colors").value
    const quantity = document.getElementById("quantity").value
    if (orderIsInvalid(color, quantity)) return
    saveOrder(color, quantity)
    redirectToCart()
}

function redirectToCart() {
    window.location.href = "cart.html"
}

function saveOrder(color, quantity) {
    const dataCart = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price: itemPrice,
        imageUrl: imgUrl,
        altTxt: altText,
    }
    localStorage.setItem(id, JSON.stringify(dataCart))
}

function orderIsInvalid(color, quantity){
    if (color == null || color === "" || quantity == null || quantity == 0 ) {
        alert("Please select a color and quantity")
        return true
    } 
}