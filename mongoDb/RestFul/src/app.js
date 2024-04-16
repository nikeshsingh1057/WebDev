const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json())     // json data ke liye middle ware hai.

require('./db/conn');
const Student = require('./models/students');

app.get('/',(req,res)=>{
    res.send('root me aapka swagat hai.');
})
/*
// create a new student. using promisses.
app.post("/students", (req, res) => {

  const user = new Student(req.body);
  user.save().then(()=>{
    res.status.(201).send(user);     // alag alag bhee likh sakte hai.
  })
  .catch((e)=>{
    res.status.(400).send(e);
  })
  //console.log(req.body);
});   

*/
// using async await

app.post("/students", async (req, res) => { // async ke case me try and catch karna hota error handle karne ke liye.
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201);
        res.send(createUser);   // eak line me bhee likh sakte hai.
    }
    catch (e){
        res.status(400);
        res.send(e);
    }

});

// reading the data of resistered students
app.get('/students',async (req,res)=>{
    try{
        const studentsData= await Student.find();
        res.send(studentsData);
    }
    catch{
        res.send(e);
    }
})

// to get the data of specific student
app.get('/students/:id',async (req,res)=>{

   try{
    const _id = req.params.id;  // const {_id} = req.params          // this also valid i.e object destsructure.
    const one= await Student.find({_id:_id}); // jav key value pair same ho to koi eak linkne se bhee work karta hai.
    // console.log(one);
    res.send(one); 
   }
   catch(e){
    res.send(e);
   }
});

// patch operation or update opeartion.

app.patch('/students/:id',async (req,res)=>{
  try{
    const { id }  = req.params;          // note destructuring same name se hota hai i.e jaise uuper me jo id hai usi name se hoga
    const update= await Student.findByIdAndUpdate({_id:id}, req.body , {new : true}) // jav key value pair same ho to koi eak linkne se bhee work karta hai
    // console.log(update)

    if(!update) return res.status(404).send();
    res.send(update);
  }
  catch(e){
    res.status(500)
    res.send(e);
  }
});

//delete student record.

app.delete('/students/:id',async (req,res)=>{
  try{
    const id= req.params.id;
    const deleteStudent=await Student.findByIdAndDelete({_id:id});
    if(!id)
      return res.status(404).send();
    res.send(deleteStudent)
  }
  catch(e){
    res.status(500)
    res.send(e);
  }
})

app.listen(port, () => {
  console.log(` server is connected at port ${port}`);
});
