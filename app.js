const products=[
 {name:"Sesame Seeds",category:"seeds",icon:"🌱",status:"in-stock",desc:"Natural white, hulled and premium sesame supply for export enquiries."},
 {name:"Raw Cashew Nuts",category:"nuts",icon:"🥜",status:"on-request",desc:"Nigerian raw cashew sourcing for bulk trade requirements."},
 {name:"Cocoa Beans",category:"nuts",icon:"🍫",status:"on-request",desc:"Cocoa sourcing for international buyers and processors."},
 {name:"Soybeans",category:"legumes",icon:"🫘",status:"in-stock",desc:"Bulk soybean sourcing subject to grade, season and availability."},
 {name:"Hibiscus Flower",category:"spices",icon:"🌺",status:"on-request",desc:"Dried hibiscus flower for beverage, ingredient and export markets."},
 {name:"Ginger",category:"spices",icon:"🫚",status:"on-request",desc:"Nigerian ginger supply for wholesale and export enquiries."},
 {name:"Pigeon Pea",category:"legumes",icon:"🫘",status:"on-request",desc:"Bulk sourcing subject to specification and current availability."},
 {name:"Peanut",category:"nuts",icon:"🥜",status:"on-request",desc:"Peanut sourcing for food and commodity trade requirements."},
 {name:"Tiger Nuts",category:"nuts",icon:"🌾",status:"on-request",desc:"Dried tiger nut sourcing for domestic and international buyers."},
 {name:"Chilli Pepper",category:"spices",icon:"🌶️",status:"on-request",desc:"Dried chilli sourcing according to buyer specification."},
 {name:"Maize",category:"seeds",icon:"🌽",status:"on-request",desc:"Bulk maize sourcing for commercial requirements."},
 {name:"Sorghum",category:"seeds",icon:"🌾",status:"on-request",desc:"Sorghum supply for food, feed and industrial buyers."}
];

const grid=document.getElementById("productGrid");
function renderProducts(){
 const q=(document.getElementById("searchInput").value||"").toLowerCase();
 const cat=document.getElementById("categoryFilter").value;
 const av=document.getElementById("availabilityFilter").value;
 const list=products.filter(p=>(!q||p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q))&&(cat==="all"||p.category===cat)&&(av==="all"||p.status===av));
 grid.innerHTML=list.length?list.map(p=>`<article class="productCard"><div class="productIcon">${p.icon}</div><span class="tag">${p.status==="in-stock"?"Available":"On request"}</span><h3>${p.name}</h3><p>${p.desc}</p><button data-product="${p.name}">Request specification →</button></article>`).join(""):`<div class="empty">No matching commodities. <a href="#contact">Send a sourcing request →</a></div>`;
 document.querySelectorAll("[data-product]").forEach(b=>b.onclick=()=>{document.querySelector('[name="type"]').value="International Buyer / RFQ";document.querySelector('[name="message"]').value=`Please provide current availability, specification and quotation details for ${b.dataset.product}.`;document.getElementById("contact").scrollIntoView();});
}
["searchInput","categoryFilter","availabilityFilter"].forEach(id=>document.getElementById(id).addEventListener("input",renderProducts));
renderProducts();

const menu=document.querySelector(".menuToggle"),nav=document.getElementById("nav");
menu.onclick=()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",open)};
document.querySelectorAll(".nav a").forEach(a=>a.onclick=()=>nav.classList.remove("open"));

const modal=document.getElementById("modal"),body=document.getElementById("modalBody");
const modalContent={
 incoterms:`<h2>Incoterms overview</h2><p><b>EXW:</b> Seller makes goods available at the agreed location; buyer generally takes on most onward costs and risks.</p><p><b>FOB:</b> Seller delivers goods on board the vessel at the agreed port; risk transfers according to the Incoterms rule.</p><p><b>CFR:</b> Seller pays cost and freight to the destination port; risk transfers earlier under the rule.</p><p><b>CIF:</b> Similar to CFR, with seller also arranging the required insurance under the rule.</p><p><small>Final commercial terms should be confirmed in the sales contract and applicable Incoterms® edition.</small></p>`,
 documents:`<h2>Common export-document checklist</h2><ul><li>Commercial invoice</li><li>Packing list</li><li>Certificate of origin, where required</li><li>Phytosanitary or other applicable health/quality certificates</li><li>Bill of lading or other transport document</li><li>Export/customs documentation</li><li>Any buyer- or destination-specific certificates</li></ul><p><small>Exact requirements depend on commodity, destination and transaction.</small></p>`,
 rfq:`<h2>What to include in an export RFQ</h2><ul><li>Commodity and exact grade/specification</li><li>Required quantity and shipment frequency</li><li>Packaging and labelling requirements</li><li>Destination country and preferred port</li><li>Preferred Incoterm</li><li>Target shipment window</li><li>Required documents or certifications</li></ul>`,
};
document.querySelectorAll("[data-modal]").forEach(b=>b.onclick=()=>{body.innerHTML=modalContent[b.dataset.modal];modal.classList.add("show");modal.setAttribute("aria-hidden","false")});
document.querySelector(".modalClose").onclick=()=>{modal.classList.remove("show");modal.setAttribute("aria-hidden","true")};
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};

document.getElementById("quickRfq").onclick=()=>{
 const c=document.getElementById("quickCommodity").value,q=document.getElementById("quickQuantity").value,d=document.getElementById("quickDestination").value,i=document.getElementById("quickIncoterm").value;
 document.querySelector('[name="type"]').value="International Buyer / RFQ";
 document.querySelector('[name="message"]').value=`RFQ: ${c}\nQuantity: ${q||"To be confirmed"}\nDestination: ${d||"To be confirmed"}\nPreferred Incoterm: ${i}`;
 document.getElementById("contact").scrollIntoView();
};

document.querySelectorAll("[data-enquiry]").forEach(b=>b.onclick=()=>{document.querySelector('[name="type"]').value=b.dataset.enquiry});

document.getElementById("contactForm").addEventListener("submit",e=>{
 e.preventDefault();
 const f=new FormData(e.target);
 const subject=encodeURIComponent(`${f.get("type")} — Agro-Commodities Connector Limited`);
 const bodyText=encodeURIComponent(`Name: ${f.get("name")}\nEmail: ${f.get("email")}\nCompany: ${f.get("company")}\nEnquiry: ${f.get("type")}\n\n${f.get("message")}`);
 const status=document.getElementById("formStatus");
 status.innerHTML=`Your enquiry has been prepared. <a href="mailto:?subject=${subject}&body=${bodyText}">Open your email app to send it.</a> Replace the empty recipient with the company's official business email when configured.`;
});

document.getElementById("currency").addEventListener("change",e=>localStorage.setItem("preferredCurrency",e.target.value));
const saved=localStorage.getItem("preferredCurrency");if(saved)document.getElementById("currency").value=saved;
