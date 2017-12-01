import React, { Component } from 'react';
import './Subscription.css';

  class Subscription extends Component  {

    render()  {
      return(
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
              <button>View Our Catalogue</button>
              <button>Learn More</button>
            </div>
          </header>
          <div className="cards">
            <div className="card">
              <h2>Option One: <br/> ChocoBox Trials</h2>
              <img src="" alt="chocolate bars"/>
              <p>9.99$ A Month for 6 different chocolate bars of your choosing!</p>
              <button>Subscribe Now!</button>
            </div>
            <div className="card">
              <h2>Option Two: <br/> ChocoBox Premium</h2>
              <img src="" alt="chocolate bars"/>
              <p>14.99$ A Month for 10 different chocolate bars of your choosing!</p>
              <button>Subscribe Now!</button>
            </div>
            <div className="card">
              <h2>Option Three: <br/> ChocoBox Deluxe</h2>
              <img src="" alt="chocolate bars"/>
              <p>19.99$ A Month for 15 different chocolate bars of your choosing!</p>
              <button>Subscribe Now!</button>
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
    }
  }

  export default Subscription;
