"use client";

import {useEffect,useMemo,useState} from "react";
import Link from "next/link";
import {ArrowRight,Check,CheckCircle2,ChevronRight,CreditCard,MapPin,Minus,PackageCheck,Plus,Send,ShieldCheck,ShoppingBag,Sparkles,Trash2,Truck} from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

type CartItem={id:string;title:string;category:string;price:number;quantity:number;image:string};
const suggestions:CartItem[]=[
 {id:"hub-usb-type-c-multifonction",title:"Hub USB Type-C multifonction",category:"Informatique",price:15000,quantity:1,image:"https://www.fantomas.tech/images/products/computing/usb-c-hub-01.webp"},
 {id:"wireless-charger-15w",title:"WIRELESS CHARGER 15W",category:"Chargeurs",price:10000,quantity:1,image:"https://www.fantomas.tech/api/product-images/74"},
 {id:"alarme-magnetique",title:"ALARME MAGNÉTIQUE",category:"Sécurité",price:4000,quantity:1,image:"https://www.fantomas.tech/api/product-images/122"},
];
const money=(n:number)=>new Intl.NumberFormat("fr-FR").format(n)+" XOF";

export default function Panier(){
 const [items,setItems]=useState<CartItem[]>([]);
 const [ready,setReady]=useState(false);
 const [delivery,setDelivery]=useState<"delivery"|"pickup">("delivery");
 const [district,setDistrict]=useState("");
 const [payment,setPayment]=useState("À confirmer");
 useEffect(()=>{try{const saved=localStorage.getItem("fantomas-cart");if(saved)setItems(JSON.parse(saved))}finally{setReady(true)}},[]);
 useEffect(()=>{if(!ready)return;localStorage.setItem("fantomas-cart",JSON.stringify(items));window.dispatchEvent(new Event("fantomas-cart-updated"))},[items,ready]);
 const count=items.reduce((sum,item)=>sum+item.quantity,0);
 const subtotal=items.reduce((sum,item)=>sum+item.price*item.quantity,0);
 const update=(id:string,delta:number)=>setItems(current=>current.map(item=>item.id===id?{...item,quantity:item.quantity+delta}:item).filter(item=>item.quantity>0));
 const add=(product:CartItem)=>setItems(current=>{const found=current.find(item=>item.id===product.id);return found?current.map(item=>item.id===product.id?{...item,quantity:item.quantity+1}:item):[...current,product]});
 const relevant=useMemo(()=>suggestions.filter(product=>!items.some(item=>item.id===product.id)).slice(0,3),[items]);
 const progress=Math.min(100,(items.length?45:0)+(delivery?25:0)+(delivery==="pickup"||district.trim()?20:0)+(payment?10:0));
 const message=encodeURIComponent(`Bonjour Fantomas Tech, je souhaite confirmer cette commande :\n\n${items.map(item=>`• ${item.title} × ${item.quantity} — ${money(item.price*item.quantity)}`).join("\n")}\n\nSous-total des articles : ${money(subtotal)}\nMode de réception : ${delivery==="delivery"?"Livraison à Bamako":"Retrait au point de vente"}\nQuartier / repère : ${district||"À préciser"}\nPréférence de paiement : ${payment}\n\nMerci de confirmer la disponibilité, les frais éventuels, le délai et le total final avant paiement.`);
 if(!ready)return <main className="cart-page"><SiteHeader/><div className="cart-loading">Préparation de votre panier…</div></main>;
 return <main className="cart-page">
  <SiteHeader cartCount={count}/>
  <section className="cart-hero"><div><p><ShoppingBag/> VOTRE PANIER FANTOMAS</p><h1>Finalisez votre sélection.<br/><em>Nous confirmons chaque détail.</em></h1></div><span><b>{count}</b> article{count>1?"s":""}<small>{items.length?money(subtotal):"Panier vide"}</small></span></section>
  {!items.length?<section className="cart-empty"><ShoppingBag/><h2>Votre panier est vide.</h2><p>Ajoutez des produits depuis la boutique ou préparez une configuration énergie sur mesure.</p><div><Link href="/boutique">Explorer la boutique <ArrowRight/></Link><Link href="/pack-builder">Composer un pack <ChevronRight/></Link></div></section>:<>
   <section className="cart-progress"><div><span>COMMANDE PRÊTE À {progress}%</span><b>{progress===100?"Prête pour confirmation":"Complétez vos informations"}</b></div><div><i style={{width:`${progress}%`}}/></div><small>La disponibilité, la livraison et le paiement seront confirmés avant validation finale.</small></section>
   <section className="cart-layout">
    <div className="cart-main"><div className="cart-section-head"><div><span>01</span><h2>Articles sélectionnés</h2></div><Link href="/boutique">Continuer mes achats <ArrowRight/></Link></div><div className="cart-items">{items.map(item=><article key={item.id}><div className="cart-product-img"><img src={item.image} alt={item.title}/></div><div className="cart-product-copy"><small>{item.category}</small><h3>{item.title}</h3><span>Disponibilité à confirmer</span><strong>{money(item.price)}</strong></div><div className="cart-quantity"><button onClick={()=>update(item.id,-1)} aria-label={`Diminuer ${item.title}`}><Minus/></button><b>{item.quantity}</b><button onClick={()=>update(item.id,1)} aria-label={`Augmenter ${item.title}`}><Plus/></button></div><strong className="cart-line-total">{money(item.price*item.quantity)}</strong><button className="cart-remove" onClick={()=>setItems(current=>current.filter(product=>product.id!==item.id))} aria-label={`Retirer ${item.title}`}><Trash2/></button></article>)}</div>
    {relevant.length>0&&<div className="cart-cross"><div><Sparkles/><span><b>Complétez votre équipement</b><small>Produits actuellement référencés dans la boutique</small></span></div><section>{relevant.map(product=><article key={product.id}><img src={product.image} alt={product.title}/><div><small>{product.category}</small><b>{product.title}</b><span>{money(product.price)}</span></div><button onClick={()=>add(product)}><Plus/> Ajouter</button></article>)}</section></div>}
    </div>
    <aside className="cart-checkout"><div className="cart-checkout-title"><span>RÉCAPITULATIF</span><ShieldCheck/><h2>Votre commande</h2></div><div className="cart-totals"><span>Sous-total articles <b>{money(subtotal)}</b></span><span>Livraison <b>À confirmer</b></span><strong>Total provisoire <b>{money(subtotal)}</b></strong></div><div className="cart-choice"><span>MODE DE RÉCEPTION</span><div><button className={delivery==="delivery"?"active":""} onClick={()=>setDelivery("delivery")}><Truck/><b>Livraison</b><small>Frais et délai selon le quartier</small></button><button className={delivery==="pickup"?"active":""} onClick={()=>setDelivery("pickup")}><PackageCheck/><b>Retrait</b><small>Lieu et disponibilité à confirmer</small></button></div></div><label className="cart-field"><span><MapPin/> QUARTIER / REPÈRE</span><input value={district} onChange={event=>setDistrict(event.target.value)} placeholder="Ex. Niamana, près de la mairie" disabled={delivery==="pickup"}/></label><label className="cart-field"><span><CreditCard/> PRÉFÉRENCE DE PAIEMENT</span><select value={payment} onChange={event=>setPayment(event.target.value)}><option>À confirmer</option><option>Orange Money</option><option>Moov Money</option><option>Wave</option><option>Espèces</option></select><small>Le moyen réellement disponible sera confirmé par Fantomas Tech.</small></label><a href={`https://wa.me/22371000048?text=${message}`}><Send/> Confirmer sur WhatsApp</a><p><CheckCircle2/> Aucun paiement n’est demandé sur cette page. L’équipe confirme d’abord le stock, la livraison et le total.</p></aside>
   </section>
  </>}
  <section className="cart-reassurance"><div><ShieldCheck/><span><b>Disponibilité vérifiée</b><small>Confirmation avant paiement</small></span></div><div><Truck/><span><b>Livraison locale</b><small>Délai précisé selon votre zone</small></span></div><div><Check/><span><b>Récapitulatif WhatsApp</b><small>Commande lisible et complète</small></span></div></section>
  <SiteFooter/>
 </main>
}
