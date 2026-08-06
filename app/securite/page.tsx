"use client";

import {useMemo,useState} from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import {BellRing,CheckCircle2,Eye,MessageCircle,Radio,Send,ShieldCheck,Smartphone,Sun,Video,WifiOff} from "lucide-react";

const solutions=[
 {id:1,name:"CAMERA DE SURVEILLANCE INDOOR",price:20000,use:"Commerce & Bureau",image:"/assets/fantomas-original/camera-indoor.webp",badge:"Intérieur",specs:["Surveillance intérieure connectée","Contrôle depuis votre téléphone","Format compact pour maison ou bureau"]},
 {id:2,name:"Caméra de sécurité connectée",price:28000,use:"Villa & Cour",image:"/assets/fantomas-original/camera-connected.webp",badge:"Recommandé",specs:["Contrôle à distance","Vision nocturne","Orientation panoramique selon le modèle"]},
 {id:3,name:"Pack sécurité intelligent",price:null,use:"Projet sur mesure",image:"/assets/fantomas-original/home-security.webp",badge:"Sur devis",specs:["Étude des zones à couvrir","Caméras et stockage adaptés","Installation à confirmer avec l’équipe"]}
];
const uses=["Toutes","Villa & Cour","Commerce & Bureau","Projet sur mesure"];
const money=(n:number)=>new Intl.NumberFormat("fr-FR").format(n)+" XOF";

export default function Securite(){
 const [use,setUse]=useState("Toutes");
 const [tech,setTech]=useState<"autonomie"|"detection"|"nuit">("autonomie");
 const visible=useMemo(()=>solutions.filter(s=>use==="Toutes"||s.use===use),[use]);
 const ask=(name:string,price:number|null)=>`https://wa.me/22371000048?text=${encodeURIComponent(`Bonjour Fantomas Tech, je souhaite des informations sur cette solution de sécurité :\n• ${name}\n• Prix : ${price?money(price):"sur devis"}\n\nMerci de me confirmer la disponibilité, les fonctions et les conditions d’installation à Bamako.`)}`;
 return <main className="inner-page security-page">
  <SiteHeader/>
  <section className="security-hero"><div className="security-hero-copy"><p className="kicker"><ShieldCheck size={14}/> SÉCURITÉ CONNECTÉE • BAMAKO</p><h1>Gardez un œil sur vos espaces. <em>Où que vous soyez.</em></h1><p>Caméras connectées et solutions de surveillance pour votre maison, votre commerce ou votre bureau, avec conseil local avant installation.</p><div className="security-chips"><span><Sun size={16}/>Options autonomes à étudier</span><span><Radio size={16}/>Connectivité selon le modèle</span><span><Smartphone size={16}/>Contrôle mobile</span></div><div className="hero-buttons"><a className="btn primary" href="#solutions">Voir les solutions</a><a className="btn outline" href={ask("un projet de sécurité sur mesure",null)}><MessageCircle size={15}/>Demander une étude</a></div></div><div className="security-hero-image"><img src="/assets/fantomas-original/home-security.webp" alt="Solution de vidéosurveillance Fantomas Tech"/><div className="security-radar"/><span className="security-status"><i/> Surveillance connectée</span></div></section>

  <section className="security-tech section"><div className="security-heading"><p className="kicker"><span/> TECHNOLOGIES À COMPARER</p><h2>Choisissez selon votre <em>terrain.</em></h2><p>Les fonctions exactes varient selon le modèle. Cette démonstration vous aide à identifier les points à vérifier avant l’achat.</p></div><div className="tech-tabs" role="tablist" aria-label="Technologies de sécurité"><button className={tech==="autonomie"?"active":""} onClick={()=>setTech("autonomie")}><WifiOff size={17}/>Autonomie & réseau</button><button className={tech==="detection"?"active cyan":""} onClick={()=>setTech("detection")}><Eye size={17}/>Détection intelligente</button><button className={tech==="nuit"?"active yellow":""} onClick={()=>setTech("nuit")}><Video size={17}/>Vision nocturne</button></div><div className={`tech-panel ${tech}`}>
   {tech==="autonomie"&&<><WifiOff size={38}/><div><small>SITE ISOLÉ OU COUPURES</small><h3>Énergie et connectivité adaptées au lieu</h3><p>Pour un chantier ou un site sans connexion fixe, demandez une étude des options solaires, batterie et réseau mobile compatibles avec le modèle choisi.</p></div></>}
   {tech==="detection"&&<><Eye size={38}/><div><small>ALERTES CIBLÉES</small><h3>Détection et notifications sur mobile</h3><p>Selon la caméra, les alertes de mouvement et fonctions de suivi peuvent aider à surveiller les zones importantes depuis votre téléphone.</p></div></>}
   {tech==="nuit"&&<><Video size={38}/><div><small>APRÈS LA TOMBÉE DE LA NUIT</small><h3>Une surveillance pensée pour l’obscurité</h3><p>Comparez la portée, le type d’éclairage et la qualité d’image nocturne avant de choisir une caméra intérieure ou extérieure.</p></div></>}
  </div></section>

  <section className="security-selector section"><div className="security-heading"><p className="kicker"><span/> SIMULATEUR DE ZONE</p><h2>Quel espace souhaitez-vous <em>sécuriser ?</em></h2></div><div className="use-filters" role="tablist">{uses.map(item=><button key={item} className={use===item?"active":""} onClick={()=>setUse(item)} role="tab" aria-selected={use===item}>{item}</button>)}</div><div id="solutions" className="security-products">{visible.map(item=><article key={item.id}><div className="security-product-image"><img src={item.image} alt={item.name}/><span>{item.badge}</span></div><div className="security-product-copy"><small>{item.use}</small><h3>{item.name}</h3><ul>{item.specs.map(s=><li key={s}><CheckCircle2 size={14}/>{s}</li>)}</ul><div><strong>{item.price?money(item.price):"Sur devis"}</strong><a href={ask(item.name,item.price)} target="_blank" rel="noreferrer"><Send size={15}/>WhatsApp</a></div></div></article>)}</div></section>

  <section className="security-support"><div><BellRing size={30}/><span><small>ACCOMPAGNEMENT LOCAL</small><h2>Préparez votre installation à Bamako.</h2><p>Indiquez le type d’espace, les zones à couvrir et vos contraintes d’énergie ou de connexion. L’équipe vérifiera les produits, la compatibilité et les conditions de mise en service.</p></span></div><a className="btn primary" href={ask("une étude et une installation de sécurité",null)}><Send size={15}/>Demander une intervention</a></section>
  <SiteFooter/>
 </main>
}
