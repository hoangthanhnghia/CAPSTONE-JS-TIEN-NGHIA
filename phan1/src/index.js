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
  } else if (value === "iphone") {
    message.innerHTML = "Bạn đã chọn Iphone";
    for (var i = 0; i < productList.length; i++) {
      if (productList.type[i] === "iphone") {
        // duyệt vòng for chọn type === iphone cộng dồn vào mảng

        // khi type === 'iphone' thì in ra danh sách iphone
        renderProductsIphone();
      }
    }
  } else if (value === "samsung") {
    message.innerHTML = "Bạn đã chọn Samsung";
    // duyệt vòng for chọn type === samsung cộng dồn vào mảng

    // khi type === 'samsung' thì in ra danh sách samsung
    renderProductsSamsung();
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
          <button onclick="showMyCart('${data[i].id}'), qtyMyCart()" class="btn btn-primary">Add To Cart</button>
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

function showMyCart(id) {
  info = "";
  var index = findById(id);
  var cartItem = productList[index];
  card.push(cartItem);
  // console.log(card);
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
        <div class="col main__nav">
          <button style="border-radius: 50%" class="btn-qty">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <span class="cantidad-elementos" id="qty">1</span>
          <button onclick="upNumber()" style="border-radius: 50%" class="btn-qty">
            <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>
        <div class="col">
          <p class="precio-final"></p>
        </div>
        <div class="col" style="text-align: center">
          <button onclick="deleteItem('${card[i].id}')" class="btn btn-danger">
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

// function qtyMyCart(){
// var number = document.getElementById("qtyDevice").innerText
// number++
// }

function deleteItem(info) {
  var tbody= a.parentElement
  tbody.remove()
}
