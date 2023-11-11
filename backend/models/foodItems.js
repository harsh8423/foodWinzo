const mongoose = require('mongoose')

const { Schema } = mongoose;

const fooItemsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    CategoryName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    img: {
        type: String,
    },
    options:[{
        half:{type: String},
        full:{type: String},
    }]

});

module.exports = mongoose.model('food-items', fooItemsSchema)