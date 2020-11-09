const graphql=require('graphql');
const axios=require('axios');
var _=require('lodash');
const {GraphQLObjectType,GraphQLInt,GraphQLList,GraphQLString,GraphQLID,GraphQLSchema,GraphQLNonNull}=graphql;


//db 
const Book=require('../models/book');
const Author=require('../models/author');


// const PersonType=new GraphQLObjectType({
//     name:'Person',
//     fields:()=>({                    //we use function bcoz we are having BookType which is at bottom
        
//         id:{type:GraphQLID},
//         name:{type:GraphQLString},
//         username:{type:GraphQLString},
//         email:{type:GraphQLString},
//         location:{type:GraphQLString},
//         website:{type:GraphQLString},
//         bio:{type:GraphQLString},

//     })
// });


//Definition of Booktype
const BookType=new GraphQLObjectType({
    name:'Book',
    fields:()=>({                                       //we use function bcoz we are having Author which is at bottom
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{                            //author of book
            type:AuthorType,
            resolve(parent,args){
                //return _.find(authors,{id:parent.authorid});  //for array
                return Author.findById(parent.authorid);   //Author schema of db
            }
        }
    })
});


//Definition of AuthorType
const AuthorType=new GraphQLObjectType({
    name:'Author',
    fields:()=>({                    //we use function bcoz we are having BookType which is at bottom
        
        id:{type:GraphQLID},
        name:{type:GraphQLString},
       age:{type:GraphQLInt},
       books:{
           type:new GraphQLList(BookType),    //1 author has many books hence list of booktype
           resolve(parent,args){
              // return _.filter(books,{authorid:parent.id});
              return Book.find({authorid:parent.id})  //find looks for all elemets on criteria
           }
       }
    })
});




//Defining root queries(how user initially get into graoh data)


const RootQuery=new GraphQLObjectType({

    name:'RootQueryType',
    fields:{
    
    
        //to get all books
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
               // return books;     
               return Book.find({});
            }
        },

        //to get all authors
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                //return authors;
                return Author.find({}); //if we dont write condition it will return all data
            }
        },

        //to get all Persons
        // persons:{
        //     type:new GraphQLList(PersonType),
        //     resolve(parent,args){
        //         return persons;
        //     }
        // },



// ******************************************************
        //to get particular book with id
        book:{
          type:BookType,
          args:{id:{type:GraphQLID}},
          resolve(parent,args){
            //return _.find(books,)
           // return _.find(books,{id:args.id});
           return Book.findById(args.id);
          }
        },

    //to get particluar author with its id
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //return _.find(authors,{id:args.id});    //from array
    return Author.findById(args.id);
            }
        },
    }
});



const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
             },
             resolve(parent,args){
                let author=new Author({    //Author is which importd as mongo
                name:args.name,
                age:args.age
            });
          return  author.save();   //mongoose gives us object back
        }    
    
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},   //it cannot be null
                genre:{type:GraphQLString},
                authorid:{type:GraphQLID}
            },
            resolve(parent,args){
                let book=new Book({
                    name:args.name,
                    genre:args.genre,
                    authorid:args.authorid
                });
                return book.save();
            }
        }
    },


    
 });

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});


