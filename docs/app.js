'use strict';
const refreshButton=document.getElementById('refresh-content');
const statusElement=document.getElementById('content-status');
const read=(data,path)=>path.split('.').reduce((value,key)=>value&&Object.hasOwn(value,key)?value[key]:undefined,data);
const plain=value=>typeof value==='string'&&!/[<>\u0000-\u0008\u000b-\u001f\u007f]/.test(value);
function photo(img,url,alt,origins){
  img.alt=plain(alt)?alt:'Fotografía';img.referrerPolicy='no-referrer';
  img.onerror=()=>{img.hidden=true;};
  try{const u=new URL(url);if(u.protocol!=='https:'||u.username||u.password||!origins.includes(u.origin))throw Error();
    img.hidden=false;img.src=u.href;
  }catch{img.removeAttribute('src');img.hidden=true;}
}
function render(content){
  if(!plain(content?.home?.webModernTitle)||content.home.webModernTitle.length>80)throw Error('Invalid content');
  const origins=Array.isArray(content._control?.imageOrigins)?content._control.imageOrigins:[];
  for(const el of document.querySelectorAll('[data-field]')){const value=read(content,el.dataset.field);if(plain(value))el.textContent=value;}
  for(const img of document.querySelectorAll('[data-image]'))photo(img,read(content,img.dataset.image),read(content,img.dataset.alt),origins);
  const list=document.getElementById('product-list');const fragment=document.createDocumentFragment();
  for(const [id,p] of Object.entries(content.products??{}).slice(0,50)){
    if(!/^[a-z][a-z0-9-]{0,39}$/.test(id)||!plain(p.name)||!plain(p.description)||!plain(p.unit)||!/^\d{1,6}\.\d{2}$/.test(p.price))continue;
    const card=document.createElement('article');card.className='product';card.dataset.product=id;
    const img=document.createElement('img');img.loading='lazy';photo(img,p.image,p.imageAlt,origins);
    const body=document.createElement('div');body.className='product-body';
    const name=document.createElement('h3');name.textContent=p.name;
    const desc=document.createElement('p');desc.textContent=p.description;
    const price=document.createElement('p');price.className='price';price.dataset.price=id;
    price.textContent=new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(Number(p.price))+' / '+p.unit;
    body.append(name,desc,price);card.append(img,body);fragment.append(card);
  }
  list.replaceChildren(fragment);
}
async function loadContent(){
  if(refreshButton.disabled)return;
  refreshButton.disabled=true;statusElement.textContent='Actualizando el contenido…';
  try{
    const url=new URL('./control-de-web.json',location.href);url.searchParams.set('v',String(Date.now()));
    const response=await fetch(url,{cache:'no-store',credentials:'omit'});if(!response.ok)throw Error();
    render(await response.json());statusElement.textContent='Contenido actualizado.';
  }catch{statusElement.textContent='No se pudo actualizar. Inténtalo de nuevo.';}
  finally{refreshButton.disabled=false;}
}
refreshButton.addEventListener('click',loadContent);loadContent();
