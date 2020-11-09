import {gql} from 'apollo-boost';

//get all authors
const getAuthorsQuery=gql`    
{
    authors{
        name
        id
    }
}

`

//query to get all books
const getBooksQuery=gql`    
{
    books{
        name
        id
    }
}
`

const addBookMutation=gql`
mutation($name:String!,$genre:String!,$authorid:ID!){
    addBook(name:$name,genre:$genre,authorid:$authorid){
        name
        id
    }
}
`

const getBookQuery=gql`
query($id:ID){
    book(id:$id)
    {
        id
        name
        genre
        author
            {
                id
                name
                age
                books{
                    id
                    name

                }
            }
        
    }
}

`
export {getAuthorsQuery,getBooksQuery,getBookQuery,addBookMutation};
