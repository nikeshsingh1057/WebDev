//1.st by default mongoose schema type validataion provide karwata hai. i.e schema define karte waqt he isko set karna hota hai. see in example.

//2nd: we can also create our own custom validation  see on google.
//3rd: using npm validation   see in lecture 2.

const express=require('express')
const app=express();

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
        enum:['front end','backend','database','theoury','photography'],      // enum me ye check karat hai ki iss array me jo iske alawa kuch nahi hona chaiye agar hota hai to error dega.
    },

    videos:{
        type:Number,
        validate(value){           // ye cusiom validataion hai see on mongoose documantation
            if(value<0)
                throw new Error('videos count should not be negative')
        }                                 
    },

    author:String,
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

            name:'ejs',
            ctype:'front end',
            videos:0,
            author:'thapa techinical',
            active:true
        });
        const s2=new playlistSchema({

            name:'sql',
            ctype:'database',
            videos:2,
            author:'thapa techinical',
            active:true
        })

        const s3=new playlistSchema({

            name:'dip',
            ctype:'photography',
            videos:12,
            author:'thapa techinical',
            active:true
        })

        const s4=new playlistSchema({

            name:'auto-mata',
            ctype:'theoury',
            videos:5,
            author:'thapa techinical',
            active:true
        })

        await playlistSchema.insertMany([s1,s2,s3,s4])
    }
    catch(err){
        console.log(err);
    }
}

creatDocumnet();        // db me data dalane ke liye function banaye hai.

/* 1.  find data inside databse or print all data present in data base */
const getDocument= async ()=>{
    const result= await playlistSchema.find().sort({name:1});
    console.log(result);
}

//getDocument();


// server is running at port number 8080.
app.listen('8080',()=>{
    console.log('server is connected at 8080')
})