const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HotelSchema = new Schema({
    name: String,
    owner: String,
    price: Number,
    description: String,
    imageURL: String
})

module.exports = mongoose.model('Hotel', HotelSchema)