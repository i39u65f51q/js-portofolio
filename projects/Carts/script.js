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

  console.log(carts);
  localStorage.setItem('carts', JSON.stringify(carts));
  productRender();
}

productRender();
