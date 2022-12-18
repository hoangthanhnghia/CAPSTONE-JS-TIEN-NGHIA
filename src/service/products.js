var productService = {
    createStudent: function (product) {
        return axios({
          url: "https://639bfea842e3ad69272413bc.mockapi.io/products",
          method: "POST",
          // request body => POST, PUT, PATCH
          data: product,
        });
      },

     fetchProductList: function () {
        // call api backend => productList
    return axios({
        url: "https://639bfea842e3ad69272413bc.mockapi.io/products",
        method: "GET",
    });
    // promise
    },
}














