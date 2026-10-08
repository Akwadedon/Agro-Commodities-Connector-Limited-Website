/* Agro-Commodities Connector Limited — website application */
const SUPABASE_URL = "https://lgmtosxtnkjyzjvqmpdq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_o2wljLuXwTl1EHe_8i_Rw_4CLs2PlA";
const BUSINESS_EMAIL = "agrocomconltd@gmail.com";
let supabaseClient = null;
if (window.supabase && SUPABASE_PUBLISHABLE_KEY && !SUPABASE_PUBLISHABLE_KEY.includes("PASTE")) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}

const products = [
  ["Sesame Seeds","seeds","in-stock","https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=900&q=82","Natural white, hulled and premium sesame supply for export enquiries."],
  ["Raw Cashew Nuts","nuts","on-request","https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=900&q=82","Nigerian raw cashew sourcing for bulk trade requirements."],
  ["Cocoa Beans","nuts","on-request","https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=900&q=82","Cocoa sourcing for international buyers and processors."],
  ["Soybeans","legumes","in-stock","https://images.unsplash.com/photo-1628773822503-930a7eaecf80?auto=format&fit=crop&w=900&q=82","Bulk soybean sourcing subject to grade, season and availability."],
  ["Pigeon Pea","legumes","on-request","https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=900&q=82","Bulk sourcing subject to specification and current availability."],
  ["Peanut","nuts","on-request","https://images.unsplash.com/photo-1567892737950-30c4db37cd89?auto=format&fit=crop&w=900&q=82","Peanut sourcing for food and commodity trade requirements."],
  ["Tiger Nuts","nuts","on-request","https://images.unsplash.com/photo-1599599810694-b5ac7d7e0e95?auto=format&fit=crop&w=900&q=82","Dried tiger nut sourcing for domestic and international buyers."],
  ["Hibiscus Flower","spices","on-request","https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=900&q=82","Dried hibiscus flower for beverage and export markets."],
  ["Chilli Pepper","spices","on-request","https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=900&q=82","Dried chilli sourcing according to buyer specification."],
  ["Ginger","spices","on-request","https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=82","Nigerian ginger supply for wholesale and export enquiries."],
  ["Maize","seeds","on-request","https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=900&q=82","Bulk maize sourcing for commercial requirements."],
  ["Sorghum","seeds","on-request","https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=900&q=82","Sorghum supply for food, feed and industrial buyers."],
  ["Millets","seeds","on-request","https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=82","Millet sourcing for food and commercial requirements."],
  ["Shea Nuts","nuts","on-request","https://images.unsplash.com/photo-1615485737651-9a8c0a0f5b1f?auto=format&fit=crop&w=900&q=82","Shea nut sourcing for processors and international buyers."],
  ["Wheat","seeds","on-request","https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=82","Wheat supply enquiries subject to grade, volume and availability."]
];

const prices = [
  ["Sesame Seeds","Quotation on request","Active sourcing"], ["Soybeans","Quotation on request","Active sourcing"], ["Raw Cashew Nuts","Quotation on request","Seasonal"], ["Hibiscus Flower","Quotation on request","On request"], ["Shea Nuts","Quotation on request","On request"], ["Maize","Quotation on request","On request"]
];

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const esc = (v) => String(v ?? "").replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));

function renderProducts(){
  const q = ($('#search')?.value || '').toLowerCase().trim();
  const c = $('#cat')?.value || 'all';
  const a = $('#avail')?.value || 'all';
  const list = products.filter(p => (!q || p[0].toLowerCase().includes(q) || p[4].toLowerCase().includes(q)) && (c === 'all' || p[1] === c) && (a === 'all' || p[2] === a));
  $('#products').innerHTML = list.length ? list.map(p => `
    <article class="product"><div class="photo"><img src="${esc(p[3])}" alt="${esc(p[0])}" loading="lazy"><span>${p[2] === 'in-stock' ? 'Available' : 'On request'}</span></div>
    <div class="productBody"><span class="tag">${esc(p[1])}</span><h3>${esc(p[0])}</h3><p>${esc(p[4])}</p><button data-product="${esc(p[0])}">Request specification →</button></div></article>`).join('') : '<div class="empty">No matching commodities. <a href="#contact">Send a sourcing request →</a></div>';
  $$('[data-product]').forEach(btn => btn.addEventListener('click', () => {
    $('select[name="type"]').value = 'International Buyer / RFQ';
    $('textarea[name="message"]').value = `Commodity: ${btn.dataset.product}\nPlease provide current availability, specification, packing options, minimum order quantity and quotation details.`;
    $('#contact').scrollIntoView({behavior:'smooth'});
  }));
}

function renderPrices(){
  $('#priceRows').innerHTML = prices.map(p => `<tr><td>${esc(p[0])}</td><td>${esc(p[1])}</td><td><span class="statusPill">${esc(p[2])}</span></td><td><a class="link" href="#contact" data-price="${esc(p[0])}">Request quote →</a></td></tr>`).join('');
  $$('[data-price]').forEach(b => b.addEventListener('click', () => {
    $('select[name="type"]').value = 'Commodity Availability';
    $('textarea[name="message"]').value = `Commodity: ${b.dataset.price}\nPlease provide the current available quantity, grade/specification, location, packing and quotation terms.`;
  }));
}

['#search','#cat','#avail'].forEach(s => $(s)?.addEventListener('input', renderProducts));
renderProducts(); renderPrices();

const menu = $('.menu');
menu?.addEventListener('click', () => { const open = $('#nav').classList.toggle('open'); menu.setAttribute('aria-expanded', open); });
$$('nav a').forEach(a => a.addEventListener('click', () => { $('#nav').classList.remove('open'); menu?.setAttribute('aria-expanded','false'); }));

const modal = $('#modal');
const modalContent = {
  incoterms: `<h2>Incoterms overview</h2><p><b>EXW:</b> The seller makes the goods available at the agreed location; the buyer normally carries most onward costs and risks.</p><p><b>FOB:</b> The seller delivers the goods on board the vessel at the agreed port. Common for sea freight.</p><p><b>CFR:</b> The seller pays cost and freight to the named destination port; risk transfers according to the Incoterms rule.</p><p><b>CIF:</b> Similar to CFR, with the seller also arranging the required insurance under the rule.</p><p><b>Important:</b> Agree the exact Incoterm and named place/port in the contract. This guide is educational, not legal advice.</p>`,
  rfq: `<h2>What to include in an export RFQ</h2><ul><li>Commodity and grade/specification</li><li>Quantity and shipment frequency</li><li>Packaging requirements</li><li>Destination country and port</li><li>Preferred Incoterm</li><li>Target shipment window</li><li>Required documents/certifications</li><li>Any inspection or payment requirements</li></ul>`,
  invoice: `<h2>Commercial invoice guide</h2><ul><li>Seller and buyer legal names and addresses</li><li>Invoice number and date</li><li>Commodity description and HS code where applicable</li><li>Quantity, unit price and total value</li><li>Currency and agreed Incoterm</li><li>Country of origin</li><li>Payment terms</li><li>Bank/shipping details where required</li></ul>`
};
$$('[data-modal]').forEach(b => b.addEventListener('click', () => { $('#modalBody').innerHTML = modalContent[b.dataset.modal]; modal.classList.add('show'); modal.setAttribute('aria-hidden','false'); }));
$('#close')?.addEventListener('click', closeModal); modal?.addEventListener('click', e => { if(e.target === modal) closeModal(); });
function closeModal(){modal?.classList.remove('show');modal?.setAttribute('aria-hidden','true');}

$('#futureVideo')?.addEventListener('click', () => { $('#modalBody').innerHTML = `<h2>Company video area ready</h2><p>Your future company video can be placed here without redesigning the website. Recommended content: company introduction, sourcing/warehouse footage, commodity quality inspection, packaging and shipment updates.</p><p><b>Next media step:</b> upload the video file to the configured media storage and connect it to this video area.</p>`; modal.classList.add('show'); });

function buildTerms(type){
  const isPayment = type === 'payment';
  const title = isPayment ? 'Payment Terms Generator' : 'Delivery Terms Generator';
  const fields = isPayment ? `<label>Payment method<select id="termMethod"><option>Bank Transfer</option><option>Letter of Credit (LC)</option><option>Documentary Collection</option><option>Other — subject to agreement</option></select></label><label>Payment timing<select id="termTiming"><option>Advance + balance before shipment</option><option>Partial advance + balance against shipping documents</option><option>100% against agreed shipping documents</option><option>To be negotiated</option></select></label>` : `<label>Incoterm<select id="termIncoterm"><option>EXW</option><option>FOB</option><option>CFR</option><option>CIF</option></select></label><label>Destination / port<input id="termDestination" placeholder="e.g. Lagos Port / destination port"></label>`;
  $('#modalBody').innerHTML = `<h2>${title}</h2><p>Use this as a starting commercial draft. Final terms must be agreed by the parties in the transaction contract.</p>${fields}<button class="btn primary" id="generateTerms">Generate Draft</button><div id="termsOutput"></div>`;
  modal.classList.add('show');
  $('#generateTerms').addEventListener('click', () => {
    let text = isPayment ? `Payment terms: ${$('#termMethod').value}; ${$('#termTiming').value}. Subject to buyer/seller agreement and applicable banking requirements.` : `Delivery terms: ${$('#termIncoterm').value}, named destination/place: ${$('#termDestination').value || 'To be confirmed'}. Shipment window and responsibilities to be confirmed in the contract.`;
    $('#termsOutput').innerHTML = `<div class="notice" style="margin-top:18px"><b>Draft:</b><br>${esc(text)}</div><button class="btn outline" id="copyTerms">Copy Draft</button>`;
    $('#copyTerms').addEventListener('click', async () => { await navigator.clipboard?.writeText(text); $('#copyTerms').textContent='Copied ✓'; });
  });
}
$('#paymentTool')?.addEventListener('click', () => buildTerms('payment'));
$('#deliveryTool')?.addEventListener('click', () => buildTerms('delivery'));

$('#downloadDocs')?.addEventListener('click', () => {
  const text = `AGRO-COMMODITIES CONNECTOR LIMITED\nEXPORT DOCUMENT CHECKLIST\n\nCommon documents may include:\n1. Commercial Invoice\n2. Packing List\n3. Certificate of Origin where required\n4. Phytosanitary Certificate or applicable quality/health certificate\n5. Bill of Lading / transport document\n6. Export/customs documentation\n7. Inspection or laboratory documents where required\n8. Buyer-specific certificates or declarations\n\nNote: Exact documents depend on commodity, destination, contract and applicable Nigerian/import-country requirements.\n\nCAC: 9717504\nNEPC: 004960\nEmail: ${BUSINESS_EMAIL}`;
  const blob = new Blob([text], {type:'text/plain;charset=utf-8'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='Agro-Commodities-Export-Document-Checklist.txt'; a.click(); URL.revokeObjectURL(url);
});

$('#quick')?.addEventListener('click', () => {
  $('select[name="type"]').value = 'International Buyer / RFQ';
  $('textarea[name="message"]').value = `RFQ: ${$('#qc').value}\nQuantity: ${$('#qq').value || 'To be confirmed'}\nDestination: ${$('#qd').value || 'To be confirmed'}\nPreferred Incoterm: ${$('#qi').value}\nPlease provide specification, availability, packing and quotation details.`;
  $('#contact').scrollIntoView({behavior:'smooth'});
});
$$('[data-enquiry]').forEach(b => b.addEventListener('click', () => { const select=$('select[name="type"]'); if(select) select.value=b.dataset.enquiry; }));
$('#buyerRegister')?.addEventListener('click', () => { openAuth(); setAuthTab('signup'); $('#signupRole').value='buyer'; });
$('#dashboardRFQ')?.addEventListener('click', () => { closeAuth(); $('#contact').scrollIntoView({behavior:'smooth'}); $('select[name="type"]').value='International Buyer / RFQ'; });
$('#dashboardSupplier')?.addEventListener('click', () => { closeAuth(); $('#contact').scrollIntoView({behavior:'smooth'}); $('select[name="type"]').value='Supplier Registration'; });

$('#form')?.addEventListener('submit', e => {
  e.preventDefault(); const f = new FormData(e.target);
  const subject = encodeURIComponent(`${f.get('type')} — Agro-Commodities Connector Limited`);
  const body = encodeURIComponent(`Name: ${f.get('name')}\nEmail: ${f.get('email')}\nCompany: ${f.get('company')}\nEnquiry: ${f.get('type')}\n\n${f.get('message')}`);
  $('#status').innerHTML = `Your enquiry is prepared. If your email app does not open automatically, <a href="mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}">tap here to send it →</a>`;
  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
});

if(localStorage.preferredCurrency) $('#currency').value=localStorage.preferredCurrency;
$('#currency')?.addEventListener('change', e => localStorage.preferredCurrency=e.target.value);
$('#year').textContent = new Date().getFullYear();

/* ---------------- Supabase Authentication ---------------- */
const authOverlay = $('#authOverlay');
function openAuth(){ authOverlay?.classList.add('show'); authOverlay?.setAttribute('aria-hidden','false'); }
function closeAuth(){ authOverlay?.classList.remove('show'); authOverlay?.setAttribute('aria-hidden','true'); }
$('#openAuth')?.addEventListener('click', openAuth); $('#openAuth2')?.addEventListener('click', openAuth); $('#authClose')?.addEventListener('click', closeAuth);
authOverlay?.addEventListener('click', e => { if(e.target === authOverlay) closeAuth(); });

function setAuthTab(tab){
  $$('[data-auth-tab]').forEach(b=>b.classList.toggle('active',b.dataset.authTab===tab));
  $('#loginForm').classList.toggle('hidden',tab!=='login'); $('#signupForm').classList.toggle('hidden',tab!=='signup'); $('#resetForm').classList.toggle('hidden',tab!=='reset'); $('#authStatus').textContent='';
}
$$('[data-auth-tab]').forEach(b=>b.addEventListener('click',()=>setAuthTab(b.dataset.authTab)));
function authMessage(msg,error=false){ const el=$('#authStatus'); el.textContent=msg; el.style.color=error?'#a23c35':'var(--green2)'; }

$('#loginForm')?.addEventListener('submit', async e => { e.preventDefault(); if(!supabaseClient){authMessage('Supabase is not available. Check the internet connection and script order.',true);return;} authMessage('Signing in…'); const {error}=await supabaseClient.auth.signInWithPassword({email:$('#loginEmail').value.trim(),password:$('#loginPassword').value}); if(error) authMessage(error.message,true); else authMessage('Login successful.'); });
$('#signupForm')?.addEventListener('submit', async e => { e.preventDefault(); if(!supabaseClient){authMessage('Supabase is not available. Check the internet connection and script order.',true);return;} authMessage('Creating account…'); const name=$('#signupName').value.trim(),email=$('#signupEmail').value.trim(),role=$('#signupRole').value; const {data,error}=await supabaseClient.auth.signUp({email,password:$('#signupPassword').value,options:{data:{full_name:name,account_type:role},emailRedirectTo:window.location.href}}); if(error){authMessage(error.message,true);return;} if(data.session){authMessage('Account created and signed in.');} else {authMessage('Account created. Check your email to confirm the account, then log in.');} });
$('#resetForm')?.addEventListener('submit', async e => { e.preventDefault(); if(!supabaseClient){authMessage('Supabase is not available.',true);return;} authMessage('Sending reset request…'); const {error}=await supabaseClient.auth.resetPasswordForEmail($('#resetEmail').value.trim(),{redirectTo:window.location.href}); if(error) authMessage(error.message,true); else authMessage('If the account exists, a password-reset email has been requested.'); });

async function refreshAuth(){
  if(!supabaseClient) return;
  const {data:{session}}=await supabaseClient.auth.getSession(); renderSession(session);
  supabaseClient.auth.onAuthStateChange((_event,newSession)=>renderSession(newSession));
}
function renderSession(session){
  if(session?.user){
    $('#authSignedOut').classList.add('hidden'); $('#authSignedIn').classList.remove('hidden');
    const u=session.user, role=u.user_metadata?.account_type || 'buyer';
    $('#userTitle').textContent=u.user_metadata?.full_name || 'Your Account'; $('#userEmail').textContent=u.email || '—'; $('#userRole').textContent=role==='supplier'?'Supplier':'International Buyer';
  } else { $('#authSignedOut').classList.remove('hidden'); $('#authSignedIn').classList.add('hidden'); setAuthTab('login'); }
}
$('#logout')?.addEventListener('click', async ()=>{ if(supabaseClient) await supabaseClient.auth.signOut(); authMessage(''); setAuthTab('login'); });

$('#mediaManager')?.addEventListener('click',()=>$('#mediaPanel').classList.toggle('hidden'));
$('#uploadMedia')?.addEventListener('click',async()=>{
  const file=$('#mediaFile').files[0]; if(!file){$('#mediaStatus').textContent='Choose an image or video first.';return;}
  if(!supabaseClient){$('#mediaStatus').textContent='Supabase is not available.';return;}
  const {data:{session}}=await supabaseClient.auth.getSession(); if(!session){$('#mediaStatus').textContent='Please log in first.';return;}
  $('#mediaStatus').textContent='Uploading…';
  const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,'-'); const path=`${session.user.id}/${Date.now()}-${safe}`;
  const {error}=await supabaseClient.storage.from('media').upload(path,file,{upsert:false,contentType:file.type});
  if(error){$('#mediaStatus').textContent=`Upload could not complete: ${error.message}. Create/configure the Supabase Storage bucket named "media" and its authenticated upload policy first.`;return;}
  $('#mediaStatus').textContent='Upload successful.';
});

refreshAuth();
