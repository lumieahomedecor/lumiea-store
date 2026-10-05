const products = [...document.querySelectorAll(".product-card")];
const filters = [...document.querySelectorAll(".filter")];
const bag = [];
const panel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");
const itemsEl = document.getElementById("cartItems");
const countEl = document.getElementById("bagCount");
const totalEl = document.getElementById("cartTotal");

function renderCart(){
  itemsEl.innerHTML = bag.length ? bag.map((x,i)=>`<div class="cart-item"><b>${x}</b><button onclick="removeItem(${i})">Remove</button></div>`).join("") : "<p>Your bag is empty.</p>";
  countEl.textContent = bag.length;
  totalEl.textContent = bag.length;
}
window.removeItem = i => { bag.splice(i,1); renderCart(); };

document.querySelectorAll(".add").forEach(btn=>{
  btn.addEventListener("click",()=>{
    bag.push(btn.dataset.name);
    renderCart();
    panel.classList.add("open"); overlay.classList.add("show");
  });
});
document.getElementById("bagBtn").onclick=()=>{panel.classList.add("open");overlay.classList.add("show")};
document.getElementById("closeBag").onclick=()=>{panel.classList.remove("open");overlay.classList.remove("show")};
overlay.onclick=()=>{panel.classList.remove("open");overlay.classList.remove("show")};
document.getElementById("checkout").onclick=()=>{
  alert("Checkout is ready for your WiPay payment-link setup. Add your verified payment links before accepting orders.");
};

filters.forEach(btn=>{
  btn.onclick=()=>{
    filters.forEach(x=>x.classList.remove("active")); btn.classList.add("active");
    const f=btn.dataset.filter;
    products.forEach(p=>p.style.display=(f==="ALL"||p.dataset.category===f)?"":"none");
  };
});
document.querySelectorAll("[data-jump]").forEach(btn=>{
  btn.onclick=()=>{
    const f=btn.dataset.jump;
    document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===f));
    products.forEach(p=>p.style.display=p.dataset.category===f?"":"none");
    document.getElementById("shop").scrollIntoView({behavior:"smooth"});
  };
});
renderCart();
