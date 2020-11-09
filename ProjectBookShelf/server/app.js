const express=require('express');
const {graphqlHTTP}=require('express-graphql');

const schema=require('./schema/schema');
const app=express();
const cors=require('cors');

app.use(cors());


const mongoose=require('mongoose');
 const db="mongodb+srv://SM:Datta@25@cluster0.kp6pp.mongodb.net/<Demo>?retryWrites=true&w=majority";

 // mongoose.connect('mongodb+srv://SM:Datta@25@cluster0.kp6pp.mongodb.net/<Demo>?retryWrites=true&w=majority',{ useNewUrlParser: true });
// mongoose.connection.once('open',()=>{
//     console.log("connected to db");
// });

mongoose.connect(db, {useNewUrlParser: true,useUnifiedTopology: true  }, (err) => {
    if (err)
        console.error(err);
    else
        console.log("Connected to the mongodb"); 
});

app.use('/graphql',graphqlHTTP({
schema ,  //schema:schema   but sice we are using es6 only schema
graphiql:true    //use this tool to load when localhost:
}),
);




app.listen(4000,()=>{
console.log("listening to port 4000");
});

