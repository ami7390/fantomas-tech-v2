"use client";

import {FormEvent,useState} from "react";
import {ArrowRight,BellRing,CheckCircle2,Clock,Send,ShieldCheck,Sparkles,Wrench,Zap} from "lucide-react";

export default function Maintenance(){
 const [contact,setContact]=useState("");
 const [submitted,setSubmitted]=useState(false);
 const notify=(event:FormEvent)=>{event.preventDefault();if(!contact.trim())return;const text=encodeURIComponent(`Bonjour Fantomas Tech, je souhaite être averti(e) lorsque la nouvelle plateforme sera disponible. Mon contact : ${contact.trim()}`);window.open(`https://wa.me/22371000048?text=${text}`,"_blank");setSubmitted(true)};
 return <main className="maintenance-page">
  <div className="maintenance-orb orange"/><div className="maintenance-orb cyan"/><div className="maintenance-grid"/>
  <header className="maintenance-header"><a href="/" className="maintenance-brand"><img src="/assets/fantomas-original/logo.png" alt="Logo Fantomas Tech"/><span>FANTOMAS<small>TECH</small></span></a><span className="maintenance-status"><i/> NOUVELLE EXPÉRIENCE EN PRÉPARATION</span></header>
  <section className="maintenance-content">
   <div className="maintenance-badge"><Wrench/> Refonte de la plateforme</div>
   <h1>Quelque chose de<br/><em>puissant se prépare.</em></h1>
   <p>Fantomas Tech prépare une expérience plus rapide et plus claire pour découvrir la technologie, la sécurité, la maison connectée et les solutions d’énergie à Bamako.</p>
   <div className="maintenance-progress"><div><span>PROGRESSION DE LA REFONTE</span><b>Phase finale</b></div><div><i/></div><small><Clock/> La date d’ouverture sera communiquée dès sa confirmation.</small></div>
   <div className="maintenance-pillars"><div><Zap/><span><b>Plus rapide</b><small>Navigation optimisée</small></span></div><div><ShieldCheck/><span><b>Plus rassurant</b><small>Informations clarifiées</small></span></div><div><Sparkles/><span><b>Plus intuitif</b><small>Simulateurs et conseils</small></span></div></div>
   <div className="maintenance-notify"><div><span>RESTEZ INFORMÉ</span><h2>Prévenez-moi lors de l’ouverture.</h2><p>Votre demande sera envoyée directement à Fantomas Tech sur WhatsApp.</p></div>{submitted?<div className="maintenance-success"><CheckCircle2/><span><b>Demande préparée</b><small>Validez son envoi dans WhatsApp pour être ajouté à la liste.</small></span></div>:<form onSubmit={notify}><label><input value={contact} onChange={event=>setContact(event.target.value)} placeholder="Numéro WhatsApp ou adresse e-mail" aria-label="Votre contact" required/><BellRing/></label><button><span>M’avertir</span><ArrowRight/></button></form>}</div>
   <div className="maintenance-order"><span><b>Besoin d’un produit maintenant ?</b><small>Les commandes et demandes de conseil restent ouvertes pendant la refonte.</small></span><a href="https://wa.me/22371000048?text=Bonjour%20Fantomas%20Tech%2C%20je%20souhaite%20passer%20une%20commande%20pendant%20la%20refonte%20du%20site."><Send/> Commander sur WhatsApp</a></div>
   <div className="maintenance-contact"><span><b>Fantomas Tech</b><small>Niamana, à côté de la Mairie — Bamako, Mali</small></span><a href="tel:+22371000048">+223 71 00 00 48</a><a href="mailto:contact@fantomas.tech">contact@fantomas.tech</a></div>
  </section>
 </main>
}
