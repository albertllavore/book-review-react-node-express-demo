import React from 'react';
import './Review.css';

class Review extends React.Component{
    render(){
        return(
            
            <div className="Review">
                <h4>{this.props.review.summary}</h4>
                <h4>By {this.props.review.author}</h4>
                <h4>rating: {this.props.review.rating}/5</h4>
                <h4>{this.props.review.review}</h4>
            </div>
        )
    }
}

export default Review;