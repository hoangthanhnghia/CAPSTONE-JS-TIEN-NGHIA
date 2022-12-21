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
    var productList = [];
    // renderDevice();
  } else if (value === "iphone") {
    message.innerHTML = "Bạn đã chọn Iphone";
    arrayIphone = [];

    for (var i = 0; i < productList.length; i++) {
      if (productList[i].type === "Iphone") {
        // duyệt vòng for chọn type === iphone cộng dồn vào mảng

        // khi type === 'iphone' thì in ra danh sách iphone
        arrayIphone.push(productList[i]);
      }
    }
    console.log(arrayIphone);
    renderProductsIphone();

  } else if (value === "samsung") {
    message.innerHTML = "Bạn đã chọn Samsung";
    // renderProductsIphone();
    arraySamsung = [];

    for (var j = 0; j < productList.length; j++) {
      if (productList[j].type === "Samsung") {
        // duyệt vòng for chọn type === iphone cộng dồn vào mảng

        // khi type === 'iphone' thì in ra danh sách iphone
        // console.log("okela" ,productList[j].name);
        arraySamsung.push(productList[j]);
        
      }
      
      
    }
    console.log(arraySamsung);
    // duyệt vòng for chọn type === samsung cộng dồn vào mảng

    // khi type === 'samsung' thì in ra danh sách samsung
    // return renderProductsSamsung();
  }
}

// cần 2 danh sách của iphone và samsung để in ra màn hình khi type === '1 trong 2'
//
function renderProductsIphone(id) {
  // fetchProductList();
  // data = data || productList;

  var htmlIphone = "";
  for (var i = 0; i < productList.length; i++) {
    if(data[i].type === "iphone"){
      htmlIphone += `<div>${data[i]}</div>
        `;
    }
  }
}

function renderProductsSamsung() {
  var htmlSamsung = "";
  for (var i = 0; i < productList.length; i++) {}
}

function renderDevice() {
  // data = data || productList;
  // console.log(productList)
  var html = "";
  for (var i = 0; i < productList.length; i++) {
    html += `<div class="col-3 p-0">
    <div class="info">
      <div class="card" style="width: 18rem">
        <div class="card-body">
          <img
            src= ${productList[i].img}
            class="card-img-top"
            alt="Iphone14ProMaxBlack"
          />
          <h5 class="card-title mt-2">${productList[i].name}</h5>
          <p class="card-text">
          ${productList[i].desc}
          </p>
          <button onclick="shopMyCart(this)" class="btn btn-primary">Add To Cart</button>
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
function shopMyCart() {
  var myCart = "";
  for (var i = 0; i < productList.length; i++) {
    myCart += `<tbody>
    <div class="row mx-0 align-items-center">
      <div class="col">
        <img
          style="max-width: 100%"
          src=${productList[i].img}
          alt=""
        />
      </div>
      <div class="col">
        <p>${productList[i].name}</p>
      </div>
      <div class="col">
        <p>${productList[i].price}</p>
      </div>
      <div class="col main__nav">
        <button style="border-radius: 50%" class="btn-qty">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <span class="cantidad-elementos">0</span>
        <button style="border-radius: 50%" class="btn-qty">
          <i class="fa-solid fa-angle-right"></i>
        </button>
      </div>
      <div class="col">
        <p class="precio-final">12.000.000</p>
      </div>
      <div class="col" style="text-align: center">
        <button id="btnDelete" class="btn btn-danger">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
    <hr style="width: 96%" />
  </tbody>`;
  }
  document.getElementById("bodyMyCart").innerHTML = myCart;
}


var btn = document.querySelectorAll(".btn.btn-primary");
 console.log(btn)
btn.forEach(function (button, index) {
  button.addEventListener("click", function (event) {
    {
      var btnItem = event.target;
      var product = btnItem.parentElement;
   var productImg = product.querySelector("img").src
   var productName = product.querySelector("h5").innerText;
      console.log(productImg);
    }
  });
});