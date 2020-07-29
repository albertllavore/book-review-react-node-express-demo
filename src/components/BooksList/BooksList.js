import React from 'react';
import './BooksList.css';
import Book from '../Book/Book';
import ReviewsPopover from '../ReviewsPopover/ReviewsPopover';

class BooksList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            books: [],
            reviewsPopoverBook: {},
            isHidden: true,
            sortBy: 'title'
        }
        
        this.sortByOptions = {
            //"Highest Rated" : "rating",
            "Title" : "title",
            "Author" : "author"
        };

        this.getAllBooks = this.getAllBooks.bind(this);
        this.handleReviewsChange = this.handleReviewsChange.bind(this);
        this.sortBookList = this.sortBookList.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleShowAndHide = this.handleShowAndHide.bind(this);
        this.handleSortByChange = this.handleSortByChange.bind(this);
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
            this.sortBookList(this.state.sortBy);
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

    handleClick(event){
        let bookid = Number(event.currentTarget.getAttribute('data-bookid'));
        let book = this.state.books.find(book => {
            return book.id === bookid;
        });

        this.setState({reviewsPopoverBook: book, isHidden: false});
        document.body.classList.add("modal-open");
        
    }

    handleShowAndHide(event) {
        this.setState({reviewsPopoverBook: this.state.reviewsPopoverBook, isHidden: true});
        document.body.classList.remove("modal-open");
    }

    handleSortByChange(sortByOption){
        this.setState({sortBy: sortByOption}, this.sortBookList(sortByOption));
    }

    handleReviewsChange() {
        this.getAllBooks();
    }

    getSortByClass(sortByOption){
        if(this.state.sortBy === sortByOption) return 'active'
        return '';
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return <li key={sortByOptionValue} className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>
        });
    }

    render(){
        return(
            <div>
                <div className="Sort-books">
                    <label>Sort By:</label>
                    <ul>
                        {this.renderSortByOptions()}                    
                    </ul>
                </div>
                <div className="BooksList">
                    {
                        this.state.books.map((book, index) => {
                            return (
                                <Book key={book.id} book={book} handleClick={this.handleClick}/>
                            )
                        })
                    }
                </div>
                {!this.state.isHidden && <ReviewsPopover book={this.state.reviewsPopoverBook} handleShowAndHide={this.handleShowAndHide} handleReviewsChange={this.handleReviewsChange}/>}
            </div>
        )
    }
}

export default BooksList;