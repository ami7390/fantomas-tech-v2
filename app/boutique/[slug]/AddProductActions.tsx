"use client";
import {useState} from "react";
import {Check,MessageCircle,ShoppingBag} from "lucide-react";
import type {ProductRecord} from "../../../lib/supabase";

export default function AddProductActions({product}:{product:ProductRecord}){
 const [added,setAdded]=useState(false);
 const add=()=>{const key="fantomas-cart";const current=JSON.parse(localStorage.getItem(key)||"[]") as Array<{id:string;title:string;category:string;price:number;quantity:number;image:string}>;const id=product.slug;const found=current.find(item=>item.id===id);const next=found?current.map(item=>item.id===id?{...item,quantity:item.quantity+1}:item):[...current,{id,title:product.name,category:product.category,price:product.price,quantity:1,image:product.image_url}];localStorage.setItem(key,JSON.stringify(next));window.dispatchEvent(new Event("fantomas-cart-updated"));setAdded(true);window.setTimeout(()=>setAdded(false),1800)};
 const wa=`https://wa.me/22371000048?text=${encodeURIComponent(`Bonjour Fantomas Tech, je souhaite des informations et confirmer la disponibilité de :\n• ${product.name}\n• Prix affiché : ${new Intl.NumberFormat("fr-FR").format(product.price)} XOF`)}`;
 return <div className="pdp-actions"><button onClick={add}>{added?<Check/>:<ShoppingBag/>}{added?"Ajouté au panier":"Ajouter au panier"}</button><a href={wa} target="_blank" rel="noreferrer"><MessageCircle/>Commander sur WhatsApp</a></div>;
}
