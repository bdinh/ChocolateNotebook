import React, { Component } from 'react';
import "./Journal.css";
// import { Input, InputGroup,} from 'reactstrap';

// Needs make new entry callback
class Journal extends Component {
  render() {
    return (
      <div className="App">
      <JournalEntryItem />
      </div>
    );
  }
}

// Displays existing journal entry items
class JournalEntryItem extends Component {
  render() {
    return (
      <div className="journal-item">
      <div className="journal-entry-header">
      <div className="header-field">Kokoa Kamili 70% Dark Chocolate</div>
      <div className="header-field">11/18/2017</div>
      </div>

      <div className="journal-entry-main">
      <div className="chocolate-detail">
      <i className="fa fa-globe" aria-label="Origin"></i><p> Africa </p>
      <i className="fa fa-industry" aria-label="Producer"></i><p>Producer </p>
      <i className="fa fa-sticky-note" aria-label="Tasting notes"></i>
      <p>Floral, Roasted, Butter</p>
      </div>
      <p>Rating: X X X X X</p>
      <div className="chocolate-rating-text-container">
      <p>Tastes delicious! Best chocolate bar I've ever had!</p>
      </div>
      </div>

      </div>
    );
  }
}

// Allows user to create new entry
class NewJournalEntry extends Component {
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

// Takes in choices as props for Origin, Producer, and tasting notes
// To display in a menu for the user to choose from
class PopupJournalPropertySelector extends Component {
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}


export default Journal;
