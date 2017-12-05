import React, { Component } from 'react';
import firebase from 'firebase/app';
import './Subscription.css';
import { Link  } from 'react-router-dom';
export function handleRows(subscription)  {
  let bars = 0;
  if (subscription === "Trials") {
    bars = 6;
  } else if (subscription === "Premium") {
    bars = 9;
  } else {
    bars = 15;
  }
  let grid = [];
  for (var i = 0; i < bars / 3; i++) {
    grid.push(<ChooseRow bars={i}/>);
  }
  return ({bars, grid});
}
class Subscribe extends Component  {

  render()  {
    let rows = handleRows(this.props.routerprops.match.params.plan);
    return(
      <div>
        <h1>Subscription Confirmation</h1>
        <div className="subscribe">
          <h2>ChocoBox {this.props.routerprops.match.params.plan}</h2>
          <img src="" alt="subscription"/>
          <p>
            With ChocoBox {this.props.routerprops.match.params.plan}, you will receive {rows.bars} bars of chocolate a month
            of your choosing.
            <ul>
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, ipsam.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam magni sunt culpa voluptatibus!</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla nesciunt neque, dicta perferendis necessitatibus. Odit in ullam consectetur error iure natus, ab.</li>
              <li>Lorem ipsum dolor sit amet.</li>
            </ul>
          </p>
          <h3>Choose Your Chocolate</h3>
          {rows.grid}
          <div>
            <p>You can change your selections before the ship date under the ChocoBox tab!</p>
          </div>
          <div className="confirmation">
            <Link to='/subscriptions'><button onClick={() => this.props.handleAddSubscription(this.props.routerprops.match.params.plan)}>Confirm Your Subscription</button></Link>
            <Link to='/subscriptions'><button>Cancel</button></Link>
          </div>
        </div>
      </div>
    );
  }
}

class ChooseRow extends Component  {

  render()  {
    return (
      <div className="choose">
        <div className="row">
          <div className="chocolate-card">
            <h4>Add a Bar</h4>
            <img src="" alt="chocolate bar"/>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, aliquam.</p>
            <button>Change</button>
          </div>
          <div className="chocolate-card">
            <h4>Add a Bar</h4>
            <img src="" alt="chocolate bar"/>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, expedita.</p>
            <button>Change</button>
          </div>
          <div className="chocolate-card">
            <h4>Add a Bar</h4>
            <img src="" alt="chocolate bar"/>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, voluptatum!</p>
            <button>Change</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Subscribe;
