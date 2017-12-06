import React, { Component } from 'react';
import './Subscription.css';
import Subscribe from './Subscribe';
import { handleRows, ChooseRow } from './Subscribe';
import { Link  } from 'react-router-dom';
import Search from '../Catalog/Search';

  class Subscription extends Component  {

    render()  {
      console.log(Search('71'));
      let content = null;
      if (!this.props.subscription) {
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
                <img src="" alt="chocolate bars"/>
                <p>9.99$ A Month for 6 different chocolate bars of your choosing!</p>
                <Link to={"/subscribe/Trials"}><button>Subscribe Now!</button></Link>
              </div>
              <div className="card">
                <h2>Option Two: <br/> ChocoBox Premium</h2>
                <img src="" alt="chocolate bars"/>
                <p>14.99$ A Month for 9 different chocolate bars of your choosing!</p>
                <Link to={"/subscribe/Premium"}><button>Subscribe Now!</button></Link>
              </div>
              <div className="card">
                <h2>Option Three: <br/> ChocoBox Deluxe</h2>
                <img src="" alt="chocolate bars"/>
                <p>19.99$ A Month for 15 different chocolate bars of your choosing!</p>
                <Link to={"/subscribe/Deluxe"}><button>Subscribe Now!</button></Link>
              </div>
            </div>
            <div className="learn-more">
              <div className="learn-card">
                <img src="" alt="choose-plan"/>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi illum,
                  iusto fuga harum provident, ipsa voluptates debitis quibusdam. Deleniti
                   ipsum dolores aperiam et error! Dignissimos aspernatur harum totam soluta
                  culpa minus perspiciatis. Et eius cum laboriosam! Sint, incidunt ducimus
                 impedit, reiciendis unde deserunt fugit consequuntur quasi minus molestias,
                  eligendi provident ullam inventore nobis! Adipisci, fuga id praesentium in
                  , nemo non?
                </p>
              </div>
              <div className="learn-card">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi illum,
                  iusto fuga harum provident, ipsa voluptates debitis quibusdam. Deleniti
                   ipsum dolores aperiam et error! Dignissimos aspernatur harum totam soluta
                  culpa minus perspiciatis. Et eius cum laboriosam! Sint, incidunt ducimus
                 impedit, reiciendis unde deserunt fugit consequuntur quasi minus molestias,
                  eligendi provident ullam inventore nobis! Adipisci, fuga id praesentium in
                  , nemo non?
                </p>
                <img src="" alt="pick-chocolate"/>
              </div>
              <div className="learn-card">
                <img src="" alt="get-in-mail"/>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi illum,
                  iusto fuga harum provident, ipsa voluptates debitis quibusdam. Deleniti
                   ipsum dolores aperiam et error! Dignissimos aspernatur harum totam soluta
                  culpa minus perspiciatis. Et eius cum laboriosam! Sint, incidunt ducimus
                 impedit, reiciendis unde deserunt fugit consequuntur quasi minus molestias,
                  eligendi provident ullam inventore nobis! Adipisci, fuga id praesentium in
                  , nemo non?
                </p>
              </div>
            </div>
          </div>
        );
      } else  {
        let rows = handleRows(this.props.subscription);
        content = (
          <div id='subscribed'>
            <h1>Your Subscription:</h1>
            <h2>You are subscribed to ChocoBox {this.props.subscription}</h2>
            {rows.grid}
            <Link to="subscription"><button onClick={() => this.props.handleUnsubscribe()}>Unsubscribe</button></Link>
          </div>

        );
      }
      return content;
    }
  }

  export default Subscription;
