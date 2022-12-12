var productList = [];
var card = [];


function fetchProductList() {
    // call api backend => productList
var promise = axios({
    url: "https://tinyurl.com/yy8thsk4",
    method: "GET",
});
// promise

promise.then(function (res) {
    console.log("success", res);
})
.catch(function (err) {
    console.log("error", err);
});

window.onload = function () {
    fetchProductList();
}
}