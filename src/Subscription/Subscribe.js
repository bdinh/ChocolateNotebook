import React, { Component } from 'react';
import './Subscription.css';

class Subscribe extends Component  {
  render()  {
    return(
      <div>
        <header>
          <h1>Subscribe</h1>
        </header>
        <div className="subscribe">
          <h2>ChocoBox Trials</h2>
          <img src="" alt="subscription"/>
          <p>
            With ChocoBox Trials, you will receive 10 bars of chocolate a month
            of your choosing.
            <ul>
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, ipsam.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam magni sunt culpa voluptatibus!</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla nesciunt neque, dicta perferendis necessitatibus. Odit in ullam consectetur error iure natus, ab.</li>
              <li>Lorem ipsum dolor sit amet.</li>
            </ul>
          </p>
          <h3>Choose Your Chocolate</h3>
          <div className="choose">
            <div className="row">
              <div className="chocolate-card">
                <h4>Bar 1</h4>
                <img src="" alt="chocolate bar"/>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, aliquam.</p>
                <button>Change</button>
              </div>
              <div className="chocolate-card">
                <h4>Bar 2</h4>
                <img src="" alt="chocolate bar"/>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, expedita.</p>
                <button>Change</button>
              </div>
              <div className="chocolate-card">
                <h4>Bar 3</h4>
                <img src="" alt="chocolate bar"/>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, voluptatum!</p>
                <button>Change</button>
              </div>
            </div>
            <div className="row">
              <div className="chocolate-card">
                <h4>Bar 4</h4>
                <img src="" alt="chocolate bar"/>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, ducimus.</p>
                <button>Change</button>
              </div>
              <div className="chocolate-card">
                <h4>Bar 5</h4>
                <img src="" alt="chocolate bar"/>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, blanditiis.</p>
                <button>Change</button>
              </div>
              <div className="chocolate-card">
                <h4>Bar 6</h4>
                <img src="" alt="chocolate bar"/>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, ut.</p>
                <button>Change</button>
              </div>
            </div>
          </div>
          <div>
            <p>You can change your selections before the ship date under the ChocoBox tab!</p>
          </div>
          <div className="confirmation">
            <button>Cofirm Your Subscription</button>
            <button>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Subscribe;
