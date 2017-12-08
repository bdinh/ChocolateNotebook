import React, { Component } from 'react';
import "./Catalog.css";
import chocolateBars from '../Data/chocolate-bars.json';
import search from "./Search";



export class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {query : ""};
    }
    onChange(e) {
        this.setState({ query : e.target.value});
    }

    render() {
        console.log(chocolateBars);
        let catalogChocolates = chocolateBars.filter(bar => {
            return bar.fields.src != undefined;
        });
        
        let catalogOrigins = [];
        let catalogPercentages = [];
        let catalogProducers = [];

        if (this.state.query !== "") {
            catalogChocolates = search(this.state.query, catalogChocolates);
        }

        return (
            <div className="catalog-container">
                <SearchCatalog onChange={(e) => this.onChange(e)} />
                <div className="catalog-body">
                    <div className="catalog-sidebar">
                        <CatalogSidebar />
                    </div>
                    <div className="catalog-grid">
                    {catalogChocolates.map(bar => <CatalogItem name={bar.fields.name} rating={bar.fields.rating} src={bar.fields.src} />)}
                    {catalogChocolates.length == 0 ? <p className="catalog-message"><em>There are no results for your search.</em></p> : null}

                    </div>
                </div>
            </div>
        );
    }
}

class CatalogSidebar extends Component {
    render() {
        return (
            <div>
                <CatalogFilter name="Origin" icon="globe" />
                <CatalogFilter name="Cocoa Percentage" icon="chocolate" />
                <CatalogFilter name="Producer" icon="industry" />
            </div>
        );
    }
}

class CatalogFilter extends Component {
    render() {
        return (
            <div className="card">
                <div className="catalogfilter-header">
                    <i className={"fa fa-" + this.props.icon} aria-hidden="true"></i> {this.props.name}
                </div>
                <hr/>
                <div className="catalogfilter-items">
                <input type="checkbox" value="option-1" /> Option 1<br/>
                <input type="checkbox" value="option-2" /> Option 2<br/>
                </div>
            </div>
        );
    }
}

export class CatalogItem extends Component {

    render() {
        let itemName = this.props.name || "Item Name";
        let src = this.props.src || "http://via.placeholder.com/350";
        let rating = Math.round(this.props.rating);

        return (
            <div className="catalog-item">
                <div className="catalog-item-card">
                    <div className="catalog-item-header">{itemName}</div>
                    <div className="catalog-item-content">
                        <div className="catalog-img">
                            <span className="catalog-img-valign"></span><img src={src} />
                        </div>
                        <StaticRating rating={rating} />
                    </div>
                </div>
            </div>
        );
    }
}

export class ProductPage extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

class SearchCatalog extends Component {
    render() {
      return (
          <div className="entry-search-row">
        <span className="search-elements">
            <i className="fa fa-search" aria-hidden="true"></i>
            <p>Search our Catalog</p>
            <input type="search" id="search-box" placeholder="Search..." onChange={(e) => this.props.onChange(e)} />
        </span>
        </div>
      );
    }
  }

  class StaticRating extends Component {

    render() {
        let rating = this.props.rating || 1;

      let ratingStars = [{star : rating >= 1, num : 1}, {star : rating >= 2,
        num : 2}, {star : rating >= 3, num : 3}, {star : rating >= 4, num : 4},
         {star : rating >= 5, num : 5}];
      let i = 0;
      ratingStars = ratingStars.map((item) => {
        if (item.star) {
          return(<i key={++i} className="fa fa-star" aria-hidden="true"></i>)
        } else {
          return(<i key={++i} className="fa fa-star-o" aria-hidden="true"></i>)
        }
      })

      return (
        <span>
        {rating} {ratingStars}
        </span>
      );
    }
  }
export default Catalog;
