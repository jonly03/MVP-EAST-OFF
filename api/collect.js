export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({ok:false});
  const allowed=["visit","cta_click","lead_submit"];
  const b=req.body||{};
  if(!allowed.includes(b.event)||typeof b.route!=="string") return res.status(400).json({ok:false});
  const row={
    event:b.event,route:b.route,path:b.path||"/",client_ts:b.ts||null,
    address:b.event==="lead_submit"?(b.address||null):null,
    bin_count:b.event==="lead_submit"?(b.binCount||null):null,
    contact:b.event==="lead_submit"?(b.contact||null):null,
    price_acceptance:b.event==="lead_submit"?(b.priceAcceptance||null):null
  };
  const url=process.env.SUPABASE_URL, key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!key) return res.status(503).json({ok:false,error:"collector_not_configured"});
  const r=await fetch(url+"/rest/v1/easton_events",{method:"POST",headers:{"Content-Type":"application/json","apikey":key,"Authorization":"Bearer "+key,"Prefer":"return=minimal"},body:JSON.stringify(row)});
  if(!r.ok) return res.status(502).json({ok:false});
  res.status(201).json({ok:true});
}