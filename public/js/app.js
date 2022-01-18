

const messageone = document.querySelector('#msg-1')
const messagetwo = document.querySelector('#msg-2')

const weatherform = document.querySelector('form');
const search = document.querySelector('input')
weatherform.addEventListener('submit',(e)=>{

    e.preventDefault()
    const location = search.value
    messageone.textContent = 'Loading'
    messagetwo.textContent = ''
    
    
fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.err){
         messageone.textContent = data.error
        }else{
         messageone.textContent = data.location
         messagetwo.textContent = data.forcast
        }
    })
})

})