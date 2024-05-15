function handleAutoRemovePopup(){

    const cartList = document.querySelector('.app__popup--cart-list');


    function removeCartItems() {
    
        if (cartList.children.length > 0) {
            cartList.removeChild(cartList.children[0]);
        } else {
            clearInterval(interval);
        }
    }

    const interval = setInterval(removeCartItems, 3000);
}


function handleAddItemCartToPopup(item){

    const templateItemCart = ` <div class="app__popup--cart-list-item">

    <div class="app__popup--cart-list-item-image">
        <img src="${item.image}" alt="" class="">
    </div>
    <div class="app__popup--cart-list-item-content">
         <span>${item.title}</span>
         <span class="">${item.price}$ &times; ${item.quantity}</span>
    </div>

</div>`;
  const cartItemPopup = document.querySelector('.app__popup--cart-list');
  cartItemPopup.innerHTML += templateItemCart;
  handleAutoRemovePopup();

}

function handleUIIconCart(){
    const dataCarts = JSON.parse(localStorage.getItem('carts'));
    let sum = 0;
    if(dataCarts){
        sum = dataCarts.reduce((accumulator, item) => accumulator + item.quantity, 0);
    }
    document.getElementsByClassName('app__cart--icon-quantity')[0].innerText = sum;
}

function handleRemoveCart(id){
    const dataCarts = JSON.parse(localStorage.getItem('carts'));
    const newArray = dataCarts.filter((item) => item.id != id);
    localStorage.setItem('carts', JSON.stringify(newArray));


    handleUIIconCart();
    handleShowCartInPopup();
}



function handeAddToCart(itemCart){
   const dataCarts = JSON.parse(localStorage.getItem('carts'));
   if(!dataCarts){
       const carts = [itemCart];
       localStorage.setItem('carts', JSON.stringify(carts));
    //   console.log( localStorage.getItem('carts'))
   }else {
       const check = dataCarts.some(item => item.id == itemCart.id);
       if(check){
          const cartUpdate = dataCarts.map((item, key) => {
              if(item.id == itemCart.id){
                 return {
                    ...item,
                    quantity : item.quantity + 1
                 }
              }
              return item;
          })
          localStorage.setItem('carts', JSON.stringify(cartUpdate));
       }else {
          localStorage.setItem('carts', JSON.stringify([...dataCarts, itemCart]));
       }
   }
   handleUIIconCart();
   handleAddItemCartToPopup(itemCart);
   handleShowCartInPopup();
}
function getSubTotalCart(){
    const dataCarts = JSON.parse(localStorage.getItem('carts'));
    let sum = 0;
    if(dataCarts){
        sum = dataCarts.reduce((accumulator, item) => accumulator + (item.quantity * item.price), 0);
    }
    document.querySelector('.cart__total').innerText = sum;
}

document.addEventListener('DOMContentLoaded',async function () {
    await getProducts();
    const targetButtonCart = document.querySelectorAll('.addToCart');
    targetButtonCart.forEach(element => {
        element.addEventListener("click", function(event) {
           
            const dataImage = event.target.dataset.image;
            const dataId = Number(event.target.dataset.id);
            const dataTitle = event.target.dataset.title;
            const dataPrice = Number(event.target.dataset.price);

            handeAddToCart({
                id : dataId,
                image : dataImage,
                title : dataTitle,
                price : dataPrice,
                quantity : 1
            });
           
        });
    });
  
});

handleUIIconCart();

function updateQuantityItemCart(itemCart){
    if(itemCart.quantity >= 6 || itemCart.quantity <= 0){
        
        alert('The quantity of this item must be between 1 and 5');
        return true;
    }
   
    const dataCarts = JSON.parse(localStorage.getItem('carts'));
    const newArray = dataCarts.map((item) => {
        if(item.id == itemCart.id){
            return {
                ...item,
                quantity : itemCart.quantity
            }
        }
        return item;
    })
    localStorage.setItem('carts', JSON.stringify(newArray));

    handleUIIconCart();
    handleShowCartInPopup();
}


function handleClearCart(){

}


function handleShowCartInPopup(){
    const dataCarts = JSON.parse(localStorage.getItem('carts'));

    if(!dataCarts || dataCarts.length == 0){
        const templateCartEmpty = ' <img src="https://cdn-icons-png.freepik.com/512/11329/11329060.png" /> <button id="close-tab">Back to shop </button> ';
        
        document.querySelector('.cart__centent').innerHTML = templateCartEmpty;
        document.querySelector('.cart__footer').style.display = "none";
        handleUIIconCart();
        document.getElementById('close-tab').addEventListener('click',  function(){
         
            document.querySelector('.cart').classList.remove('show');
        })

        
        return true;
    }
    if(dataCarts){
        document.querySelector('.cart__footer').style.display = "block";
        const targetCartContent = document.querySelector('.cart__centent');
        let template = '';
        dataCarts.map((item) => {
            template = template + ` <div class="cart__item">
            <img src="${item.image}" alt="">
            <div>
              <h3>${item.title}</h3>
              <h3 class="price">$${item.price}</h3>
            </div>
            <div>
              <span data-id="${item.id}" data-quantity="${item.quantity}" class="app__increase">
                <svg data-id="${item.id}" data-quantity="${item.quantity}">
                  <use data-id="${item.id}" data-quantity="${item.quantity}" xlink:href="./images/sprite.svg#icon-angle-up"></use>
                </svg>
              </span>
              <p>${item.quantity}</p>
              <span data-id="${item.id}" data-quantity="${item.quantity}" class="app__decrease">
                <svg data-id="${item.id}" data-quantity="${item.quantity}">
                  <use data-id="${item.id}" data-quantity="${item.quantity}" xlink:href="./images/sprite.svg#icon-angle-down"></use>
                </svg>
              </span>
            </div>
  
            <div>
              <span data-id="${item.id}" class="remove__item">
                <svg data-id="${item.id}">
                  <use data-id="${item.id}" xlink:href="./images/sprite.svg#icon-trash"></use>
                </svg>
              </span>
            </div>
          </div> `;
        });
        targetCartContent.innerHTML = template;


    }
    getSubTotalCart();

   
    const targetRemoveButtonCart = document.querySelectorAll('.remove__item')
    

     targetRemoveButtonCart.forEach(element => {
        element.addEventListener("click", function(event) {
           const dataId = Number(event.target.dataset.id);
           handleRemoveCart(dataId);
        });
    });




    const targetIncreaseButtonCart = document.querySelectorAll('.app__increase')
    

    targetIncreaseButtonCart.forEach(element => {
        element.addEventListener("click", function(event) {
            
            const dataId = Number(event.target.dataset.id);
            const dataQuantity = Number(event.target.dataset.quantity);
            updateQuantityItemCart({
                id : dataId,
                quantity : dataQuantity + 1
            })
       
        });
    });


    const targetDecreaseButtonCart = document.querySelectorAll('.app__decrease')
    

    targetDecreaseButtonCart.forEach(element => {
        element.addEventListener("click", function(event) {
            
            const dataId = Number(event.target.dataset.id);
            const dataQuantity = Number(event.target.dataset.quantity);
            updateQuantityItemCart({
                id : dataId,
                quantity : dataQuantity - 1
            })
       
        });
    });


  
   


}



document.querySelector('.clear__cart').addEventListener('click', function(){
    localStorage.removeItem('carts');
    handleShowCartInPopup();
})

handleShowCartInPopup();