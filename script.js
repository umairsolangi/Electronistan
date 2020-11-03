
let  product = document.getElementById('product')

let headervalue = window.location.pathname.split('.html').join('').split('/').join('')
if(headervalue==""){
  headervalue="index"
}

fetch('home.json')
.then(response => response.json())
.then(function(json){
  json.forEach(element => {
    if(element.subCategory == headervalue ){
    product.innerHTML = product.innerHTML + `
    <div class="card" style="width: 30rem;">
            <img src="${element.imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title" style=" font-weight: bold; font-size:30px;">${element.price}</h5>
                <p class="card-text">${element.name}</p>
                <p class="card-text">${element.content}</p>
                <button class="btn " style="margin-left:70px; background-color: #039ee6 !important;" onclick="addToCartBtn(this)">${element.action}</button>
            </div>
        </div>
    `
  }
  });
});

function counter(){
  let cartCounter = document.getElementById("cart-counter");
  cartCounter.innerText = localStorage.length

}

counter()
function addToCartBtn(button){
  let price = button.parentElement.children[0].innerText
  let name =button.parentElement.children[1].innerText
  let disc =button.parentElement.children[2].innerText
  let src = button.parentElement.parentElement.children[0].src
  // for increament in cart
  




  let obj = {
    "name":name,
    "price":price,
    "disc":disc,
    "src":src,
    "quantity":1,
  }
  localStorage.setItem(name,JSON.stringify(obj))
  counter()
}

let cartData = document.getElementById('cartData')
let jsonData
function updateCart(){
  cartData.innerHTML = ""
for (let i =0;i<localStorage.length;i++){
  jsonData =  JSON.parse(localStorage.getItem(localStorage.key(i)))
  cartData.innerHTML = cartData.innerHTML+`
  <tr>
  <td><img src="${jsonData.src}" style="width: 100px; " alt=""></td>
  <td scope="col"></td>
  <td scope="col" colspan="2">${jsonData.name}</td>
  <td scope="col" colspan="2">${jsonData.disc}</td>
  <td scope="col" colspan="2"><button onclick = "plusBtn(this)">+</button> <span> ${jsonData.quantity}</span><button onclick = "minusBtn(this)">-</button></td>
  <td scope="col" colspan="2" class="priceClass">${jsonData.price.split('PKR').join('')} PKR</td>
  <td scope="col" colspan="2"><button onclick ="deleteItem(this)">Delete</button></td>
  </tr>
  `
}}
updateCart()
let subTot = 0

function plusBtn(button){
    let quantityCount =  button.parentElement.children[1]
    let price = button.parentElement.parentElement.children[5]
    let oldQuan = parseInt(quantityCount.innerText)

     if(quantityCount.innerText!="8"){
      quantityCount.innerText=parseInt(quantityCount.innerText)+1    
      let oldtot = parseInt(price.innerText)/oldQuan
      price.innerText = oldtot*parseInt(quantityCount.innerText) + " PKR"
     }

     let name  = button.parentElement.parentElement.children[2].innerText
     let oldStorageData =JSON.parse(localStorage.getItem(name))

     oldStorageData.price = price.innerText
     oldStorageData.quantity = quantityCount.innerText

     localStorage.setItem(name,JSON.stringify(oldStorageData))

     subTotalvalue()
    }
    subTotalvalue()
    
function subTotalvalue(){
      let priceClass  = document.querySelectorAll('.priceClass')
    subTot=0
    priceClass.forEach(element => {
     subTot = subTot+parseInt(element.innerText.split('PKR').join(''))+200
  });
  let grandTotal = document.querySelector('.grandTotal')
    grandTotal.innerText = "Rs ."+subTot
}

function minusBtn(button){
  let quantityCount =  button.parentElement.children[1]
  let price = button.parentElement.parentElement.children[5]
  let oldQuan = parseInt(quantityCount.innerText)

     if(quantityCount.innerText!="1"){
      quantityCount.innerText=parseInt(quantityCount.innerText)-1
      let oldtot = parseInt(price.innerText)/oldQuan
      price.innerText = oldtot*parseInt(quantityCount.innerText) + " PKR"
     }

     let name  = button.parentElement.parentElement.children[2].innerText
     let oldStorageData =JSON.parse(localStorage.getItem(name))
     

     oldStorageData.price = price.innerText
     oldStorageData.quantity = quantityCount.innerText

     localStorage.setItem(name,JSON.stringify(oldStorageData))

     subTotalvalue()

}


// For Deleting Items
function deleteItem(button){
  let prodId = button.parentElement.parentElement.children[2].innerText
  localStorage.removeItem(prodId)
  counter()
  updateCart()
  subTotalvalue()
}