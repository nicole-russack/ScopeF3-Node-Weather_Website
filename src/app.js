const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
const e = require('express')


const app = express()
const port = process.env.PORT || 3000

//defind paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars enginle
app.set('views', viewsPath )
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
//set up static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nicole Russack'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Nicole Russack'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an adress'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        else{
            forcast(latitude, longitude, (error, forcastData) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    forcast: forcastData,
                    location,
                    address: req.query.address

                })
            })
        }
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a serach term"
        })
        
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nicole Russack',
        errorMessage: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nicole Russack',
        errorMessage: 'page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})