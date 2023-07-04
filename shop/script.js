let search = document.getElementById("item-search");
let users = JSON.parse(sessionStorage.getItem("loggedUser"));
//console.log("users",users);
let prof = document.getElementById('profile')
if(users ==null){
  alert("Please login first!!")
  window.location.href = '/login/'
}else{
  prof.textContent = users.fstName
}
// fetching data  -------------------------------------------------------

window.addEventListener("load", fetchData);
let products = [];
async function fetchData() {
  let endpoint = "https://fakestoreapi.com/products";
  try {
    let response = await fetch(endpoint);
    let data = await response.json();
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      let curItem = data[i];
      curItem.size = getRandomSize();
      curItem.color = getRandomColor();
    }
    products = data;
    console.log(data);
    renderData(data);
  } catch (e) {
    console.log("error fetching", e);
  }
}


let color = ["red", "blue", "coral", "purple", "green"];
function getRandomColor() {
  let x = Math.floor(Math.random() * 5);
  return color[x];
}

let size = ["M", "S", "L", "XL"];
function getRandomSize() {
  let x = Math.floor(Math.random() * 4);
  return size[x];
}

// // filter category -----------------------------------------------------------

let men = document.getElementById("men");
let women = document.getElementById("women");
let jwe = document.getElementById("jwelry");
let elec = document.getElementById("Electronics");

function renderData(data) {
  console.log("render data", data);
  men.innerHTML = "";
  women.innerHTML = "";
  jwe.innerHTML = "";
  elec.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    data.id = i;
    // console.log(data);
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
         <button type="button" id='addcart-${curCard.id}' class="add-cart" onclick="myFunction(${curCard.id})">Add to cart</button>
         <div id="addRemove-${curCard.id}" class="addToCart">
         <button type="button" onclick="incre(${curCard.id})" id="addmore-${curCard.id}" class="add" style="cursor: pointer;">Add More...</button>
         <button type="button" onclick="decre(${curCard.id})" id="remove-${curCard.id}" class= "remove" style="cursor: pointer;">Remove</button>
         <div id="qty-${curCard.id}" class = "qty">Qty: 1</div>
       </div>
         
   </div>`;
   //let curremove = document.getElementById(`addRemove-${curCard.id}`)
    if (curCard.category ==="men's clothing") {
      men.appendChild(card);
    }
    if (curCard.category === "women's clothing") {
      women.appendChild(card);
    }
    if (curCard.category ===  "jewelery") {
      jwe.appendChild(card);
    }
    if (curCard.category==="electronics") {
      elec.appendChild(card);
    } 
  }
}
function opt(getData, t) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      getData(...args);
    }, t);
  };
}

let getdata = (val) => {
  let data = products.filter((d) => {
    return d.category.includes(val);
  });

  if (data.length === 0) {
    men.innerText = 'No matches found';
  } else {
    men.innerHTML = "";
    women.innerHTML = "";
    jwe.innerHTML = "";
    elec.innerHTML = "";
    console.log('rendred',data);
    renderData(data);
  }
};

let getoptdata = opt(getdata, 300);

search.addEventListener('keyup', (e) => {
  getoptdata(e.target.value);
});

// --------------------------------filter sidebar       ----------------------------------------------------------------------

let filtereddata = [];

let appFilter = document.getElementById("filter-btn");

appFilter.addEventListener("click", filterApplied);

function filterApplied() {
  filtereddata = [];
  let colorinp = document.querySelectorAll(".color-sb");
  let sizeInp = document.querySelectorAll(".size");
  let prcInp = document.querySelectorAll(".prc");
  let rating = document.getElementById("myRange");
  men.innerHTML = "";
  women.innerHTML = "";
  jwe.innerHTML = "";
  elec.innerHTML = "";

  // -------------------------------------   color   ----------------------------------

  colorinp.forEach(function (checkbox) {
    console.log("inside color");
    if (checkbox.checked) {
      for (let i = 0; i < products.length; i++) {
        let curp = products[i];
        if (curp.color === checkbox.defaultValue) {
          filtereddata.push(curp);
        }
      }
      console.log(filtereddata);
      renderData(filtereddata);
    }
  });

  // size --------------------------------------------------

  sizeInp.forEach(function (checkbox) {
    if (checkbox.checked) {
      for (let i = 0; i < products.length; i++) {
        let curp = products[i];
        if (curp.size === checkbox.defaultValue) {
          filtereddata.push(curp);
        }
      }
      console.log(filtereddata);
      renderData(filtereddata);
    }
  });

  // ----------------------------------  rating   ---------------------------

  if (rating.value < 5) {
    for (let i = 0; i < products.length; i++) {
      let curp = products[i];
      if (curp.rating.rate < rating.value) {
        filtereddata.push(curp);
      }
    }
    renderData(filtereddata);
  }

  //  ----------------------------  price filter  --------------------------------
  prcInp.forEach(function (checkbox) {
    if (checkbox.checked) {
      let priceRange = checkbox.value.split("-");
      let minPrice = parseFloat(priceRange[0]);
      let maxPrice = parseFloat(priceRange[1]) || Infinity;

      for (let i = 0; i < products.length; i++) {
        let curp = products[i];
        if (curp.price >= minPrice && curp.price <= maxPrice) {
          filtereddata.push(curp);
        }
      }
    }
    console.log(filtereddata);
    renderData(filtereddata);
  });
}

let allBut = document.getElementById("all");
let MenBut = document.getElementById("mens");
let WomBut = document.getElementById("womens");
let JewBut = document.getElementById("jewel");
let ElectBut = document.getElementById("elect");

function filter(data, cate) {
  const filteredData = data.filter((item) => item.category === cate);
  renderData(filteredData);
}
function alldata() {
  const menData = products.filter((item) => item.category === "men's clothing");
  const womenData = products.filter(
    (item) => item.category === "women's clothing"
  );
  const jewelryData = products.filter((item) => item.category === "jewelery");
  const electronicsData = products.filter(
    (item) => item.category === "electronics"
  );

  const filteredData = [
    ...menData,
    ...womenData,
    ...jewelryData,
    ...electronicsData,
  ];
  renderData(filteredData);
}

allBut.addEventListener("click", () => alldata());

MenBut.addEventListener("click", () => filter(products, "men's clothing"));
WomBut.addEventListener("click", () => filter(products, "women's clothing"));
JewBut.addEventListener("click", () => filter(products, "jewelery"));
ElectBut.addEventListener("click", () => filter(products, "electronics"));

// heading   -------------------------------------------------------------------

let mnh = document.getElementById("mnh");
let wmh = document.getElementById("wmh");
let eth = document.getElementById("eth");
let jwh = document.getElementById("jwh");

allBut.addEventListener("click", () => {
  wmh.style.display = "block";
  mnh.style.display = "block";
  eth.style.display = "block";
  jwh.style.display = "block";
});
MenBut.addEventListener("click", () => {
  mnh.style.display = "block";
  wmh.style.display = "none";
  eth.style.display = "none";
  jwh.style.display = "none";
});
WomBut.addEventListener("click", () => {
  wmh.style.display = "block";
  mnh.style.display = "none";
  eth.style.display = "none";
  jwh.style.display = "none";
});
JewBut.addEventListener("click", () => {
  jwh.style.display = "block";
  wmh.style.display = "none";
  eth.style.display = "none";
  mnh.style.display = "none";
});
ElectBut.addEventListener("click", () => {
  eth.style.display = "block";
  wmh.style.display = "none";
  mnh.style.display = "none";
  jwh.style.display = "none";
});

// --------------------------------  add to cart ----------------------------------------------
let filtered =[]

function myFunction(id){
  let localstrg = JSON.parse(localStorage.getItem('cartprod'));
 // let curr = localstrg.find((e)=>e.id===id)
  let addremove = document.getElementById(`addRemove-${id}`);
  let addbtn = document.getElementById(`addcart-${id}`);
    addbtn.style.display = 'none';
    addremove.style.display = 'flex';
    let obj = products.find((d)=>d.id === id)
    obj.qtt = 1;
    filtered.push(obj)
    console.log(filtered);
    localStorage.setItem('cartprod', JSON.stringify(filtered))

}
function incre(id) {
  let localstrg = JSON.parse(localStorage.getItem('cartprod'));
  let qtyElement = document.getElementById(`qty-${id}`);
  let qty = parseInt(qtyElement.innerText.split(":")[1].trim());
  qty += 1;
  let find = localstrg.find((d)=>d.id ===id) 
  find.qtt = qty
  qtyElement.innerText = `Qty: ${ find.qtt}`;
  updateQuantity(id, qty);
}

function decre(id) {
  let localstrg = JSON.parse(localStorage.getItem('cartprod'));
  let qtyElement = document.getElementById(`qty-${id}`);
  let qty = parseInt(qtyElement.innerText.split(":")[1].trim());
  if (qty > 1) {
    qty -= 1;
    let find = localstrg.find((d)=>d.id ===id) 
    find.qtt = qty
    qtyElement.innerText = `Qty: ${find.qtt}`;
    updateQuantity(id, qty);
  }
}

function updateQuantity(id, quantity) {
  let index = filtered.findIndex((d) => d.id === id);
  if (index !== -1) {
    filtered[index].qtt = quantity;
    localStorage.setItem('cartprod', JSON.stringify(filtered));
  }
}


// Add JavaScript to toggle the sidebar visibility
document.getElementById("menu").addEventListener("click", function() {
  var sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("sidebar-visible");
});

