const fruits = [
  { name: 'Apple', price: '30', count: 1, img: './img/apple.jpeg' },
  { name: 'Banana', price: '20', count: 1, img: './img/banana.jpeg' },
  { name: 'Guava', price: '20', count: 1, img: './img/guava.jpeg' },
  { name: 'Orange', price: '15', count: 1, img: './img/orange.jpeg' },
  { name: 'Peach', price: '30', count: 1, img: './img/peach.jpeg' },
  { name: 'Tomato', price: '20', count: 1, img: './img/tomato.jpeg' },
];

let carts = JSON.parse(localStorage.getItem('carts')) || [];

function productRender() {
  const productList = [];
  const ul = document.querySelector('.products ul');
  for (let i = 0; i < fruits.length; i++) {
    let li = `<li id="${i}">
    <div class="img">
      <img src="${fruits[i].img}" alt="" />
    </div>
    <div class="product-name">
      <h4>${fruits[i].name}</h4>
      <p>$${fruits[i].price}/per</p>
    </div>
    <div class="count">
      <i class="bx bx-minus"></i>
      <span>${fruits[i].count}</span>
      <i class="bx bx-plus"></i>
    </div>
    <div class="cart-add">
      <i class="bx bxs-cart-alt"></i>
    </div>
  </li>`;
    productList.push(li);
  }
  ul.innerHTML = productList.join('');

  //DOM EVENTS
  //CounButtons Events
  const plusBtns = document.querySelectorAll('.products .count .bx-plus');
  plusBtns.forEach((btn, i) =>
    btn.addEventListener('click', () => {
      fruits[i].count += 1;
      productRender();
    })
  );
  const minusBtns = document.querySelectorAll('.products .count .bx-minus');
  minusBtns.forEach((btn, i) =>
    btn.addEventListener('click', () => {
      fruits[i].count -= 1;
      if (fruits[i].count < 1) {
        fruits[i].count = 1;
      }
      productRender();
    })
  );
  //Add Products to Carts
  const addProductToCartsBtns = document.querySelectorAll(
    '.products .cart-add i'
  );
  addProductToCartsBtns.forEach(btn =>
    btn.addEventListener('click', addProductToCart)
  );
}
function addProductToCart() {
  const productId = this.parentNode.parentNode.getAttribute('id');
  let product = {
    name: fruits[productId].name,
    price: fruits[productId].price,
    count: fruits[productId].count,
    img: fruits[productId].img,
  };

  //FindIndex of same Product Name
  const index = carts.findIndex(item => {
    return item.name == product.name;
  });
  //List all Product Name in Carts
  const cartsList = carts.map(item => item.name);
  //If Carts doesn't include product, then "push", else "count++"
  if (cartsList.indexOf(product.name) == -1) {
    carts.push(product);
  } else {
    carts[index].count += product.count;
  }
  //If Carts = Empty Array
  if (carts.length < 1) {
    carts.push(product);
  }
  //Reset Count on Products' page
  fruits.forEach(item => {
    item.count = 1;
  });

  localStorage.setItem('carts', JSON.stringify(carts));
  productRender();
  cartsRender();
}
function cartsRender() {
  const cartsList = [];
  const ul = document.querySelector('.content .carts ul');
  for (let i = 0; i < carts.length; i++) {
    let li = `<li id="${i}">
    <div class="img">
      <img src="${carts[i].img}" alt="" />
    </div>
    <div class="product-name">
      <h4>${carts[i].name}</h4>
      <p>$${carts[i].price}/per</p>
    </div>
    <div class="count">
      <i class="bx bx-minus"></i>
      <span>${carts[i].count}</span>
      <i class="bx bx-plus"></i>
    </div>
    <div class="cart-remove">
      <i class="bx bxs-trash"></i>
    </div>
  </li>
  `;
    cartsList.push(li);
  }
  ul.innerHTML = cartsList.join('');

  const DeleteBtns = document.querySelectorAll('.bxs-trash');
  DeleteBtns.forEach(btn => {
    btn.addEventListener('click', deleteProductFromCarts);
  });
  //CounButtons Events
  const plusBtns = document.querySelectorAll('.carts .count .bx-plus');
  plusBtns.forEach((btn, i) =>
    btn.addEventListener('click', () => {
      carts[i].count += 1;
      localStorage.setItem('carts', JSON.stringify(carts));
      cartsRender();
    })
  );
  const minusBtns = document.querySelectorAll('.carts .count .bx-minus');
  minusBtns.forEach((btn, i) =>
    btn.addEventListener('click', () => {
      carts[i].count -= 1;
      if (carts[i].count < 1) {
        carts[i].count = 1;
      }
      localStorage.setItem('carts', JSON.stringify(carts));
      cartsRender();
    })
  );
  //Counts & Prices
  let totalCount = 0;
  let totalPrice = 0;
  const eachProductPrice = carts.map(item => Number(item.price));
  const eachProductCount = carts.map(item => item.count);

  if (carts.length > 0) {
    carts
      .map(item => item.count)
      .reduce((total, next) => {
        total += next;
        totalCount = total;
        return totalCount;
      }, 0);

    for (let i = 0; i < carts.length; i++) {
      totalPrice += eachProductPrice[i] * eachProductCount[i];
    }
  }

  // console.log(eachProductPrice, eachProductCount);
  const iconCart = document.querySelector('nav ul li.carts span');
  const footerCart = document.querySelector('.carts footer');
  iconCart.textContent = totalCount;
  footerCart.innerHTML = `<p>Total Count: <span>${totalCount}</span> / Price: $<span>${totalPrice}</span></p>`;
}
function deleteProductFromCarts() {
  const id = this.parentNode.parentNode.getAttribute('id');
  carts.splice(id, 1);
  localStorage.setItem('carts', JSON.stringify(carts));
  cartsRender();
}

//NAV
document.querySelectorAll('nav ul li').forEach(btn => {
  btn.addEventListener('click', e => {
    const productsPage = document.querySelector('.content .products');
    const cartsPage = document.querySelector('.content .carts');
    if (e.currentTarget.classList.contains('carts')) {
      productsPage.classList.add('hide');
      cartsPage.classList.remove('hide');
    }
    if (e.currentTarget.classList.contains('products')) {
      cartsPage.classList.add('hide');
      productsPage.classList.remove('hide');
    }
  });
});
cartsRender();
productRender();
