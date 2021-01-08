

/* var data = {    
    maximum: 99,
    products : [
     {
       "id": "532",
       "name": "Slicker Jacket",
       "description": "Wind and rain are no match for our organic bamboo slicker jacket for men and women. Triple stitched seams, zippered pockets, and a stay-tight hood are just a few features of our best-selling jacket.",
       "price": "125",
       "image_title": "slicker-jacket_lynda_29941",
       "image": "https://hplussport.com/wp-content/uploads/2016/12/slicker-jacket_LYNDA_29941.jpg"
     },
     {
       "id": "530",
       "name": "Bamboo Thermal Ski Coat",
       "description": "You'll be the most environmentally conscious skier on the slopes - and the most stylish - wearing our fitted bamboo thermal ski coat, made from organic bamboo with recycled plastic down filling.",
       "price": "99",
       "image": "https://hplussport.com/wp-content/uploads/2016/12/ski-coat_LYNDA_29940.jpg"
     },
     {
       "id": "516",
       "name": "Unisex Thermal Vest",
       "description": "Our thermal vest, made from organic bamboo with recycled plastic down filling, is a favorite of both men and women. You'll help the environment, and have a wear-easy piece for many occasions.",
       "price": "95",
       "image": "https://hplussport.com/wp-content/uploads/2016/12/unisex-thermal-vest_LYNDA_29944.jpg"
     }
    ]
   }; */
   

   Vue.component('price',{
      data:function(){
        return {
          prefix: '$',
          precision: 2,
        }
      },
      props:['value','prefix','precision','conversion'],
      template: '<span> {{ this.prefix + Number.parseFloat(this.value * this.conversion).toFixed(this.precision)}} </span>'
   });


   var app = new Vue({
    el: '#app',
    data: {
      inputeWidth:'60px',
      sliderStatus:true,
      labelArr:['font-wieght-bold', 'mr-2'],
      maximum: 99,
      products: null,
      cart:[]
    },
    filters:{
      currency: function (value) {
        return '$' + Number.parseFloat(value).toFixed(2);
      }
    },
    computed:{
      cartQty: function(){
        let qty = 0;
        for (key in this.cart){
          qty = qty + this.cart[key].qty
        }
        return qty;
      },

      cartTotal: function(){
        let sum = 0;
        for (key in this.cart){
          sum = sum + (this.cart[key].product.price * this.cart[key].qty);
        }
        return sum;
      },
      sliderState: function(){
        return this.sliderStatus ? 'd-flex' : 'd-none'
      }
    },
    methods: {
      addItem:function(product){
        //this.cart.push(product)
        var whichProduct;
        var existing = this.cart.filter(function(item, index){
          if (item.product.id == Number(product.id)){
            whichProduct = index;
            return true
          } else {
            return false;
          }
        });

        if (existing.length) {
          this.cart[whichProduct].qty++
        }else{
          this.cart.push({product: product, qty: 1})
        }

      },
      deleteItem: function(id){
        if(this.cart[id].qty>1){
          this.cart[id].qty--;
        }else{
          this.cart.splice(id, 1);
        }
      },
      beforeEnter: function(el){
        el.className='d-none'
      },
      enter: function(el){
        var delay=el.dataset.index * 100;
        setTimeout(function () {
          el.className='row d-flex mb-3 align-items-center animate__animated animate__fadeInRight'
        }, delay);
      },
      leave: function(el){
        var delay=el.dataset.index * 100;
        setTimeout(function () {
          el.className='row d-flex mb-3 align-items-center animate__animated animate__fadeOutRight'
        }, delay);
      }
    },
    mounted: function() {
      fetch('https://hplussport.com/api/products/order/price')
      .then(response => response.json())
      .then(data => {
        this.products = data;
      })
    }
   });
   