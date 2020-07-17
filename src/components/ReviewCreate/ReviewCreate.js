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
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleSummaryChange = this.handleSummaryChange.bind(this);
        this.handleReviewChange = this.handleReviewChange.bind(this);
        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    }

    getState(){
        return this.state;
    }

    handleNameChange(event){
        this.setState({author: event.target.value});
    }

    handleRatingChange(event){
        this.setState({rating: event.target.value});
    }

    handleSummaryChange(event){
        this.setState({summary: event.target.value});
    }

    handleReviewChange(event){
        this.setState({review: event.target.value});
    }

    handleReviewSubmit(event){
        const url = 'http://localhost:4001/api/review?bookId=' + this.props.book.id;
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
        });
        
        event.preventDefault();
    }

    render(){
        return(
            <div className="ReviewCreate">
                    <div className="ReviewCreate-fields">
                        <div>
                            <label>
                                Your name:  
                                <input placeholder="Albert Einstein" onChange={this.handleNameChange}/>
                            </label>
                        </div>
                        <div>
                            <label>
                                <StarRatingSet handleRatingChange={this.handleRatingChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Summary:  
                                <input type="textarea" placeholder="Loved it!" onChange={this.handleSummaryChange}/>
                            </label>
                        </div>
                        <div>
                            <textarea id="review" name="review" rows="4" cols="50" onChange={this.handleReviewChange} placeholder="Write a Review" />
                        </div>
                    </div>
                    <div className="ReviewCreate-submit">   
                        <button placeholder="Submit Review" onClick={this.handleReviewSubmit}>Submit Review</button>
                    </div>
            </div>
        )
    }
}

export default ReviewCreate;