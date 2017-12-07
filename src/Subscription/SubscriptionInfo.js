import React, { Component } from 'react';
import './Subscription.css';
import { Link, Redirect  } from 'react-router-dom';

class SubscriptionInfo extends Component  {
  constructor(props){
      super(props);
      this.state = {
          confirm: false
      }
  };

  render()  {
    let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    if (this.props.subscription) {
      return(
        <div id='subscribed'>
          <h1>{'You Are Subscribed To ChocoBox ' + this.props.subscription.plan}</h1>
          {!this.state.confirm ?
            <button className="unsubscribe-button"
              onClick={() => this.setState({confirm:true})}>Unsubscribe</button>
            :
            <div>
              <Link to="/subscription"><button
                className="danger-button" onClick={() =>
                 this.props.handleUnsubscribe()}>Confirm</button></Link>
              <button className="unsubscribe-button"
                onClick={() => this.setState({confirm:false})}>Cancel</button>
            </div>
          }
          <nav className="month-nav">
            <div className="side-button">
              <button onClick={() => this.props.handleSwitchMonth(0, 'month_one')}>This Month</button>
            </div>
            <div className="middle-button">
              <button onClick={() => this.props.handleSwitchMonth(1, 'month_two')}>Next Month</button>
            </div>
            <div className="side-button">
              <button onClick={() => this.props.handleSwitchMonth(2, 'month_three')}>Following Month</button>
            </div>
          </nav>
          <h3>{monthNames[this.props.month] + "\'s Chocolate Bars:"}</h3>
          <div>
            {this.props.subscription.months[this.props.index] ? this.props.rows.grid
            : <div className="skipped"><p>You have skipped this month's chocolate bars</p></div>}
          </div>
          <div>
            {this.props.subscription.months[this.props.index] ?
              <button className="skip-button" onClick={() => this.props.handleSkip(this.props.index, !this.props.subscription.months[this.props.index])}>Skip</button>
            : <button className="skip-button" onClick={() => this.props.handleSkip(this.props.index, !this.props.subscription.months[this.props.index])}>Unskip</button> }
          </div>
        </div>
      );
    } else {
      return (<Redirect to="/subscription"></Redirect>);
    }

  }
}

export default SubscriptionInfo;
