import React from 'react';
import './BooksList.css';
import Book from '../Book/Book';
import ReviewsPopover from '../ReviewsPopover/ReviewsPopover';

class BooksList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reviewsPopoverBook: {},
            isHidden: true
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleShowAndHide = this.handleShowAndHide.bind(this);
    }

    handleClick(event){
        let bookid = Number(event.currentTarget.getAttribute('data-bookid'));
        let book = this.props.books.find(book => {
            return book.id === bookid;
        });

        this.setState({reviewsPopoverBook: book, isHidden: false});
        document.body.classList.add("modal-open");
        
    }

    handleShowAndHide(event) {
        this.setState({reviewsPopoverBook: this.state.reviewsPopoverBook, isHidden: true});
        document.body.classList.remove("modal-open");
    }

    render(){
        return(
            <div>
                <div className="BooksList">
                    {
                        this.props.books.map((book, index) => {
                            return (
                                <Book key={book.id} book={book} handleClick={this.handleClick}/>
                            )
                        })
                    }
                </div>
                {!this.state.isHidden && <ReviewsPopover book={this.state.reviewsPopoverBook} handleShowAndHide={this.handleShowAndHide} handleReviewsChange={this.props.handleReviewsChange}/>}
            </div>
        )
    }
}

export default BooksList;