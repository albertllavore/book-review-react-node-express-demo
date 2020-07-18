import React from 'react';
import './ReviewCreate.css';
import StarRatingSet from '../StarRatingSet/StarRatingSet';

class ReviewCreate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            author: "",
            rating: 0,
            summary: "",
            review: "",
            bookId: null,
            showSubmit: false
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleSummaryChange = this.handleSummaryChange.bind(this);
        this.handleReviewChange = this.handleReviewChange.bind(this);
        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
        this.checkAllRequiredFields = this.checkAllRequiredFields.bind(this);
    }

    getState(){
        return this.state;
    }

    handleNameChange(event){
        this.setState({author: event.target.value}, this.checkAllRequiredFields);
    }

    handleRatingChange(event){
        this.setState({rating: event.target.value}, this.checkAllRequiredFields);
    }

    handleSummaryChange(event){
        this.setState({summary: event.target.value}, this.checkAllRequiredFields);
    }

    handleReviewChange(event){
        this.setState({review: event.target.value}, this.checkAllRequiredFields);
    }

    handleReviewSubmit(event){
        const url = window.location.protocol + "//" + window.location.hostname + ':4001/api/review?bookId=' + this.props.book.id;
        fetch(url, {                                        // sends request
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => { 
            if(response.ok) {   
                return response.json();                     // converts response object to JSON
            }
            throw new Error('Request failed!');              // handle errors
        }, networkError => console.log(networkError.message) // handle errors
        ).then(jsonResponse => {                             // handle success
            this.props.handleChange();
            this.props.handleClick();
        });
        
        event.preventDefault();
    }

    checkAllRequiredFields() {
        if(this.state.author && this.state.rating && this.state.summary && this.state.review){
            this.setState({showSubmit: true});
        }else{
            this.setState({showSubmit: false});
        }
    }

    render(){
        return(
            <div className="ReviewCreate">
                <a id="show-reviews" className="write-a-review show-reviews" onClick={this.props.toggleReviewsHidden}><span>Show Reviews</span></a>
                <div className="ReviewCreate-fields">
                    <div>
                        <label>
                            Your name:  
                            <input placeholder="Albert Einstein" onChange={this.handleNameChange}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            How was it?
                            <StarRatingSet handleRatingChange={this.handleRatingChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Summary:  
                            <input type="textarea" class="summary" placeholder="A few words to summarize..." onChange={this.handleSummaryChange}/>
                        </label>
                    </div>
                    <div>
                        <textarea id="review" name="review" rows="4" cols="50" onChange={this.handleReviewChange} placeholder="Go on. Write a Review" />
                    </div>
                </div>
                <div className="ReviewCreate-submit">   
                    {this.state.showSubmit && <button placeholder="Submit Review" onClick={this.handleReviewSubmit}>Submit Review</button>}
                </div>
            </div>
        )
    }
}

export default ReviewCreate;