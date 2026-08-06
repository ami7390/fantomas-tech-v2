"use client";

import {useMemo,useState} from "react";
import {ArrowLeft,ArrowRight,Battery,Building2,Camera,Check,CheckCircle2,Cpu,Download,Fan,HardHat,Home,Info,Laptop,Lightbulb,MessageCircle,Printer,Refrigerator,RotateCcw,ShieldCheck,Sun,Tv,Waves,XCircle,Zap} from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const devices=[
 {id:"light",name:"10 ampoules LED",watts:80,category:"Essentiel",Icon:Lightbulb},
 {id:"tv",name:"TV + box internet",watts:120,category:"Essentiel",Icon:Tv},
 {id:"fridge",name:"Réfrigérateur",watts:150,category:"Essentiel",Icon:Refrigerator},
 {id:"fans",name:"3 ventilateurs",watts:135,category:"Confort",Icon:Fan},
 {id:"camera",name:"4 caméras de sécurité",watts:40,category:"Essentiel",Icon:Camera},
 {id:"laptop",name:"PC portable + hub",watts:90,category:"Confort",Icon:Laptop},
 {id:"ac",name:"Climatiseur inverter 1 CV",watts:750,category:"Charge élevée",Icon:Waves},
 {id:"pump",name:"Pompe à eau",watts:600,category:"Charge élevée",Icon:Zap},
];
const autonomy=[
 {id:"short",label:"6 à 8 heures",hours:7,desc:"Sécuriser les usages essentiels pendant une coupure."},
 {id:"night",label:"12 à 16 heures",hours:14,desc:"Viser une continuité prolongée, notamment la nuit."},
 {id:"day",label:"Journée complète",hours:24,desc:"Étudier une autonomie renforcée avec recharge solaire."},
];
const profiles=[
 {id:"villa",name:"Résidence / Villa",desc:"Éclairage, TV, frigo et ventilation",ids:["light","tv","fridge","fans"],Icon:Home},
 {id:"office",name:"Bureau / PME",desc:"Éclairage, internet, PC et sécurité",ids:["light","tv","laptop","camera"],Icon:Building2},
 {id:"site",name:"Chantier / Puissance",desc:"Éclairage, caméras, pompe et outils",ids:["light","camera","pump"],Icon:HardHat},
];

export default function PackBuilder(){
 const [step,setStep]=useState(1);
 const [selected,setSelected]=useState(["light","tv","fridge"]);
 const [autonomyId,setAutonomyId]=useState("night");
 const [installation,setInstallation]=useState(true);
 const [visit,setVisit]=useState(true);
 const chosen=useMemo(()=>devices.filter(item=>selected.includes(item.id)),[selected]);
 const load=chosen.reduce((sum,item)=>sum+item.watts,0);
 const target=autonomy.find(item=>item.id===autonomyId)??autonomy[1];
 const energy=Math.round(load*target.hours/850)/1000;
 const inverter=load<=1000?"Onduleur hybride 3,5 kVA":load<=2600?"Onduleur hybride 5,5 kVA":"Architecture supérieure à étudier";
 const battery=energy<=2.5?"Stockage utile autour de 2,5 kWh":energy<=5.2?"Stockage utile autour de 5 kWh":`Stockage modulaire à partir de ${Math.ceil(energy)} kWh`;
 const toggle=(id:string)=>setSelected(items=>items.includes(id)?items.filter(item=>item!==id):[...items,id]);
 const applyProfile=(ids:string[])=>{setSelected(ids);setStep(1);document.getElementById("configurateur")?.scrollIntoView({behavior:"smooth"})};
 const reset=()=>{setStep(1);setSelected(["light","tv","fridge"]);setAutonomyId("night");setInstallation(true);setVisit(true)};
 const message=encodeURIComponent(`Bonjour Fantomas Tech, voici ma simulation de pack énergie :\n\nAppareils : ${chosen.map(item=>item.name).join(", ")||"à définir"}\nCharge simultanée indicative : ${load} W\nAutonomie visée : ${target.label}\nÉnergie utile estimée : ${energy.toFixed(1)} kWh\nOrientation onduleur : ${inverter}\nOrientation batterie : ${battery}\nInstallation demandée : ${installation?"Oui":"Non"}\nVisite technique demandée : ${visit?"Oui":"Non"}\n\nMerci de vérifier cette configuration et de préparer un devis.`);
 return <main className="pack-studio-page">
  <SiteHeader cartCount={chosen.length}/>
  <section className="pack-studio-hero"><p><Cpu/> STUDIO DE CONFIGURATION ÉNERGIE</p><h1>Configurez votre pack.<br/><em>Nous validons l’architecture.</em></h1><span>Trois étapes simples pour préparer votre besoin solaire ou anti-coupure avant l’étude technique à Bamako.</span></section>
  <section className="pack-profiles"><div><span>GAIN DE TEMPS</span><h2>Commencez avec un profil.</h2><p>Un clic présélectionne les usages les plus fréquents. Vous pourrez ensuite modifier chaque appareil.</p></div><div>{profiles.map(({id,name,desc,ids,Icon})=><button onClick={()=>applyProfile(ids)} key={id}><Icon/><span><b>{name}</b><small>{desc}</small></span><ArrowRight/></button>)}</div></section>
  <nav className="pack-progress" aria-label="Étapes du simulateur">{[1,2,3].map(number=><button onClick={()=>setStep(number)} className={step>=number?"active":""} key={number}><span>{step>number?<Check/>:`0${number}`}</span><b>{number===1?"Appareils":number===2?"Autonomie":"Services"}</b></button>)}</nav>
  <section className="pack-studio-layout" id="configurateur">
   <div className="pack-steps">
    {step===1&&<div className="pack-step"><header><span>ÉTAPE 01 / 03</span><h2>Quels appareils doivent rester alimentés ?</h2><p>Sélectionnez les équipements susceptibles de fonctionner simultanément.</p></header><div className="pack-device-grid">{devices.map(({id,name,watts,category,Icon})=><button className={selected.includes(id)?"active":""} onClick={()=>toggle(id)} key={id}><Icon/><span><b>{name}</b><small>{category} • ≈ {watts} W</small></span><i>{selected.includes(id)&&<Check/>}</i></button>)}</div><footer><span>{chosen.length} équipement{chosen.length>1?"s":""} • ≈ {load} W</span><button onClick={()=>setStep(2)}>Choisir l’autonomie <ArrowRight/></button></footer></div>}
    {step===2&&<div className="pack-step"><header><span>ÉTAPE 02 / 03</span><h2>Quelle continuité recherchez-vous ?</h2><p>L’autonomie réelle dépendra du profil d’usage et de la recharge disponible.</p></header><div className="pack-autonomy">{autonomy.map(item=><button className={autonomyId===item.id?"active":""} onClick={()=>setAutonomyId(item.id)} key={item.id}><Battery/><span><b>{item.label}</b><small>{item.desc}</small></span><i>{autonomyId===item.id&&<Check/>}</i></button>)}</div><footer><button className="back" onClick={()=>setStep(1)}><ArrowLeft/> Retour</button><button onClick={()=>setStep(3)}>Choisir les services <ArrowRight/></button></footer></div>}
    {step===3&&<div className="pack-step"><header><span>ÉTAPE 03 / 03</span><h2>Quel accompagnement souhaitez-vous ?</h2><p>Ces choix seront inclus dans votre demande envoyée à Fantomas Tech.</p></header><div className="pack-services"><button className={installation?"active":""} onClick={()=>setInstallation(!installation)}><ShieldCheck/><span><b>Installation et paramétrage</b><small>Pose, raccordement, protections et mise en service à confirmer.</small></span><i>{installation&&<Check/>}</i></button><button className={visit?"active":""} onClick={()=>setVisit(!visit)}><Sun/><span><b>Visite technique à Bamako</b><small>Contrôle du lieu, des appareils, du réseau et des contraintes de pose.</small></span><i>{visit&&<Check/>}</i></button></div><footer><button className="back" onClick={()=>setStep(2)}><ArrowLeft/> Retour</button><span>Configuration prête</span></footer></div>}
   </div>
   <aside className="pack-summary"><div className="pack-summary-head"><span>CONFIGURATION GÉNÉRÉE</span><button onClick={reset}><RotateCcw/> Réinitialiser</button></div><div className="pack-gauge"><small>Charge simultanée estimée</small><strong>{load} <i>W</i></strong><div><span style={{width:`${Math.min(100,load/30)}%`}}/></div></div><div className="pack-recommend"><div><Cpu/><span><small>Orientation onduleur</small><b>{inverter}</b></span></div><div><Battery/><span><small>Orientation stockage</small><b>{battery}</b></span></div><div><Zap/><span><small>Énergie utile estimée</small><b>≈ {energy.toFixed(1)} kWh</b></span></div></div><div className="pack-selection"><span>VOTRE SÉLECTION</span>{chosen.length?chosen.map(item=><div key={item.id}><b>{item.name}</b><small>{item.watts} W</small></div>):<p>Aucun appareil sélectionné.</p>}</div><div className="pack-warning"><Info/><span><b>Estimation indicative</b><small>Les appels de courant, pertes, heures solaires et caractéristiques exactes doivent être vérifiés avant devis.</small></span></div><a className={chosen.length?"":"disabled"} href={chosen.length?`https://wa.me/22371000048?text=${message}`:"#"}><MessageCircle/> Obtenir l’étude sur WhatsApp</a></aside>
  </section>
  <section className="pack-live-system"><header><span>VISUALISEUR D’ALIMENTATION</span><h2>Votre architecture en temps réel.</h2><p>Les équipements sélectionnés apparaissent actifs dans la maison. Ce schéma illustre le flux, sans remplacer un plan électrique.</p></header><div className="pack-system-flow"><div className="system-node source"><Sun/><b>Panneaux</b><small>Production</small></div><i><ArrowRight/></i><div className="system-node"><Cpu/><b>Onduleur</b><small>{inverter}</small></div><i><ArrowRight/></i><div className="system-node"><Battery/><b>Batterie</b><small>{energy.toFixed(1)} kWh utiles</small></div><i><ArrowRight/></i><div className="system-house"><Home/><span>{devices.map(({id,name,Icon})=><i className={selected.includes(id)?"on":""} title={name} key={id}><Icon/></i>)}</span><b>Usages alimentés</b><small>{chosen.length} sur {devices.length} sélectionnés</small></div></div><div className="system-meter"><span>Charge visualisée</span><b>{load} W</b><div><i style={{width:`${Math.min(100,load/30)}%`}}/></div></div></section>
  <section className="pack-value"><header><span>IMPACT AU QUOTIDIEN</span><h2>Pourquoi préparer un système sur mesure ?</h2></header><div><article className="without"><h3><XCircle/> Sans solution adaptée</h3><ul><li>Interruption des activités lors des coupures.</li><li>Équipements sensibles exposés aux variations du réseau.</li><li>Dépendance possible au bruit et au carburant d’un groupe.</li></ul></article><article className="with"><h3><CheckCircle2/> Avec une solution dimensionnée</h3><ul><li><Zap/> Continuité adaptée aux appareils prioritaires.</li><li><ShieldCheck/> Protections et qualité de courant à définir selon le matériel.</li><li><Sun/> Potentiel d’utilisation de l’énergie solaire selon l’installation.</li></ul></article></div></section>
  <section className="pack-export print-quote"><div><span>FICHE DE SIMULATION</span><h2>Partagez ou imprimez votre configuration.</h2><p>Le document reprend vos appareils, la charge, l’autonomie visée et les orientations techniques. Il ne constitue pas encore un devis commercial.</p><div className="print-only pack-print-data"><b>Fantomas Tech — Simulation énergie</b><p>Charge : {load} W • Autonomie : {target.label} • Énergie utile : {energy.toFixed(1)} kWh</p><p>Onduleur : {inverter} • Batterie : {battery}</p><p>Appareils : {chosen.map(item=>item.name).join(", ")}</p></div></div><button onClick={()=>window.print()}><Printer/><span><b>Imprimer la fiche</b><small>Ou enregistrer en PDF</small></span><Download/></button></section>
  <section className="pack-studio-trust"><div><CheckCircle2/><span><b>Calcul transparent</b><small>Hypothèses visibles et résultat indicatif</small></span></div><div><ShieldCheck/><span><b>Validation humaine</b><small>Configuration vérifiée avant commande</small></span></div><div><Sun/><span><b>Projet évolutif</b><small>Solaire, stockage et secours réunis</small></span></div></section>
  <SiteFooter/>
 </main>
}
