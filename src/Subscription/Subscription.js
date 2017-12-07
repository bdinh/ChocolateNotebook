import React, { Component } from 'react';
import './Subscription.css';
import Subscribe from './Subscribe';
import { handleRows, ChooseRow } from './Subscribe';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Link  } from 'react-router-dom';
import Search from '../Catalog/Search';
import SubscriptionInfo from './SubscriptionInfo';

  class Subscription extends Component  {
    constructor(props){
        super(props);
        this.today = new Date();
        this.start = this.today.getMonth() * 15;
        this.monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        this.state = {
            month: this.monthNames[this.today.getMonth()],
            rows: handleRows(this.props.subscription, this.start)

        }
    };

    handleSwitchMonth(increment)  {
      let newState = (this.today.getMonth() + increment) % 12;
      this.setState({month:this.monthNames[newState]});
      this.setState({rows:handleRows(this.props.subscription, this.start + (15 * increment))})
    }

    render()  {
      let content = null;
      if (this.props.subscription) {
        content = (
          <div>
            <nav className="month-nav">
              <button onClick={() => this.handleSwitchMonth(0)}>This Month</button>
              <button onClick={() => this.handleSwitchMonth(1)}>Next Month</button>
              <button onClick={() => this.handleSwitchMonth(2)}>Following Month</button>
            </nav>
          <SubscriptionInfo month={this.state.month} rows={this.state.rows} subscription={this.props.subscription}
        handleUnsubscribe={() => this.props.handleUnsubscribe()}/>
        </div>  );
      } else  {
        content = (
          <div>
            <header>
              <h1>Get ChocoBox Today!</h1>
              <img src="" alt="banner"/>
              <div className="description">
                <p>
                  Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Deleniti porro odit voluptas vitae cupiditate
                  excepturi eveniet voluptatem, culpa ratione id veritatis itaque
                  voluptatum modi unde cum inventore aliquam quisquam tenetur?
                </p>
                <Link to="/catalog"><button>View Our Catalogue</button></Link>
                <button>Learn More</button>
              </div>
            </header>
            <div className="cards">
              <div className="card">
                <h2>Option One: <br/> ChocoBox Trials</h2>
                <img src="/6-bars.png" alt="chocolate bars"/>
                <p>9.99$ A Month for 6 different chocolate bars of your choosing!</p>
                <Link to={"/subscribe/Trials"}><button>Subscribe Now!</button></Link>
              </div>
              <div className="card">
                <h2>Option Two: <br/> ChocoBox Prime</h2>
                <img src="/9-bars.png" alt="chocolate bars"/>
                <p>14.99$ A Month for 9 different chocolate bars of your choosing!</p>
                <Link to={"/subscribe/Prime"}><button>Subscribe Now!</button></Link>
              </div>
              <div className="card">
                <h2>Option Three: <br/> ChocoBox Deluxe</h2>
                <img src="/15-bars.png" alt="chocolate bars"/>
                <p>19.99$ A Month for 15 different chocolate bars of your choosing!</p>
                <Link to={"/subscribe/Deluxe"}><button>Subscribe Now!</button></Link>
              </div>
            </div>
            <div className="learn-more">
              <div className="learn-card">
                <img className="learn-image" src="/choices.svg" alt="choose-plan"/>
                {/* <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */}
                <div className="learn-body">
                  <h3>Choose A Plan</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi illum,
                    iusto fuga harum provident, ipsa voluptates debitis quibusdam. Deleniti
                     ipsum dolores aperiam et error! Dignissimos aspernatur harum totam soluta.
                  </p>
                </div>
              </div>
              <div className="learn-card">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi illum,
                  iusto fuga harum provident, ipsa voluptates debitis quibusdam. Deleniti
                   ipsum dolores aperiam et error! Dignissimos aspernatur harum totam soluta.
                </p>
                <img className="learn-image" src="/chocolate-icon.svg" alt="pick-chocolate"/>
                {/* <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */}
              </div>
              <div className="learn-card">
                <img className="learn-image" src="/letter.svg" alt="get-in-mail"/>
{/* <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-buddha" title="Pixel Buddha">Pixel Buddha</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi illum,
                  iusto fuga harum provident, ipsa voluptates debitis quibusdam. Deleniti
                   ipsum dolores aperiam et error! Dignissimos aspernatur harum totam soluta.
                </p>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="subscription-body">
          {content}
        </div>
      );
    }
  }


  export default Subscription;
