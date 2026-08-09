"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import {ArrowRight,CheckCircle2,ChevronDown,ChevronLeft,ChevronRight,CircleCheck,Eye,Headphones,Laptop,MessageCircle,Plus,Send,Shield,ShieldCheck,SlidersHorizontal,Sparkles,Truck,X,Zap} from "lucide-react";
import {UiCard,UiIcon} from "./components/ui/Primitives";
import {getProducts} from "../lib/supabase";

type HomeProduct={id:number;slug:string;name:string;category:string;price:number;spec:string;image:string;status:string;badge?:string};
const defaultProducts:HomeProduct[] = [
  { id:1, slug:"hy300-pro-4k", name:"PROJECTEUR HY300 PRO 4K", category:"Maison intelligente", price:60000, spec:"Cinéma portable • Wi‑Fi • Android", image:"/assets/fantomas-original/hy300.webp", status:"En stock", badge:"Produit vedette" },
  { id:2, slug:"hy320-mini-4k", name:"PROJECTEUR HY320 MINI 4K", category:"Maison intelligente", price:60000, spec:"Compact • Rotatif • Compatible 4K", image:"/assets/fantomas-original/hy320.webp", status:"En stock" },
  { id:3, slug:"camera-surveillance-indoor", name:"CAMERA DE SURVEILLANCE INDOOR", category:"Sécurité", price:20000, spec:"Surveillance intérieure connectée", image:"/assets/fantomas-original/camera-indoor.webp", status:"En stock" },
  { id:4, slug:"camera-securite-connectee", name:"Caméra de sécurité connectée", category:"Sécurité", price:28000, spec:"Contrôle à distance • Vision nocturne", image:"/assets/fantomas-original/camera-connected.webp", status:"En stock", badge:"Focus sécurité" },
  { id:5, slug:"hub-usb-type-c-multifonction", name:"Hub USB Type-C multifonction", category:"Informatique", price:15000, spec:"Connectique étendue pour votre bureau", image:"/assets/fantomas-original/hub-usbc.webp", status:"En stock" },
  { id:6, slug:"drone-m3-max", name:"DRONE M3 MAX", category:"Drones", price:28000, spec:"Caméra • Pliable • Télécommande", image:"/assets/fantomas-original/drone-m3.webp", status:"En stock" },
  { id:7, slug:"ecouteurs-bluetooth-sans-fil", name:"Écouteurs Bluetooth sans fil", category:"Audio", price:12000, spec:"Appels • Mobilité • Autonomie", image:"/assets/product-headphones.jpg", status:"En stock" },
  { id:8, slug:"lampe-chevet-chargeur-sans-fil-rgb", name:"CHARGEUR SANS FIL", category:"Énergie", price:10000, spec:"Recharge pratique au quotidien", image:"/assets/fantomas-original/charger-wireless.webp", status:"En stock" },
];

const filters = ["Tous","Sécurité","Énergie","Informatique","Maison intelligente","Drones","Audio"];
const money = (n:number) => new Intl.NumberFormat("fr-FR").format(n)+" XOF";

export default function Home(){
  const [products,setProducts]=useState(defaultProducts);
  const [filter,setFilter]=useState("Tous");
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState<number[]>([]);
  const [config,setConfig]=useState({type:"",space:"",priority:""});
  const [step,setStep]=useState(1);
  const [faqOpen,setFaqOpen]=useState(0);
  const [quickView,setQuickView]=useState<(typeof defaultProducts)[number]|null>(null);
  const [featuredIndex,setFeaturedIndex]=useState(0);
  const [sliderPaused,setSliderPaused]=useState(false);
  const touchStart=useRef<number|null>(null);
  const shown=useMemo(()=>products.filter(p=>(filter==="Tous"||p.category===filter)&&p.name.toLowerCase().includes(query.toLowerCase())),[filter,query]);
  const chosen=products.filter(p=>selected.includes(p.id));
  const quoteText=config.type?`Bonjour Fantomas Tech, je souhaite un devis ${config.type}. Espace : ${config.space}. Priorité : ${config.priority}.`:"Bonjour Fantomas Tech, j’ai besoin d’un conseil.";
  const orderText=chosen.length?`Bonjour Fantomas Tech, je souhaite confirmer :\n${chosen.map(p=>`• ${p.name} — ${money(p.price)}`).join("\n")}`:quoteText;
  const wa="https://wa.me/22371000048?text="+encodeURIComponent(orderText);
  const toggle=(id:number)=>setSelected(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  const featured=[products[0],products[3],products[4]];
  const featuredProduct=featured[featuredIndex];
  const nextFeatured=()=>setFeaturedIndex(i=>(i+1)%featured.length);
  const prevFeatured=()=>setFeaturedIndex(i=>(i-1+featured.length)%featured.length);
  useEffect(()=>{if(sliderPaused)return;const timer=window.setInterval(nextFeatured,6000);return()=>window.clearInterval(timer)},[sliderPaused]);
  useEffect(()=>{getProducts().then(rows=>{if(rows.length)setProducts(rows.slice(0,8).map((p,i)=>({id:i+1,slug:p.slug,name:p.name,category:p.category,price:p.price,spec:p.description||"Produit Fantomas Tech",image:p.image_url,status:p.availability,badge:p.featured?"Produit vedette":undefined}))) }).catch(()=>{})},[]);

  return <main id="top">
    <div className="ambient a1"/><div className="ambient a2"/>
    <SiteHeader cartCount={selected.length}/>

    <section className="hero reveal">
      <div className="hero-copy"><p className="kicker"><span/> ÉLECTRONIQUE & ÉNERGIE • BAMAKO</p><h1>L’énergie mieux maîtrisée. <em>La sécurité connectée.</em></h1><p>Solutions d’énergie, caméras de surveillance, informatique et maison connectée, avec conseil et support local à Bamako.</p><div className="hero-buttons"><a className="btn primary" href="/boutique">Explorer la boutique <ArrowRight size={15}/></a><a className="btn outline" href="/pack-builder"><Zap size={15}/> Configurer mon pack</a></div><div className="trust-line"><span><i/> Produits sélectionnés</span><span><i/> Prix en XOF</span><span><i/> Support local</span></div><div className="hero-metrics"><div><b>47</b><small>Produits référencés</small></div><div><b>XOF</b><small>Prix transparents</small></div><div><b>BKO</b><small>Conseil local</small></div><div><b>WA</b><small>Commande directe</small></div></div></div>
      <div className="hero-stage"><div className="hero-glow"/><Image fill priority sizes="(max-width: 1100px) 100vw, 50vw" src="/assets/hero-tech.webp" alt="Projecteur HY300 Pro et accessoires technologiques"/><div className="hotspot hs1"><b>01</b><span>Compatible 4K<small>Projection immersive</small></span></div><div className="hotspot hs2"><b>02</b><span>60 000 XOF<small>Disponible</small></span></div><div className="stage-label">HY300 PRO <span>4K</span></div></div>
    </section>

    <section id="univers" className="section reveal"><div className="section-title"><p className="kicker"><span/> NOS UNIVERS</p><h2>Une solution pour chaque <em>usage.</em></h2><a href="#shop">Tout explorer →</a></div><div className="universe-grid">{[
      ["01","Sécurité connectée","Caméras, alarmes et surveillance de vos espaces.","◉","/securite"],
      ["02","Énergie","Recharge, solaire, batteries, convertisseurs et solutions de secours.","ϟ","/energie"],
      ["03","Informatique & bureau","Hubs USB‑C, accessoires et équipements professionnels.","◇","/boutique"],
      ["04","Maison intelligente","Éclairage connecté, projecteurs et confort au quotidien.","⌂","/maison-connectee"]
    ].map(x=><a className={`universe ${x[0]==="02"?"energy":""}`} href={x[4]} key={x[0]}><span className="u-num">{x[0]}</span><i>{x[3]}</i><h3>{x[1]}</h3><p>{x[2]}</p><b>Explorer <span>↗</span></b></a>)}</div></section>

    <section className="why-home"><div className="why-heading"><p className="kicker"><span/>POURQUOI FANTOMAS TECH ?</p><h2>La technologie, avec un <em>accompagnement local.</em></h2><p>Nous vous aidons à choisir une solution adaptée à votre usage, à votre espace et à votre budget avant validation.</p></div><div className="why-grid"><UiCard><UiIcon><CircleCheck size={21}/></UiIcon><h3>Sélection claire</h3><p>Produits organisés par usage, prix affichés en XOF et disponibilité indiquée dans le catalogue.</p></UiCard><UiCard><UiIcon><MessageCircle size={21}/></UiIcon><h3>Conseil avant achat</h3><p>Échange direct pour vérifier la compatibilité, les accessoires nécessaires et les conditions applicables.</p></UiCard><UiCard><UiIcon><SlidersHorizontal size={21}/></UiIcon><h3>Configuration sur mesure</h3><p>Dimensionnement accompagné pour les projets d’énergie, de sécurité et d’équipement professionnel.</p></UiCard></div></section>

    <section className="feature reveal"><a className="feature-image" href="/securite" aria-label="Découvrir les solutions de sécurité Fantomas Tech"><Image fill sizes="(max-width: 1100px) 100vw, 55vw" src="/assets/fantomas-original/home-security.webp" alt="Solutions de sécurité Fantomas Tech"/><div className="scan-line"/><span className="feature-explore">Explorer la page Sécurité <ArrowRight size={15}/></span></a><div className="feature-copy"><p className="kicker"><span/> FOCUS SÉCURITÉ</p><h2>Gardez le contrôle.<br/><em>Où que vous soyez.</em></h2><p>Une solution connectée pour surveiller votre maison, votre boutique ou votre bureau depuis votre téléphone.</p><div className="specs"><div><b>360°</b><small>Vision panoramique</small></div><div><b>24/7</b><small>Surveillance continue</small></div><div><b>28K</b><small>Prix en XOF</small></div></div><div className="feature-actions"><a className="btn primary" href="/securite">Découvrir la sécurité <ArrowRight size={15}/></a><a className="btn outline" href={wa}>Demander conseil</a></div></div></section>

    <section id="simulator" className="simulator section reveal"><div className="sim-intro"><p className="kicker"><span/> CONFIGURATEUR EXPRESS</p><h2>Votre solution en <em>3 étapes.</em></h2><p>Décrivez votre besoin et recevez une demande de devis WhatsApp prête à envoyer.</p><div className="steps"><span className={step>=1?"active":""}>01 Besoin</span><span className={step>=2?"active":""}>02 Espace</span><span className={step>=3?"active":""}>03 Priorité</span></div></div><div className="config-card">
      {step===1&&<><small>ÉTAPE 01 / 03</small><h3>Quel projet souhaitez-vous équiper ?</h3><div className="options">{["Sécurité","Énergie"].map(x=><button className={x==="Énergie"?"energy-option":""} onClick={()=>{setConfig({...config,type:x});setStep(2)}} key={x}><i>{x==="Sécurité"?"◉":"ϟ"}</i><b>{x}</b><span>→</span></button>)}</div></>}
      {step===2&&<><small>ÉTAPE 02 / 03</small><h3>Quel espace est concerné ?</h3><div className="options">{["Maison","Boutique / Bureau","Entreprise"].map(x=><button onClick={()=>{setConfig({...config,space:x});setStep(3)}} key={x}><b>{x}</b><span>→</span></button>)}</div><button className="back" onClick={()=>setStep(1)}>← Retour</button></>}
      {step===3&&<><small>ÉTAPE 03 / 03</small><h3>Quelle est votre priorité ?</h3><div className="options">{["Budget maîtrisé","Performance","Autonomie maximale"].map(x=><button className={config.priority===x?"picked":""} onClick={()=>setConfig({...config,priority:x})} key={x}><b>{x}</b><span>✓</span></button>)}</div><a className="btn primary full" href={config.priority?wa:"#simulator"}>Générer mon devis WhatsApp ↗</a><button className="back" onClick={()=>setStep(2)}>← Retour</button></>}
    </div></section>

    <section className="home-scenarios section"><div className="section-title"><p className="kicker"><span/>SOLUTIONS TERRAIN</p><h2>Un point de départ pour chaque <em>projet.</em></h2><a href="https://wa.me/22371000048">Demander une visite technique →</a></div><div className="scenario-grid"><article><span>ÉNERGIE</span><h3>Autonomie maison & bureau</h3><p>Identifiez les appareils prioritaires, l’autonomie souhaitée et l’apport solaire éventuel.</p><small>Maison • commerce • bureau</small></article><article><span>SÉCURITÉ</span><h3>Surveillance connectée</h3><p>Choisissez les zones à couvrir et les fonctions utiles avant de sélectionner les caméras.</p><small>Maison • chantier • boutique</small></article><article><span>INFORMATIQUE</span><h3>Poste de travail efficace</h3><p>Réunissez hubs, chargeurs et accessoires compatibles dans une configuration cohérente.</p><small>Bureau • mobilité • création</small></article></div></section>

    <section id="shop" className="section shop essentials reveal"><div className="essentials-head"><div><p className="kicker"><Sparkles size={14}/> SÉLECTION FANTOMAS</p><h2>Les <em>Essentiels.</em></h2><p>Explorez nos équipements phares par univers, consultez l’essentiel en un clic et commandez directement auprès de l’équipe à Bamako.</p></div><a href="/boutique">Voir les 47 produits <ArrowRight size={15}/></a></div>
      <div className={`featured-slider featured-${featuredIndex}`} onMouseEnter={()=>setSliderPaused(true)} onMouseLeave={()=>setSliderPaused(false)} onTouchStart={e=>{touchStart.current=e.touches[0].clientX;setSliderPaused(true)}} onTouchEnd={e=>{if(touchStart.current!==null){const delta=e.changedTouches[0].clientX-touchStart.current;if(Math.abs(delta)>45)(delta<0?nextFeatured:prevFeatured)();touchStart.current=null}setSliderPaused(false)}}>
        <div className="featured-top"><span><Sparkles size={13}/> PRODUIT PHARE</span><div><button onClick={prevFeatured} aria-label="Produit précédent"><ChevronLeft size={18}/></button><b>0{featuredIndex+1} / 0{featured.length}</b><button onClick={nextFeatured} aria-label="Produit suivant"><ChevronRight size={18}/></button></div></div>
        <div className="featured-content" key={featuredProduct.id}><div className="featured-copy"><span className="ui-badge">{featuredProduct.badge||featuredProduct.category}</span><small>{featuredProduct.category} • {featuredProduct.status}</small><h3>{featuredProduct.name}</h3><p>{featuredProduct.spec}</p><ul>{featuredProduct.spec.split(" • ").map(s=><li key={s}><CheckCircle2 size={15}/>{s}</li>)}</ul><div className="featured-buy"><strong>{money(featuredProduct.price)}</strong><a href={`https://wa.me/22371000048?text=${encodeURIComponent(`Bonjour Fantomas Tech, je souhaite commander :\n• ${featuredProduct.name}\n• Prix : ${money(featuredProduct.price)}\n\nMerci de me confirmer la disponibilité et les conditions de livraison à Bamako.`)}`} target="_blank" rel="noreferrer"><Send size={15}/>Commander directement</a></div></div><div className="featured-visual"><div/><img src={featuredProduct.image} alt={featuredProduct.name}/><button onClick={()=>setQuickView(featuredProduct)}><Eye size={15}/>Aperçu rapide</button></div></div>
        <div className="featured-progress" key={`progress-${featuredIndex}`}><i/></div><div className="featured-dots">{featured.map((p,i)=><button key={p.id} className={i===featuredIndex?"active":""} onClick={()=>setFeaturedIndex(i)} aria-label={`Afficher ${p.name}`}/>)}</div>
      </div>
      <div className="shop-tools"><div className="filters essentials-tabs" role="tablist" aria-label="Filtrer les essentiels">{filters.map(f=><button role="tab" aria-selected={filter===f} className={filter===f?"active":""} onClick={()=>setFilter(f)} key={f}>{f==="Tous"?<Sparkles size={13}/>:f==="Sécurité"?<Shield size={13}/>:f==="Énergie"?<Zap size={13}/>:<Laptop size={13}/>} {f}</button>)}</div><span>{shown.length} produits</span></div><div className="product-grid essentials-grid">{shown.map((p,i)=><article className={`product-card essential-card ${p.category==="Énergie"?"energy-card":""}`} style={{animationDelay:`${i*.05}s`}} key={p.id}><div className="card-top"><span>{p.category}</span><b><i/> {p.status}</b></div>{p.badge&&<span className="product-badge">{p.badge}</span>}<Link className="home-product-link" href={`/boutique/${p.slug}`}><div className="product-img"><div/><img src={p.image} alt={`Visuel indicatif — ${p.name}`}/></div><h3>{p.name}</h3><p>{p.spec}</p><ul className="essential-specs">{p.spec.split(" • ").map(s=><li key={s}><CheckCircle2 size={13}/>{s}</li>)}</ul></Link><div className="product-foot"><strong>{money(p.price)}</strong><div className="essential-actions"><Link className="icon-action detail-action" href={`/boutique/${p.slug}`} aria-label={`Voir les informations de ${p.name}`}><Plus size={16}/><span>Voir le produit</span></Link><a className="order-action" href={`https://wa.me/22371000048?text=${encodeURIComponent(`Bonjour Fantomas Tech, je souhaite commander :\n• ${p.name}\n• Prix : ${money(p.price)}\n\nMerci de me confirmer la disponibilité et les conditions de livraison à Bamako.`)}`} target="_blank" rel="noreferrer"><Send size={15}/><span>Commander</span></a></div></div></article>)}</div></section>

    {quickView&&<div className="quick-modal" role="dialog" aria-modal="true" aria-labelledby="quick-title" onMouseDown={e=>{if(e.currentTarget===e.target)setQuickView(null)}}><div className="quick-panel"><button className="quick-close" onClick={()=>setQuickView(null)} aria-label="Fermer l’aperçu"><X size={18}/></button><div className="quick-image"><img src={quickView.image} alt={quickView.name}/></div><div className="quick-copy"><span className="ui-badge">{quickView.badge||quickView.category}</span><p className="quick-category">{quickView.category} • {quickView.status}</p><h2 id="quick-title">{quickView.name}</h2><ul>{quickView.spec.split(" • ").map(s=><li key={s}><CheckCircle2 size={15}/>{s}</li>)}</ul><strong>{money(quickView.price)}</strong><a className="btn primary" href={`https://wa.me/22371000048?text=${encodeURIComponent(`Bonjour Fantomas Tech, je souhaite commander :\n• ${quickView.name}\n• Prix : ${money(quickView.price)}\n\nMerci de me confirmer la disponibilité et les conditions de livraison à Bamako.`)}`} target="_blank" rel="noreferrer"><Send size={15}/>Commander sur WhatsApp</a><small>Disponibilité et conditions confirmées avant validation.</small></div></div></div>}

    <section className="reassurance reveal"><div><i><Truck size={22}/></i><span><b>Livraison rapide</b><small>À Bamako</small></span></div><div><i><Headphones size={22}/></i><span><b>Support local</b><small>Conseil technique</small></span></div><div><i><ShieldCheck size={22}/></i><span><b>Conditions clarifiées</b><small>Avant validation</small></span></div><div><i><MessageCircle size={22}/></i><span><b>WhatsApp direct</b><small>+223 71 00 00 48</small></span></div></section>

    <section id="guides" className="guides section reveal"><div className="section-title"><p className="kicker"><span/> CONSEILS</p><h2>Guides <em>Fantomas.</em></h2></div><div className="guide-grid"><article><small>TENDANCES TECH</small><h3>La technologie au service du quotidien : tendances 2026</h3><a href="https://www.fantomas.tech/conseils">Lire le guide →</a></article><article><small>GUIDE D’ACHAT</small><h3>Comment choisir une batterie externe fiable</h3><a href="https://www.fantomas.tech/conseils">Lire le guide →</a></article><article><small>MOBILITÉ</small><h3>Les avantages des écouteurs Bluetooth modernes</h3><a href="https://www.fantomas.tech/conseils">Lire le guide →</a></article></div></section>

    <section className="home-faq"><div className="faq-heading"><p className="kicker"><span/>RÉPONSES RAPIDES</p><h2>Questions <em>fréquentes.</em></h2><p>Les conditions exactes sont toujours confirmées selon le produit et votre projet.</p></div><div className="faq-list">{[
      ["Comment préparer un projet d’énergie ou anti-coupure ?","Listez les appareils à alimenter, leur puissance et l’autonomie souhaitée. L’équipe pourra ensuite proposer un dimensionnement adapté, incluant le solaire si pertinent."],
      ["Une caméra peut-elle fonctionner sans connexion Wi‑Fi ?","Cela dépend du modèle et de la connectivité disponible. Demandez confirmation avant commande afin de choisir une caméra adaptée à votre site."],
      ["Quels sont les modes de paiement acceptés ?","Les moyens de paiement disponibles et les modalités sont confirmés directement avec l’équipe Fantomas Tech avant validation."],
      ["Les équipements disposent-ils d’une garantie ?","Les conditions et la durée varient selon le produit. Elles doivent être précisées sur le devis ou lors de la commande."],
      ["Comment connaître le délai de livraison à Bamako ?","Indiquez votre quartier sur WhatsApp. L’équipe confirmera le stock, les frais et le délai avant l’envoi."]
    ].map((faq,i)=><article className={faqOpen===i?"open":""} key={faq[0]}><button onClick={()=>setFaqOpen(faqOpen===i?-1:i)} aria-expanded={faqOpen===i}><span>{faq[0]}</span><ChevronDown className={faqOpen===i?"rotated":""} size={18}/></button>{faqOpen===i&&<p>{faq[1]}</p>}</article>)}</div></section>

    <section className="final-cta home-final"><div><p className="kicker"><span/> BESOIN D’UN CONSEIL ?</p><h2>Construisons votre solution <em>ensemble.</em></h2><p>Présentez votre besoin à l’équipe pour vérifier les produits, la compatibilité et les conditions avant commande.</p></div><div className="final-actions"><a className="btn primary" href={wa}>Discuter sur WhatsApp ↗</a><a className="btn outline" href="tel:+22371000048">Appeler le +223 71 00 00 48</a></div></section>
    <SiteFooter/>
    <nav className="bottom-nav"><a href="/">⌂<span>Accueil</span></a><a href="/boutique">◇<span>Boutique</span></a><a href="/pack-builder">ϟ<span>Simulateur</span></a><a href={wa}>◌<span>WhatsApp</span></a></nav>
  </main>
}
