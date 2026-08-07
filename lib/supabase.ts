export type ProductRecord={id?:string;slug:string;name:string;category:string;price:number;image_url:string;availability:string;description:string;featured:boolean;active:boolean;sort_order:number};
export type ContactMessage={id?:string;name:string;email:string;phone:string;subject:string;message:string;status?:"new"|"read"|"replied"|"archived";created_at?:string};

const url=process.env.NEXT_PUBLIC_SUPABASE_URL||"";
const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||"";
const baseHeaders={apikey:key,"Content-Type":"application/json"};

export async function getProducts(includeInactive=false){
 if(!url||!key)return [] as ProductRecord[];
 const query=includeInactive?"select=*&order=sort_order.asc,name.asc":"select=*&active=eq.true&order=sort_order.asc,name.asc";
 const response=await fetch(`${url}/rest/v1/products?${query}`,{headers:baseHeaders,cache:"no-store"});
 if(!response.ok)throw new Error("Catalogue Supabase indisponible");
 return response.json() as Promise<ProductRecord[]>;
}

export async function signIn(email:string,password:string){
 const response=await fetch(`${url}/auth/v1/token?grant_type=password`,{method:"POST",headers:baseHeaders,body:JSON.stringify({email,password})});
 if(!response.ok)throw new Error("Identifiants incorrects ou compte non autorisé");
 return response.json() as Promise<{access_token:string;user:{email:string}}>;
}

export async function saveProduct(product:ProductRecord,token:string){
 const updating=Boolean(product.id);const endpoint=updating?`${url}/rest/v1/products?id=eq.${product.id}`:`${url}/rest/v1/products`;
 const response=await fetch(endpoint,{method:updating?"PATCH":"POST",headers:{...baseHeaders,Authorization:`Bearer ${token}`,Prefer:"return=representation"},body:JSON.stringify(product)});
 if(!response.ok)throw new Error(await response.text());return response.json();
}

export async function deleteProduct(id:string,token:string){
 const response=await fetch(`${url}/rest/v1/products?id=eq.${id}`,{method:"DELETE",headers:{...baseHeaders,Authorization:`Bearer ${token}`}});
 if(!response.ok)throw new Error("Suppression refusée");
}

export async function importProducts(products:ProductRecord[],token:string){
 const response=await fetch(`${url}/rest/v1/products?on_conflict=slug`,{method:"POST",headers:{...baseHeaders,Authorization:`Bearer ${token}`,Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify(products)});
 if(!response.ok)throw new Error(await response.text());
}

export async function uploadProductImage(file:File,token:string){
 const safe=`${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9.]+/g,"-")}`;
 const response=await fetch(`${url}/storage/v1/object/product-images/${safe}`,{method:"POST",headers:{apikey:key,Authorization:`Bearer ${token}`,"Content-Type":file.type||"application/octet-stream","x-upsert":"true"},body:file});
 if(!response.ok)throw new Error("Envoi de l’image impossible");return `${url}/storage/v1/object/public/product-images/${safe}`;
}

export async function sendContactMessage(message:ContactMessage){
 const response=await fetch(`${url}/rest/v1/contact_messages`,{method:"POST",headers:{...baseHeaders,Prefer:"return=minimal"},body:JSON.stringify(message)});
 if(!response.ok)throw new Error("Votre message n’a pas pu être envoyé. Réessayez ou contactez-nous par WhatsApp.");
}

export async function getMessages(token:string){
 const response=await fetch(`${url}/rest/v1/contact_messages?select=*&order=created_at.desc`,{headers:{...baseHeaders,Authorization:`Bearer ${token}`},cache:"no-store"});
 if(!response.ok)throw new Error("La table des messages n’est pas encore configurée.");
 return response.json() as Promise<ContactMessage[]>;
}

export async function updateMessageStatus(id:string,status:ContactMessage["status"],token:string){
 const response=await fetch(`${url}/rest/v1/contact_messages?id=eq.${id}`,{method:"PATCH",headers:{...baseHeaders,Authorization:`Bearer ${token}`,Prefer:"return=minimal"},body:JSON.stringify({status})});
 if(!response.ok)throw new Error("Mise à jour du message impossible");
}

export async function deleteMessage(id:string,token:string){
 const response=await fetch(`${url}/rest/v1/contact_messages?id=eq.${id}`,{method:"DELETE",headers:{...baseHeaders,Authorization:`Bearer ${token}`}});
 if(!response.ok)throw new Error("Suppression du message impossible");
}
