import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getAuthorsQuery,getBooksQuery,addBookMutation} from '../queries/queries'
import {flowRight as compose} from 'lodash';

class AddBook extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            genre:"",
            authorid:""
        };
    }



displayAuthors(){
    var data=this.props.getAuthorsQuery;  //to get data afrom this query name is same as we give at bottom

    if(data.loading){
        return(<option disabled>Loading Authors..</option>)
    }
    else{
        return data.authors.map(item=> {
            return ( <option key={item.id} value={item.id}>{item.name}</option>);
        })
    }

}

submitForm(e){
    e.preventDefault();
    this.props.addBookMutation({    //sending values to addMutation Query in queries.js
        variables:{
            name:this.state.name,
            genre:this.state.genre,
            authorid:this.state.authorid
        },
            refetchQueries:[{query:getBooksQuery} ]  //whenever book is added automatically refetch query that displays list of books
        }); 
}

    render() {
        return (
            <div>
                <form  id="add-Book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                <label>Book Name</label>
                    <input type="text" onChange={(e)=>this.setState({name:e.target.value})} required/> 
                </div>

                <div  className="field">
                <label>Genre</label>
                    <input type="text"  required onChange={(e)=>this.setState({genre:e.target.value})}/> 
                </div>

                <div className="field">
                <label>Author</label>
                    <select   onChange={(e)=>this.setState({authorid:e.target.value})}>
                        <option>loadingAuthor</option>
                        {this.displayAuthors()}
                    </select> 
                </div>

                <button>+</button>
                </form>
            </div>
            
        )
    }
}
//compose is use to bind multiple queires
export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook);   //bind this query to this component