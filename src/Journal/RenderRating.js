// Takes an input rating between 1 and 5 and returns the font awesome star icons to display the rating

import React, { Component } from 'react';

export function renderRatingStars(inputNum) {
    let ratingStars = [{star : inputNum >= 1, num : 1}, {star : inputNum >= 2, num : 2}, {star : inputNum >= 3, num : 3}, {star : inputNum >= 4, num : 4}, {star : inputNum >= 5, num : 5}]
    let i = 0;
    
    ratingStars = ratingStars.map((item) => {
        if (item.star) {
            return(<i key={++i + "a"} className="fa fa-star" aria-hidden="true"></i>)
        } else {
            return(<i key={++i + "b"} className="fa fa-star-o" aria-hidden="true"></i>)
        }
    })
    return ratingStars;
}