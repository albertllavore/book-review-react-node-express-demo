import React from 'react';
import './Book.css';
import ReviewsList from '../ReviewsList/ReviewsList';
import ReviewCreate from '../ReviewCreate/ReviewCreate';

class Book extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            reviews: []
        };
        this.getAllReviews = this.getAllReviews.bind(this);
    }

    componentDidMount() {
        this.getAllReviews();
    }
    
    getAllReviews() {
        fetch(`http://localhost:4001/api/review?bookId=${this.props.book.id}`)
        .then(response => response.json())
        .then(data => {
            this.setState({ reviews: data });
        });
    }

    handleChange = (inputFromChild) => {
        this.getAllReviews();
    }

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
                    <div className="BookReviews">
                        <h3>Reviews</h3>
                        <ReviewsList reviews={this.state.reviews}/>
                        <h3 className="BookReviews-rating"></h3>
                        <div className="BookReviews-sort-options">
                            <ul>
                                            
                            </ul>
                        </div>
                        <ReviewCreate book={this.props.book} handleChange={this.handleChange}/>
                    </div>
                </div>
            </div>
        );
    } 
}

export default Book;