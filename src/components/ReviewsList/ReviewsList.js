import React from 'react';
import './ReviewsList.css';
import Review from '../Review/Review';

class ReviewsList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reviews: [],
            sortBy: 'newest'
        };
        this.handleSortByChange = this.handleSortByChange.bind(this);
        
        this.sortByOptions = {
            "Highest Rated" : "rating",
            "Lowest Rated" : "rating_low",
            "Newest" : "newest",
            "Author" : "author"
        };
    }

    handleSortByChange(sortByOption){
        this.setState({sortBy: sortByOption}, this.props.sortReviews(sortByOption));
    }

    getSortByClass(sortByOption){
        if(this.state.sortBy === sortByOption) return 'active'
        return '';
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return <li key={sortByOptionValue} className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>
        });
    }

    render(){    
        return(
            <div className="BookReviews">
                <div className="ReviewList">
                    <h4>Book Reviews</h4>
                    <div className="Sort-reviews">
                        <ul>
                            {this.renderSortByOptions()}                    
                        </ul>
                    </div>
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