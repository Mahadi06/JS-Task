// array of products
var products = [{
        'id': 1,
        'name': 'Short Sleeve tshirt',
        'price': 490,
        'img': 'https://github.com/Mahadi06/js-projects/blob/main/images/Fashionable-Short-Sleeve-tshir-for-Men.jpg?raw=true'
    },
    {
        'id': 2,
        'name': 'Casual shirt for men',
        'price': 1500,
        'img': 'https://github.com/Mahadi06/js-projects/blob/main/images/casual-shirt-for-men.jpg?raw=true'
    }, {
        'id': 3,
        'name': 'Gear Hoodie',
        'price': 690,
        'img': 'https://github.com/Mahadi06/js-projects/blob/main/images/gear-hoodie.jpg?raw=true'
    }, {
        'id': 4,
        'name': 'Hip Hop Jacket',
        'price': 1100,
        'img': 'https://github.com/Mahadi06/js-projects/blob/main/images/hip-hop-jacket.jpg?raw=true'
    }, {
        'id': 5,
        'name': 'Black sports hoodie',
        'price': 1150,
        'img': 'https://github.com/Mahadi06/js-projects/blob/main/images/never-underestimate-me.jpg?raw=true'
    }, {
        'id': 6,
        'name': 'Ninja Hoodie',
        'price': 850,
        'img': 'https://github.com/Mahadi06/js-projects/blob/main/images/ninja-hoodie.jpg?raw=true'
    }, {
        'id': 7,
        'name': 'White Winter Jacket',
        'price': 900,
        'img': 'https://github.com/Mahadi06/js-projects/blob/main/images/white-navy-winter-jacket-for-men.jpg?raw=true'
    },
    {
        'id': 8,
        'name': 'Nike tshirt',
        'price': 500,
        'img': 'https://github.com/Mahadi06/js-projects/blob/main/images/yellow-nike-tshirt.jpg?raw=true'
    }, {
        'id': 9,
        'name': 'Yellow Sweater',
        'price': 990,
        'img': 'https://github.com/Mahadi06/js-projects/blob/main/images/yellow-full-sleeve-sweater.jpg?raw=true'
    }, {
        'id': 10,
        'name': 'Girls Party Dress',
        'price': 2000,
        'img': 'https://github.com/Mahadi06/js-projects/blob/main/images/party-dress.jpg?raw=true'
    }
]

//load products from array
function loadProducts() {
    const allProducts = document.querySelector('.products');

    let attr = document.createAttribute("data-id");

    products.forEach(function (product) {
        let element = document.createElement("div");

        let productId = product.id;
        attr.value = productId;
        element.setAttribute("data-id", productId);

        element.classList.add("card");

        element.innerHTML = `
            <img class = "product-img" src="${product.img}" alt="">
            <p class = "product-name">${product.name}</p>
            <p class = "product-price">BDT${product.price}</p>
            
        `;
        allProducts.appendChild(element);

    })
}

window.addEventListener("DOMContentLoaded", loadProducts);

window.addEventListener("DOMContentLoaded", addToCart);

var addedId = [];

// add to cart functionality
function addToCart() {

    const cards = document.querySelectorAll('.card');
    const cartProducts = document.querySelector('.cart-products');
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function (event) {

            const btnClicked = event.target.parentElement;
            const productName = btnClicked.querySelector('.product-name').innerHTML;
            const productPrice = btnClicked.querySelector('.product-price').innerHTML;
            const productImage = btnClicked.querySelector('.product-img').src;
            const productId = parseInt(btnClicked.dataset.id);
            let productQuantity = 1;



            if (addedId.indexOf(productId) == -1) {

                let element = document.createElement("div");
                let attr = document.createAttribute("data-pid");
                attr.value = productId;
                element.setAttribute("data-pid", productId);
                element.classList.add("single-product");

                element.innerHTML = `
                    <img class="ml cart-img" src="${productImage}" alt="">
                    <span class="ml cart-quantity">${productQuantity}</span>
                    <span class="ml cart-name">${productName}</span>
                    <span class="ml cart-price">${productPrice}</span>
                    <i class=" ml fa-solid fa-trash-can cart-delete"></i>   
                `;
                cartProducts.appendChild(element);
                addedId.push(parseInt(productId));

                deleteBtnAcivated();
                calculateTotal();
                updateStyle();


            } else {
                increaseQuantity(productId);
                alert("This item already exist in the cart. Qunatity will be increased.");
                calculateTotal();
            }
        })

    }

}

//Remove from cart
function deleteBtnAcivated() {
    const deleteBtn = document.querySelectorAll('.cart-delete');

    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', function (event) {
            let targetBtn = event.target;
            targetBtn.parentElement.remove();
            calculateTotal();

            let deletedId = parseInt(targetBtn.parentElement.dataset.pid);
            addedId = addedId.filter(item => item !== deletedId);
            console.log(addedId);

        })
    }

}

function increaseQuantity(id) {
    const cartProducts = document.querySelectorAll(".single-product");
    let quantity;

    for (let i = 0; i < cartProducts.length; i++) {
        //     let singleElement = cartProducts[i];

        if (id == cartProducts[i].dataset.pid) {
            quantity = cartProducts[i].querySelector(".cart-quantity").innerHTML;
            quantity = parseInt(quantity) + 1;
            cartProducts[i].querySelector(".cart-quantity").innerHTML = quantity;
        }

    }
}

// total price calculation
function calculateTotal() {

    const cartProducts = document.querySelectorAll(".single-product");
    var totalPrice = 0;

    for (let i = 0; i < cartProducts.length; i++) {

        let singleElement = cartProducts[i];
        let priceElement = singleElement.querySelector(".cart-price").innerHTML;
        let quantityElement = singleElement.querySelector(".cart-quantity").innerHTML;

        let price = parseFloat(priceElement.replace("BDT", ""));

        totalPrice += price * quantityElement;
    }
    document.querySelector("#pay").innerHTML = totalPrice;
    document.querySelector("#subtotal").innerHTML = totalPrice;
    document.querySelector("#total").innerHTML = totalPrice;

}


function updateStyle() {
    const allProducts = document.querySelector('.all-products');
    const options = document.querySelector('.options');
    const cart = document.querySelector('.cart');

    allProducts.style.width = "65%";
    options.style.width = "65%";
    cart.style.display = "block";

}