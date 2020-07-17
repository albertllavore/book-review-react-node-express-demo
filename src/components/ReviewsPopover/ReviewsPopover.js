import React from 'react';
import './ReviewsPopover.css';
import ReviewsList from '../ReviewsList/ReviewsList';
import ReviewCreate from '../ReviewCreate/ReviewCreate';
import { FaTimes } from 'react-icons/fa';

class ReviewsPopover extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            reviews: [],
            reviewsHidden: true
        };
        this.getAllReviews = this.getAllReviews.bind(this);
        this.toggleReviewsHidden = this.toggleReviewsHidden.bind(this);
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
                    <div className="image-container">
                        <img src={this.props.book.img} height="300" alt={imgAlt} />
                    </div>
                    <div className="Book-information-container">
                        <div className="Book-title"><h4>{this.props.book.title}</h4></div>
                        <div className="Book-author">By {this.props.book.author}</div>
                        <div className="Book-publisher">{this.props.book.publisher}</div>
                        <div className="Book-summary">{this.props.book.summary}</div>
                    </div>
                </div>
                <hr></hr>
                <button id="write-a-review" onClick={this.toggleReviewsHidden}><span>Write a Review</span></button>
                {!this.state.reviewsHidden && <ReviewCreate book={this.props.book} handleChange={this.handleChange}/>}
                <hr></hr>
                <div className="BookReviews">
                        <h3>Reviews</h3>
                        <ReviewsList reviews={this.state.reviews}/>
                        <h3 className="BookReviews-rating"></h3>
                        <div className="BookReviews-sort-options">
                            <ul>
                                            
                            </ul>
                        </div>
                </div>
            </div>
        );
    } 

}

export default ReviewsPopover;