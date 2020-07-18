import React from 'react';
import './App.css';
import BooksList from '../BooksList/BooksList';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: []
    }
    this.getAllBooks = this.getAllBooks.bind(this);
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    fetch( window.location.protocol + "//" + window.location.hostname + ':4001/api/book')
      .then(response => response.json())
      .then(data => {
        this.setState({ books: data });
      });
  }

  render(){
    return (
      <div className="App">
        <h1>Moon Creative Lab Book Review</h1>
        <BooksList books={this.state.books}/>
        <div className="overlay"></div>
      </div>
      
    );
  }
}

export default App;
