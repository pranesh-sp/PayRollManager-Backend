var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    emp_id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    employer : {
        type: Number,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true

    },
    joindate: {
        type: String,
        required: true,
        
    },
    interpersonal_skill: {
        type: String,
        required: true,
        
    },
    achievements: {
        type: String,
        required: true,
        
    },
    rating: {
        type: Number
        
        
    },
    Rank: {
        type: Number,
        unique:true 
    },
    Pay: {
        type: Number
        
        
    }

});
mongoose.model('User', UserSchema);


module.exports = mongoose.model('User');
