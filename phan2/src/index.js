var productList = [];
var mode = "create";

function submitForm() {
  if (mode === "create") createProduct();
  else if (mode === "update") updateProduct();
}

function createProduct() {
  if (!validateForm()) return;
  var id = document.getElementById("IdSP").value;
  var name = document.getElementById("TenSP").value;
  var price = +document.getElementById("GiaSP").value;
  var img = document.getElementById("HinhSP").value;
  var desc = document.getElementById("MoTa").value;

  var device = new Device(id, name, price, img, desc);

  //   productList.push(device)
  // renderDevice()
  var promise = axios({
    url: "https://639bfea842e3ad69272413bc.mockapi.io/phan2",
    method: "POST",
    // request body => POST, PUT, PATCH
    data: device,
  });
  promise
    .then(function (res) {
      console.log("Thêm thành công!");
      fetchProductList();
    })
    .catch(function (err) {
      console.log(err);
    });

  document.getElementById("form").reset();
}

function renderDevice(data) {
  data = data || productList;
  console.log(productList);
  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += ` <tr>
        <td>${data[i].id}</td>
        <td>${data[i].name}</td>
        <td>${data[i].price}</td>
        <td><img style="width: 30%;" src="${data[i].img}" alt=""></td>
        <td>${data[i].desc}</td>
        <td><button 
        onclick="getUpdateProduct('${data[i].id}')"  
        class="btn btn-info" 
        data-toggle="modal"
        data-target="#myModal">Sửa</button> 
        <button 
        onclick="deleteDevice('${data[i].id}')"
        class="btn btn-danger">Xóa</button> </td>
        
    </tr>`;
  }
  document.getElementById("tblDanhSachSP").innerHTML = html;
}
function fetchProductList() {
  productList = [];
  renderDevice();

  var promise = axios({
    url: "https://639bfea842e3ad69272413bc.mockapi.io/phan2",
    method: "GET",
  });
  // promise - PENDING - FULFILL - REJECT

  promise
    .then(function (res) {
      productList = mapProductList(res.data);
      renderDevice();
    })
    .catch(function (err) {
      console.log("error", err);
    });
}
function mapProductList(local) {
  var result = [];

  for (var i = 0; i < local.length; i++) {
    var oldDevice = local[i];
    var newDevice = new Device(
      oldDevice.id,
      oldDevice.name,
      oldDevice.price,
      oldDevice.img,
      oldDevice.desc
    );
    result.push(newDevice);
  }

  return result;
}

function saveProductList() {
  // chuyển studentList thành chuỗi JSON
  var productListJson = JSON.stringify(productList);
  localStorage.setItem("SL", productListJson);
}

window.onload = function () {
  fetchProductList(); // return promsise
};

// input: id => ouput: index
function findById(id) {
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].id === id) {
      return i;
    }
  }

  return -1;
}

// part 1: chon doi tuong muon cap nhat va hien len input
function getUpdateProduct(id) {
  var index = findById(id);
  // fetchProductList(id).then(function (res) {
  //   var product = res.data;

  // document.getElementById("IdSP").value = product.id;
  // document.getElementById("TenSP").value = product.name;
  // document.getElementById("GiaSP").value = product.price;
  // document.getElementById("HinhSP").value = product.img;
  // document.getElementById("MoTa").value = product.desc;

  // //đổi mode sang update
  // mode = "update";
  // document.getElementById("btnCreate").classList.add("btn-info");

  // // add button cancel để cancel update
  // if (document.getElementById("btnCancel")) return;

  var btnCancel = document.createElement("button");
  btnCancel.id = "btnCancel";
  btnCancel.innerHTML = "Huỷ";
  btnCancel.type = "button";
  btnCancel.classList.add("btn", "btn-secondary");
  btnCancel.onclick = cancelUpdate;
  document.getElementById("btnGroup").appendChild(btnCancel);

  if (index === -1) return alert("id không hợp lệ");
  var product = productList[index];
  document.getElementById("IdSP").value = product.id;
  document.getElementById("TenSP").value = product.name;
  document.getElementById("GiaSP").value = product.price;
  document.getElementById("HinhSP").value = product.img;
  document.getElementById("MoTa").value = product.desc;

  // doi mode sang update
  mode = "update";
  document.getElementById("btnCreate").innerHTML = "Lưu thay đổi";
  document.getElementById("btnCreate").classList.add("btn-info");

  // createProduct();
  // fetchProductList();
  // saveProductList();
}

function cancelUpdate() {
  mode = "create";
  document.getElementById("btnCreate").innerHTML = "Thêm san pham";
  document.getElementById("btnCreate").classList.remove("btn-info");

  var btnCancel = document.getElementById("btnCancel");
  btnCancel.remove();

  // reset form
  document.getElementById("form").reset();
}

//Part 2: Cho người dùng sửa trên form và nhấn nút cập nhật
function updateProduct() {
  var id = document.getElementById("IdSP").value;
  var name = document.getElementById("TenSP").value;
  var price = +document.getElementById("GiaSP").value;
  var img = document.getElementById("HinhSP").value;
  var desc = document.getElementById("MoTa").value;

  // var index = findById(id);
  var device = new Device(id, name, price, img, desc);

  var promise = axios({
    url: "https://639bfea842e3ad69272413bc.mockapi.io/phan2/" + device.id,
    method: "PUT",
    // request body => POST, PUT, PATCH
    data: device,
  });
  promise
    .then(function (res) {
      console.log("Thêm thành công!");
      // renderDevice();
      // createProduct();
      fetchProductList();
      cancelUpdate();
    })
    .catch(function (err) {
      console.log(err);
    });
}
function deleteDevice(id) {
  var promise = axios({
    url: "https://639bfea842e3ad69272413bc.mockapi.io/phan2/" + id,
    method: "DELETE",
  })
    .then(function (res) {
      console.log(res);
      fetchProductList();
    })
    .catch(function (err) {
      console.log(err);
    });
}

// --------validation------

// required

/**
 * val: string
 * config: {
 *      errorId: string
 * }
 */
function required(val, config) {
  if (val.length > 0) {
    document.getElementById(config.errorId).innerHTML = "";
    return true;
  }

  document.getElementById(config.errorId).innerHTML = "*Vui lòng nhập giá trị";
  return false;
}

// min-length vs max-length
/**
 * val: string
 * config: {
 *      errorId: string,
 *      min: number,
 *      max: number,
 * }
 */
function lenght(val, config) {
  if (val.length < config.min || val.length > config.max) {
    document.getElementById(
      config.errorId
    ).innerHTML = `*Độ dài phải từ ${config.min} đến ${config.max} kí tự`;
    return false;
  }
  document.getElementById(config.errorId).innerHTML = "";
  return true;
}

// pattern - regular expression
/**
 * val: string
 * config: {
 *      errorId: string,
 *      regexp: object
 * }
 */
function pattern(val, config) {
  if (config.regexp.test(val)) {
    document.getElementById(config.errorId).innerHTML = "";
    return true;
  }
  document.getElementById(config.errorId).innerHTML =
    "*Giá trị không đúng định dạng";
  return false;
}

function validateForm() {
  // var id = document.getElementById("IdSP").value;
  var name = document.getElementById("TenSP").value;
  var price = document.getElementById("GiaSP").value;
  var img = document.getElementById("HinhSP").value;
  var desc = document.getElementById("MoTa").value;

  var nameRegexp = /^[A-z\s]+$/g;
  var priceRegexp = /^\$?[\d,]+(\.\d*)?$/g;

  // nối các hàm kiểm tra của ô nameValid
  //   var idValid = required(id, { errorId: 'productIdError' }) &&
  //   length(id, {errorId: 'productIdError', min: 4, max: 6});

  var nameValid =
    required(name, { errorId: "nameError" }) &&
    pattern(name, { errorId: "nameError", regexp: nameRegexp });

  var priceValid =
    required(price, { errorId: "priceError" }) &&
    pattern(price, { errorId: "priceError", regexp: priceRegexp });

  var isFormValid = nameValid && priceValid;

  return isFormValid;
}
//   --------end validation------
