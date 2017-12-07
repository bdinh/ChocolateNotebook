import React, { Component } from 'react';
import firebase from 'firebase/app';
import './Subscription.css';
import { Link  } from 'react-router-dom';
import chocolateBars from '../chocolate-bars.json';
export function handleRows(subscription, start)  {
  let bars = 0;
  if (subscription === "Trials") {
    bars = 6;
  } else if (subscription === "Prime") {
    bars = 9;
  } else {
    bars = 15;
  }
  let grid = [];
  let end = start + 3;
  for (var i = 0; i < bars / 3; i++) {
    grid.push(<ChooseRow chocolateBars={chocolateBars.slice(start, end)}/>);
    start += 3;
    end += 3;
  }
  return ({bars, grid});
}

class Subscribe extends Component  {

  render()  {
    let rows = handleRows(this.props.routerprops.match.params.plan);
    return(
      <div className="subscription-body">
        <h1>Subscription Confirmation</h1>
        <div className="subscribe">
          <div id="subscribe-img">
            <h2>ChocoBox {this.props.routerprops.match.params.plan}</h2>
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
          </div>

          <h3>Your Chocolates</h3>
          {rows.grid}
          <div>
            <p>You can change your selections before the ship date under the ChocoBox tab!</p>
          </div>
          <div className="confirmation">
            <Link to='/subscription'><button onClick={() => this.props.handleAddSubscription(this.props.routerprops.match.params.plan)}>Confirm Your Subscription</button></Link>
            <Link to='/subscription'><button>Cancel</button></Link>
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
            <h4>{this.props.chocolateBars[0].fields.name + ', by ' +  this.props.chocolateBars[0].fields.company}</h4>
            <img src="" alt="chocolate bar"/>
            <p>{(this.props.chocolateBars[0].fields.cocoa_percent || 'Unknown Percentage') + '% Cocoa Percentage, Beans from ' +
               (this.props.chocolateBars[0].fields.broad_bean_origin || 'Unknown Source')}</p>
            <button>Change</button>
          </div>
          <div className="chocolate-card">
            <h4>{this.props.chocolateBars[1].fields.name + ', by ' +  this.props.chocolateBars[0].fields.company}</h4>
            <img src="" alt="chocolate bar"/>
            <p>{(this.props.chocolateBars[1].fields.cocoa_percent || 'Unknown Percentage') + '% Cocoa Percentage, Beans from ' +
               (this.props.chocolateBars[1].fields.broad_bean_origin || 'Unknown Source')}</p>
            <button>Change</button>
          </div>
          <div className="chocolate-card">
            <h4>{this.props.chocolateBars[2].fields.name + ', by ' +  this.props.chocolateBars[0].fields.company}</h4>
            <img src="" alt="chocolate bar"/>
            <p>{(this.props.chocolateBars[2].fields.cocoa_percent || 'Unknown Percentage') + '% Cocoa Percentage, Beans from ' +
               (this.props.chocolateBars[2].fields.broad_bean_origin || 'Unknown Source')}</p>
            <button>Change</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Subscribe;
