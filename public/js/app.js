//const { response } = require("express")

console.log("client side js file is loaded")



const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = "loading..."
messageTwo.textContent = ""
//messageOne.textContent = 'From Java script'

weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            //console.log(data.error)
            messageOne.textContent = data.error

        }
        else{
            //console.log(data.location)
            //console.log(data.forcast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forcast


        }
    })
})

})