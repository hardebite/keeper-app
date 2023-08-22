require('dotenv').config;
const express =require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
origin:'http://localhost:3000'
}))

app.use(bodyParser.urlencoded({
    extended: true
  }));
  mongoose.set('strictQuery',true);
  // mongoose.connect("mongodb://127.0.0.1:27017/blogDB",{useNewUrlParser:true})
  process.env.DATABASE 
  const notesSchema={
    title:String,
    content:String
  };
  const Note = mongoose.model("Note",notesSchema);
  const note1= new Note({
    title:'note 2',
    content:"i am fine"
  })
//   note1.save()
  app.get('/',async(req,res)=>{
    const notes = await Note.find({})
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
 
    res.send(notes).status(200)
  })
  .post('/',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body)
    const note= new Note({
        title:req.body.title,
        content:req.body.content
      })
      note.save()
      .then(()=>{
        res.redirect("/");
    }).catch((err) =>{
        console.log(err)
    })
    
  })
  .delete('/',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body.id)
    await Note.findByIdAndDelete({_id:req.body.id}).then((err)={
        if(err){
            console.log(err)
        }
    })
    res.send('delete')
  })
  .listen(5000,function(){
    console.log('server is running on port 5000')
  })