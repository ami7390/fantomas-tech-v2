"use client";

import {useMemo,useState} from "react";
import {ArrowRight,BookOpen,Clock,HelpCircle,Search,Send,Sparkles,X} from "lucide-react";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import {articles,categories} from "./articles";

export default function Conseils(){
 const [category,setCategory]=useState<(typeof categories)[number]>("Tous");
 const [query,setQuery]=useState("");
 const filtered=useMemo(()=>articles.filter(article=>(category==="Tous"||article.category===category)&&`${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(query.trim().toLowerCase())),[category,query]);
 const featured=articles.filter(article=>article.featured);
 const ask=(subject:string)=>`https://wa.me/22371000048?text=${encodeURIComponent(`Bonjour Fantomas Tech, j’ai une question concernant : ${subject}`)}`;
 return <main className="academy-page">
  <SiteHeader/>
  <section className="academy-hero">
   <div className="academy-glow"/><p className="academy-kicker"><BookOpen/> TECH & ENERGY ACADEMY</p>
   <h1>Guides, conseils &<br/><em>expertise utile à Bamako.</em></h1>
   <p>Comprenez vos équipements, préparez vos projets et posez de meilleures questions avant l’achat ou l’installation.</p>
   <label className="academy-search"><Search/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Batterie lithium, caméra 4G, onduleur…" aria-label="Rechercher un conseil"/>{query&&<button onClick={()=>setQuery("")} aria-label="Effacer la recherche"><X/></button>}</label>
   <div className="academy-stats"><span><b>{articles.length}</b> guides pratiques</span><span><b>4</b> domaines</span><span><b>Local</b> usages à Bamako</span></div>
  </section>

  {!query&&category==="Tous"&&<section className="academy-section academy-featured">
   <div className="academy-heading"><div><p className="academy-kicker"><Sparkles/> À LA UNE</p><h2>Les guides à lire en premier.</h2></div><span>Recommandés par Fantomas Tech</span></div>
   <div className="academy-bento">{featured.map((article,index)=><article className={index===0?"primary-feature":""} key={article.id}><div className="academy-card-top"><span>{article.badge}</span><small><Clock/> {article.readTime}</small></div><div><small>{article.category}</small><h3>{article.title}</h3><p>{article.excerpt}</p></div><footer><span>{article.author}<small>{article.date}</small></span><Link href={`/conseils/${article.id}`}>Lire le guide <ArrowRight/></Link></footer></article>)}</div>
  </section>}

  <section className="academy-section academy-library">
   <div className="academy-heading library-head"><div><p className="academy-kicker"><BookOpen/> BASE DE CONNAISSANCE</p><h2>Tous les articles & conseils.</h2></div><b>{filtered.length} résultat{filtered.length>1?"s":""}</b></div>
   <div className="academy-filters" role="tablist" aria-label="Filtrer les guides">{categories.map(item=><button role="tab" aria-selected={category===item} className={category===item?"active":""} onClick={()=>setCategory(item)} key={item}>{item}</button>)}</div>
   {filtered.length?<div className="academy-grid">{filtered.map(article=><article key={article.id}><div className="academy-card-top"><span>{article.category}</span><small><Clock/> {article.readTime}</small></div><h3>{article.title}</h3><p>{article.excerpt}</p><footer><span>{article.date}</span><Link href={`/conseils/${article.id}`}>Lire <ArrowRight/></Link></footer></article>)}</div>:<div className="academy-empty"><HelpCircle/><h3>Aucun guide trouvé</h3><p>Essayez « solaire », « batterie », « caméra » ou choisissez une autre catégorie.</p><button onClick={()=>{setQuery("");setCategory("Tous")}}>Afficher tous les guides</button></div>}
  </section>

  <section className="academy-help"><div><p className="academy-kicker"><Send/> ASSISTANCE DIRECTE</p><h2>Une question technique spécifique ?</h2><p>Expliquez votre besoin à l’équipe Fantomas Tech. Pour un dimensionnement, préparez la liste de vos appareils, les lieux et vos priorités.</p></div><a href={ask("une demande de conseil technique")}><Send/> Poser ma question</a></section>
  <SiteFooter/>
 </main>
}
