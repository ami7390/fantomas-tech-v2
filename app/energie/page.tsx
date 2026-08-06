"use client";

import {useMemo,useState} from "react";
import Link from "next/link";
import {ArrowRight,Battery,Check,ChevronRight,Cpu,Fan,Info,Laptop,Lightbulb,MessageCircle,Refrigerator,ShieldCheck,Sun,Tv,Zap} from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const devices=[
  {id:"lights",name:"10 ampoules LED",watts:80,Icon:Lightbulb},
  {id:"tv",name:"TV + box internet",watts:120,Icon:Tv},
  {id:"fridge",name:"Réfrigérateur",watts:150,Icon:Refrigerator},
  {id:"fans",name:"3 ventilateurs",watts:135,Icon:Fan},
  {id:"laptop",name:"PC portable + hub",watts:90,Icon:Laptop},
];

const batteries=[
  {id:"gel",name:"Gel / AGM",capacity:1200,detail:"Capacité utile indicative : 1,2 kWh"},
  {id:"lithium24",name:"Lithium LiFePO₄ 24 V",capacity:2300,detail:"Capacité utile indicative : 2,3 kWh"},
  {id:"lithium48",name:"Lithium LiFePO₄ 48 V",capacity:4600,detail:"Capacité utile indicative : 4,6 kWh"},
];

const flow=[
  {label:"Panneaux solaires",text:"Captent l’énergie disponible",Icon:Sun},
  {label:"Onduleur hybride",text:"Convertit et régule le courant",Icon:Cpu},
  {label:"Batterie",text:"Stocke l’énergie utile",Icon:Battery},
  {label:"Maison & bureau",text:"Alimente les équipements",Icon:Zap},
];

const solarImages=[
  {src:"/assets/fantomas-solar/solar-rooftop-panels.png",label:"Panneaux en toiture",text:"Production solaire"},
  {src:"/assets/fantomas-solar/solar-electrical-installation.jpg",label:"Installation électrique",text:"Câblage et protections"},
  {src:"/assets/fantomas-solar/solar-technician-maintenance.jpg",label:"Maintenance technique",text:"Contrôle des équipements"},
  {src:"/assets/fantomas-solar/solar-battery-storage-system.jpg",label:"Stockage d’énergie",text:"Batteries et autonomie"},
  {src:"/assets/fantomas-solar/solar-project-delivery.jpg",label:"Livraison du projet",text:"Mise en service accompagnée"},
];

export default function Energie(){
  const [selected,setSelected]=useState(["lights","tv","fridge"]);
  const [battery,setBattery]=useState("lithium24");
  const [flowStep,setFlowStep]=useState(0);
  const chosen=useMemo(()=>devices.filter(item=>selected.includes(item.id)),[selected]);
  const watts=chosen.reduce((sum,item)=>sum+item.watts,0);
  const activeBattery=batteries.find(item=>item.id===battery)??batteries[1];
  const hours=watts?activeBattery.capacity/watts:0;
  const toggle=(id:string)=>setSelected(items=>items.includes(id)?items.filter(item=>item!==id):[...items,id]);
  const message=encodeURIComponent(`Bonjour Fantomas Tech, je souhaite une étude pour une solution énergie.\n\nÉquipements simulés : ${chosen.map(item=>item.name).join(", ")||"à définir"}\nCharge estimée : ${watts} W\nBatterie de référence : ${activeBattery.name}\nAutonomie indicative : ${hours.toFixed(1)} h\n\nMerci de vérifier ce dimensionnement avec moi.`);
  return <main className="energy-page">
    <SiteHeader/>
    <section className="energy-hero">
      <div className="energy-hero-copy">
        <p className="energy-kicker"><Sun size={15}/> HUB ÉNERGIE • BAMAKO</p>
        <h1>L’énergie qui continue.<br/><em>Même quand le réseau s’arrête.</em></h1>
        <p>Solutions solaires, stockage et secours électrique réunis dans un seul parcours. Simulez votre besoin, puis faites valider le dimensionnement par Fantomas Tech.</p>
        <div className="energy-actions"><a className="btn primary" href="#simulateur">Simuler mon autonomie <ArrowRight size={16}/></a><a className="btn outline" href={`https://wa.me/22371000048?text=${message}`}>Demander une étude</a></div>
        <div className="energy-proof"><span><ShieldCheck/> Étude personnalisée</span><span><Battery/> Stockage adapté</span><span><Zap/> Maison & entreprise</span></div>
      </div>
      <div className="energy-hero-media"><img src="/assets/fantomas-solar/solar-team-installation-hero.jpg" alt="Équipe Fantomas Tech intervenant sur une installation solaire"/><span>INSTALLATION SOLAIRE • FANTOMAS TECH</span><div><Sun/><b>Énergie solaire</b><small>Étude • installation • suivi</small></div></div>
    </section>

    <section className="energy-section energy-sim" id="simulateur">
      <div className="energy-heading"><p className="energy-kicker"><Cpu size={15}/> SIMULATEUR D’AUTONOMIE</p><h2>Composez votre usage.<br/><em>Visualisez une estimation.</em></h2><p>Choisissez les équipements qui doivent fonctionner simultanément, puis une capacité de batterie de référence.</p></div>
      <div className="energy-calc">
        <div className="energy-calc-controls"><h3>1. Équipements à alimenter</h3><div className="energy-devices">{devices.map(({id,name,watts:power,Icon})=><button className={selected.includes(id)?"active":""} key={id} onClick={()=>toggle(id)}><Icon/><span><b>{name}</b><small>≈ {power} W</small></span>{selected.includes(id)&&<Check className="check"/>}</button>)}</div><h3>2. Batterie de référence</h3><div className="energy-batteries">{batteries.map(item=><button className={battery===item.id?"active":""} onClick={()=>setBattery(item.id)} key={item.id}><Battery/><span><b>{item.name}</b><small>{item.detail}</small></span></button>)}</div></div>
        <aside className="energy-result"><span>ESTIMATION EN TEMPS RÉEL</span><div><small>Charge simultanée</small><strong>{watts} W</strong></div><div className="energy-hours"><small>Autonomie indicative</small><strong>≈ {hours.toFixed(1)} h</strong></div><p>{chosen.length} équipement{chosen.length>1?"s":""} sélectionné{chosen.length>1?"s":""}</p><a href={`https://wa.me/22371000048?text=${message}`}><MessageCircle size={17}/> Recevoir un dimensionnement</a><small className="energy-disclaimer"><Info size={13}/> Estimation pédagogique, non contractuelle. L’autonomie réelle dépend notamment du rendement, des appels de courant, de l’état de la batterie et des conditions d’usage.</small></aside>
      </div>
    </section>

    <section className="energy-section energy-flow">
      <div className="energy-heading compact"><p className="energy-kicker"><Zap size={15}/> ARCHITECTURE DU SYSTÈME</p><h2>De la lumière du soleil<br/><em>jusqu’à vos équipements.</em></h2></div>
      <div className="energy-flow-grid">{flow.map(({label,text,Icon},index)=><button onClick={()=>setFlowStep(index)} className={flowStep===index?"active":""} key={label}><span>{String(index+1).padStart(2,"0")}</span><Icon/><b>{label}</b><small>{text}</small>{index<flow.length-1&&<ChevronRight className="flow-arrow"/>}</button>)}</div>
      <div className="energy-flow-note"><b>{flow[flowStep].label}</b><p>{flow[flowStep].text}. Le choix des protections, câbles et puissances doit être confirmé après inventaire des appareils et visite technique.</p></div>
    </section>

    <section className="energy-section energy-field">
      <div className="energy-heading compact"><p className="energy-kicker"><ShieldCheck size={15}/> MÉTHODE FANTOMAS TECH</p><h2>Du toit à la mise en service.<br/><em>Chaque étape compte.</em></h2><p>Les visuels officiels de Fantomas Tech illustrent les principaux volets d’un projet : captation solaire, installation électrique, stockage, maintenance et livraison.</p></div>
      <div className="energy-photo-grid">{solarImages.map((item,index)=><figure className={index===0?"wide":""} key={item.src}><img src={item.src} alt={`${item.label} par Fantomas Tech`}/><figcaption><span>0{index+1}</span><div><b>{item.label}</b><small>{item.text}</small></div></figcaption></figure>)}</div>
    </section>

    <section className="energy-section energy-compare">
      <div className="energy-heading compact"><p className="energy-kicker"><Battery size={15}/> GUIDE BATTERIES</p><h2>Lithium ou Gel / AGM ?</h2></div>
      <div className="battery-table" role="table"><div className="battery-row head" role="row"><b>Critère</b><b>Lithium LiFePO₄</b><b>Gel / AGM</b></div>{[
        ["Capacité utilisable","Généralement plus élevée","Plus conservatrice pour préserver la batterie"],
        ["Poids & encombrement","Plus compact à capacité comparable","Souvent plus lourd"],
        ["Investissement initial","Plus élevé","Plus accessible"],
        ["Usage conseillé","Cycles fréquents et recherche d’autonomie","Secours ponctuel et budget maîtrisé"],
        ["Décision finale","Selon charge, budget et évolutivité","Selon charge, budget et fréquence des coupures"],
      ].map(row=><div className="battery-row" role="row" key={row[0]}><b>{row[0]}</b><span>{row[1]}</span><span>{row[2]}</span></div>)}</div>
    </section>

    <section className="energy-section energy-solutions">
      <div className="energy-heading compact"><p className="energy-kicker"><Sun size={15}/> SOLUTIONS SUR MESURE</p><h2>Un point de départ.<br/><em>Une configuration validée.</em></h2></div>
      <div className="energy-solution-grid">{[
        ["Essentiels maison","Éclairage, TV, internet et réfrigérateur","Pour sécuriser les usages prioritaires pendant une coupure."],
        ["Bureau & commerce","Postes de travail, réseau et équipements métier","Pour maintenir l’activité et protéger les appareils sensibles."],
        ["Projet évolutif","Production solaire, batterie et onduleur hybride","Pour dimensionner une architecture qui peut accompagner vos besoins."],
      ].map((item,index)=><article key={item[0]}><span>0{index+1}</span><Sun/><h3>{item[0]}</h3><b>{item[1]}</b><p>{item[2]}</p><a href={`https://wa.me/22371000048?text=${message}`}>Étudier ce besoin <ArrowRight size={14}/></a></article>)}</div>
    </section>

    <section className="energy-cta"><div><p className="energy-kicker"><ShieldCheck size={15}/> AVANT TOUTE INSTALLATION</p><h2>On dimensionne sur vos usages réels.</h2><p>Préparez la liste de vos appareils, leur puissance, vos heures d’utilisation et vos priorités. Fantomas Tech pourra ensuite confirmer la solution adaptée.</p></div><Link className="btn primary" href="/pack-builder">Lancer le simulateur pack <ArrowRight size={16}/></Link></section>
    <SiteFooter/>
  </main>
}
