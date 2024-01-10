const cartOpen=document.querySelector(".carts");
const productCenter=document.querySelector(".products-center");
const cartoContent=document.querySelector(".cart-content");
const itemAmount=document.querySelector(".Amount");
const noOfitem=document.querySelector(".cart-items");
const tempClass=document.querySelector(".tempclass");
const clearAll=document.querySelector(".clearitem");
let totalAm=0;
let prodQnty=0;
async function fetchProducts(){
    const response = await fetch('./products.json'); 
    const products = await response.json();
    // console.log(products.items);
    products.items.forEach((elem)=>{
        // console.log(elem.fields.image.fields.file.url);
        const article = document.createElement('article');
        article.classList.add('product');
        const imgsrc=elem.fields.image.fields.file.url;
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('img-container');
     const img = document.createElement('img');
     img.src=`${imgsrc}`;
     img.alt ='product';
     img.classList.add('product-img');
     const button = document.createElement('button');
     button.classList.add('bag-btn');
     button.setAttribute('data-id', '1');
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-shopping-cart');
    button.appendChild(icon);
    const buttonText = document.createTextNode('add to bag');
    button.appendChild(buttonText);
   imgContainer.appendChild(img);
   imgContainer.appendChild(button);
   const h3 = document.createElement('h3');
   h3.appendChild(document.createTextNode(`${elem.fields.title}`));
   const h4 = document.createElement('h4');
   h4.appendChild(document.createTextNode(`${elem.fields.price}`));
   article.appendChild(imgContainer);
   article.appendChild(h3);
   article.appendChild(h4);
  productCenter.appendChild(article);
    });
   const bagbtn=document.querySelectorAll('.bag-btn');
   bagbtn.forEach((elem)=>{
       elem.addEventListener("click",(e)=>{
            prodQnty++;
            noOfitem.textContent=`${prodQnty}`;
           createCart(e.target.parentElement);
       })
   })
}
document.addEventListener('DOMContentLoaded', function () {
    
    fetchProducts();
});

document.querySelector(".cart-btn").addEventListener("click",function(){
    cartOpen.classList.add('givenwidth');
    tempClass.classList.add('transparent');
});
document.querySelector(".cart-exit").addEventListener("click",function(){
    cartOpen.classList.remove('givenwidth');
    tempClass.classList.remove('transparent');
});

function createCart(parentElem){
    //  console.log(parentElem.parentElement);
    const element=parentElem.parentElement;
    const imgSrc = element.querySelector('.product-img');
    const title =  element.querySelector('h3');
    const price =  element.querySelector('h4');

    const cartContent = document.createElement('div');
cartContent.classList.add('container');

const imgAndInfo = document.createElement('div');
imgAndInfo.classList.add('imgAndinfo');

const cartImg = document.createElement('img');
cartImg.classList.add('cart-img');
cartImg.src = `${imgSrc.src}`;
cartImg.alt = 'no-img';

const cartInfo = document.createElement('div');
cartInfo.classList.add('cart-info');

const h3ProductName = document.createElement('h3');
h3ProductName.textContent = `${title.innerHTML}`;

const h4ProductPrice = document.createElement('h4');
h4ProductPrice.textContent = `${price.innerHTML}`;

const removeButton = document.createElement('button');
removeButton.classList.add('removalbtn');
removeButton.textContent = 'Remove';

cartInfo.appendChild(h3ProductName);
cartInfo.appendChild(h4ProductPrice);
cartInfo.appendChild(removeButton);

imgAndInfo.appendChild(cartImg);
imgAndInfo.appendChild(cartInfo);
const quantityDiv = document.createElement('div');
quantityDiv.classList.add('qnty');

const increaseQuantityIcon = document.createElement('i');
increaseQuantityIcon.classList.add('fa-solid', 'fa-chevron-up');

const productQuantity = document.createElement('span');
productQuantity.classList.add('prodqnty');
productQuantity.textContent = '1';
let productkiQnty=Number(productQuantity.innerHTML);

const decreaseQuantityIcon = document.createElement('i');
decreaseQuantityIcon.classList.add('fa-solid', 'fa-chevron-down');


quantityDiv.appendChild(increaseQuantityIcon);
quantityDiv.appendChild(productQuantity);
quantityDiv.appendChild(decreaseQuantityIcon);

cartContent.appendChild(imgAndInfo);
cartContent.appendChild(quantityDiv);
cartoContent.appendChild(cartContent);
totalAm=totalAm+Number(price.innerHTML);
itemAmount.textContent=`Your Total: $${totalAm.toFixed(2)}`;
removeButton.addEventListener("click",(e)=>{
     removecartItem(e.target.parentElement,price.innerHTML,productkiQnty);
})
increaseQuantityIcon.addEventListener("click",()=>{
    productkiQnty+=1;
    prodQnty+=1;
    noOfitem.textContent=`${prodQnty}`;
    productQuantity.textContent =`${productkiQnty}`;
    totalAm=totalAm+Number(price.innerHTML);
    itemAmount.textContent=`Your Total: $${totalAm.toFixed(2)}`;

});
decreaseQuantityIcon.addEventListener("click",()=>{
    if(productQuantity.innerHTML=='1')
    return;
    else
    {
        productkiQnty-=1;
        prodQnty-=1;
        noOfitem.textContent=`${prodQnty}`;
        productQuantity.textContent=`${productkiQnty}`;
        // product ke total amount after increment
        totalAm=totalAm-Number(price.innerHTML);
        itemAmount.textContent=`Your Total: $${totalAm.toFixed(2)}`;
    }
}
    );
}
function removecartItem(elem,temp,prodquan){
    //   console.log(elem.parentElement.parentElement);
      const cartItem=elem.parentElement.parentElement;
    //   console.log(elem.imgAndInfo.price)
      cartItem.remove();
      prodQnty=prodQnty-Number(prodquan);
      noOfitem.textContent=`${prodQnty}`;
    //   product ka total amount after decrement
      totalAm=totalAm-(Number(temp)*Number(prodquan));
      if(totalAm<1)
      {
        itemAmount.textContent=`Your Total: $${0}`; 
      }
      else
      {
        itemAmount.textContent=`Your Total: $${totalAm.toFixed(2)}`; 
      }
        
}
clearAll.addEventListener("click",()=>{
     cartoContent.remove();
     itemAmount.textContent=`Your Total: $${0}`;
     noOfitem.textContent=`${0}`;


});
document.querySelector(".shopbtn").addEventListener("click", function () {
    const productsSection = document.querySelector(".products");
    productsSection.scrollIntoView({ behavior: 'smooth' });
});