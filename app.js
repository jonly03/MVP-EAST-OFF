const route=new URLSearchParams(location.search).get("route")||"EASTON-001";
const ENDPOINT="/api/collect";

async function send(payload){
  try{
    const res=await fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload),keepalive:true});
    return res.ok;
  }catch{return false}
}

function event(name,data={}){
  const payload={event:name,route,ts:new Date().toISOString(),path:location.pathname,...data};
  console.log("[EASTON]",payload);
  try{
    const events=JSON.parse(localStorage.getItem("easton_events")||"[]");
    events.push(payload);
    localStorage.setItem("easton_events",JSON.stringify(events));
  }catch{}
  send(payload);
}

event("visit");
const btn=document.querySelector("#interestBtn"),
      formCard=document.querySelector("#formCard"),
      form=document.querySelector("#leadForm"),
      thanks=document.querySelector("#thanks");

btn.addEventListener("click",()=>{
  event("cta_click");
  formCard.classList.remove("hidden");
  formCard.scrollIntoView({behavior:"smooth"});
});

form.addEventListener("submit",async e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(form));
  const ok=await send({event:"lead_submit",route,ts:new Date().toISOString(),path:location.pathname,...data});
  if(!ok){
    alert("We couldn't save that yet. Please check your connection and try again.");
    return;
  }
  formCard.classList.add("hidden");
  thanks.classList.remove("hidden");
  thanks.scrollIntoView({behavior:"smooth"});
});