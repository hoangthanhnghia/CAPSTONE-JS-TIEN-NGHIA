var productList = [];

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
        <td>${data[i].img}</td>
        <td>${data[i].desc}</td>
        <td><button class="btn btn-primary">Sửa</button> <button class="btn btn-danger">Xóa</button> </td>
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
