import React, { Component } from 'react';
import "./Journal.css";
// import { Input, InputGroup,} from 'reactstrap';

// Needs make new entry callback
class Journal extends Component {
  render() {
    return (
      <div>
      <div className="entry-search-row" >
      <NewEntryButton />
      <SearchJournal />
      </div>
      <JournalEntryItem />
      </div>
    );
  }
}

// Renders card header
class NewEntryButton extends Component {
  render() {
    return(
      <button id="entry-button">New Entry</button>
    );
  }
}

class SearchJournal extends Component {
  render() {
    return (
      <span className="search-elements">
      <i className="fa fa-search" aria-hidden="true"></i>
      <p>Search Journal</p>
      </span>
    );
  }
}


// Displays existing journal entry items
class JournalEntryItem extends Component {
  render() {
    return (
      <div className="journal-item">
      <JournalCardHeader date={"11/18/2017"} barName={"Kokoa Kamili 70% Dark Chocolate"} />

      <div className="journal-entry-main">
      <div className="chocolate-detail-container">
      <ChocolateDetailsStatic region={"Africa"} producer={"Kokoa Kamili"} tastingNotes={"Floral, Roasted, Buttery"} />

      <p>Rating: <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i></p>
      </div>
      <JournalTextHolder text={"Tastes delicious! Best chocolate bar I've ever had!"} isNewEntry={false} />
      </div>
      </div>
    );
  }
}

// Renders card header
class JournalCardHeader extends Component {
  render() {
    return(
      <div className="journal-entry-header">
      <div className="header-field">{this.props.barName}</div>
      <div className="header-field">{this.props.date}</div>
      </div>
    );
  }
}

// Renders text box on card
// Takes a boolean prop, isNewEntry, if
// this is being rendered as part of a new entry and not
// an existing one.
class JournalTextHolder extends Component {
  render() {
    return (
      <div className="chocolate-rating-text-container">
      <p>{this.props.text}</p>
      </div>
    );
  }
}

// Statically renders details about the chocolate
// Props: region, producer, tastingNotes
class ChocolateDetailsStatic extends Component {
  render() {
    return (
      <div className="chocolate-detail">
      <i className="fa fa-globe" aria-label="Origin"></i><p>{this.props.region}</p>
      <i className="fa fa-industry" aria-label="Producer"></i><p>{this.props.producer}
      </p>
      <i className="fa fa-sticky-note" aria-label="Tasting notes"></i>
      <p>{this.props.tastingNotes}</p>
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
