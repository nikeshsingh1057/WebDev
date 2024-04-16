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
    name:String,
    age:Number,
    roll:Number
})

const Student=new mongoose.model('Student',Schems)

/* //adding single singe data in the database

const s1=new Student({

    name:"nikesh",
    age:31,
    roll:21145545
})

s1.save();
const s2=new Student({
    name:"aman",
    age:45,
    roll:211778
})
s2.save();

*/
// adding multiple data in database at a time.

let creatDocumnet= async()=>{   // lamda function
    
    try{

        const s1=new Student({

            name:"ram",
            age:31,
            roll:21155
        });
        const s2=new Student({

            name:"raman kr",
            age:31,
            roll:21155
        })

        const s3=new Student({

            name:"ram kaka",
            age:1,
            roll:5
        })

        const s4=new Student({

            name:"meenu",
            age:312,
            roll:550
        })

        const s5=new Student({

            name:"mina kumari",
            age:209,
            roll:8770
        })

        await Student.insertMany([s1,s2,s3,s4,s5])
    }
    catch(err){
        console.log(err);
    }
}

//creatDocumnet();        // db me data dalane ke liye function banaye hai.

/* 1.  find data inside databse or print all data present in data base */
const getDocument= async ()=>{
    const result= await Student.find().sort({name:1});
    // console.log(result);
}

getDocument();


// server is running at port number 8080.
app.listen('8080',()=>{
    console.log('server is connected at 8080')
})