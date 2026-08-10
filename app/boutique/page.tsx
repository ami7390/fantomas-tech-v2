"use client";
import {useMemo,useState} from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import {ArrowRight,BarChart3,Plus,Search,SlidersHorizontal,Zap} from "lucide-react";

const root="https://www.fantomas.tech";
export const products=[
 ["tripod-professional","TRIPOD PROFESSIONAL","PERCHE A SELFIE",10000,"/api/product-images/143","Disponible"],
 ["drone-m3-max","DRONE M3 MAX","Drones",28000,"/api/product-images/134","Disponible"],
 ["amplificateur-ecran-10-pouces","AMPLIFICATEUR 10\"","Électrique",4500,"/api/product-images/132","Disponible"],
 ["camera-surveillance-indoor","CAMERA DE SURVEILLANCE INDOOR","Sécurité",20000,"/api/product-images/117","Disponible"],
 ["pompe-manuelle","POMPE MANUELLE","Électrique",5000,"/api/product-images/125","Disponible"],
 ["perche-a-selfie-live-k9-pro","PERCHE A SELFIE K9 PRO","PERCHE A SELFIE",13000,"/api/product-images/83","Disponible"],
 ["hy300-pro-4k","PROJECTEUR HY300 PRO 4K","Projecteurs",60000,"/api/product-images/80","Disponible"],
 ["hy320-mini-4k","PROJECTEUR HY320 MINI 4K","Projecteurs",60000,"/api/product-images/76","Disponible"],
 ["hub-usb-type-c-multifonction","Hub USB Type-C multifonction","Informatique",15000,"/images/products/computing/usb-c-hub-01.webp","Disponible"],
 ["drone-camera-pliable","Drone caméra pliable","Drones",45000,"/images/products/drones/gt3-mini-drone-01.webp","Disponible"],
 ["prise-programmable-manuelle","Prise Programmable","Électrique",10000,"/images/products/smart-home/smart-plug-socket-04.webp","Disponible"],
 ["camera-securite-connectee","Caméra de sécurité connectée","Sécurité",28000,"/images/products/security/outdoor-ptz-camera-05.webp","Disponible"],
 ["mini-projecteur-led-portable","Mini projecteur LED portable","Projecteurs",35000,"/images/products/projectors/mini-led-projector-01.webp","Disponible"],
 ["stainless-steel-hot-cold-1900ml","STAINLESS STEEL HOT COLD 1900ml","Maison & quotidien",12000,"/api/product-images/152","Disponible"],
 ["stainless-steel-hot-cold","STAINLESS STEEL HOT COLD 800ml","Maison & quotidien",8000,"/api/product-images/150","Disponible"],
 ["stanley-cup-hot-and-cold","STANLEY CUP HOT AND COLD","Maison & quotidien",10000,"/api/product-images/147","Disponible"],
 ["crown-k12-7in1","CROWN K12 7 in 1","Audio",35000,"/api/product-images/140","Disponible"],
 ["tapoteur-ecran","TAPOTEUR D'ÉCRAN","Électrique",10000,"/api/product-images/137","Disponible"],
 ["handled-bluetooth-selfie-wireless-charging","MAGSAFE","Chargeurs",15000,"/api/product-images/130","Disponible"],
 ["usb-c-headphone-jack","USB-C HEADPHONE JACK","Informatique",1000,"/api/product-images/127","Disponible"],
 ["doorbell-electric","DOORBELL ELECTRIC","Sécurité",12000,"/api/product-images/115","Disponible"],
 ["alarme-magnetique","ALARME MAGNÉTIQUE","Sécurité",4000,"/api/product-images/122","Disponible"],
 ["pompe-electrique","POMPE ÉLECTRIQUE","Électrique",12000,"/api/product-images/120","Disponible"],
 ["lampe-chevet-chargeur-sans-fil-rgb","CHARGEUR SANS FIL","Chargeurs",10000,"/api/product-images/112","Disponible"],
 ["lampe-intelligente-led","LAMPE INTELLIGENTE","Éclairage",3000,"/api/product-images/109","Disponible"],
 ["lampe-frontale-led","HEAD LED","Éclairage",5000,"/api/product-images/106","Disponible"],
 ["compresseur-air-electrique-portable","COMPRESSEUR D'AIR ÉLECTRIQUE","Électrique",15000,"/api/product-images/103","Disponible"],
 ["dread-lock-machine","DREAD LOCKS MACHINE","Électrique",200000,"/api/product-images/101","Disponible"],
 ["spotlight-led","SPOTLIGHT LED PHOTOGRAPHIC","Éclairage",35000,"/api/product-images/99","Disponible"],
 ["stylus-pen","STYLUS PEN","Informatique",12000,"/api/product-images/97","Disponible"],
 ["wireless-presenter","WIRELESS PRESENTER","Informatique",10000,"/api/product-images/95","Disponible"],
 ["desk-phone-holder","DESK PHONE HOLDER","Informatique",3500,"/api/product-images/93","Disponible"],
 ["wireless-charge","WIRELESS CHARGING QI STANDARD","Chargeurs",12000,"/api/product-images/90","Disponible"],
 ["karaoke-sound-speaker","KARAOKE SOUND SPEAKER","Audio",8000,"/api/product-images/89","Disponible"],
 ["machine-a-petit-dejeuner-3-en-1","MINI FOUR À PETIT-DÉJEUNER 3 EN 1","Maison & quotidien",50000,"/api/product-images/87","Disponible"],
 ["spotlight-fs168","SPOTLIGHT FSD168 RGB","Éclairage",50000,"/api/product-images/82","Disponible"],
 ["wireless-charger-15w","WIRELESS CHARGER 15W","Chargeurs",10000,"/api/product-images/74","Disponible"],
 ["drone-a22-professional","DRONE A22 PROFESSIONAL","Drones",100000,"/api/product-images/72","Disponible"],
 ["wireless-charging-lampe-bluetooth","WIRELESS CHARGING","Chargeurs",20000,"/api/product-images/70","Disponible"],
 ["phone-holder-bras","PHONE HOLDERS","Informatique",7000,"/api/product-images/69","Disponible"],
 ["m11-tricolore-led","LED VIDEO LIGHT M11","Éclairage",12000,"/api/product-images/68","Disponible"],
 ["lampe-cube-led-a-pince","LAMPE CUBE LED","Éclairage",5000,"/api/product-images/66","Disponible"],
 ["wireless-doorbell-avec-pile","WIRELESS DOORBELL PILE","Sécurité",7500,"/api/product-images/62","Disponible"],
 ["wireless-doorbell-electric","WIRELESS DOORBELL ELECTRIC","Sécurité",12000,"/api/product-images/58","Disponible"],
 ["mini-led-fill-light","LED FILL LIGHT","Éclairage",6000,"/api/product-images/54","Disponible"],
 ["mini-led-light","LED VIDEO LIGHT","Éclairage",5000,"/api/product-images/50","Stock limité"],
 ["disque-rotatif","DISQUE ROTATIF","Informatique",15000,"/api/product-images/46","Disponible"],
] as const;
const categories=["Tous",...Array.from(new Set(products.map(p=>p[2])))];
export const money=(n:number)=>new Intl.NumberFormat("fr-FR").format(n)+" XOF";

export default function Boutique(){
 const [category,setCategory]=useState("Tous"),[query,setQuery]=useState(""),[sort,setSort]=useState("featured"),[limit,setLimit]=useState(16);
 const [compareA,setCompareA]=useState("hy300-pro-4k"),[compareB,setCompareB]=useState("hy320-mini-4k");
 const [devices,setDevices]=useState<string[]>(["Télévision & box internet"]);
 const shown=useMemo(()=>{let list=products.filter(p=>(category==="Tous"||p[2]===category)&&p[1].toLowerCase().includes(query.toLowerCase()));if(sort==="low")list=[...list].sort((a,b)=>a[3]-b[3]);if(sort==="high")list=[...list].sort((a,b)=>b[3]-a[3]);return list},[category,query,sort]);
 const compared=[products.find(p=>p[0]===compareA)!,products.find(p=>p[0]===compareB)!];
 const deviceOptions=["Réfrigérateur / congélateur","Télévision & box internet","Climatiseur 1 CV","Éclairage maison","Ordinateurs & bureau"];
 const energyWa="https://wa.me/22371000048?text="+encodeURIComponent(`Bonjour Fantomas Tech, je souhaite une étude énergie / anti-coupure pour : ${devices.join(", ")}. Merci de me proposer une configuration adaptée.`);
 const addToCart=(p:(typeof products)[number])=>{const key="fantomas-cart";const current=JSON.parse(localStorage.getItem(key)||"[]") as Array<{id:string;title:string;category:string;price:number;quantity:number;image:string}>;const found=current.find(item=>item.id===p[0]);const next=found?current.map(item=>item.id===p[0]?{...item,quantity:item.quantity+1}:item):[...current,{id:p[0],title:p[1],category:p[2],price:p[3],quantity:1,image:root+p[4]}];localStorage.setItem(key,JSON.stringify(next));window.dispatchEvent(new Event("fantomas-cart-updated"))};
 return <main className="inner-page"><SiteHeader/><section className="shop-hero"><div><p className="kicker"><span/>CATALOGUE OFFICIEL</p><h1>La technologie utile.<br/><em>Disponible à Bamako.</em></h1><p>Explorez tout le catalogue Fantomas Tech, comparez les prix en XOF et commandez directement avec un conseiller.</p></div><div className="shop-stat"><strong>{products.length}</strong><span>produits référencés</span><small>Catalogue synchronisé avec Fantomas Tech</small></div></section>
 <section className="stock-alert"><div><span><Zap size={14}/> STOCK LIMITÉ À BAMAKO</span><h2>LED VIDEO LIGHT</h2><p>Ce produit est actuellement signalé en stock limité dans le catalogue Fantomas Tech.</p></div><div><strong>5 000 XOF</strong><a href="https://wa.me/22371000048?text=Bonjour%20Fantomas%20Tech%2C%20je%20souhaite%20confirmer%20la%20disponibilit%C3%A9%20du%20LED%20VIDEO%20LIGHT.">Confirmer la disponibilité <ArrowRight size={14}/></a></div></section>
 <section className="catalogue section"><div className="catalogue-toolbar"><label className="catalogue-search"><Search size={18}/><input value={query} onChange={e=>{setQuery(e.target.value);setLimit(16)}} placeholder="Rechercher dans la boutique…" aria-label="Rechercher dans la boutique"/></label><label className="sort-control"><SlidersHorizontal size={16}/><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Trier les produits"><option value="featured">Sélection Fantomas</option><option value="low">Prix croissant</option><option value="high">Prix décroissant</option></select></label></div>
 <div className="catalogue-filters" aria-label="Catégories">{categories.map(c=><button className={category===c?"active":""} onClick={()=>{setCategory(c);setLimit(16)}} key={c}>{c}</button>)}</div><div className="catalogue-count"><span>{shown.length} résultat{shown.length>1?"s":""}</span><i/> Stock local indiqué sur chaque produit</div>
 <div className="product-grid catalogue-grid">{shown.slice(0,limit).map((p,i)=><article className="product-card" style={{animationDelay:`${i*.025}s`}} key={p[0]}><div className="card-top"><span>{p[2]}</span><b className={p[5]==="Stock limité"?"limited":""}><i/> {p[5]}</b></div><a className="product-img catalogue-img" href={`/boutique/${p[0]}`} aria-label={`Voir les détails de ${p[1]}`}><img loading="lazy" src={root+p[4]} alt={p[1]}/></a><h3>{p[1]}</h3><p>Produit Fantomas Tech • Consultez la description et les caractéristiques</p><div className="product-foot"><strong>{money(p[3])}</strong><a className="product-detail-link" href={`/boutique/${p[0]}`} aria-label={`Voir les informations de ${p[1]}`}><span>Voir le produit</span><Plus size={16}/></a></div></article>)}</div>
 {limit<shown.length&&<button className="load-more" onClick={()=>setLimit(v=>v+16)}>Afficher plus de produits <ArrowRight size={15}/><span>{Math.min(16,shown.length-limit)} suivants</span></button>}{!shown.length&&<div className="no-results"><b>Aucun produit trouvé.</b><span>Essayez une autre catégorie ou demandez conseil sur WhatsApp.</span></div>}</section>

 <section className="shop-module compare-module"><div className="module-head"><span>◇</span><div><p className="kicker"><i/>COMPARATEUR</p><h2>Comparez avant de choisir.</h2><small>Prix, catégorie et disponibilité issus du catalogue actuel.</small></div></div><div className="compare-selects"><label>Produit 1<select value={compareA} onChange={e=>setCompareA(e.target.value)}>{products.map(p=><option value={p[0]} key={p[0]}>{p[1]}</option>)}</select></label><span>VS</span><label>Produit 2<select value={compareB} onChange={e=>setCompareB(e.target.value)}>{products.map(p=><option value={p[0]} key={p[0]}>{p[1]}</option>)}</select></label></div><div className="compare-table" role="table" aria-label="Comparaison de produits"><div className="compare-row compare-title"><b>Caractéristiques</b>{compared.map(p=><strong key={p[0]}>{p[1]}</strong>)}</div><div className="compare-row"><b>Prix affiché</b>{compared.map(p=><span className="orange" key={p[0]}>{money(p[3])}</span>)}</div><div className="compare-row"><b>Catégorie</b>{compared.map(p=><span key={p[0]}>{p[2]}</span>)}</div><div className="compare-row"><b>Disponibilité</b>{compared.map(p=><span className={p[5]==="Stock limité"?"yellow":"cyan"} key={p[0]}>{p[5]}</span>)}</div><div className="compare-row"><b>Conseil technique</b>{compared.map(p=><a href={`https://wa.me/22371000048?text=${encodeURIComponent(`Bonjour, je souhaite des précisions techniques sur ${p[1]}.`)}`} key={p[0]}>Demander la fiche →</a>)}</div></div></section>

 <section className="shop-module energy-widget"><div><p className="kicker"><span/>SIMULATEUR ÉNERGIE</p><h2>Que souhaitez-vous alimenter en cas de <em>coupure ?</em></h2><p>Sélectionnez vos appareils. Un conseiller dimensionnera ensuite la puissance, le stockage et l’apport solaire éventuel.</p><div className="device-options">{deviceOptions.map(d=><button className={devices.includes(d)?"active":""} onClick={()=>setDevices(s=>s.includes(d)?s.filter(x=>x!==d):[...s,d])} key={d}><i>{devices.includes(d)?"✓":"＋"}</i>{d}</button>)}</div></div><aside><span>BESOIN SÉLECTIONNÉ</span><strong>{devices.length} usage{devices.length>1?"s":""}</strong><p>{devices.length?devices.join(" • "):"Ajoutez au moins un appareil"}</p><small>La puissance et le prix seront confirmés après étude de vos appareils et de l’autonomie souhaitée.</small><a className={`btn full ${devices.length?"cyan-btn":"disabled"}`} href={devices.length?energyWa:"#"}>Obtenir un devis clé en main ↗</a></aside></section>

 <section className="shop-trust"><article><i>⌁</i><h3>Livraison à Bamako</h3><p>Délai et frais confirmés selon votre quartier et la disponibilité réelle.</p></article><article><i>◇</i><h3>Garantie clarifiée</h3><p>Les conditions applicables sont précisées avant chaque commande.</p></article><article><i>ϟ</i><h3>Installation selon projet</h3><p>Pose et configuration proposées lorsque l’équipement le nécessite.</p></article><article><i>◉</i><h3>Support local</h3><p>Conseil direct par téléphone et WhatsApp avec l’équipe Fantomas Tech.</p></article></section>

 <section className="project-proof"><div className="proof-image"><img src="/assets/fantomas-original/home-workspace.webp" alt="Solutions Fantomas Tech pour le bureau"/></div><div><p className="kicker"><span/>USAGES RÉELS</p><h2>Maison, boutique ou bureau : partez de votre besoin.</h2><p>Fantomas Tech vous aide à réunir les bons équipements sans inventer une configuration standard qui ne correspondrait pas à votre espace.</p><div className="proof-tags"><span>Sécurité</span><span>Énergie</span><span>Informatique</span><span>Maison connectée</span></div><a className="btn outline" href="/pack-builder">Composer mon pack →</a></div></section>

 <section className="technical-note"><div><span>▤</span><div><h3>Fiches techniques & manuels</h3><p>Vous achetez pour une entreprise ou un projet technique ? Demandez les documents disponibles avant validation.</p></div></div><a href="https://wa.me/22371000048?text=Bonjour%20Fantomas%20Tech%2C%20je%20souhaite%20recevoir%20la%20fiche%20technique%20d%27un%20produit.">Demander une fiche technique ↗</a></section>
 <section className="category-cta"><div><p className="kicker"><span/>BESOIN D’AIDE ?</p><h2>Nous vous aidons à choisir le bon équipement.</h2></div><a className="btn primary" href="https://wa.me/22371000048">Demander conseil ↗</a></section><SiteFooter/></main>}
