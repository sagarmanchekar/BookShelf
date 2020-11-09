import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'   //wrap object recevived from server and inject in react

//components
import BookList from './components/BookList'
import AddBook from './components/AddBook'


//apollo client setup
const client =new ApolloClient({

  uri:'http://localhost:4000/graphql'

})


function App() {
  return (
    //injects its here
    <ApolloProvider client={client}> 
        <div id="main">
       <h1>  BOOKS SHELF  </h1> 
        <BookList/>
        <AddBook/>
        </div>
    </ApolloProvider>
  );
}

export default App;
