import React, { Component } from 'react';
import { NewJournalCardHeader, ChocolateDetailsEntry, ChocolateRatingEntry } from './NewJournalEntry';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

// Displays the input form for editing a journal entry
// Takes in a prop of the former information
export class EditingJournalEntryCard extends Component {
    constructor(props) {
      super(props);
      this.producer = this.props.itemBeingEdited.producer;
      this.origin = this.props.itemBeingEdited.origin;
      this.tastingNotes = this.props.itemBeingEdited.tastingNotes;
      this.rating = this.props.itemBeingEdited.rating;
      this.text = this.props.itemBeingEdited.text;
      this.date = this.props.itemBeingEdited.date;
      this.barName = this.props.itemBeingEdited.barName;
      this.state = {
        hasConfirmedDelete : false
      }
    }
    
    // Update in response to textarea typing
    updatePost(e) {
      this.text = e.target.value;
    }
    
    updateDateAndTitle (details) {
      this.date = details.date ? details.date : this.date;
      this.barName = details.barName ? details.barName : this.barName;
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
        <div><Link to="/journal"><Button id="submit-entry-button"
        onClick={(e) => this.updateEntry(e)}> Confirm Changes</Button></Link></div>
        
        {this.state.hasConfirmedDelete ? <div><Button id="delete-button" color="danger" onClick={() =>
          this.deleteItem()}>Confirm Delete Entry</Button></div> : <div><Button id="delete-button" onClick={() =>
            {this.hasConfirmedDeleteClick()}} color="warning">Delete Entry</Button></div>}
            </div>
          );
        }
      }