export default function categoriamenu(bcategorias, panelcategorias){

 
    const d = document;
   
    d.addEventListener("click", (e)=> {     
   
    if (e.target.matches(bcategorias)||e.target.matches(`${bcategorias} *`))
   
    d.querySelector(panelcategorias).classList.toggle("is-active");

   
    
    })}
   