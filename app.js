const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const Hotel = require('./models/hotel')
const methodOverride = require('method-override')
const morgan = require('morgan')
const ejsMate = require('ejs-mate')

app = express()
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('tiny'))

mongoose.connect('mongodb://localhost:27017/helloHotelDb', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to the database!')
    }).catch((err) => {
        console.log('Unable to connect to database')
        console.log(err)
    })

app.get('/', (req, res) => {
    res.render('./pages/homepage')
})

app.get('/hotel/', async (req, res) => {
    const hotelList = await Hotel.find({})
    res.render('./pages/index', {hotelList})
})

app.get('/hotel/new', (req, res) => {
    res.render('./pages/new')
})

app.post('/hotel', async (req, res) => {
    hotel = new Hotel(req.body)
    await hotel.save()
    res.redirect('/hotel')
})

app.get('/hotel/:id', async (req, res) => {
    const {id} = req.params
    const hotel = await Hotel.findById(id)
    res.render('./pages/show', {hotel})
})

app.get('/hotel/:id/edit', async (req, res) => {
    const {id} = req.params
    const hotel = await Hotel.findById(id)
    res.render('./pages/edit', {hotel})
})

app.put('/hotel/:id', async (req, res) => {
    const {id} = req.params
    hotel = await Hotel.findByIdAndUpdate(id, req.body)
    res.redirect(`/hotel/${req.params.id}`)
})

app.delete('/hotel/:id', async (req, res) => {
    const {id} = req.params
    hotel = await Hotel.findByIdAndDelete(id)
    res.redirect('/hotel')
})

app.listen(8080)
console.log('Listening on port: 8080')