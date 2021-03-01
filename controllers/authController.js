const router = require('express').Router()
const db = require('../models')
const AES = require('crypto-js/aes')
const bcrypt = require('bcrypt')

// display login page
router.get('/login', (req, res) => {
    res.render('auth/login')
})


// display
router.get('/new', (req, res) => {
    res.render('auth/new')
})

router.post('/new', async(req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)

    const user = await db.user.create({
        username: req.body.username,
        password: hashedPassword
    })

    const encryptedId = AES.encrypt(user.id.toString(), 'askdielf').toString
    res.cookie('userId', encryptedId)
    res.redirect('/')
})



router.post('/login', async(req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 12)

        const user = await db.user.findOne({
            where: {
                username: req.body.username
            }
        })
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const encryptedId = AES.encrypt(user.id.toString(), 'idkejkf').toString()
            res.cookie('userId', encryptedId)
            res.redirect('/')
        } else {
            res.render('auth/login', { errors: 'Invalid username/password' })
        }
    } catch (error) {
        console.log(error)
    }
})

// logout user by removing cookie
router.get('/logout', (req, res) => {
    res.clearCookie(userId)
    res.redirect('/')
})


module.exports = router