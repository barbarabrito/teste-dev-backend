const mongoose = require('../../db/connection');

const customerSchema = new mongoose.Schema({

    name:{
        type: String,
        require: true,
    },
    birthDate:{
        type: String,
        require: true,
    },
    sex:{
        type:String,
        require:true,
    },
    healthIssues:[{
        
        name: {
          type: String,
        },
        degree:{
            type:Number,
        },
    }],
});

customerSchema.set('timestamps', true);

module.exports = mongoose.model('customer', customerSchema)