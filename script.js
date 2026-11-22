const products=[
{id:1,name:"The Signature Overshirt",type:"MEN / OUTERWEAR",price:3499,image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85",tag:"BESTSELLER"},
{id:2,name:"Essential Tailored Set",type:"WOMEN / EDIT",price:5299,image:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",tag:"NEW"},
{id:3,name:"Everyday Premium Knit",type:"UNISEX / KNITWEAR",price:2799,image:"https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=85",tag:"LIMITED"},
{id:4,name:"The Modern Classic",type:"MEN / ESSENTIALS",price:3199,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",tag:"EAGLE EDIT"}
];
let cart=[];
const money=n=>"₹"+n.toLocaleString("en-IN");
const productsEl=document.getElementById("products");
productsEl.innerHTML=products.map(p=>`<article class="product-card"><div class="product-image" style="background-image:url('${p.image}')"><span class="product-tag">${p.tag}</span></div><div class="product-info"><div><h3>${p.name}</h3><p>${p.type}</p></div><span class="price">${money(p.price)}</span></div><button class="add-btn" data-id="${p.id}">ADD TO BAG +</button></article>`).join("");
productsEl.addEventListener("click",e=>{const id=Number(e.target.dataset.id);if(id){const p=products.find(x=>x.id===id);cart.push(p);renderCart();toast("Added to your bag");}});
const drawer=document.getElementById("cartDrawer");
function openCart(){document.body.classList.add("cart-open")}
function closeCart(){document.body.classList.remove("cart-open")}
document.getElementById("cartOpen").onclick=openCart;
document.getElementById("cartClose").onclick=closeCart;
document.getElementById("backdrop").onclick=closeCart;
function renderCart(){
document.getElementById("cartCount").textContent=cart.length;
document.getElementById("subtotal").textContent=money(cart.reduce((s,p)=>s+p.price,0));
document.getElementById("cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row"><img src="${p.image}" alt=""><div><strong>${p.name}</strong><small>${money(p.price)}</small></div><button class="remove" data-remove="${i}">REMOVE</button></div>`).join(""):'<p class="empty">Your bag is currently empty.</p>';
}
document.getElementById("cartItems").addEventListener("click",e=>{const i=e.target.dataset.remove;if(i!==undefined){cart.splice(Number(i),1);renderCart();}});
const dialog=document.getElementById("checkoutDialog");
document.getElementById("checkoutBtn").onclick=()=>{if(!cart.length){toast("Your bag is empty");return;}dialog.showModal();};
document.getElementById("checkoutClose").onclick=()=>dialog.close();
document.getElementById("checkoutForm").addEventListener("submit",e=>{e.preventDefault();dialog.close();toast("Demo only — payment and order submission are not connected yet.");});
function toast(msg){const el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2600);}
document.getElementById("menuToggle").onclick=()=>document.getElementById("nav").classList.toggle("open");
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
