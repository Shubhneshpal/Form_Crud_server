const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    Fname: { type: String},
    Lname: { type: String },
    email: { type: String },
    password: { type: String },
    MobileNo: { type: Number},
    adress: { type: String },
    file: {
        name: { type: String },
        type: { type: String },
        size: { type: Number},
        filename: { type: String}
    }
});

module.exports = mongoose.model('Form', formSchema);
