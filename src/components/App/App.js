import React from 'react';
import './App.css';
import BooksList from '../BooksList/BooksList';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: []
    }
  }
  
  render(){
    return (
      <div className="App">
        <h1>Moon Creative Lab Book Review</h1>
        <BooksList books={this.state.books} handleReviewsChange={this.handleReviewsChange} sortBookList={this.sortBookList}/>
      </div>
      
    );
  }
}

export default App;
