const mongoose = require('mongoose');
const validator = require('validator');

// creating schema;

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        reqired:true,
        minlength:3
    },
    email:{
        type:String,
        reqired:true,
        unique:[true,"email id already present"],
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('invalid email');
        }
    },
    phone:{
        type:Number,
        min:10,
        require:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
    }
})

// now creating models or collections.
const Student =new mongoose.model('Student',studentSchema)
module.exports = Student;
