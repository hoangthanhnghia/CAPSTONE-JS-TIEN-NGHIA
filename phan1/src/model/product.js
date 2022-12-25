function Product(id, name, price, quantity, priceItem, calcularTotal){
    this.id = id;
    this.name = name;
    this.price = price;
this.img = img
    this.quantity = quantity;
    this.priceItem = function(){
        var priceY = this.quantity * this.price;
        return priceY;
    }
    
    this.calcularTotal = function () {
        var precios = document.querySelectorAll('.precio-final')
      
        //total
        var total = 0;
      
        precios.forEach((x) => {
          // console.log(Number(x.textContent))
      
         total += Number(x.textContent)
        })
      
        document.getElementById('total').textContent = total.toFixed(2);
      }
    
}
