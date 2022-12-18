var productList = [];
var card = [];


function fetchProductList(){
    console.log("send request");

    var promise = axios({
        url: "https://639bfea842e3ad69272413bc.mockapi.io/products",
        method: "GET",
    });

    function handleSuccess(res) {
        console.log("success", res);
    }

    function handleError(err) {
        console.log("error", err);
    }

    promise.then(handleSuccess);
    promise.catch(handleError);
}

window.onload = function () {
    fetchProductList();
};

function genderChanged(obj)
{
    var message = document.getElementById('show_message');
    var value = obj.value;
    if (value === ''){
        message.innerHTML = "Bạn chưa chọn loại sản phẩm";
    }
    else if (value === 'iphone'){
        message.innerHTML = "Bạn đã chọn Iphone";
        for(var i = 0; i < productList.length; i++){
            if(productList.type[i] === 'iphone'){
                // duyệt vòng for chọn type === iphone cộng dồn vào mảng


                // khi type === 'iphone' thì in ra danh sách iphone
                renderProductsIphone();
            }
        }
    }
    else if (value === 'samsung'){
        message.innerHTML = "Bạn đã chọn Samsung";
        // duyệt vòng for chọn type === samsung cộng dồn vào mảng
                

        // khi type === 'samsung' thì in ra danh sách samsung
        renderProductsSamsung();
    }
}

// cần 2 danh sách của iphone và samsung để in ra màn hình khi type === '1 trong 2'
// 
function renderProductsIphone() {
    var htmlIphone = '';
    for(var i = 0; i < productList.length; i++){
        htmlIphone += `<div>${productList[i].type}</div>
        `
    }
}

function renderProductsSamsung() {
    var htmlSamsung = '';
    for(var i = 0; i < productList.length; i++){

    }
}



