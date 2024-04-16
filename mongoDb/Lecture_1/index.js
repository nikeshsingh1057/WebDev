
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ttchannel') // ttchannel new db  create hua hai jiska name ttchannel hai.
    .then(() => {
        console.log("DB connected successfully")
    })
    .catch((err) => {
        console.log("DB not connected")
        console.log(err)
    })

// creating schema
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    ctype: String,
    videos: Number,
    author: String,
    acitve: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})

// creating model i.e collection create karna or table create karna  jaise sql me table create hota hai.
const Playlist = new mongoose.model("Playlist", playlistSchema)  // model me schema kis type ka hai vo put kar denge 
// note playlist ka name singular me lika hona chaiye mongoose.model ke ander wala playlist


// create document or insert row (jaise sql me table crate hota thaa).
const reactPlaylist = new Playlist({
    name: "react js",
    ctype: "Front End",
    videos: 80,
    author: "thapa Techenical",
    acitve: true
})

// method 1st to save document in db.
reactPlaylist.save(); // ye promsi leta hai data save karwane ke liye.


// method 2nd using async await.

/*
const crateDocument = async () =>{

     try{
        const reactPlaylist2 = new Playlist({
            name:"mern js",
            ctype:"Back End",
            videos: 80000,
            author:"Nikesh Techenical",
            acitve:true
       })

       const result = await reactPlaylist2.save();
       //console.log(result)
     }
     catch(err){
        console.log(err)
     }
}
crateDocument();

*/

// inserting many row at a time.

/*
const crateDocument = async () => {

    try {
        const reactPlaylist1 = new Playlist({
            name: "mern js",
            ctype: "Back End",
            videos: 80000,
            author: "Nikesh Techenical",
            acitve: true
        })

        const reactPlaylist2 = new Playlist({
            name: "Node js",
            ctype: "Back End",
            videos: 90,
            author: "Nikesh Techenical",
            acitve: true
        })

        const reactPlaylist3 = new Playlist({
            name: "java",
            ctype: "Back End",
            videos: 9700,
            author: "Nikesh Techenical",
            acitve: true
        })

        const reactPlaylist4 = new Playlist({
            name: "express js",
            ctype: "Back End",
            videos: 80000,
            author: "Nikesh Techenical",
            acitve: true
        })

        const result = await Playlist.insertMany([reactPlaylist1,reactPlaylist2,reactPlaylist3,reactPlaylist4])
        // console.log(result)
    }
    catch (err) {
        console.log(err)
    }
}
crateDocument();
*/

// getting document

const getDocument = async ()=>{

    const result = await Playlist.find({ctype:"Front End"},{_id:0,name:0,date:0,videos:0})
    console.log(result)
}

getDocument();



