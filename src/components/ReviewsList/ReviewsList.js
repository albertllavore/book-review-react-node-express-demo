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
                <div className="ReviewList">
                    <h4>Book Reviews</h4>
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