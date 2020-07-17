import React from 'react';
import './Book.css';
import StarRating from '../StarRating/StarRating';

class Book extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            reviews: [],
            rating: 0
        };
        this.getAllReviews = this.getAllReviews.bind(this);
    }

    componentDidMount() {
        this.getAllReviews();
    }

    calculateRating(){
        const reducer = (accumulator, item) => accumulator + item.rating;
        let rating = Math.floor(this.state.reviews.reduce(reducer, 0)/this.state.reviews.length);
        this.setState({rating: rating});
    }
    
    getAllReviews() {
        fetch(`http://localhost:4001/api/review?bookId=${this.props.book.id}`)
        .then(response => response.json())
        .then(data => {
            this.setState({ reviews: data });
            this.calculateRating();
        });
    }

    handleChange = (inputFromChild) => {
        this.getAllReviews();
    }

    render(){
        let imgAlt = `${this.props.book.title} cover image`;
        let id = `${this.props.book.id}`;
        return(
            <div data-bookid={id} className="Book" onClick={this.props.handleClick}>
                <div className="Book-information">
                    <div className="image-container">
                        <img src={this.props.book.img} height="300" alt={imgAlt} />
                    </div>
                    <div className="Book-information-container">
                        <div className="Book-title"><h4>{this.props.book.title}</h4></div>
                        <StarRating rating={this.state.rating}/>
                        <div className="Book-author">By {this.props.book.author}</div>
                    </div>
                </div>
            </div>
        );
    } 
}

export default Book;