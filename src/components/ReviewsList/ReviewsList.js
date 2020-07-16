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
            <div className="ReviewList">
                {
                    this.props.reviews.map((review, index) => {
                        return <Review key={review.id} review={review} />;
                    })
                }
            </div>
        )
    }
}

export default ReviewsList;