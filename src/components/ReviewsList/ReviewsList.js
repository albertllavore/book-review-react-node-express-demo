import React from 'react';
import './ReviewsList.css';
import Review from '../Review/Review';

class ReviewsList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reviews: []
        };
    }
    render(){    
        return(
            <div className="BookReviews">
                <h3>Reviews</h3>
                <div className="ReviewList">
                    {
                        this.props.reviews.map((review, index) => {
                            return <Review key={review.id} review={review} />;
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ReviewsList;