var productList = [];

function createProduct() {
    var id = document.getElementById("")
    var name = document.getElementById("");
    var price = document.getElementById("");
    var img = document.getElementById("");
    var desc = document.getElementById("");

    var admin = new Admin(
        id,
        name,
        price,
        img,
        desc
    );

    var promise = axios({
        url: "https://639bfea842e3ad69272413bc.mockapi.io/phan2",
        method: "POST",
        // request body => POST, PUT, PATCH
        data: admin,
    }).then(function (res){
        alert("Thêm thành công!");
        fetchProductList();
    }).catch(function (err) {
        console.log(err);
    });

}

