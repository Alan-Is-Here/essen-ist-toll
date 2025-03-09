var modal = document.getElementById("myModal");
var btn = document.getElementById("cart");
var close = document.getElementsByClassName("close")[0];
var close_footer = document.getElementsByClassName("close-footer")[0];
var order = document.getElementsByClassName("order")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

[close, close_footer].forEach(function (element) {
  element.onclick = function () {
    modal.style.display = "none";
  };
});

order.onclick = function () {
  alert("Cảm ơn bạn đã thanh toán đơn hàng");
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function removeFromCart(event) {
  event.preventDefault();
  var button_remove = event.target;
  button_remove.parentElement.parentElement.remove();
  updatecart();
}

function updatecart() {
  var cart_item = document.getElementsByClassName("cart-items")[0];
  var cart_rows = cart_item.getElementsByClassName("cart-row");
  var total = 0;

  for (var i = 0; i < cart_rows.length; i++) {
    var cart_row = cart_rows[i];
    var price_item = cart_row.getElementsByClassName("cart-price")[0];
    var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0];
    var price = parseFloat(price_item.innerText.replace(/[^0-9.-]+/g, ""));
    var quantity = quantity_item.value;
    total += price * quantity;
  }
  document.getElementsByClassName("cart-total-price")[0].innerText = total.toLocaleString() + ' VNĐ';
}

var quantity_input = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantity_input.length; i++) {
  var input = quantity_input[i];
  input.addEventListener("change", function (event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart();
  });
}

function addItemToCart(event) {
  event.preventDefault();
  var button = event.target;
  // var product = button.closest(".main-product");
  var title = button.parentElement.parentElement.childNodes[1].innerText;
  // var priceText = product.querySelector(".price").innerText;
  var price = button.parentElement.parentElement.childNodes[7].childNodes[1].childNodes[1].innerText;
  var cartItems = document.querySelector(".cart-items");
  var cartTitles = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartTitles.length; i++) {
    if (cartTitles[i].innerText === title) {
      alert("Sản Phẩm Đã Có Trong Giỏ Hàng");
      return;
    }
  }

  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  cartRow.innerHTML = `
    <div class="cart-item cart-column">
      <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}đ</span>
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1" min="1">
      <button class="btn btn-danger btn-remove" type="button" onclick="removeFromCart(event)">Delete</button>
    </div>`;

  cartItems.append(cartRow);
  cartRow.querySelector('.cart-quantity-input').addEventListener('change', function (event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart();
  });

  modal.style.display = "block";
  updatecart();
}

let product_area = document.querySelector('.products ul');

initApi();

function initApi() {
  getProductAPI();
}

async function getProductAPI() {
    let response = await fetch('js/recipe.json').catch(error => {
        console.error("Error fetching the product data:", error);
    });
    
    if (!response.ok) {
        console.error("HTTP error:", response.status);
        return;
    }
    
    let data = await response.json();
    console.log(data);
    loadProducts(data);
  console.log(data);
  loadProducts(data);
}

function loadProducts(data) {
    console.log("Loading products:", data); // Log the loaded products
    for (let i = 0; i < data.length; i++) {
        let output = `
        <li>
            <div class="product-item card">
                <div class="product-container card-inner">
                    <div class="img-product card-front">
                        <img class="product-image" src="${data[i].image}" alt="${data[i].title}">
                    </div>
                    <div class="product-overlay card-back">
                        <h3 class="content-product-h3">${data[i].title}</h3>
                        <div class="content-product-description">
                            ${data[i].description}
                        </div>

                        <div class="content-product-info">
                            <span class="cuisine">${data[i].cuisine || 'International Cuisine'}</span>
                        </div>
                        <div class="content-product-deltals">
                            <div class="price">
                                <span class="money">${data[i].price}</span>đ
                            </div>
                            <button type="button" class="btn btn-cart btn-buy" onclick="addItemToCart(event)">
                                <i class="fa fa-shopping-cart"></i>
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>`;
        product_area.innerHTML += output;
    }
}
