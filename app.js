async function getProducts(){
   
   const dataItem = await axios.get('db.json');
   
   let template = "";

   dataItem.data.products.map((item) => {
    template = template + `
        <div class="product">
        <div class="image__container">
          <img src="${item.image}" alt="" />
        </div>
        <div class="product__footer">
          <h1>${item.title}</h1>
          <div class="rating">
            <span>
              <svg>
                <use xlink:href="./images/sprite.svg#icon-star-full"></use>
              </svg>
            </span>
            <span>
              <svg>
                <use xlink:href="./images/sprite.svg#icon-star-full"></use>
              </svg>
            </span>
            <span>
              <svg>
                <use xlink:href="./images/sprite.svg#icon-star-full"></use>
              </svg>
            </span>
            <span>
              <svg>
                <use xlink:href="./images/sprite.svg#icon-star-full"></use>
              </svg>
            </span>
            <span>
              <svg>
                <use xlink:href="./images/sprite.svg#icon-star-empty"></use>
              </svg>
            </span>
          </div>
          <div class="bottom">
            <div class="btn__group">
              <a href="javascript:;" data-image="${item.image}" data-id="${item.id}" data-title="${item.title}" data-price="${item.price}" class="btn addToCart">Add to Cart</a>
              <a href="javascript:;" onclick="viewDetail('${item.title}', '${item.price}', '${item.image}', '${item.id}')" class="btn view view-click">View</a>
            </div>
            <div class="price">$${item.price}</div>
          </div>
        </div>
      </div> 
    
    `;
   });
   const targetProductElement = document.getElementsByClassName('product__center')[0] ;
   
   targetProductElement.innerHTML = template;



   
  //  const targetViewButtonProduct = document.querySelectorAll('.view-click');

  //   targetViewButtonProduct.forEach(element => {
  //     element.addEventListener("click", function(event) {
  //         alert(1)
  //         // const dataId = Number(event.target.dataset.id);
  //         // const dataQuantity = Number(event.target.dataset.quantity);
  //         // updateQuantityItemCart({
  //         //     id : dataId,
  //         //     quantity : dataQuantity - 1
  //         // })
    
  //     });
  //   });




}


document.querySelector('.app__cart--icon').addEventListener('click',  function(){
  
   document.querySelector('.cart').classList.add("show");
})

document.querySelector('.close__cart').addEventListener('click',  function(){
  document.querySelector('.cart').classList.remove('show');
})

//
function viewDetail(title, price, image, id){
  
  const targetViewProduct = document.querySelector('.app__view--product');
  targetViewProduct.style.display = "flex";
  targetViewProduct.innerHTML = ` <div class="app__view--product-container">
  <div class="app__view--product-container-left">
       <img src="${image}" alt="">
  </div>
  <div class="app__view--product-container-right">
      <span>
        ${title}
      </span>

      <span class="app__view--product-container-right-price">$${price}</span>

      <p>This is example about the description of this product</p>

      <button data-id="${id}" data-image="${image}" data-title="${title}" data-price="${price}" class="add-to-cart-detail" > Add to cart</button>

      <button class="add-to-cart-detail-close"> Close</button>
  </div>
</div>`;

   document.querySelector('.add-to-cart-detail-close').addEventListener('click', function(){
    targetViewProduct.style.display = "none";
   })

   document.querySelector('.add-to-cart-detail').addEventListener("click", function(event) {
           
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
    targetViewProduct.style.display = "none";
});
   

 }






