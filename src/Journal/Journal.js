import React, { Component } from 'react';
import "./Journal.css";
import { InputGroup, InputGroupAddon, Input, FormGroup, Button } from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { addJournalEntry } from './CreateJournalEntry';

const TASTINGNOTES = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];


const ORIGINS = [
	{ label: 'Africa', value: 'africa' },
	{ label: 'Madagascar', value: 'Madagascar' },
  { label: 'Vietnam', value: 'vietnam' },
  { label: 'Blend', value: 'blend' },
];

const PRODUCERS = [
	{ label: 'Valrhona', value: 'valrhona' },
	{ label: 'Dandelion Chocolate', value: 'dandelionchocolate' },
  { label: 'Labooko', value: 'labooko' },
  { label: 'Guittard', value: 'guittard' },
];

// Needs make new entry callback
export class Journal extends Component {
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

export class JournalNewEntry extends Component {
  
  // Call back to add new entry to database
  addNewEntry(entryDetails) {
    this.props.addEntryCallback(entryDetails);
  }
  
  render() {
    return (
      <div>
      <div className="entry-search-row" >
      <SearchJournal />
      </div>
      <NewJournalEntryCard currentUser={this.props.currentUser} newEntryCallback={(entryDetails) => this.addNewEntry(entryDetails)}/>
      </div>
    );
  }
}

// Displays the input form for making a new journal entry
class NewJournalEntryCard extends Component {
  constructor() {
    super();
    this.producer = "none";
    this.origin = "none";
    this.tastingNotes;
    this.rating = 0;
    this.text = "";
    this.date = "";
    this.barName = "";
  }
  
  // Update in response to textarea typing
  updatePost(e) {
    this.text = e.target.value;
  }
  
  updateDateAndTitle (details) {
    this.date = details.date;
    this.barName = details.barName;
  }
  
  updateChocolateDetails(details) {
    this.origin = details.origin;
    this.producer = details.producer;
    this.tastingNotes = details.tastingNotes;
  }
  
  updateRating(rating) {
    this.rating = rating;
  }
  
  addEntry(e) {
    e.preventDefault();
    addJournalEntry(this.props.currentUser, {producer : this.producer, origin : this.origin, tastingNotes : this.tastingNotes, rating : this.rating, text : this.text, date: this.date, barName : this.barName});
  }
  
  render() {
    return (
      <div className="journal-item ">
      <NewJournalCardHeader  passUpStateCallback={(state) => this.updateDateAndTitle(state)}/>
      
      <div className="journal-entry-main">
      <div className="chocolate-detail-container">
      <ChocolateDetailsEntry passUpStateCallback={(state) => this.updateChocolateDetails(state)}/>
      <p className="label-font">Rating: <ChocolateRatingEntry passUpStateCallback={(rating) => this.updateRating(rating)}/> </p>
      </div>
      <textarea name="text" className="new-chocolate-rating-text-container" placeholder="How was this chocolate?"
      onChange={(e) => this.updatePost(e)} />
      </div>
      <button id="submit-entry-button" onClick={(e) => this.addEntry(e)}>Submit Entry</button>
      </div>
    );
  }
}


// Handles changing the rating of a chocolate
class ChocolateRatingEntry extends Component {
  constructor() {
    super();
    this.state = {rating : 1};
    this.updateRating = this.updateRating.bind(this);
    
  }
  updateRating(value, event) {
    event.preventDefault();
    this.setState({rating : value.num});
    this.props.passUpStateCallback(value.num);
  }
  
  render() {
    let ratingStars = [{star : this.state.rating >= 1, num : 1}, {star : this.state.rating >= 2, num : 2}, {star : this.state.rating >= 3, num : 3}, {star : this.state.rating >= 4, num : 4}, {star : this.state.rating >= 5, num : 5}]
    let i = 0;
    ratingStars = ratingStars.map((item) => {
      if (item.star) {
        return(<i key={++i} className="fa fa-star" aria-hidden="true" onClick={this.updateRating.bind(this, item)}></i>)
      } else {
        return(<i key={++i} className="fa fa-star-o" aria-hidden="true" value={item.num} onClick={this.updateRating.bind(this, item)}></i>)
      }
    })
    
    return (
      <span>
      {ratingStars}
      </span>
    );
  }
}


// Renders place for entering origin, producer and tasting notes
// on a new journal entry
class ChocolateDetailsEntry extends Component {
  constructor() {
    super();
    this.state = {
      origin: "Africa",
      producer: "",
      tastingNotes: []
    }
  }
  
  handleSelectChangeNotes = (value) => {
    this.setState({origin: this.state.origin, producer: this.state.producer, tastingNotes: value});
  }
  
  updateValueOrigin = (origin) => {
    this.setState({origin: origin, producer: this.state.producer, tastingNotes: this.state.tastingNotes});
  }
  
  updateValueProducer = (producer) => {
    this.setState({origin: this.state.origin, producer: producer, tastingNotes: this.state.tastingNotes});
  }
  
  render() {    
    this.props.passUpStateCallback(this.state);
    
    return (
      <div className="chocolate-detail">
      <i className="fa fa-globe" aria-label="Origin"></i>
      <Select
      className="select-box"
      autoFocus
      options={ORIGINS}
      simpleValue
      clearable={true}
      name="selected-state"
      value={this.state.origin}
      placeholder="Select the origin"          
      onChange={this.updateValueOrigin}
      openOnClick={false}
      searchable={true}
      />
      
      <i className="fa fa-industry" aria-label="Producer"></i>
      <Select
      className="select-box"
      autoFocus
      options={PRODUCERS}
      simpleValue
      clearable={true}
      name="selected-state"
      value={this.state.producer}
      placeholder="Select the producer"          
      onChange={this.updateValueProducer}
      openOnClick={false}
      searchable={true}
      />
      
      <i className="fa fa-sticky-note" aria-label="Tasting notes"></i>
      <Select
      className="select-box"
      closeOnSelect={true}
      multi
      onChange={this.handleSelectChangeNotes}
      options={TASTINGNOTES}
      placeholder="Select tasting notes"
      removeSelected={this.state.removeSelected}
      name="form-field-name"
      value={this.state.tastingNotes}
      simpleValue
      value={this.state.tastingNotes}
      openOnClick={false}
      />
      </div>
    );
  }
}

// Renders card header that info can be entered in
class NewJournalCardHeader extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      barName: ""
    }
  }
  
  handleChangeName(e) {
    this.setState({date : this.state.date, barName : e.target.value});  
    this.props.passUpStateCallback(this.state);
  } 
  
  handleChangeDate(e) {
    this.setState({date : e.target.value, barName : this.state.barName});
    this.props.passUpStateCallback(this.state)
  }
  
  
  render() {
    return(
      <div className="journal-new-entry-header group-input">
      <Input className="header-entry-field" id="bar-name-input-field" placeholder="Name:" aria-label="Input a chocolate bar name" onChange={(e) => this.handleChangeName(e)}/>
      <Input className="header-entry-field" placeholder="Date:       /        /  " aria-label="Input the date the bar was tasted"  onChange={(e) => this.handleChangeDate(e)}/>
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
      <input type="search" id="search-box" placeholder="Search..." />
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
      <JournalTextHolder text={"Tastes delicious! Best chocolate bar I've ever had!"} />
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
