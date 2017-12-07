import React, { Component } from 'react';
import './Subscription.css';
import { Link  } from 'react-router-dom';

class SubscriptionInfo extends Component  {
  render()  {
    return(
      <div id='subscribed'>
        <h1>Your Subscription:</h1>
        <h2>You are subscribed to ChocoBox {this.props.subscription}</h2>
        <h3>{this.props.month + '\'s Chocolate Bars:'}</h3>
        {this.props.rows.grid}
        <Link to="subscription"><button className="unsubscribe-button" onClick={() => this.props.handleUnsubscribe()}>Unsubscribe</button></Link>
      </div>
    );
  }
}

export default SubscriptionInfo;
