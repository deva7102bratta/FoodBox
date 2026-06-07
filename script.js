// ─── CART STATE ───
let cart = [];
let slideIdx = 0;

function toggleCart(){
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

function addToCart(btn, name, price, emoji){
  const priceNum = parseInt(price.replace(/[₹,]/g,''));
  const existing = cart.find(i=>i.name===name);
  if(existing){ existing.qty++; }
  else{ cart.push({name,price,priceNum,emoji,qty:1}); }
  renderCart();
  btn.textContent = '✅ Added!';
  btn.classList.add('added');
  setTimeout(()=>{ btn.textContent='🛒 Add to Cart'; btn.classList.remove('added'); },1500);
  showToast(`✅ ${name} added to cart!`);
}

function renderCart(){
  const el = document.getElementById('cartItems');
  const total = cart.reduce((s,i)=>s+i.priceNum*i.qty,0);
  const count = cart.reduce((s,i)=>s+i.qty,0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartItemCount').textContent = count;
  document.getElementById('cartTotal').textContent = '₹'+total.toLocaleString('en-IN');
  const need = 499 - total;
  document.getElementById('freeDeliveryNote').textContent = need > 0
    ? `Add ₹${need} more for FREE delivery 🚀`
    : '🎉 You qualify for FREE delivery!';
  if(!cart.length){
    el.innerHTML=`<div class="cart-empty"><div class="cart-empty-icon">🛒</div><div style="font-weight:600;margin-bottom:6px">Your cart is empty</div><div style="font-size:0.85rem;color:var(--gray-400)">Add items to get started!</div></div>`;
    return;
  }
  el.innerHTML = cart.map((item,idx)=>`
    <div class="cart-item">
      <div class="ci-img">${item.emoji}</div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">${item.price}</div>
        <div class="ci-qty">
          <button class="qty-btn" onclick="changeQty(${idx},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${idx},1)">+</button>
        </div>
      </div>
      <button class="ci-remove" onclick="removeItem(${idx})">🗑</button>
    </div>
  `).join('');
}

function changeQty(idx,delta){
  cart[idx].qty += delta;
  if(cart[idx].qty <= 0) cart.splice(idx,1);
  renderCart();
}
function removeItem(idx){ cart.splice(idx,1); renderCart(); }

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2500);
}

function toggleWish(btn){
  btn.classList.toggle('active');
  btn.textContent = btn.classList.contains('active') ? '❤️' : '🤍';
  showToast(btn.classList.contains('active') ? '❤️ Added to Wishlist' : 'Removed from Wishlist');
}

// ─── CATEGORY FILTER ───
function filterCat(e, cat){
  e.preventDefault();
  document.querySelectorAll('.cat-item').forEach(c=>c.classList.remove('active'));
  e.currentTarget.classList.add('active');
  document.querySelectorAll('.pcard').forEach(p=>{
    p.style.display = (cat==='all'||p.dataset.cat===cat)?'block':'none';
  });
}

// ─── SLIDER ───
function changeSlide(dir){
  slideIdx = (slideIdx + dir + 3) % 3;
  updateSlider();
}
function goSlide(i){ slideIdx = i; updateSlider(); }
function updateSlider(){
  document.getElementById('slides').style.transform=`translateX(-${slideIdx*100}%)`;
  document.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('active',i===slideIdx));
}
setInterval(()=>changeSlide(1), 5000);

// ─── COUNTDOWN TIMER ───
let secs = 2*3600+47*60+33;
setInterval(()=>{
  secs = Math.max(0,secs-1);
  const h=Math.floor(secs/3600), m=Math.floor((secs%3600)/60), s=secs%60;
  document.getElementById('th').textContent=String(h).padStart(2,'0');
  document.getElementById('tm').textContent=String(m).padStart(2,'0');
  document.getElementById('ts').textContent=String(s).padStart(2,'0');
},1000);

// ─── SCROLL ANIMATIONS ───
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity='1';
      e.target.style.transform='translateY(0)';
    }
  });
},{threshold:0.08});
document.querySelectorAll('.pcard,.mini-card,.promo-card,.coll-card,.trust-item').forEach((el,i)=>{
  el.style.opacity='0';
  el.style.transform='translateY(20px)';
  el.style.transition=`opacity .5s ease ${i*.05}s, transform .5s ease ${i*.05}s`;
  obs.observe(el);
});