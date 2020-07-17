import React from 'react';
import './Review.css';
import StarRating from '../StarRating/StarRating';

class Review extends React.Component{
    render(){
        return(
            <div className="Review">
                <StarRating rating={this.props.review.rating}/>
                <h6>"{this.props.review.summary}" by <span className="author">{this.props.review.author}</span></h6>
                <p><span className="date">{this.props.review.date}</span></p>
                <p><i>"{this.props.review.review}"</i></p>
                <hr></hr>
            </div>
        )
    }
}

export default Review;