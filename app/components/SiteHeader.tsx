"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {ArrowRight,Menu,MessageCircle,Search,Send,ShoppingBag,X} from "lucide-react";

const searchItems = [
  {name:"Projecteur HY300 Pro 4K",category:"Maison connectée",price:"60 000 XOF",url:"/maison-connectee"},
  {name:"Caméra de surveillance Indoor",category:"Sécurité",price:"20 000 XOF",url:"/securite"},
  {name:"Caméra de sécurité connectée",category:"Sécurité",price:"28 000 XOF",url:"/securite"},
  {name:"Hub USB Type-C multifonction",category:"Informatique",price:"15 000 XOF",url:"/boutique"},
  {name:"Chargeur sans fil",category:"Énergie",price:"10 000 XOF",url:"/energie"},
];

export default function SiteHeader({cartCount=0}:{cartCount?:number}){
  const [menu,setMenu]=useState(false);
  const [search,setSearch]=useState(false);
  const [query,setQuery]=useState("");
  const [storedCount,setStoredCount]=useState(cartCount);
  const input=useRef<HTMLInputElement>(null);
  useEffect(()=>{
    const onKey=(event:KeyboardEvent)=>{
      if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k"){event.preventDefault();setSearch(v=>!v)}
      if(event.key==="Escape"){setSearch(false);setMenu(false)}
    };
    window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey);
  },[]);
  useEffect(()=>{if(search)setTimeout(()=>input.current?.focus(),40)},[search]);
  useEffect(()=>{const sync=()=>{try{const items=JSON.parse(localStorage.getItem("fantomas-cart")||"[]") as Array<{quantity?:number}>;setStoredCount(items.reduce((sum,item)=>sum+(item.quantity||0),0))}catch{setStoredCount(0)}};sync();window.addEventListener("fantomas-cart-updated",sync);window.addEventListener("storage",sync);return()=>{window.removeEventListener("fantomas-cart-updated",sync);window.removeEventListener("storage",sync)}},[]);
  const results=useMemo(()=>searchItems.filter(item=>(item.name+item.category).toLowerCase().includes(query.toLowerCase())),[query]);
  return <>
    <header className="glass-header">
      <Link className="brand" href="/"><img className="brand-logo" src="/assets/fantomas-original/logo.png" alt="Logo Fantomas Tech"/><span>FANTOMAS<small>TECH</small></span></Link>
      <nav aria-label="Navigation principale" className={menu?"nav open":"nav"}>
        <Link href="/">Accueil</Link><Link href="/boutique">Boutique</Link><Link href="/maison-connectee">Maison connectée</Link><Link href="/energie">Énergie</Link><Link href="/conseils">Conseils</Link><Link className="nav-new" href="/pack-builder">Simulateur <b>NEW</b></Link>
      </nav>
      <div className="head-actions">
        <button className="quick-search search-trigger" onClick={()=>setSearch(true)} aria-label="Ouvrir la recherche rapide"><Search size={15}/><span>Rechercher</span><kbd>⌘K</kbd></button>
        <Link className="cart-pill" href="/panier"><ShoppingBag size={15}/> <span>Panier</span> <b>{storedCount}</b></Link>
        <a className="wa-button" href="https://wa.me/22371000048?text=Bonjour%20Fantomas%20Tech%2C%20je%20souhaite%20un%20devis."><Send size={14}/> Devis WhatsApp</a>
        <button className="burger" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label="Ouvrir le menu">{menu?<X size={22}/>:<Menu size={22}/>}</button>
      </div>
    </header>
    {search&&<div className="search-overlay" role="dialog" aria-modal="true" aria-label="Recherche rapide" onMouseDown={e=>{if(e.target===e.currentTarget)setSearch(false)}}>
      <div className="search-modal"><div className="search-box"><Search size={18}/><input ref={input} value={query} onChange={e=>setQuery(e.target.value)} placeholder="Produit, catégorie, usage…" aria-label="Rechercher un produit"/><kbd>ESC</kbd></div>
      <p className="search-label">RÉSULTATS RAPIDES</p><div className="search-results">{results.map(item=><Link href={item.url} onClick={()=>setSearch(false)} key={item.name}><span><b>{item.name}</b><small>{item.category}</small></span><strong>{item.price}</strong><ArrowRight size={15}/></Link>)}{!results.length&&<p>Aucun résultat. Essayez « caméra », « énergie » ou « projecteur ».</p>}</div>
      <a className="search-help" href="https://wa.me/22371000048"><MessageCircle size={15}/> Vous ne trouvez pas ? Demandez à un conseiller WhatsApp <ArrowRight size={14}/></a></div>
    </div>}
  </>;
}
