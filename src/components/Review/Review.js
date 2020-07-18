import React from 'react';
import './Review.css';
import StarRating from '../StarRating/StarRating';

class Review extends React.Component{
    render(){
        return(
            <div className="Review">
                <h5> Reviewed by <span className="author">{this.props.review.author}</span><span className="date"> on {this.props.review.date}</span></h5>
                <StarRating rating={this.props.review.rating}/>
                <h5>{this.props.review.summary}</h5>
                <p><i>"{this.props.review.review}"</i></p>
                <hr></hr>
            </div>
        )
    }
}

export default Review;