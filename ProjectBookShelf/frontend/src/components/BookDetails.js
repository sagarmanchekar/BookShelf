import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getBookQuery} from '../queries/queries'

 class BookDetails extends Component {
  
  
    displayBookDetails(){
        const {book}=this.props.data;
        //console.log(this.props);
        if(book){
            return (
                <div  >
                    <h2>Name of Book:{book.name}</h2>
                    <p>Genre:{book.genre}</p>
                    <p>Author:{book.author.name}</p>
                    
                    <h3>All books by this author</h3>
                    <ul >
                        {book.author.books.map(item=>{
                            return <li key={item.id}> {item.name} </li>
                        })}
                    </ul>
                </div>
            )
        }
        
        else{return <p>No book selected</p>}
    
       }     
    
  
    render() {
        //console.log(this.props);
        return (
            <div id="book-details">
            {this.displayBookDetails()}
            </div>
        )
    }
}


export default graphql(getBookQuery,{
    options:(props)=>{  return { variables:{id:props.bookid}}}
})(BookDetails);