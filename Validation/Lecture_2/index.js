
//3rd: using npm validation   see in lecture 2.
// https://www.npmjs.com/package/validator?activeTab=readme


const express=require('express')
const app=express();
const validator = require('validator');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/learn')
    .then(() => {
        console.log("DB connected successfully")
    })
    .catch((err) => {
        console.log("DB not connected")
        console.log(err)
    })

const Schems=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        uinque:true,
        lowercase:true,
        trim:true,      // space remove karta hai but only first end se and last end se remove karta hai beech ka nahi
        minlength:[2,"minimum two lettor"],
        maxlength:30
    },
    ctype:{
        type:String,
        reqired:true,
        lowercase:true,
        enum:['front end','backend','database'],      // enum me ye check karat hai ki iss array me jo iske alawa kuch nahi hona chaiye agar hota hai to error dega.
    },

    videos:{
        type:Number,
        validate(value){           // ye cusiom validataion hai see on mongoose documantation
            if(value<0)
                throw new Error('videos count should not be negative')
        }                                 
    },

    author:String,
    email:{
        type:String,
        required:true,
        uinque:true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Email is Invalid')
        }
    },
    moblie:{
        type:String,
        reqired:true,
        unique:true,    
        validate(value){
            if(!validator.isMobilePhone(value))
                throw new Error('Mobile number is Invalid')
        }
    },

    active:Boolean,
    data:{
        type:Date,
        default:Date.now
    }
})

const playlistSchema=new mongoose.model('playlistSchema',Schems)


let creatDocumnet= async()=>{   // lamda function
    
    try{

        const s1=new playlistSchema({

            name:'javascript',
            ctype:'front end',
            videos:150,
            author:'thapa techinical',
            email:'abc@gmail.com',
            moblie:'5678923451',
            active:true
        });
        const s2=new playlistSchema({

            name:'MongoDb',
            ctype:'database',
            videos:10,
            author:'thapa techinical',
            email:'mjabc12@gmail.com',
            moblie:'9078923451',
            active:true
        })

        const s3=new playlistSchema({

            name:'mongoose',
            ctype:'database',
            videos:4,
            author:'thapa techinical',
            email:'Nikboabc67@gmail.com',
            moblie:'9067923451',
            active:true
        })

        const s4=new playlistSchema({

            name:'ract',
            ctype:'front end',
            videos:50,
            author:'thapa techinical',
            email:'qwerabc00@gmail.com',
            moblie:'5678923000',
            active:true
        })

        await playlistSchema.insertMany([s1,s2,s3,s4])
    }
    catch(err){
        console.log(err);
    }
}

//creatDocumnet();        // db me data dalane ke liye function banaye hai.

/* 1.  find data inside databse or print all data present in data base */
const getDocument= async ()=>{
    const result= await playlistSchema.find().sort({name:1});
    console.log(result);
}

getDocument();    // getting the data present in database 


// server is running at port number 8080.
app.listen('8080',()=>{
    console.log('server is connected at 8080')
})