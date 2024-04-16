const express = require('express');
const {connectToMongodb}= require('./connect');
const URL =require('./models/url');
const urlRoute = require('./routes/url');

const app = express()
const PORT = 8001;

connectToMongodb('mongodb://localhost:27017/URL-SHORTENER')
.then(()=> console.log('Mongodb connected'));

app.use(express.json());

app.use('/url',urlRoute);

app.get('/:shortId', async (req,res)=>{
  const shortId = req.params.shortId;
   const entry=await URL.findOneAndUpdate({
    shortId
  },{ $push: {
    VisitHistory:{
      timeStamp:Date.now(),
    },
  } ,
}
);
res.redirect(entry.redirectUrl);
});

app.listen(PORT,()=>console.log(`Server Started :${PORT}`))