const request = require('request')



const forcast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=981a19418de76d79ee741bee903c3cd5&query=" + long + "," + lat + "&units=f"

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Cannot connect to weather service", undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
            
        }else{

            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out.")
        }

      
    })
}


module.exports = forcast