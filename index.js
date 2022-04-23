let box = document.querySelector("#ulList");
let box2 = document.querySelector("#ulList2");
const slides = document.querySelector(".slides");
const slideImg = document.querySelectorAll(".slideImg");
const navBtn = document.querySelector("#navigationDots");
const slideBox = document.querySelector(".slidebox");
const slideContainer = document.querySelector(".slideImg-container");

function fetchApi() {
  fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/product")
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);

      function creatbox(key) {
        const code = `
      <li class="box" id="${key + 1}"><a
      href ="PRODUCT.html?product_id=${key + 1}">
      <img id="preview" src="${data[key].preview}"> 
      <p id="productname">${data[key].name}  </p>
      <p id="brandname">${data[key].brand}</p>
      <p id="price">Price:- ${data[key].price}</p>
       </a>   </li>`;

        if (data[key].isAccessory === false) {
          box.innerHTML += code;
        } else {
          box2.innerHTML += code;
        }
      }

      for (let i = 0; i < data.length; i++) {
        creatbox(i);
      }
    });
}

fetchApi();

var counT = document.querySelector(".cartNo");
counT.innerHTML = window.localStorage.getItem("cartNo");

var counter = 1;                                                    
setInterval(function(){
  document.getElementById('radio' + counter).checked= true
  counter++
  if(counter > 4){
    counter = 1;
  }
},3500)


let bars = document.querySelector('.fa-bars')
let mininavbar = document.querySelector('.mininavbar')

bars.addEventListener('click' , function (){
   mininavbar.classList.toggle('active')
   bars.classList.toggle("fa-x")
  

})
//********************************/ PRODUCT PAGE JS ^^^^ /****************************** */

var displayId = window.location.search.split("=")[1];

fetch(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/` + displayId)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    var div = document.getElementById("divPd");
    function createSomething(name, ele, id, container) {
      var name = document.createElement(ele);
      name.id = id;
      container.append(name);
    }
    createSomething("left", "div", "leftsidePd", div);
    createSomething("right", "div", "rightsidePd", div);


    //////////////////////////////////////////////////
                  
    function func4Text(name, ele, id, Text, container) {
      var name = document.createElement(ele);
      name.id = id;
      name.innerText = Text;
      container.append(name);
    }

    func4Text("productname", "p", "head1Pd", data.name, rightsidePd);
    func4Text("brandname", "p", "brandPd", data.brand, rightsidePd);
    func4Text("price", "p", "pricePd", "Price : Rs", rightsidePd);
    func4Text("des", "p", "despPd", "Description", rightsidePd);
    func4Text("detail", "p", "descriptionPd", data.description, rightsidePd);
    func4Text("prorev", "p", "productrevPd", "Product Preview", rightsidePd);
    createSomething("box", "div", "previewboxPd", rightsidePd);

    var price = document.getElementById("pricePd");

    func4Text("greenText", "p", "pricecolor", +data.price, price);

    //////////////////////////////////////////////////

    function callfunc4img() {
      function func4img(name, ele, src, clname, id, container) {
        var name = document.createElement(ele);
        name.src = src;
        name.className = clname;
        name.id = id;
        container.append(name);
      }

      // var preview = document.getElementById("previewboxPd");
      for (var i = 0; i <5; i++) {
        func4img("per1","img",data.photos[i],"preimg","pre" + [i],previewboxPd
        );
      }
      func4img("leftimg","img",data.preview,"bigimg","leftboximg",leftsidePd
      );
      pre0.classList.add("onpreview");
    }
    callfunc4img();
    
    func4Text("btn", "button", "cartBtn", "Add to Cart", rightsidePd);
          

    function changeImage() {
      pre0.addEventListener("click", function () {
        leftboximg.src = data.photos[0];
      });
      pre1.addEventListener("click", function () {
        leftboximg.src = data.photos[1];
      });
      pre2.addEventListener("click", function () {
        leftboximg.src = data.photos[2];
      });
      pre3.addEventListener("click", function () {
        leftboximg.src = data.photos[3];
      });
      pre4.addEventListener("click", function () {
        leftboximg.src = data.photos[4];
      });
    }

    changeImage();


    var borderbox = document.getElementsByClassName("preimg");
for (var i = 0; i < borderbox.length; i++) {
  borderbox[i].onclick = function () {
    var borbox = borderbox[0];
    while (borbox) {
      if ((borbox.tagName = "img")) {
        borbox.classList.remove("onpreview");
      }
      borbox = borbox.nextSibling;
    }
    this.classList.add("onpreview");
  };
}

    ///***********************************///

    var btntocart = document.getElementById("cartBtn");
    var counT = document.querySelector(".cartNo");
    var myCartData = [];
    var cartValue;

    if (localStorage.getItem("cartNo") == null) {
      localStorage.setItem("cartNo", "0");
    } else {
      var cartquant = localStorage.getItem("cartNo");
      localStorage.setItem("cartNo", cartquant);
    }

      ///////////////////////////////////////////////////////////////////////


    btntocart.addEventListener("click", function () {
      console.log("clicked");
      var checkOutProductId = window.location.search.split("=")[1];
      var productfetchdetail =
        "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" +
        checkOutProductId;
      console.log(productfetchdetail);

      function getdata() {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function () {
          if (this.readyState === 4) {
            if (this.status === 200) {
              var productDetail = JSON.parse(this.responseText);
              console.log(productDetail);
              dataTOList(productDetail);
            }
          }
        };
        http.open("GET", productfetchdetail, true);
        http.send();
      }
      incearseCount();
      getdata();
    
    });
    //*******************************************//

    function incearseCount() {
      if (window.localStorage.getItem("cartNo") === null) {
        cartValue = 0;
      } else {
        cartValue = JSON.parse(window.localStorage.getItem("cartNo"));
        counT.innerHTML = cartValue;
      }
      var cartCurrentValue = cartValue + 1;
      window.localStorage.setItem("cartNo", cartCurrentValue);
      counT.innerHTML = window.localStorage.getItem("cartNo");
    }
    counT.innerHTML = window.localStorage.getItem("cartNo");

    //********************************************///

    function dataTOList(productDetail) {
      if (window.localStorage.getItem("products-list") === null) {
        myCartData = [];
      } else {
        myCartData = JSON.parse(window.localStorage.getItem("products-list"));
      }

      if (myCartData.length === 0) {
        var myObj = {
          id: productDetail.id,
          title: productDetail.name,
          count: 1,
          price: productDetail.price,
          preview: productDetail.preview,
        };
        myCartData.push(myObj);
      }
       else if (myCartData.length != 0) {
        var w = 0;
        for (var z = 0; z < myCartData.length; z++) {
          if (myCartData[z].id === productDetail.id) {
            myCartData[z].count = parseInt(myCartData[z].count) + 1;
            w += 1;
          }
        }

        if (w == 0) {
          var myObj = {
            id: productDetail.id,
            title: productDetail.name,
            count: 1,
            price: productDetail.price,
            preview: productDetail.preview,
          };
          myCartData.push(myObj);
        }
      }
      window.localStorage.setItem("products-list", JSON.stringify(myCartData));
    }

    ////////////////////////////////////////////////////////////////

  });



// ************UPDATE ADD TO CART**************** //

function orderBox(OBpreview, OBtitle, OBcount, OBprice, itemprice) {
  var checkoutitems = document.querySelector("#checkOutItems");
  var itemprice = OBprice * OBcount;
  let cartAdded = `<div id="AddedDiv">
    <img id="divPreview" src="${OBpreview}">
    <div id="detailsDiv">
    <p id="productNamecK">${OBtitle}</p>
    <span id ="into" >X ${OBcount}</span>
    <span id="amountspan"> Amount:- <b class="itemTotalAmount">${itemprice} </b></span>
    </div>
    </div>`;
  checkoutitems.innerHTML += cartAdded;
}

var myLocalProductDetails = JSON.parse(
  window.localStorage.getItem("products-list")
);
console.log(myLocalProductDetails);

var counT = document.querySelector(".cartNo");
counT.innerHTML = window.localStorage.getItem("cartNo");

var cost = 0;
var fcounter = 0;

for (var l = 0; l < myLocalProductDetails.length; l++) {
  orderBox(
    myLocalProductDetails[l].preview,
    myLocalProductDetails[l].title,
    myLocalProductDetails[l].count,
    myLocalProductDetails[l].price
  );
}


var checkOutDiv = document.querySelector("#checkOutDiv");
function orderTotal() {
  let totalbox = `
      <div id="totalAmountdiv">
      <h1> Total Amount</h1>
      <p id="showingAmount"> Total Amount :- Rs <span class="totalamount1"></span> </p>
      <a id= "orderHref" href="orderPlaced.html"> <button id="placeorderbtn"> Place order </button> </a>
      </div>
      `;
  checkOutDiv.innerHTML += totalbox;
}
orderTotal();

for (var m = 0; m < myLocalProductDetails.length; m++) {
  fcounter += myLocalProductDetails[m].count;
  cost +=
    Number(myLocalProductDetails[m].count) *
    Number(myLocalProductDetails[m].price);
  console.log(cost);
}

var totalamount = document.querySelector(".totalamount1");
totalamount.innerHTML = cost;

var itemscounter = document.querySelector("#itemscounter");
itemscounter.innerHTML = fcounter;

var placeorder = document.querySelector("#placeorderbtn");
placeorder.addEventListener("click", function () {
  counT.innerHTML = window.localStorage.setItem("cartNo", 0);
  var fcounter = 0;
  myLocalProductDetails = window.localStorage.removeItem("products-list");
})

