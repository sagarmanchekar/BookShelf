const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const bookSchema=new Schema({
    name:String,
    genre:String,
    authorid:String
    
});

module.exports=mongoose.model("Book",bookSchema); //we are making model of collection(Book) which look like bookSchema 
