import React from 'react';
import './StarRatingSet.css';
import { FaStar } from 'react-icons/fa';

class StarRatingSet extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rating: null
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        this.setState({rating: event.target.value});
        this.props.handleRatingChange(event);
    }

    render(){
        return (
            <div>
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                        <label key={i}>
                            <input 
                                type="radio" 
                                name="rating" 
                                value={ratingValue} 
                                onClick={this.handleClick}
                            />
                            <FaStar 
                                className="star" 
                                color={ratingValue <= this.state.rating ? "#ffc107" : "#e4e5e9"}
                                size={20}
                            />
                        </label>
                    )
                })}
            </div>
            )
    }
}
export default StarRatingSet;