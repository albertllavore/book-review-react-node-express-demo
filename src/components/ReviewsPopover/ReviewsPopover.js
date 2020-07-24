import React from 'react';
import './ReviewsPopover.css';
import ReviewsList from '../ReviewsList/ReviewsList';
import ReviewCreate from '../ReviewCreate/ReviewCreate';
import { FaTimes } from 'react-icons/fa';
import StarRating from '../StarRating/StarRating';

class ReviewsPopover extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            reviews: [],
            reviewsHidden: true,
            rating: 0
        };
        this.getAllReviews = this.getAllReviews.bind(this);
        this.toggleReviewsHidden = this.toggleReviewsHidden.bind(this);
    }

    componentDidMount() {
        this.getAllReviews();
    }
    
    getAllReviews() {
        fetch(window.location.protocol + "//" + window.location.hostname + `:4001/api/review?bookId=${this.props.book.id}`)
        .then(response => response.json())
        .then(data => {
            this.setState({ reviews: data.reverse()}, this.calculateRating);
            this.props.handleReviewsChange();
        });
    }

    calculateRating(){
        const reducer = (accumulator, item) => accumulator + item.rating;
        let rating = Math.floor(this.state.reviews.reduce(reducer, 0)/this.state.reviews.length);
        this.setState({rating: rating});
    }

    toggleReviewsHidden () {
        this.setState({
            reviewsHidden: !this.state.reviewsHidden
        })
    }

    handleChange = (inputFromChild) => {
        this.getAllReviews();
    }


    render(){
        let imgAlt = `${this.props.book.title} cover image`;
        let id = `ReviewsPopover-${this.props.book.id}`;
        return(
            <div id={id} className="ReviewsPopover">
                <div className="ReviewsPopover-Book-information">
                    <FaTimes 
                        className="close"
                        color="#43464B"
                        size={30}
                        onClick={this.props.handleShowAndHide}
                    />
                    <div className="Book-information-container">
                        <div className="image-container">
                            <img src={this.props.book.img} height="300" alt={imgAlt} />
                        </div>
                        <div className="Book-information">
                            <div className="Book-title"><h4>{this.props.book.title}</h4></div>
                            <div className="Book-author">By {this.props.book.author}</div>
                            <div className="Book-publisher">{this.props.book.publisher}</div>
                            <StarRating rating={this.state.rating}/>
                            <div className="Book-summary"><i>{this.props.book.summary}</i></div>
                            <div id="write-a-review" className="write-a-review" onClick={this.toggleReviewsHidden}>{!this.state.reviewsHidden ? `Write a Review` : `Write a Review`}</div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                {!this.state.reviewsHidden && <ReviewCreate book={this.props.book} handleClick={this.toggleReviewsHidden} handleChange={this.handleChange} toggleReviewsHidden={this.toggleReviewsHidden}/>}
                {this.state.reviewsHidden && <ReviewsList reviews={this.state.reviews}/>}
            </div>
        );
    } 

}

export default ReviewsPopover;