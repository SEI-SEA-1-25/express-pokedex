const router = require('express').Router()
const db = require('../models')
const axios = require('axios')

router.get('/', async(req, res) => {
    // try {
    //     res.render('pokemon/index')
    // } catch (error) {
    //     console.log(error)
    // }
    try {
        const pokemon = await db.pokemon.findAll({
            // where: {
            //     userId: req.user.id
            // }
            raw: true,
            // console.log(pokemon)
            include: [db.user]
        })
        console.log(user)
        res.render('pokemon/index', { pokemon: pokemon })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/:name', async(req, res) => {
    try {
        const pokeApiUrl = `https://pokeapi.co/api/v2/pokemon/${req.params.name}`
        const response = await axios.get(pokeApiUrl)
        const pokemon = response.data
        res.render('pokemon/show', { pokemon: pokemon })
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async(req, res) => {
    console.log(req.body)
    try {
        const [newPokemon, created] = await db.pokemon.findOrCreate({
                where: { name: req.body.name }
            })
            // console.log(newPokemon)
            // console.log(created)
        res.locals.user.addPokemon(newPokemon)
        res.redirect('/pokemon')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.post('/show', async(req, res) => {
    try {

    } catch (error) {
        console.log(error)
    }
})

module.exports = router