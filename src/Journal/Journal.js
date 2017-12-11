import React, { Component } from 'react';
import "./Journal.css";
import { Button } from 'reactstrap';
import 'react-select/dist/react-select.css';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import { renderRatingStars } from './RenderRating';
import { NewJournalEntryCard } from './NewJournalEntry';
import { EditingJournalEntryCard } from './EditJournalEntry';


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
      <div id="journal-body">
      <div className="entry-search-row" >
      <NewEntryButton />
      <SearchJournal onChange={(e) => this.onChange(e)} currentUser={this.props.currentUser}/>
      </div>
      <div>
      <RenderJournalItems user={this.props.currentUser}
      query={this.state.query.split(" ")}/>
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

// Renders card header
class NewEntryButton extends Component {
  constructor(props) {
    super(props);
    this.state = {navigate : false};
  }
  render() {
    if (this.state.navigate) {
      return <Redirect to="/newjournalEntry" push={true} />
    }
    return(
      <div className="entry-button-container">
      <button id="entry-button" onClick={() => this.setState({ navigate: true })}>New Entry</button>
      </div>
    );
  }
}

class SearchJournal extends Component {
  
  render() {
    return (
      <div className="search-elements">
      <i className="fa fa-search" aria-hidden="true"></i>
      <p>Search Journal</p>
      <input type="search" id="search-box" placeholder="Search..." onChange={(e) => this.props.onChange(e)}/>
      </div>
    );
  }
}

class RenderJournalItems extends Component {
  constructor(props) {
    super(props);
    this.state = {edit : false, editingEntry : ""};
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
      <i className="fa fa-globe" aria-label="Origin"></i><p className="label-font">{formatStringsWithCommas(this.props.region)}</p>
      <i className="fa fa-industry" aria-label="Producer"></i><p className="label-font">{toTitleCase(this.props.producer)}
      </p>
      <i className="fa fa-sticky-note" aria-label="Tasting notes"></i>
      <p className="label-font">{formatStringsWithCommas(this.props.tastingNotes)}</p>
      </div>
    );
  }
}

// Formats input
// Stack overflow
//https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
function toTitleCase(str) {
  if (str && str !== "(None)") {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
  return str;
}

// Takes in a string of tasting notes "note,note,note" format
// Outputs "Note, Note, Note"
function formatStringsWithCommas(notes) {
  if (notes) {
    notes = notes.replace(/,/g , ", "); // Replace ',' with ', '
    return toTitleCase(notes);
  } else {
    return "(None)";
  }
}