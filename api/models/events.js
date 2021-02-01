const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   title: {type: String, required: true},
   price: {type: Number, required: true},
   date: {type: String, required:true}
});

module.exports = mongoose.model('Event', eventSchema);