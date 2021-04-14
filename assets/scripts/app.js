class Product {
  // title = 'DEFAULT';
  // imageUrl;
  // description;
  // price;

    constructor(title, image, desc, price, stock) {
      this.title = title;
      this.imageUrl = image;
      this.description = desc;
      this.price = price;
      this.stock = stock;
    }
  }
  
  class ElementAttribute {
    constructor(attrName, attrValue) {
      this.name = attrName;
      this.value = attrValue;
    }
  }
  
  class Component {
    constructor(renderHookId) {
      this.hookId = renderHookId;
    }
  
    createRootElement(tag, cssClasses, attributes) {
      const rootElement = document.createElement(tag);
      if (cssClasses) {
        rootElement.className = cssClasses;
      }
      if (attributes && attributes.length > 0) {
        for (const attr of attributes) {
          rootElement.setAttribute(attr.name, attr.value);
        }
      }
      document.getElementById(this.hookId).append(rootElement);
      return rootElement;
    }
  }
  
  class ShoppingCart extends Component {
    items = [];
  
    set cartItems(value) {
      this.items = value;
      this.totalOutput.innerHTML = `<h2 class= "total-price">Total: GH₵ ${this.totalAmount.toFixed(
        2
      )}</h2>`;
    }
  
    get totalAmount() {
      const sum = this.items.reduce(
        (prevValue, curItem) => prevValue + curItem.price,
        0
      );
      return sum;
    }
  
    constructor(renderHookId) {
      super(renderHookId);
    }
  
    addProduct(product) {
      const updatedItems = [...this.items];
      updatedItems.push(product);
      this.cartItems = updatedItems;
    }

    removeProduct(product) {
      const updatedItems = [...this.items];
      if(updatedItems.includes(product)){
        updatedItems.pop(product);
        this.cartItems = updatedItems;
      }
      
    }
  
    render() {
      const cartEl = this.createRootElement('section', 'cart');
      cartEl.innerHTML = `
          <h2 class="total-price">Total: GH₵ ${0}</h2>
          <h2>Items in cart: <span class ="product-count">${0}</span></h2>
          <button>Order Now!</button>
      `;
      this.totalOutput = cartEl.querySelector('.total-price');
    }
  }
  
  class ProductItem extends Component {
    constructor(product, renderHookId) {
      super(renderHookId);
      this.product = product;
    }
  
    addToCart() {
      App.addProductToCart(this.product);
    }
  
    removeFromCart() {
      App.removeProductFromCart(this.product);
      
    }
  
    render() {
      const prodEl = this.createRootElement('li', 'product-item');
      prodEl.innerHTML = `
          <div>
            <img src="${this.product.imageUrl}" alt="${this.product.title}" >
            <div class="product-item__content">
              <h2>${this.product.title}</h2>
              <h3>Price: GH₵ ${this.product.price}</h3>
              <h3>Stock: ${this.product.stock}</h3>
              <p>${this.product.description}</p>
              <button class="add-button">Add to Cart</button>
              <button class="remove-button">Remove from Cart</button>
              <button class="btn_delete_icon">Delete</button>
            </div>
          </div>
        `;
        
      const addCartButton = prodEl.querySelector('.add-button');
      addCartButton.addEventListener('click', this.addToCart.bind(this));
      const deleteCartButton = prodEl.querySelector('.remove-button');
      deleteCartButton.addEventListener('click', this.removeFromCart.bind(this));
   
    }
  }
  
  class ProductList extends Component {
    products = [
      new Product(
        'Sofa',
        'https://www.boconcept.com/on/demandware.static/-/Sites-master-catalog/default/dwd633af54/images/700000/704909.jpg',
        'A very comfortable fire proof 2 seater sofa!',
        19.99,
        7
      ),
      new Product(
        'A Bed',
        'https://www.boconcept.com/on/demandware.static/-/Sites-master-catalog/default/dw0b805ada/images/1220000/1223156.jpg',
        'European king size bed - Arlington bed .',
        89.99,
        5
      ),
      new Product(
        'Dinning Table',
        'https://5.imimg.com/data5/MT/WL/MY-10668221/wooden-dining-table-500x500.jpg',
        'Solid wood brown designer 6 seater dinning table',
        19.99,
        15
      ),
      new Product(
        'curtains',
        'https://images-na.ssl-images-amazon.com/images/I/612b%2BnoxYlL._SL1200_.jpg',
        '2 piece plain solid door curtains .',
        89.99,
        10
      )
    ];
  
    constructor(renderHookId) {
      super(renderHookId);
    }
  
    render() {
      this.createRootElement('ul', 'product-list', [
        new ElementAttribute('id', 'prod-list')
      ]);
      for (const prod of this.products) {
        const productItem = new ProductItem(prod, 'prod-list');
        productItem.render();
      }
    }
  }
  
  class Shop {
    render() {
      this.cart = new ShoppingCart('app');
      this.cart.render();
      const productList = new ProductList('app');
      productList.render();
    }
  }
  
  class App {
    static cart;
  
    static init() {
      const shop = new Shop();
      shop.render();
      this.cart = shop.cart;
    }
  
    static addProductToCart(product) {
      this.cart.addProduct(product);
      const counterVal = document.querySelector('.product-count');
      let counterValInt = parseInt(counterVal.innerText.trim());
      counterValInt = counterValInt + 1;
      counterVal.innerText = counterValInt;
    }
  
    static removeProductFromCart(product) {
      this.cart.removeProduct(product);
      const counterVal = document.querySelector('.product-count');
      let counterValInt = parseInt(counterVal.innerText.trim());
      if(counterValInt > 0){
        counterValInt = counterValInt - 1;
        counterVal.innerText = counterValInt;
      }
    }
  }
  
  
  App.init();
  
  
  const itemsArray = document.querySelectorAll('.product-item');
  const deleteButton = document.querySelectorAll('.btn_delete_icon');
  
  function deleteItem(buttonsClass, childClass){
    for(var i = 0; i < buttonsClass.length; i++){
  
      (function(child){
        buttonsClass[i].addEventListener('click', function(e){
          child.parentNode.removeChild(child);
        },false);
      })(childClass[i]);
    }
    
  }
  
  deleteItem(deleteButton, itemsArray);
  
  