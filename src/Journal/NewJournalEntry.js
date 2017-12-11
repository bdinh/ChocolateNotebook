import React, { Component } from 'react';
import { PRODUCERS } from '../RDataWrangling/AllProducerNames';
import { ORIGINS } from '../RDataWrangling/AllRegionNames';
import { TASTINGNOTES } from '../RDataWrangling/AllTastingNotes';
import Select from 'react-select';
import { addJournalEntry } from './CreateJournalEntry';
import Cleave from 'cleave.js/react'; // For date formatting
import { NavLink } from 'react-router-dom';
import { Input, Button } from 'reactstrap';


// Displays the input form for making a new journal entry
export class NewJournalEntryCard extends Component {
    constructor() {
        super();
        this.producer = "none";
        this.origin = "none";
        this.tastingNotes = undefined;
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
    
    addEntry() {
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
            <NavLink to="/journal"><Button id="submit-entry-button" onClick={() => {this.addEntry();}}>Submit Entry</Button></NavLink>
            </div> :
            <div>
            <Button id="submit-entry-button" disabled onClick={(e) => {this.addEntry(e);
            }}>Submit Entry</Button>
            </div>}
            </div>
        );
    }
}

// Handles changing the rating of a chocolate
export class ChocolateRatingEntry extends Component {
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
export class ChocolateDetailsEntry extends Component {
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
export class NewJournalCardHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
