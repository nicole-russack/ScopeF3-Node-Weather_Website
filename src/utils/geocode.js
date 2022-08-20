const request = require('request')


const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +   ".json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1Ijoibmljb2xlcnVzc2FjayIsImEiOiJjbDZiaW1mMDEwNGp2M2pxZmZuMm8xeHZrIn0.3B8-btDiqQa5UwKh6oxAHw&limit=1"

    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback("Cannot connect to location service", undefined)
        }else if(body.features.length == 0){
            callback('No locations found', undefined)

        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })

        }

    })
}


module.exports = geocode