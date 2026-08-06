import Link from "next/link";
import {ArrowLeft,ArrowRight,BookOpen,CheckCircle2,Clock,Send} from "lucide-react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import {articles} from "../articles";

export default async function AdviceArticle({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const article=articles.find(item=>item.id===slug);
 if(!article)return <main className="advice-article-page"><SiteHeader/><section className="advice-not-found"><BookOpen/><h1>Guide introuvable</h1><p>Ce contenu n’est pas disponible ou son adresse a changé.</p><Link href="/conseils"><ArrowLeft/> Retour aux conseils</Link></section><SiteFooter/></main>;
 const related=articles.filter(item=>item.id!==article.id&&item.category===article.category).slice(0,2);
 const whatsapp=`https://wa.me/22371000048?text=${encodeURIComponent(`Bonjour Fantomas Tech, j’ai une question concernant le guide : ${article.title}`)}`;
 return <main className="advice-article-page">
  <SiteHeader/>
  <article className="advice-article">
   <Link className="advice-back" href="/conseils"><ArrowLeft/> Tous les conseils</Link>
   <header><span>{article.category}</span><h1>{article.title}</h1><p>{article.excerpt}</p><div><b>{article.author}</b><small>{article.date}</small><small><Clock/> {article.readTime} de lecture</small></div></header>
   <div className="advice-body">
    <aside><span>DANS CE GUIDE</span>{article.points.map((point,index)=><a href={`#point-${index+1}`} key={point}>0{index+1} {point}</a>)}</aside>
    <div className="advice-content"><p className="advice-lead">Avant d’acheter ou d’installer un équipement, partez de votre usage réel. Ce guide vous aide à préparer les informations essentielles et à éviter les décisions prises sur une seule caractéristique commerciale.</p>{article.points.map((point,index)=><section id={`point-${index+1}`} key={point}><span>ÉTAPE 0{index+1}</span><h2>{point}</h2><p>{index===0?"Commencez par observer le lieu, les appareils concernés et la façon dont la solution sera utilisée au quotidien. Notez les contraintes plutôt que de vous fier à une estimation approximative.":index===1?"Comparez les options sur plusieurs critères : compatibilité, disponibilité, entretien, évolutivité et budget total. Une solution moins chère à l’achat n’est pas toujours la plus adaptée à l’usage.":"Avant la commande, faites confirmer les caractéristiques et les conditions d’installation. Cette vérification permet d’ajuster la solution et de prévoir les accessoires, protections ou réglages nécessaires."}</p><div><CheckCircle2/> Conseil Fantomas : préparez des photos du lieu et les références exactes de vos équipements.</div></section>)}<div className="advice-note"><b>À retenir</b><p>Ces informations sont des repères généraux. Le dimensionnement et la compatibilité doivent être validés selon votre installation réelle.</p></div><a className="advice-whatsapp" href={whatsapp}><Send/> Poser une question sur ce guide</a></div>
   </div>
  </article>
  {related.length>0&&<section className="advice-related"><span>POURSUIVRE LA LECTURE</span><h2>Guides associés</h2><div>{related.map(item=><Link href={`/conseils/${item.id}`} key={item.id}><small>{item.category} • {item.readTime}</small><h3>{item.title}</h3><span>Lire le guide <ArrowRight/></span></Link>)}</div></section>}
  <SiteFooter/>
 </main>
}
