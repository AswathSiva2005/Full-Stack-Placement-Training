const mongoose = require('mongoose');

const url = 'mongodb+srv://harikarthikvajravel12_db_user:harikarthik123@cluster0.w9fwj2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


mongoose.connect(url)

 .then(()=>console.log("connection established...."))
 .catch((err) =>  console.log(err))

