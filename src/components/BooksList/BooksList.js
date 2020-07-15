import React from 'react';
import './BooksList.css';
import Book from '../Book/Book';

class BooksList extends React.Component{
    render(){
        return(
            <div className="BooksList">
                {
                    this.props.books.map((book, index) => {
                        return <Book key={book.id} book={book} />;
                    })
                }
            </div>
        )
    }
}

export default BooksList;