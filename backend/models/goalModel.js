const { timeStamp } = require('console')
const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
    {
        text: {
            type:String,
            required:[true, "please add a text value!"]
        },
        user: {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User',
            
        }
    }
    , 
    {    
        timestamps:true
    }
)

module.exports = mongoose.model('Goal', goalSchema)