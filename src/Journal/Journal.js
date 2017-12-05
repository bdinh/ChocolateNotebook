import React, { Component } from 'react';
import "./Journal.css";
import { InputGroup, InputGroupAddon, Input, FormGroup, Button } from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { addJournalEntry } from './CreateJournalEntry';
import { PRODUCERS } from '../RDataWrangling/AllProducerNames';
import { ORIGINS } from '../RDataWrangling/AllRegionNames';
import { TASTINGNOTES } from '../RDataWrangling/AllTastingNotes';
import Cleave from 'cleave.js/react'; // For date formatting
import { NavLink, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import { renderRatingStars } from './RenderRating';



// Needs make new entry callback
export class Journal extends Component {
  render() {
    return (
      <div>
      <div className="entry-search-row" >
      <NewEntryButton />
      <SearchJournal />
      </div>
      <RenderJournalItems user={this.props.currentUser} />
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
      <button id="submit-entry-button" onClick={(e) => this.addEntry(e)}><NavLink to="/journal">Submit Entry</NavLink></button>
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
      origin: "(None)",
      producer: "(None)",
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
      barName: "(None)"
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
      <Cleave 
      options={{date: true, delimiter: "."}}
      className="header-entry-field" placeholder="Date: MM.DD.YYYY" aria-label="Input the date the bar was tasted"  onChange={(e) => this.handleChangeDate(e)}/>
      </div>
    );
  }
}


// Renders card header
class NewEntryButton extends Component {
  render() {
    return(
      <button id="entry-button"><NavLink to="/newjournalentry" >New Entry</NavLink></button>
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

class RenderJournalItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentWillMount() {
    this.userDataRef = firebase.database().ref('userData/' + this.props.user.uid + "/userJournalEntries");
    this.userDataRef.on('value', (snapshot) => {
      this.setState({userData : snapshot.val()});
    });
  }
  componentWillUnmount() {
    this.userDataRef.off();
  }
  
  render() {
    if (this.state.userData && this.state.userData !== "None") {      
      let output = Object.keys(this.state.userData).map((key) => {
        let item = this.state.userData[key];
        return <JournalEntryItem date={item.date} barName={item.barName} region={item.origin} producer={item.producer} tastingNotes={item.tastingNotes} rating={item.rating} text={item.text} key={key}/>
      })
      
      return (
        <div>
        {output}
        </div>
      );
    } else if (this.state.userData === "None") {
      return(<div className="journal-entry-header"><p>Your chocolate journal is empty.</p></div>)
    } else { // not loaded or doesn't exist
      return(<div className="journal-entry-header"><p>Hold tight! We're retrieving your chocolate journal.</p></div>)
    }
  }
}


// Displays existing journal entry items
class JournalEntryItem extends Component {
  render() {
    return (
      <div className="journal-item">
      <JournalCardHeader date={this.props.date} barName={this.props.barName} />
      
      <div className="journal-entry-main">
      <div className="chocolate-detail-container">
      <ChocolateDetailsStatic region={this.props.region} producer={this.props.producer} tastingNotes={this.props.tastingNotes} />
      
      <p className="label-font">Rating: {renderRatingStars(this.props.rating)}</p>
      </div>
      <JournalTextHolder text={this.props.text} />
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
      <p className="label-font">{this.props.text}</p>
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
      <i className="fa fa-globe" aria-label="Origin"></i><p className="label-font">{this.props.region}</p>
      <i className="fa fa-industry" aria-label="Producer"></i><p className="label-font">{this.props.producer}
      </p>
      <i className="fa fa-sticky-note" aria-label="Tasting notes"></i>
      <p className="label-font">{this.props.tastingNotes}</p>
      </div>
    );
  }
}
