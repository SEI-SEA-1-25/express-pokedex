/* Required Modules and Variables */
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const morgan = require('morgan')
const cryptoJS = require('crypto-js')

require('dotenv').config()

const app = express()
const rowdyRes = rowdy.begin(app)
const PORT = process.env.PORT || 8080;
// middleware and config
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(require('morgan')('dev'))


/* Controllers */

app.use('/pokemon', require('./controllers/pokemonsController'))
app.use('/auth', require('./controllers/authController'))

/* Routes */

// app.get('/', function(req, res) {

//     res.render('index.ejs')
// })

app.get('/', async(req, res) => {
    try {
        const pokeURL = 'https://pokeapi.co/api/v2/pokemon?limit=151'
            // console.log(pokeURL)
        const response = await axios.get(pokeURL)
        const pokemons = response.data.results
        res.render('index', { pokemons: pokemons })
            //console.log(pokemons)
    } catch (error) {
        console.log(error)
        res.render('index', { pokemons: [] })
    }
    // res.send('hello world')
})

app.listen(PORT, () => {
    rowdyRes.print()
})