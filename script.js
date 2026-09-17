document.addEventListener("DOMContentLoaded",()=>{
const loader=document.getElementById("loader"),navbar=document.getElementById("navbar"),toggle=document.getElementById("menuToggle"),nav=document.getElementById("navMenu");
const links=document.querySelectorAll(".nav-link"),typing=document.getElementById("typing"),slides=document.querySelectorAll(".bg-slide"),heroPhoto=document.getElementById("heroPhoto");
window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),500));
window.addEventListener("scroll",()=>navbar.classList.toggle("scrolled",scrollY>25));
toggle.addEventListener("click",()=>{nav.classList.toggle("open");const i=toggle.querySelector("i");i.classList.toggle("fa-bars");i.classList.toggle("fa-xmark")});
links.forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");const i=toggle.querySelector("i");i.classList.add("fa-bars");i.classList.remove("fa-xmark")}));

const roles=["NIT Student","Networking Enthusiast","CCTV Technician","Web Developer","Tech Creator"];
let ri=0,ci=0,del=false;
function type(){let r=roles[ri];if(!del){typing.textContent=r.slice(0,ci+1);ci++;if(ci===r.length){del=true;return setTimeout(type,1300)}}else{typing.textContent=r.slice(0,ci-1);ci--;if(ci===0){del=false;ri=(ri+1)%roles.length}}setTimeout(type,del?55:95)}type();

let si=0;
setInterval(()=>{si=(si+1)%slides.length;slides.forEach((s,i)=>s.classList.toggle("active",i===si));const bg=slides[si].style.backgroundImage,m=bg.match(/url\(['"]?(.*?)['"]?\)/);if(m)heroPhoto.src=m[1]},5000);

const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");obs.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll(".reveal").forEach(x=>obs.observe(x));

const sectionObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-35% 0px -55% 0px"});
document.querySelectorAll("section[id]").forEach(s=>sectionObs.observe(s));

let counted=false;
const stats=document.querySelector(".stats-wrap");
const countObs=new IntersectionObserver(es=>{if(es[0].isIntersecting&&!counted){counted=true;document.querySelectorAll("[data-count]").forEach(el=>{const target=+el.dataset.count;let n=0;const run=()=>{n+=Math.max(1,Math.ceil(target/45));if(n>=target){el.textContent=target;return}el.textContent=n;requestAnimationFrame(run)};run()});countObs.disconnect()}},{threshold:.25});
if(stats)countObs.observe(stats);
});
