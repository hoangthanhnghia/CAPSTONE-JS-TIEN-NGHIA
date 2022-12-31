var productList = [];
var card = [];


function fetchProductList() {
  //   console.log("send request");

  var promise = axios({
    url: "https://639bfea842e3ad69272413bc.mockapi.io/products",
    method: "GET",
  });
  promise
    .then(function (res) {
      // console.log(res)
      productList = res.data;
      console.log("ok", productList);
      renderDevice();
    })
    .catch(function (err) {
      console.log("error", err);
    });
}

window.onload = function () {
  fetchProductList();
};

function genderChanged(obj) {
  var message = document.getElementById("show_message");
  var value = obj.value;
  if (value === "") {
    message.innerHTML = "Bạn chưa chọn loại sản phẩm";
    renderDevice();
  } else if (value === "iphone") {
    message.innerHTML = "Bạn đã chọn Iphone";
    var iphoneArr = [];
    for (var i = 0; i < productList.length; i++) {
      if (productList[i].type === "Iphone") {
        iphoneArr.push(productList[i])
        console.log(iphoneArr);
        renderDevice(iphoneArr);
      }
    }
  } else if (value === "samsung") {
    message.innerHTML = "Bạn đã chọn Samsung";
    samsungArr = [];
    for (var i = 0; i < productList.length; i++) {
      if (productList[i].type === "Samsung") {
        samsungArr.push(productList[i])
        console.log(samsungArr);
        renderDevice(samsungArr);
      }
    }
  }
}

// cần 2 danh sách của iphone và samsung để in ra màn hình khi type === '1 trong 2'
//
function renderProductsIphone() {
  var htmlIphone = "";
  for (var i = 0; i < productList.length; i++) {
    htmlIphone += `<div>${productList[i].type}</div>
        `;
  }
}

function renderProductsSamsung() {
  var htmlSamsung = "";
  for (var i = 0; i < productList.length; i++) {}
}

function renderDevice(data) {
  data = data || productList;
  console.log(data);
  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += `<div class="col-3 p-0">
    <div class="info">
      <div class="card" style="width: 18rem">
        <div class="card-body">
          <img 
            src= ${data[i].img}
            class="card-img-top"
            alt="Iphone14ProMaxBlack"
          />
          <h5 class="card-title mt-2">${data[i].name}</h5>
          <p class="card-text">
          ${data[i].desc}
          </p>
          <button onclick="showMyCart('${data[i].id}')" class="btn btn-primary">Add To Cart</button>
        </div> 
      </div>
    </div>
  </div>`;
  }
  document.getElementById("table").innerHTML = html;
}

// var btn = document.querySelectorAll(".btn");
// console.log(btn);
// btn.forEach(function (button, index) {
//   button.addEventListener("click", function (event) {
//     {
//       var btnItem = event.target;
//       var product = btnItem.parentElement;
//       var productImg = product.querySelector("img").src;
//       var productName = product.querySelector("h5").innerText;
//       console.log(productName);
//     }
//   });
// });
// function createCart() {
//   var product = new Product();
// }

function showMyCart(id) {
  
  info = "";
  var index = findById(id);
  var cartItem = productList[index];
  card.push(cartItem);
  console.log(card);
  for (i = 0; i < card.length; i++) {
    info += `<tbody>
      <div class="row mx-0 align-items-center" id="test">
        <div class="col">
          <img
            style="max-width: 100%"
            src=${card[i].img}
            alt=""
          />
        </div>
        <div class="col">
          <p>${card[i].name}</p>
        </div>
        <div class="col">
          <p>${card[i].price}</p>
        </div>
        <div class="col quantity">
      
      <input name="quantity" type="number" class="quantity_input" value="1">
     
    </div>
        <div class="col">
          <p class="precio-final"></p>
        </div>
        <div class="col" style="text-align: center">
          <button onclick="deleteCart(${card[i].index})" class="btn btn-danger">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
      <hr style="width: 96%" />
    </tbody>`;
  }
  document.getElementById("bodyMyCart").innerHTML = info;
 
}

function findById(id) {
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].id === id) {
      return i;
    }
  }

  return -1;
}

function findByType(type) {
  var find = [];
  for (var i = 0; i < productList.length; i++){
    var iphone = productList[i].type;
    var samsung = productList[i].type;
    if (iphone === "Iphone"){
      find.push(productList[i])
    }else if (samsung === "Samsung"){
      find.push(productList[i])
    }
    renderDevice(find);

    // if (productList[i].type === type) {
    //   find.push
    // console.log(iphone);
      
      // return i;

    // }
  }

  return -1;
}
findByType("Iphone");

function deleteCart(index){
card.splice(index,1)
}

// function mapCartItem() {
//   for (var i = 0; i < productList.length; i++) {
//     var oldProduct = productList[i];
//     var newProduct = new Product(
//       oldProduct.id,
//       oldProduct.name,
//       oldProduct.price,
//       oldProduct.screen,
//       oldProduct.backCamera,
//       oldProduct.frontCamera,
//       oldProduct.img,
//       oldProduct.desc,
//       oldProduct.type,
//       this.quantity = this.quantity,
//       this.priceItem= function(){
//         return(oldProduct.price*this.quantity)
//       },
//       this.totalprice = function(){
//         return(this.priceItem()+=this.priceItem())
//       }

//     );
//     card.push(newProduct);
//   }
//   console.log(card);
//   return card;
// }

// function saveCart() {
//   var cartJson = JSON.stringify(card);
//   localStorage.setItem("cart", cartJson);
// }
// function getCart() {
//   var cartJson = localStorage.getItem("cart");
//   if (!cartJson) return [];
//   return JSON.parse(cartJson);
// }
// window.onload = function(){
//   var cartFromLocal = getCart()
//   card = mapCartItem(cartFromLocal)
//   showMyCart()
// }


