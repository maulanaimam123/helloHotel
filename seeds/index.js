const mongoose = require('mongoose')
const Hotel = require('../models/hotel')
const hotelList = require('./data')

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

seedDb = async() => {
    await Hotel.deleteMany({})
    for(hotel of hotelList) {
        hotelObject = new Hotel(hotel)
        await hotelObject.save()
    }
}

seedDb().then(() => {
    console.log('Data is saved!')
    mongoose.connection.close()
})