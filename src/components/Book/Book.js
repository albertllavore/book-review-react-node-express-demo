import React from 'react';
import './Book.css';

class Book extends React.Component {
    render(){
        return(
            <div className="Book">
                <div className="image-container">
                    <img src={this.props.book.img} alt=''/>
                </div>
                <h2>{this.props.book.title}</h2>
                <div className="Book-information">
                    <div className="Book-title"></div>
                    <div className="Book-author">{this.props.book.author}</div>
                    <div className="Book-publisher">{this.props.book.publisher}</div>
                    <div className="Book-summary">{this.props.book.summary}</div>
                    <div className="Book-reviews">
                        <h3>Reviews</h3>
                        <h3 className="Book-rating"></h3>
                    </div>
                    <div className="Book-addreview"></div>
                </div>
            </div>
        );
    } 
}

export default Book;