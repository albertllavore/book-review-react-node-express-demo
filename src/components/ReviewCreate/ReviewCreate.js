import React from 'react';
import './ReviewCreate.css';

class ReviewCreate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            author: "",
            rating: 0,
            summary: "",
            review: "",
            bookId: null
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

    componentDidMount() {
    }

    handleNameChange(event){
        this.setState({author: event.target.value});
        console.log(this.getState());
    }

    handleRatingChange(event){
        this.setState({rating: event.target.value});
        console.log(this.getState());
    }

    handleSummaryChange(event){
        this.setState({summary: event.target.value});
        console.log(this.getState());
    }

    handleReviewChange(event){
        this.setState({review: event.target.value});
        console.log(this.getState());
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
                        <label>
                            Your name: 
                            <input placeholder="Albert Einstein" onChange={this.handleNameChange}/>
                        </label>
                        <label>
                            Rating out of 5: 
                            <select value={this.state.rating} onChange={this.handleRatingChange}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </label>
                        <label>
                            Summary: 
                            <input type="textarea" placeholder="Loved it!" onChange={this.handleSummaryChange}/>
                        </label>
                        <label>
                        Review:
                            <textarea id="review" name="review" rows="4" cols="50" onChange={this.handleReviewChange} placeholder="Write a Review" />
                        </label>
                    </div>
                    <div className="ReviewCreate-submit">   
                        <button placeholder="Submit Review" onClick={this.handleReviewSubmit}>Submit Review</button>
                    </div>
            </div>
        )
    }
}

export default ReviewCreate;