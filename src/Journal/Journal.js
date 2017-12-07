import React, { Component } from 'react';
import "./Journal.css";
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
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
  constructor(props) {
    super(props);
    this.state = {query : ""};
  }
  onChange(e) {
    this.setState({ query : e.target.value});
  }

  render() {
    return (
      <div>
      <div className="entry-search-row" >
      <NewEntryButton />
      <SearchJournal onChange={(e) => this.onChange(e)} currentUser={this.props.currentUser}/>
      <div>
      <RenderJournalItems user={this.props.currentUser}
        query={this.state.query.split(" ")}/>
      </div>
      </div>
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
    this.rating = 1;
    this.text = "";
    this.date = "";
    this.barName = "";
  }

  // Update in response to textarea typing
  updatePost(e) {
    this.text = e.target.value;
  }

  updateDateAndTitle(details) {
    this.date = details.date;
    this.barName = details.barName;
    this.setState({});
  }

  updateChocolateDetails(details) {
    this.tastingNotes = details.tastingNotes;
    this.origin = details.origin;
    this.producer = details.producer;
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
      <NewJournalCardHeader passUpStateCallback={(state) => this.updateDateAndTitle(state)}/>

      <div className="journal-entry-main">
      <div className="chocolate-detail-container">
      <ChocolateDetailsEntry passUpStateCallback={(state) => this.updateChocolateDetails(state)}/>
      <p className="label-font">Rating: <ChocolateRatingEntry passUpStateCallback={(rating) => this.updateRating(rating)}/> </p>
      </div>
      <textarea name="text" className="new-chocolate-rating-text-container" placeholder="How was this chocolate?"
      onChange={(e) => this.updatePost(e)} />
      </div>
      {(this.barName !== "") ?
      <div>
        <Button id="submit-entry-button" onClick={(e) => this.addEntry(e)}><NavLink to="/journal">Submit Entry</NavLink></Button>
      </div> :
      <div>
        <Button id="submit-entry-button" disabled onClick={(e) => this.addEntry(e)}>Submit Entry</Button>
      </div>}
      </div>
    );
  }
}


// Handles changing the rating of a chocolate
class ChocolateRatingEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {rating : 1};
    this.updateRating = this.updateRating.bind(this);
  }
  updateRating(value, event) {
    event.preventDefault();
    this.setState({rating : value.num});
    this.props.passUpStateCallback(value.num);
  }
  componentWillMount() {
    this.setState({rating : (this.props.editingRating ? this.props.editingRating : this.state.rating)});
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
  constructor(props) {
    super(props);
    if (!this.props.editingProducer) { // if not editing
      this.state = {
        origin: "(None)",
        producer: "(None)",
        tastingNotes: []
      }
    } else {
      this.state = {
        origin: this.props.editingOrigin,
        producer: this.props.editingProducer,
        tastingNotes: this.props.editingTastingNotes
      }
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
      openOnClick={false}
      />
      </div>
    );
  }
}

// Renders card header that info can be entered in
class NewJournalCardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      barName: "",
      date: getCurrentDate()
    }
  }

  handleChangeName(e) {
    let newState = {date : this.state.date, barName : e.target.value};
    this.setState(newState);
    this.props.passUpStateCallback(newState);
  }

  handleChangeDate(e) {
    this.setState({date : e.target.value, barName : this.state.barName});
    this.props.passUpStateCallback(this.state)
  }


  render() {
    if (this.props.editingDate && this.props.editingbarName) {
      return  (
        <div className="journal-new-entry-header group-input">
        <Input className="header-entry-field" id="bar-name-input-field" placeholder="Name:" aria-label="Input a chocolate bar name" onChange={(e) => this.handleChangeName(e)} defaultValue={this.props.editingbarName}/>
        <Cleave
        options={{date: true, delimiter: "."}}
        className="header-entry-field" placeholder="Date: DD.MM.YYYY" aria-label="Input the date the bar was tasted"  onChange={(e) => this.handleChangeDate(e)} value={this.props.editingDate}/>
        </div>
      )
    } else {
      return(
        <div className="journal-new-entry-header group-input">
        <Input className="header-entry-field" id="bar-name-input-field" placeholder="Name:" aria-label="Input a chocolate bar name" onChange={(e) => this.handleChangeName(e)}/>
        <Cleave
        options={{date: true, delimiter: "."}}
        className="header-entry-field" placeholder="Date: DD.MM.YYYY" aria-label="Input the date the bar was tasted"  onChange={(e) => this.handleChangeDate(e)} value={this.state.date}/>
        </div>
      );
    }
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
      <span>
      <span className="search-elements">
      <i className="fa fa-search" aria-hidden="true"></i>
      <p>Search Journal</p>
      <input type="search" id="search-box" placeholder="Search..." onChange={(e) => this.props.onChange(e)}/>
      </span>
      </span>
    );
  }
}

class RenderJournalItems extends Component {
  constructor(props) {
    super(props);
    this.state = {edit : false, editingEntry : ""};
    this.key;
  }

  componentWillMount() {
    this.userDataRef = firebase.database().ref('userData/' + this.props.user.uid + "/userJournalEntries");
    this.userDataRef.on('value', (snapshot) => {
      this.setState({userData : snapshot.val(), edit: this.state.edit, editingEntry : this.state.editingEntry});
    });
  }
  componentWillUnmount() {
    this.userDataRef.off();
  }

  editEntry(key) {
    let entryEditing = this.state.userData[key];
    this.currentEditKey = key;
    this.setState({userData : this.state.userData, edit : true, editingEntry : entryEditing});
  }

  // Pushes an edited journal entry to database.
  // Recreates the string that the item can be searched for by.
  completeEdit(updatedInfo, entryKey) {
    updatedInfo.searchString = updatedInfo.producer + updatedInfo.origin + updatedInfo.tastingNotes + updatedInfo.text + "date:" + updatedInfo.date + updatedInfo.barName;
    updatedInfo.tastingNotes = updatedInfo.tastingNotes ? updatedInfo.tastingNotes : "(None)";
    firebase.database().ref('userData/' + this.props.user.uid + '/userJournalEntries/' + entryKey).update(updatedInfo);
  }

  // Deletes the entry being edited
  deleteCurrentEditEntry(key) {
    let newUserData = this.state.userData;
    delete newUserData[key];
    console.log(newUserData);
    firebase.database().ref('userData/' + this.props.user.uid + '/userJournalEntries').set(newUserData);
  }

  render() {
    if (!this.state.edit && this.state.userData && this.state.userData !== "None") {
      let output = Object.keys(this.state.userData).map((key) => {
        let item = this.state.userData[key];
        let includes = true;

        // Check if all words in query are included
        for (let i = 0; i < this.props.query.length; i++) {
          if (!item.searchString.toLowerCase().includes(this.props.query[i].toLowerCase())) {
            includes = false; // If not included
          }
        }
        if (includes) { // If journal entry includes all words in query
          return <JournalEntryItem date={item.date} barName={item.barName} region={item.origin} producer={item.producer} tastingNotes={item.tastingNotes} rating={item.rating} text={item.text} key={key} dbKey={key} editEntry={(key) => this.editEntry(key)}/>
        } else {
          return "";
        }
      })
      output.reverse();
      return (
        <div>
        {output}
        </div>
      );
    } else if (this.state.userData === "None") {
      return(<div className="journal-entry-header info-text"><p>Your chocolate journal is empty.</p></div>)
    } else if (this.state.edit) {
      return (<EditingJournalEntryCard itemBeingEdited={this.state.editingEntry} completeEditCallback={(newInfo) => this.completeEdit(newInfo, this.currentEditKey)} deleteCallback={() => this.deleteCurrentEditEntry(this.currentEditKey)}/>)
    } else { // not loaded or doesn't exist
    return(<div className="journal-entry-header info-text"><p>Your journal is empty.</p></div>)
  }
}
}

// Displays the input form for editing a journal entry
// Takes in a prop of the former information
class EditingJournalEntryCard extends Component {
  constructor(props) {
    super(props);
    this.producer = this.props.itemBeingEdited.producer;
    this.origin = this.props.itemBeingEdited.origin;
    this.tastingNotes = this.props.itemBeingEdited.tastingNotes;
    this.rating = this.props.itemBeingEdited.rating;
    this.text = this.props.itemBeingEdited.text;
    this.date = this.props.itemBeingEdited.date;
    this.barName = this.props.itemBeingEdited.barName;
    this.state= {
      hasConfirmedDelete : false
    }
  }

  // Update in response to textarea typing
  updatePost(e) {
    this.text = e.target.value;
  }

  updateDateAndTitle (details) {
    this.date = details.date;
    this.barName = details.barName;
    this.setState({});
  }

  updateChocolateDetails(details) {
    this.tastingNotes = details.tastingNotes;
    this.origin = details.origin;
    this.producer = details.producer;
  }

  updateRating(rating) {
    this.rating = rating;
  }

  updateEntry(e) {
    e.preventDefault();
    this.props.completeEditCallback({producer : this.producer, origin : this.origin, tastingNotes : this.tastingNotes, rating : this.rating, text : this.text, date: this.date, barName : this.barName}, this.props.currentEditKey);
  }

  deleteItem() {
    this.props.deleteCallback();
  }

  hasConfirmedDeleteClick() {
    this.setState({hasConfirmedDelete : true});
  }

  render() {
    return (
      <div className="journal-item ">
      <NewJournalCardHeader passUpStateCallback={(state) => this.updateDateAndTitle(state)} editingbarName={this.barName} editingDate={this.date}/>

      <div className="journal-entry-main">
      <div className="chocolate-detail-container">
      <ChocolateDetailsEntry passUpStateCallback={(state) => this.updateChocolateDetails(state)} editingOrigin={this.origin} editingProducer={this.producer} editingTastingNotes={this.tastingNotes}/>
      <p className="label-font">Rating: <ChocolateRatingEntry passUpStateCallback={(rating) => this.updateRating(rating)} editingRating={this.rating}/> </p>
      </div>
      <textarea name="text" className="new-chocolate-rating-text-container" placeholder="How was this chocolate?"
      onChange={(e) => this.updatePost(e)} defaultValue={this.text}></textarea>
      </div>
      {(this.barName !== "") ? <div><NavLink to="/journal"><Button id="submit-entry-button"
        onClick={(e) => this.updateEntry(e)}>Confirm Changes</Button></NavLink></div> :
        (<div><Button id="submit-entry-button" disabled onClick={() => this.updateEntry()}>Update Entry</Button></div>)}
        {this.state.hasConfirmedDelete ? <div><Button id="delete-button" color="danger" onClick={() =>
        this.deleteItem()}>Delete Entry</Button></div> : <div><Button id="delete-button" onClick={() =>
        {this.hasConfirmedDeleteClick()}} color="warning">Delete Entry</Button></div>}
      </div>
    );
  }
}




// Displays existing journal entry items
class JournalEntryItem extends Component {
  editEntry(e) {
    e.preventDefault();
    this.props.editEntry(this.props.dbKey);
  }

  render() {
    return (
      <div className="journal-item">
      <JournalCardHeader date={this.props.date} barName={this.props.barName} />

      <div className="journal-entry-main">
      <div className="chocolate-detail-container">
      <ChocolateDetailsStatic region={this.props.region} producer={this.props.producer} tastingNotes={this.props.tastingNotes} />

      <p className="label-font">Rating: {renderRatingStars(this.props.rating)}</p>
      </div>
      {this.props.text ?  <JournalTextHolder text={this.props.text} /> : ""}
      </div>
      <Button color="warning" id="edit-button" onClick={(e)=> this.editEntry(e)}>Edit</Button>
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
      <i className="fa fa-globe" aria-label="Origin"></i><p className="label-font">{toTitleCase(this.props.region)}</p>
      <i className="fa fa-industry" aria-label="Producer"></i><p className="label-font">{toTitleCase(this.props.producer)}
      </p>
      <i className="fa fa-sticky-note" aria-label="Tasting notes"></i>
      <p className="label-font">{formatTastingNotes(this.props.tastingNotes)}</p>
      </div>
    );
  }
}

// From stack overflow
// https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
function getCurrentDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  if(dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }
  return mm + '.' + dd + '.' + yyyy;
}


// Formats input
// Stack overflow
//https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
function toTitleCase(str) {
  if (str !== "(None)") {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
  return str;
}

// Takes in a string of tasting notes "note,note,note" format
// Outputs "Note, Note, Note"
function formatTastingNotes(notes) {
  if (notes) {
    notes = notes.replace(/,/g , ", "); // Replace ',' with ', '
    return toTitleCase(notes);
  } else {
    return "(None)";
  }
}
