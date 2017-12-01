import React, { Component } from 'react';
import './Subscription.css';

  class Subscription extends Component  {

    render()  {
      return(
        <div>
          <h1>Get ChocoBox Today!</h1>
          <div className="description">Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Deleniti porro odit voluptas vitae cupiditate
            excepturi eveniet voluptatem, culpa ratione id veritatis itaque
            voluptatum modi unde cum inventore aliquam quisquam tenetur?
          </div>
          <div className="cards">
            <div className="card">
              <h2>Option One: ChocoBox Trials</h2>
              <img src="" alt="chocolate bars"/>
              <p>9.99$ A Month for 6 different chocolate bars of your choosing!</p>
              <button>Subscribe Now!</button>
            </div>
            <div className="card">
              <h2>Option Two: ChocoBox Premium</h2>
              <img src="" alt="chocolate bars"/>
              <p>14.99$ A Month for 10 different chocolate bars of your choosing!</p>
              <button>Subscribe Now!</button>
            </div>
            <div className="card">
              <h2>Option Two: ChocoBox Premium</h2>
              <img src="" alt="chocolate bars"/>
              <p>14.99$ A Month for 10 different chocolate bars of your choosing!</p>
              <button>Subscribe Now!</button>
            </div>
          </div>
        </div>
      );
    }
  }

  export default Subscription;
