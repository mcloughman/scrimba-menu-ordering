import { menuArray } from "./data.js"

const menuSection = document.getElementById("menu-section")
const orderStatusSection = document.getElementById("order-status-section")
const orderTotal = document.getElementById("order-total")
const completeOrderBtn = document.querySelector(".complete-order-btn")

// I believe totalPrice needs to be declared and set to 0 outside of function
let totalPrice = 0

document.addEventListener("click", function (e) {
  if (e.target.dataset.id) {
    addToOrder(e.target.dataset.id)
  } else if (e.target.dataset.removeId) {
    removeFromOrder(e.target.dataset.removeId)
  }
})

completeOrderBtn.addEventListener("click", function () {
  document.querySelector(".payment-modal").classList.remove("hidden")
  document.querySelector(".container").classList.add("container-background")
})

document
  .querySelector(".payment-modal")
  .addEventListener("submit", function (e) {
    e.preventDefault()
    const nameInput = document.getElementById("name-input").value

    document.querySelector(".payment-modal").classList.add("hidden")
    document.querySelector("h3").classList.add("hidden")
    document.querySelector(".order-total").classList.add("hidden")
    document.querySelector(".complete-order-btn").classList.add("hidden")
    orderStatusSection.classList.add("hidden")
    const thankYouDiv = document.createElement("div")
    thankYouDiv.textContent = `Thanks ${nameInput}! Your order is on the way`
    thankYouDiv.classList.add("thank-you")
    menuSection.append(thankYouDiv)
  })

function getMainHtml() {
  menuSection.innerHTML = ""
  menuArray.forEach(function (item, i) {
    menuSection.innerHTML += `
        <div class="menu-container">
        
       <div class="emoji" id="emoji-${i}">${item.emoji}</div> 
       <div class="item-details">
       <div class="name" >${item.name}</div> 
       <div class="ingredients">${item.ingredients.join(", ")}</div>
       <div class="price">$${item.price}</div>
       
       </div>
       <button class="add-btn" id="add-btn" data-id="${item.id}">+</button> 
       </div>
       
    `
  })
}

// Call this function inside the event listener when the add button is clicked
function addToOrder(itemId) {
  menuArray.forEach(function (item) {
    if (item.id === Number(itemId)) {
      totalPrice += item.price
      //   adding a data-price attribute on the container div so I can subtract that number from total price when i delete that item if user clicks remove button
      orderStatusSection.innerHTML += `
      <div class="order-container" id=${item.id} data-price=${item.price}>
            <div class="order-item" >${item.name} 
                <button class="remove-btn" data-remove-id=${item.id}>Remove</button>
            </div>
            <div class="order-price">$${item.price}</div>
      </div>
      `
    }
  })
  if (orderStatusSection.innerHTML) {
    document.querySelector("h3").classList.remove("hidden")
    orderTotal.classList.remove("hidden")
    document.querySelector(".complete-order-btn").classList.remove("hidden")
    orderTotal.innerHTML = `
        <span>Total Price: </span>
        <span class="total-price">$${totalPrice}</span>
    `
  }
}

function removeFromOrder(itemId) {
  // The removal is the toughest part. I used a data-price attribute on the container div because we need to subtract that price from the total price. I'm pretty ceretain there's a more efficient way to remove this. We also need to check if totalPrice goes to 0 upon removal of item. If it does, we need to hide everything order related. I had to add three lines of code to do that due to my amateurism. But it seems to get the job done in terms of UI
  const divToDelete = document.getElementById(itemId)
  console.log(divToDelete.dataset.price)
  let priceToSubtractFromTotal = Number(divToDelete.dataset.price)
  totalPrice -= priceToSubtractFromTotal
  // totalPrice won't update in the DOM without being proactive
  document.querySelector(".total-price").innerHTML = `$${totalPrice}`
  if (!totalPrice) {
    document.querySelector("h3").classList.add("hidden")
    document.querySelector(".order-total").classList.add("hidden")
    document.querySelector(".complete-order-btn").classList.add("hidden")
  }
  divToDelete.remove()
}

getMainHtml(menuArray)
