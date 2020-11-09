import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/queries'


//components
import BookDetails from "./BookDetails"


class BookList extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            selected:null
        }
    }


displayBooks(){

    var data=this.props.data;
    if(data.loading){
        return <div>Loading Books............   </div>
    }
    else{
        return data.books.map(items=>{
            return (
                <li key={items.id} onClick={(e)=>{this.setState({selected:items.id})}}>{items.name} </li>
            )
        })
    }
}


    render() {
        return (
            <div id="book-list">
                <ul>
                        {this.displayBooks()}
                </ul>
                <BookDetails bookid={this.state.selected}/>
            </div>
        )
    }
}

export default  graphql(getBooksQuery)(BookList);   //bind this query to this component