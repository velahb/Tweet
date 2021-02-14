//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event listeners
eventListeners();
function eventListeners()
{
    //cuando el usuario agrega un nuevo tweet

 formulario.addEventListener('submit',agregarTweet);
  //cuando el documento está listo
  document.addEventListener('DOMContentLoaded',()=>{
      tweets = JSON.parse(localStorage.getItem('tweets')) || [];
      console.log(tweets);

      crearHTML();
  })

}



//funciones

function agregarTweet(e)
{
e.preventDefault();
//textarea
const tweet = document.querySelector('#tweet').value;
//validacion
if(tweet === '')
{
  mostrarError('Tweet vacío');
    return;
}
const tweetObj = {
     id: Date.now(),
     tweet
}
//añadir tweets
 tweets = [...tweets,tweetObj];
//crear html
crearHTML();
//reiniciar Formulario
formulario.reset();
}
//mostrar Mensaje de Error
function mostrarError(error)
{
  const mensajeError = document.createElement('p');
  mensajeError.textContent =  error;
  mensajeError.classList.add('error');
  //insertar en contenido
  const contenido = document.querySelector('#contenido');
  contenido.appendChild(mensajeError);

  setTimeout(() => {
      mensajeError.remove();
  }, 3000);

}
function crearHTML()
{
    limpiarHTML();

  if(tweets.length > 0)
  {
   tweets.forEach(tweet=>{
     //agrgar boton eliminar
     const btnEliminar = document.createElement('a'); 
     btnEliminar.classList.add('borrar-tweet');
     btnEliminar.innerText = 'X';
     //elimina tweet
     btnEliminar.onclick = () =>{
       borrarTweet(tweet.id);
     }
    //crear HTML
     const li = document.createElement('li');
     //añadir texto
     li.innerText = tweet.tweet;
    //Asignar boton
    li.appendChild(btnEliminar);
     //insertar en el html
     listaTweets.appendChild(li);
   });
  }
  sincronizarStorage();
}
//agrega tweets a LC
function sincronizarStorage()
{
    localStorage.setItem('tweets',JSON.stringify(tweets));
}
//elimina un tweet
function borrarTweet(id)
{
  tweets = tweets.filter(tweet => tweet.id !== id);
  crearHTML();
}
//limpiar html
function limpiarHTML()
{
    while(listaTweets.firstChild)
    {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
