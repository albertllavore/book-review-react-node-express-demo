import React from 'react';
import './StarRating.css';
import { FaStar } from 'react-icons/fa';

class StarRating extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        // open the popover
    }

    render(){
        return (
            <div>
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                        <label key={i}>
                            <FaStar 
                                className="star" 
                                color={ratingValue <= this.props.rating ? "#ffc107" : "#e4e5e9"}
                                size={21}
                            />
                        </label>
                    )
                })}
            </div>
            )
    }
    
}
export default StarRating;