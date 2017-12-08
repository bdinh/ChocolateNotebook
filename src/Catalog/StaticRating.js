import React, { Component } from 'react';

export default class StaticRating extends Component {
    render() {
        let rating = this.props.rating || 1;
    
        let ratingStars = [{star : rating >= 1, num : 1}, {star : rating >= 2,
            num : 2}, {star : rating >= 3, num : 3}, {star : rating >= 4, num : 4},
             {star : rating >= 5, num : 5}];
        let i = 0;
        ratingStars = ratingStars.map((item) => {
            if (item.star) {
              return(<i key={++i} className="fa fa-star" aria-hidden="true"></i>)
            } else {
              return(<i key={++i} className="fa fa-star-o" aria-hidden="true"></i>)
            }
          })
    
         return (
            <span>{rating} {ratingStars}</span>
        );
    }
} 