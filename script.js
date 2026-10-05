const cards=[...document.querySelectorAll('.product-card')];
const filters=[...document.querySelectorAll('[data-filter]')];
const count=document.getElementById('visibleCount');
function setFilter(filter){
  cards.forEach(c=>c.hidden=filter!=='ALL' && c.dataset.category!==filter);
  document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===filter));
  count.textContent=cards.filter(c=>!c.hidden).length;
  document.getElementById('shop').scrollIntoView({behavior:'smooth',block:'start'});
}
filters.forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));
const bag=[];
const bagPanel=document.getElementById('bagPanel');
const bagCount=document.getElementById('bagCount');
const bagItems=document.getElementById('bagItems');
function renderBag(){
  bagCount.textContent=bag.length;
  bagItems.innerHTML=bag.length?bag.map((x,i)=>`<div class="bag-row"><span>${x}</span><button onclick="removeBag(${i})">Remove</button></div>`).join(''):'<p>Your bag is empty.</p>';
}
window.removeBag=i=>{bag.splice(i,1);renderBag()};
document.querySelectorAll('.bag-btn').forEach(b=>b.addEventListener('click',()=>{
  bag.push(b.dataset.product);renderBag();
  const t=document.getElementById('toast');t.textContent='Added to your LUMIÉA bag ✦';t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1400);
}));
document.getElementById('bagToggle').onclick=()=>bagPanel.classList.add('open');
document.getElementById('closeBag').onclick=()=>bagPanel.classList.remove('open');
document.getElementById('checkoutBtn').onclick=()=>alert('Checkout is not connected yet. Payment setup comes next.');
document.querySelectorAll('.product-image').forEach(btn=>btn.addEventListener('click',()=>{
  const img=btn.querySelector('img');document.getElementById('lightboxImg').src=img.src;document.getElementById('lightboxImg').alt=img.alt;document.getElementById('lightbox').classList.add('open');
}));
document.getElementById('closeLightbox').onclick=()=>document.getElementById('lightbox').classList.remove('open');
document.getElementById('lightbox').addEventListener('click',e=>{if(e.target.id==='lightbox')e.currentTarget.classList.remove('open')});
renderBag();
