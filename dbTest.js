const db = require('./models');


const pokemonCreateTest = async() => {
    const newPokemon = await db.pokemon.create({
        name: 'pikachu'
    })
    console.log('Created: ', newPokemon.name)
}

//pokemonCreateTest()

// db.pokemon.findOne({
//     where: {
//         name: 'pikachu'
//     }
// }).then(poke => {
//     console.log('Found: ', poke.name)
// })


const userTest = async() => {
    try {
        const newUser = await db.user.create({
            username: 'test',
            password: 'test'
        })
        console.log('reated a new user!', newUser.username)
        const foundUser = await db.user.findOne({
            where: {
                username: 'test'
            }
        })
        console.log('Found the user!', foundUser.username)
    } catch (error) {
        console.log(error)
    }
}
userTest()