document.addEventListener('DOMContentLoaded', function () {
    var cartIcon = document.querySelector('#cart-icon');
    var cart = document.querySelector('.cart');
    var closeCart = document.querySelector('#close-cart');

    // Open
    cartIcon.onclick = function () {
        cart.classList.add("active");
    }

    // Close
    closeCart.onclick = function () {
        cart.classList.remove("active");
    }

    if (document.readyState == "loading") {
        document.addEventListener('DOMContentLoaded', ready);
    } else {
        ready();
    }

    function ready() {
        var removeCartButtons = document.getElementsByClassName('cart-remove');
        for (var i = 0; i < removeCartButtons.length; i++) {
            var button = removeCartButtons[i];
            button.addEventListener('click', removeCartItems);
        }

        // Change Quantity
        var quantityInputs = document.getElementsByClassName('cart-quantity');
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i];
            input.addEventListener('change', quantityChanged);
        }

        // Add to Cart
        var addCart = document.getElementsByClassName('add-cart');
        for (var i = 0; i < addCart.length; i++) {
            var button = addCart[i];
            button.addEventListener('click', addCartClicked);
        }

        
    }

    function removeCartItems(e) {
        var buttonClicked = e.target;
        buttonClicked.parentElement.remove();
        updateTotal();
    }

    function quantityChanged(e) {
        var input = e.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateTotal();
    }

    function addCartClicked(e) {
        var button = e.target;
        var shopProduct = button.closest('.item');
        var title = shopProduct.querySelector('.price h4').innerText;
        var price = shopProduct.querySelector('.price p').innerText;
        var productImg = shopProduct.querySelector('.product-img').src;
        addProductToCart(title, price, productImg);
        updateTotal();
    }

    function addProductToCart(title, price, productImg) {
        var cartShopBox = document.createElement('div');
        cartShopBox.classList.add('cart-box');
        var cartItems = document.getElementsByClassName('cart-content')[0];
        var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

        for (var i = 0; i < cartItemsNames.length; i++) {
            if (cartItemsNames[i].innerText === title) {
                alert("You have already added this item to the cart");
                return;
            }
        }

        var cartBoxContent = `
            <img src="${productImg}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class='bx bxs-trash-alt cart-remove'></i>
        `;
        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);

        cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItems);
        cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
    }

    function updateTotal() {
        var total = 0;
        var cartContent = document.getElementsByClassName('cart-content')[0];
        var cartBoxes = cartContent.getElementsByClassName('cart-box');

        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.getElementsByClassName('cart-price')[0];
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            var price = parseFloat(priceElement.innerText.replace('$', ''));
            var quantity = quantityElement.value;
            total += price * quantity;
        }

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    }
});
// Local storage
document.addEventListener('DOMContentLoaded', function () {
  var usernameDisplay = document.getElementById('username-display');
  var username = localStorage.getItem('username');
  if (username) {
    usernameDisplay.textContent = username;
  }
});

// Owl Carousel Slider 
        $('.products').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        });
// Logout button 
document.getElementById('username-display').textContent = localStorage.getItem('username') || 'Guest';

  
  document.getElementById('logout-button').addEventListener('click', function() {
    localStorage.removeItem('username'); // Remove the username from localStorage
    window.location.href = 'login.html'; // Redirect to the login page
  });