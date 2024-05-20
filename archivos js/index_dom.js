import hamburgerMenu from "./menu_hamburguesa.js"
import categoriamenu from "./bcategorias.js"




const item1 = document.getElementById('item1')
const item2 = document.getElementById('item2')
const item3 = document.getElementById('item3')
const item4 = document.getElementById('item4')
const item5 = document.getElementById('item5')
const item6 = document.getElementById('item6')



//volver variables los id 


 let  hideTextbtn = document.getElementById('hideText-btn')

 let  hideText = document.getElementById('hideText')

 let hideTextbtn2 = document.getElementById('hideText-btn2')

 let hideText2 = document.getElementById('hideTextdos')

 let  hideTextbtn3 = document.getElementById('hideText-btn3')

 let  hideText3 = document.getElementById('hideText3')

 let  hideTextbtn4 = document.getElementById('hideText-btn4')

 let  hideText4 = document.getElementById('hideText4')

 let  hideTextbtn5 = document.getElementById('hideText-btn5')

 let  hideText5 = document.getElementById('hideText5')

 let  hideTextbtn6 = document.getElementById('hideText-btn6')

 let  hideText6 = document.getElementById('hideText6')



//para funcionar el carrito 

const panelcarrito = document.getElementById('btn-carritoc')

const items = document.getElementById('items')
const footer = document.getElementById('footer')

const templateCarrito = document.getElementById('template-carrito').content
const templateFooter = document.getElementById('template-footer').content

const fragment = document.createDocumentFragment()

let carrito = {}


const d = document;





d.addEventListener("DOMContentLoaded", (e)=>{


    
   
    
  

      
   hamburgerMenu(".panel-btn", ".panel");

    


   categoriamenu(".bcategorias",".panelcategorias");
    

    fetchData()


    if (localStorage.getItem('carrito')){

       carrito = JSON.parse(localStorage.getItem('carrito'))
       pintarCarrito()

    }


    items.addEventListener('click', e => {

    btnAccion(e)



    })

    item1.addEventListener('click', e => {

    addCarrito(e)

     })

     item2.addEventListener('click', e => {

      addCarrito(e)
  
       })

       item3.addEventListener('click', e => {

        addCarrito(e)
    
         })

         item4.addEventListener('click', e => {

          addCarrito(e)
      
           })

           item5.addEventListener('click', e => {

            addCarrito(e)
        
             })

             item6.addEventListener('click', e => {

              addCarrito(e)
          
               })

     panelcarrito.addEventListener('click', e => {

      



     })




   

  })


//crear addevenlistener por cada uno de estos botones 

item1.addEventListener('click', e => {

console.log(e.target)


})

item2.addEventListener('click', e => {

  console.log(e.target)
  
  
  })



  item3.addEventListener('click', e => {

    console.log(e.target)
    
    
    })



    item4.addEventListener('click', e => {

      console.log(e.target)
      
      
      })



      item5.addEventListener('click', e => {

        console.log(e.target)
        
        
        })



        item6.addEventListener('click', e => {

          console.log(e.target)
          
          
          })


    

 



const fetchData = async () => {

  try{


  const res = await fetch('api.json')
  const data = await res.json()
  //console.log(data)
  pintarCards(data)



  }catch(error){

    console.log(error)
  }


}


const pintarCards = data =>{

    
  data.forEach(producto=>{
    console.log(producto)
    templateCard.querySelector('h5').textContent = producto.title
    templateCard.querySelector('p').textContent = producto.precio
    //templateCard.querySelector('img').setAttribute('src', producto.thumbnailUrl)



     const clone = templateCard.cloneNode(true)
     fragment.appendChild(clone)

  })

  item.appendChild(fragment)



}



const addCarrito = e => {


if (e.target.classList.contains('btn-comprar')){


setCarrito(e.target.parentElement)

}

e.stopPropagation()


}



const setCarrito = objeto => {

const producto = {

 id: objeto.querySelector('.btn-comprar').dataset.id,
 title: objeto.querySelector('button').textContent,
 precio: objeto.querySelector('p').textContent,
 cantidad: 1

}


if (carrito.hasOwnProperty(producto.id)){

  producto.cantidad = carrito[producto.id].cantidad+1

}

carrito[producto.id]={...producto}
pintarCarrito()


} 


const pintarCarrito = () => {



 //console.log(carrito)


 items.innerHTML= ''

  Object.values(carrito).forEach(producto => {

     templateCarrito.querySelector('th').textContent = producto.id
     templateCarrito.querySelectorAll('td')[0].textContent = producto.title
     templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
     templateCarrito.querySelector('.btn-info').dataset.id = producto.id
     templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
    templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

    const clone = templateCarrito.cloneNode(true)
    fragment.appendChild(clone)


    

  })

  items.appendChild(fragment)


  pintarFooter()

  localStorage.setItem('carrito', JSON.stringify(carrito))

}



const pintarFooter = () => {

  footer.innerHTML=''

  if (Object.keys(carrito).length=== 0){

   
    footer.innerHTML = `
    <th scope="row" colspan="5">Carrito vacio - Por favor compre</th>
    `
    return



  }

  const nCantidad = Object.values(carrito).reduce( (acc, {cantidad})=> acc + cantidad ,0 )

  const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio})=>acc + cantidad * precio ,0)

  templateFooter.querySelectorAll('td')[0].textContent = nCantidad

  templateFooter.querySelector('span').textContent = nPrecio


  const clone = templateFooter.cloneNode(true)

  fragment.appendChild(clone)

  footer.appendChild(fragment)


  const btnVaciar = document.getElementById('vaciar-carrito')
  btnVaciar.addEventListener('click', () =>{

     carrito={}
     pintarCarrito()
  

  })



}

const btnAccion = e =>{

 //accion aumentar

   if (e.target.classList.contains('btn-info')){

   const producto = carrito[e.target.dataset.id]
   producto.cantidad++
   carrito[e.target.dataset.id] = {...producto}
   pintarCarrito()

  }

 if (e.target.classList.contains('btn-danger')){

  
  const producto = carrito[e.target.dataset.id]
  producto.cantidad--
  if (producto.cantidad === 0){
   
   delete carrito[e.target.dataset.id]

   

  }

  pintarCarrito()

}

 e.stopPropagation()



}



hideTextbtn.addEventListener('click', toggleText);

function toggleText(){

hideText.classList.toggle('show')


if (hideText.classList.contains('show')){

hideTextbtn.innerHTML ='Cerrar'

}else{

hideTextbtn.innerHTML = 'Descripcion'

}


}


hideTextbtn2.addEventListener('click', toggleText2);

function toggleText2(){

hideText2.classList.toggle('show2')

if (hideText2.classList.contains('show2')){

  hideTextbtn2.innerHTML ='Cerrar'
  
  }else{
  
  hideTextbtn2.innerHTML = 'Descripcion'
  }


}

 hideTextbtn3.addEventListener('click', toggleText3);

 function toggleText3(){

 hideText3.classList.toggle('show3')

 if (hideText3.classList.contains('show3')){

  hideTextbtn3.innerHTML ='Cerrar'
  
  }else{
  
  hideTextbtn3.innerHTML = 'Descripcion'
  }


 }


 hideTextbtn4.addEventListener('click', toggleText4);

 function toggleText4(){

 hideText4.classList.toggle('show4')

 if (hideText4.classList.contains('show4')){

  hideTextbtn4.innerHTML ='Cerrar'
  
  }else{
  
  hideTextbtn4.innerHTML = 'Descripcion'
  }


 }

 hideTextbtn5.addEventListener('click', toggleText5);

 function toggleText5(){

 hideText5.classList.toggle('show5')

 if (hideText5.classList.contains('show5')){

  hideTextbtn5.innerHTML ='Cerrar'
  
  }else{
  
  hideTextbtn5.innerHTML = 'Descripcion'
  }


}

 hideTextbtn6.addEventListener('click', toggleText6);

 function toggleText6(){

 hideText6.classList.toggle('show6')


 if (hideText6.classList.contains('show6')){

  hideTextbtn6.innerHTML ='Cerrar'
  
  }else{
  
  hideTextbtn6.innerHTML = 'Descripcion'
  }


 }


 

 
 



