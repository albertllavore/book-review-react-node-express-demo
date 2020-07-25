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
    this.handleReviewsChange = this.handleReviewsChange.bind(this);
    this.sortBookList = this.sortBookList.bind(this);
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    fetch( window.location.protocol + "//" + window.location.hostname + ':4001/api/book')
      .then(response => response.json())
      .then(data => {
        this.setState({ books: [] }); // insures we reset state and re-render every time getAllBooks is called
        this.setState({ books: data });
      });
  }

  sortBookList(sortBy) {
    if(sortBy === "title") {
      this.state.books.sort((a, b) => {
          if(a.title.toLowerCase() < b.title.toLowerCase()) {
              return -1;
          }
          return 0;
      });
    } else if(sortBy === "author") {
        this.state.books.sort((a, b) => {
            if(a.author.toLowerCase() < b.author.toLowerCase()) {
                return -1;
            }
            return 0;
        });
    }
}

  handleReviewsChange() {
    this.getAllBooks();
  }

  render(){
    return (
      <div className="App">
        <h1>Moon Creative Lab Book Review</h1>
        <BooksList books={this.state.books} handleReviewsChange={this.handleReviewsChange} sortBookList={this.sortBookList}/>
        <div className="overlay"></div>
      </div>
      
    );
  }
}

export default App;
