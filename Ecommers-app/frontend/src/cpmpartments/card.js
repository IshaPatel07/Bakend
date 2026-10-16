const cartDivision = document.getElementById("cart-div");
const totalPrice = document.getElementById("total-price");

function removeCards(i) {
  let arr = JSON.parse(localStorage.getItem("carts")) || [];
  arr.splice(i, 1);
  localStorage.setItem("carts", JSON.stringify(arr));
  displayCardproducts();
}

function displayCardproducts() {
  let total = 0;
  const carts = JSON.parse(localStorage.getItem("carts")) || [];
  cartDivision.innerHTML = "";
  carts.map((card, i) => {
    total = total + card.price * 86;
    const div = document.createElement("div");
    div.innerHTML = `<div class="card mb-3" style="max-width: 540px">
          <div class="row g-0">
            <div class="col-md-4">
              <img src=${card.images[0]} class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <p class="card-text">
                Qty - ${card.qty}
                </p>
                <p class="card-text">
                 ₹${(card.price * 86).toFixed(2)}/-
                </p>
              </div>
              <button onclick="removeCards(${i})" class="btn btn-danger">Remove</button>
            </div>
          </div>
        </div>`;
    cartDivision.appendChild(div);
  });
  totalPrice.textContent = "Total : ₹" + total.toFixed(2) + "/-";
}

displayCardproducts();
