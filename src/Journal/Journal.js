import React, { Component } from 'react';
import "./Journal.css";
import { InputGroup, InputGroupAddon, Input, FormGroup } from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


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
  render() {
    return (
      <div>
      <div className="entry-search-row" >
      <SearchJournal />
      </div>
      <NewJournalEntryCard />
      </div>
    );
  }
}

// Displays the input form for making a new journal entry
class NewJournalEntryCard extends Component {
  
  render() {
    return (
      <div className="journal-item">
      <NewJournalCardHeader  />
      
      <div className="journal-entry-main">
      <div className="chocolate-detail-container">
      <ChocolateDetailsEntry />
      <p>Rating: <ChocolateRatingEntry /> </p>
      </div>
      <textarea name="text" className="chocolate-rating-text-container" placeholder="What's Happening...?"
      value={"E"}
      onChange={(e) => this.updatePost(e)} />

      </div>
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
    console.log(value);
    console.log(this.state);
		this.setState({origin: this.state.origin, producer: this.state.producer, tastingNotes: value});
  }
  
  updateValueOrigin = (origin) => {
    console.log(origin);
		this.setState({origin: origin, producer: this.state.producer, tastingNotes: this.state.tastingNotes});
  }
  
  updateValueProducer = (producer) => {
    console.log(producer);
		this.setState({origin: this.state.origin, producer: producer, tastingNotes: this.state.tastingNotes});
	}
  
  render() {
    console.log(this.state);
    
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
  render() {
    return(
      <div className="journal-new-entry-header">
      <InputGroup>
      <Input className="header-entry-field" id="bar-name-input-field" placeholder="Name:" aria-label="Input a chocolate bar name"/>
      <Input className="header-entry-field" placeholder="Date:       /        /  " aria-label="Input the date the bar was tasted"/>
      </InputGroup>
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
