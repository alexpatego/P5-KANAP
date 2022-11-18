// new URL qui va prendre l'url actuel
const params = new URLSearchParams(window.location.search);
const orderId = params.get("orderId")
// on récupère l'orderID
const orderIdDiv = document.querySelector("#orderId")
orderIdDiv.innerText = orderId
// on l'affiche sur la page
localStorage.clear()
// on supprime l'ensemble du localStorage