
let users = JSON.parse(sessionStorage.getItem("loggedUser"))
let prof = document.getElementById('profile')
if (users == null) {
  alert("Please login first!!")
  window.location.href = '/login/'
} else {
  prof.textContent = users.fstName
}

let gttl;

let cartitems = JSON.parse(localStorage.getItem('cartprod'));
console.log(cartitems);
let parent = document.getElementById('items-cont')
let cartitm = document.querySelector('.cartitems')
let ttlprc = document.querySelector('.ttlprc')
window.addEventListener("load", renderData(cartitems));


function renderData(data) {
  console.log("render data", data);
  let ttl = 0;
  for (let i = 0; i < data.length; i++) {
    data.id = i;
    let curCard = data[i];
    console.log();
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
     <img src=${curCard.image} alt="tshirt" />
     <div class="content">
         <div class="cont">
            <div class="prflx">
               <div class="prices">Price : ${curCard.price}</div>
               <div class="sub-div">
                   <div class="rating">${curCard.rating.rate}</div>
               </div>
            </div>
            <div class="prflx">
               <div style="color:${curCard.color}" class="color">Color : ${curCard.color}</div>
               <div class="sub-div">
                     <div class="size">${curCard.size}</div>
               </div>
               </div>
               <p class="titles">${curCard.title}</p>
           </div>
           <button type="button" id='addcart-${curCard.id}' class="add-cart" onclick="myFunction(${curCard.id})">Remove from Cart</button>
         </div>      
     </div>`;
    //  -------------------------------- check list   ---------------------------------
    let addeditem = document.createElement("div");
    addeditem.className = 'addedcartitem';
    addeditem.id = `del-${curCard.id}`
    let curprice = curCard.price * curCard.qtt;
    ttl += curprice;
    gttl = ttl
    addeditem.innerHTML = `
       <div class="qtt">${curCard.qtt}</div>
       <div class="cat">${curCard.category}</div>
       <div class="prc">${curprice}</div>
    `;
    ttlprc.textContent = parseInt(ttl);
    cartitm.appendChild(addeditem);

    parent.appendChild(card)
  }
}

function myFunction(ids) {
  let cartitems = JSON.parse(localStorage.getItem('cartprod'));
  const newArray = cartitems.filter(obj => obj.id !== ids);
  localStorage.setItem('cartprod', JSON.stringify(newArray));
  location.reload()
}


let check = document.getElementById('check-btn')
check.addEventListener('click', (e) => {
  var options = {
    key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
    amount: gttl * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  cartitems = []
  localStorage.setItem('cartprod', JSON.stringify(cartitems));
  renderData(cartitems)
  // location.reload()
  e.preventDefault()

})
document.getElementById("menu").addEventListener("click", function () {
  var sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("sidebar-visible");
});