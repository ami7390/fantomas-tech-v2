import Link from "next/link";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export type Card={name:string;price:string;spec:string;image:string;badge?:string};
export default function CategoryPage({kicker,title,accent,intro,image,cards,benefits}:{kicker:string;title:string;accent:string;intro:string;image:string;cards:Card[];benefits:string[]}){
  const slugify=(value:string)=>value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  return <main className="inner-page"><SiteHeader/><section className="page-hero"><div><p className="kicker"><span/>{kicker}</p><h1>{title} <em>{accent}</em></h1><p>{intro}</p><div className="hero-buttons"><a className="btn primary" href="#selection">Voir la sélection ↗</a><a className="btn outline" href="https://wa.me/22371000048">Parler à un expert →</a></div></div><div className="page-hero-image"><img src={image} alt="Univers Fantomas Tech"/></div></section>
  <section className="mini-trust">{benefits.map((b,i)=><div key={b}><i>{["◇","ϟ","◉","⌁"][i%4]}</i><span>{b}</span></div>)}</section>
  <section id="selection" className="section"><div className="section-title"><p className="kicker"><span/>SÉLECTION FANTOMAS</p><h2>Des équipements <em>bien choisis.</em></h2></div><div className="product-grid category-products">{cards.map(c=><article className="product-card" key={c.name}>{c.badge&&<span className="product-badge">{c.badge}</span>}<Link href={`/boutique/${slugify(c.name)}`}><div className="product-img"><img src={c.image} alt={c.name}/></div><h3>{c.name}</h3><p>{c.spec}</p></Link><div className="product-foot"><strong>{c.price}</strong><Link aria-label={`Voir les informations de ${c.name}`} href={`/boutique/${slugify(c.name)}`}>＋</Link></div></article>)}</div></section>
  <section className="category-cta"><div><p className="kicker"><span/>SOLUTION SUR MESURE</p><h2>Composez un pack adapté à votre besoin.</h2></div><Link className="btn primary" href="/pack-builder">Lancer le simulateur ↗</Link></section><SiteFooter/></main>
}
