
var sliderActive = 0;

const dataSliders = [
    { 
      "id": 1, 
       "image" : "https://e0.365dm.com/23/04/2048x1152/skysports-harry-maguire-man-itd_6120687.jpg?20230413231347"
    },
    { 
      "id": 2, 
       "image" : "https://assets.goal.com/images/v3/blt30f37f3147915da3/257271a709473778c35bb259b3b3bf88f3a548fe.jpg?auto=webp&format=pjpg&width=3840&quality=60"
    },
    { 
      "id": 3, 
       "image" : "https://i.ebayimg.com/images/g/MXcAAOSwaqBgsl9N/s-l1200.webp"
    }
   
];

function getAllSliders(index){
    
    
    const sliderTarget = document.querySelector(".app__slider--image");
    sliderTarget.innerHTML = "";
    for (const key in dataSliders) {
     
        const img = document.createElement("img");
        img.className = key == index ? "" : "app__slider--image-hidden";
        img.src = dataSliders[key].image;
        img.alt = "";
        sliderTarget.appendChild(img);


    }
}
function showNavigateSlider(index){
    const navigateTarget = document.querySelector(".app__slider--navgate-content-list");
    navigateTarget.innerHTML = "";

   

    

    for (const key in dataSliders) {
     
        const li = document.createElement("li");
        li.className = key == index ? "app__slider--navgate-content-item app__slider--navgate-content-item-active" : "app__slider--navgate-content-item";
        li.setAttribute("data-id", key);
        navigateTarget.appendChild(li);

    }


    const navigateClickTarget = document.querySelectorAll('.app__slider--navgate-content-item');
    navigateClickTarget.forEach(element => {
        element.addEventListener("click", function(event) {
            const dataIdValue = event.target.dataset.id;
            sliderActive = dataIdValue;
            getAllSliders(dataIdValue);
            showNavigateSlider(dataIdValue);
        });
    });
}


getAllSliders(0);
showNavigateSlider(0);


setInterval(() => {
    const totalSlider = dataSliders.length;
    
    getAllSliders(sliderActive);
    showNavigateSlider(sliderActive);
    
    if(sliderActive == totalSlider - 1){
        sliderActive = 0;
    }else {
        sliderActive ++;
    }
}, 2500);


document.getElementsByClassName('app__slider--next')[0].addEventListener('click', function() {
    const targetLiActive =  document.getElementsByClassName('app__slider--navgate-content-item-active')[0];
    
    if(Number(targetLiActive.dataset.id) ==  dataSliders.length - 1 ){
        sliderActive =  0;
    }else {
        sliderActive = Number(targetLiActive.dataset.id) + 1;

    }
    getAllSliders(sliderActive);
    showNavigateSlider(sliderActive);
})

document.getElementsByClassName('app__slider--prev')[0].addEventListener('click', function() {
    const targetLiActive =  document.getElementsByClassName('app__slider--navgate-content-item-active')[0];
    
    if(Number(targetLiActive.dataset.id) == 0){
        sliderActive =  dataSliders.length - 1;
    }else {
        sliderActive = Number(targetLiActive.dataset.id) - 1;

    }
    getAllSliders(sliderActive);
    showNavigateSlider(sliderActive);
})