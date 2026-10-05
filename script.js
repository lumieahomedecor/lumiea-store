const PRODUCTS=[
{id:1,name:"Bloom Lotus Pendant Lamp",price:49.99,emoji:"✿",desc:"A dreamy floral statement light for a cozy little corner.",link:"PASTE_YOUR_WIPAY_LINK_HERE"},
{id:2,name:"Happy Feet Character Planter",price:29.99,emoji:"🪴",desc:"A playful planter that gives shelves and desks instant personality.",link:"PASTE_YOUR_WIPAY_LINK_HERE"},
{id:3,name:"DreamGlow Illuminated Globe",price:39.99,emoji:"◉",desc:"A soft glowing globe designed to make your room feel magical.",link:"PASTE_YOUR_WIPAY_LINK_HERE"},
{id:4,name:"Duckie Desk Buddy",price:22.99,emoji:"🦆",desc:"A cute desk organizer for pens, brushes and tiny treasures.",link:"PASTE_YOUR_WIPAY_LINK_HERE"},
{id:5,name:"Bloom Petal Soap Dish",price:18.99,emoji:"❀",desc:"A sweet floral accent that makes the everyday feel prettier.",link:"PASTE_YOUR_WIPAY_LINK_HERE"}
];
let cart=JSON.parse(localStorage.getItem("lumiea_cart")||"[]");
const money=n=>"$"+n.toFixed(2);
function renderProducts(){document.getElementById("productGrid").innerHTML=PRODUCTS.map(p=>`<article class="product"><div class="product-img">${p.emoji}</div><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="price-row"><span class="price">${money(p.price)}</span><button class="add" onclick="add(${p.id})">Add to bag</button></div></div></article>`).join("")}
function save(){localStorage.setItem("lumiea_cart",JSON.stringify(cart));updateCount()}
function updateCount(){document.getElementById("bagCount").textContent=cart.reduce((s,i)=>s+i.qty,0)}
function add(id){let i=cart.find(x=>x.id===id);i?i.qty++:cart.push({id,qty:1});save();openCart()}
function remove(id){cart=cart.filter(x=>x.id!==id);save();renderCart()}
function renderCart(){let box=document.getElementById("cartItems");if(!cart.length){box.innerHTML='<p style="color:#7b706d;padding:30px 0">Your bag is waiting for something lovely.</p>'}else box.innerHTML=cart.map(i=>{let p=PRODUCTS.find(x=>x.id===i.id);return `<div class="cart-item"><div class="mini">${p.emoji}</div><div style="flex:1"><h4>${p.name}</h4><small>Qty ${i.qty} · ${money(p.price*i.qty)}</small></div><button class="add" onclick="remove(${p.id})">Remove</button></div>`}).join("");let total=cart.reduce((s,i)=>s+PRODUCTS.find(p=>p.id===i.id).price*i.qty,0);document.getElementById("cartTotal").textContent=money(total)}
function openCart(){renderCart();document.getElementById("cartOverlay").classList.remove("hidden")}
function closeCart(e){if(!e||e.target.id==="cartOverlay")document.getElementById("cartOverlay").classList.add("hidden")}
function checkout(){if(!cart.length)return;document.getElementById("cartOverlay").classList.add("hidden");let total=cart.reduce((s,i)=>s+PRODUCTS.find(p=>p.id===i.id).price*i.qty,0);document.getElementById("checkoutSummary").innerHTML=`<div class="summary"><b>${cart.reduce((s,i)=>s+i.qty,0)} item(s)</b> · Total <b>${money(total)}</b></div>`;document.getElementById("checkoutOverlay").classList.remove("hidden")}
function closeCheckout(){document.getElementById("checkoutOverlay").classList.add("hidden")}
function submitCheckout(e){e.preventDefault();if(cart.length!==1||cart[0].qty!==1){alert("For this starter version, use a single item per payment link. Multi-item checkout can be upgraded after the payment provider is connected.");return}let p=PRODUCTS.find(x=>x.id===cart[0].id);if(p.link.includes("PASTE_YOUR")){alert("Your store is ready, but the real WiPay payment link for this product still needs to be added in script.js.");return}window.location.href=p.link}
renderProducts();updateCount();