import React, { Component } from 'react';
import "./Catalog.css";
import chocolateBars from '../Data/chocolate-bars.json';
import search from "./Search";
import StaticRating from "./StaticRating";
import { Link } from 'react-router-dom';


export class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query : "",
            origin: [],
            percentage: [],
            producer: []
        };

        this.updateFilters = this.updateFilters.bind(this);
    }
    
    onChange(e) {
        this.setState({ query : e.target.value});
    }

    updateFilters(event, filter = "origin") {
        let value = event.target.value;
        let newFilters = this.state[filter];
        
        if (newFilters.includes(value)) {
            newFilters.splice(newFilters.indexOf(value), 1);
        } else {
            newFilters.push(value);
        }

        this.setState({ [filter]: newFilters})
    }

    render() {
        let catalogChocolates = chocolateBars.filter(bar => {
            return bar.fields.src != undefined;
        });
        
        let catalogOrigins = [];
        let catalogPercentages = [];
        let catalogProducers = [];

        // Generate list of filter values
        catalogChocolates.forEach(bar => {
            if (!catalogOrigins.includes(bar.fields.broad_bean_origin)) {
                catalogOrigins.push(bar.fields.broad_bean_origin)
            }

            if (!catalogPercentages.includes(bar.fields.cocoa_percent)) {
                catalogPercentages.push(bar.fields.cocoa_percent)
            }

            if (!catalogProducers.includes(bar.fields.company)) {
                catalogProducers.push(bar.fields.company)
            }
        });

        catalogOrigins.sort();
        catalogPercentages.sort();
        catalogProducers.sort();

        let filters = {
            origin : catalogOrigins,
            percentage : catalogPercentages,
            producer : catalogProducers
        }

        if (this.state.query !== "") {
            catalogChocolates = search(this.state.query, catalogChocolates);
        }

        catalogChocolates = catalogChocolates.filter(bar => {
            if (this.state.origin.length !== 0 && 
                !this.state.origin.includes(bar.fields.broad_bean_origin)) {
                    return false;
                } else if (this.state.percentage.length !== 0 && 
                !this.state.percentage.includes(bar.fields.cocoa_percent.toString())) {
                    return false;
                } else if (this.state.producer.length !== 0 && 
                    !this.state.producer.includes(bar.fields.company)) {
                    return false;
                }
            return true;
        })

        return (
            <div className="catalog-container">
                <SearchCatalog onChange={(e) => this.onChange(e)} />
                <div className="catalog-body">
                    <div className="catalog-sidebar">
                        <CatalogSidebar filters={filters} updateFiltersCallback={this.updateFilters} />
                    </div>
                    <div className="catalog-items">
                    {catalogChocolates.length == 0 ? <p className="catalog-message"><em>There are no results for your search.</em></p> : <p className="catalog-message"><em>{catalogChocolates.length} result{catalogChocolates.length == 1 ? null : "s"}</em></p>}
                        <div className="catalog-grid">
                        {catalogChocolates.map(bar => <CatalogItem key={bar.fields.ref} recordId={bar.recordid} name={bar.fields.name} rating={bar.fields.rating} src={bar.fields.src} />)}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class CatalogSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {appliedFiters : {
            origin: [],
            percentage: [],
            producer: []
        }};
    }

    render() {
        let filters = this.props.filters;

        return (
            <div>
                <p>Filter Chocolates</p>
                <CatalogFilter name="Origin" filterName="origin" icon="globe" values={filters.origin} updateFiltersCallback={this.props.updateFiltersCallback} />
                <CatalogFilter name="Cocoa Percentage" filterName="percentage" icon="chocolate" values={filters.percentage} updateFiltersCallback={this.props.updateFiltersCallback} />
                <CatalogFilter name="Producer" filterName="producer" icon="industry" values={filters.producer} updateFiltersCallback={this.props.updateFiltersCallback} />
            </div>
        );
    }
}

class CatalogFilter extends Component {
    render() {
        let values = this.props.values;

        return (
            <div className="card">
                <div className="catalogfilter-header">
                    <i className={"fa fa-" + this.props.icon} aria-hidden="true"></i> {this.props.name}
                </div>
                <hr/>
                <div className="catalogfilter-items">
                {values.map(value => <CheckBox key={value} filterName={this.props.filterName} value={value} onChange={this.props.updateFiltersCallback} />)}
                </div>
            </div>
        );
    }
}

class CheckBox extends Component {
    render() {
        let value = this.props.value;

        return (
        <div>
            <label><input type="checkbox" id={value} value={value} onChange={(e, name) => this.props.onChange(e, this.props.filterName)} /> {value}</label>
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
            <Link to={"/catalog/" + this.props.recordId}>
                <div className="catalog-item-card">
                    <div className="catalog-item-header">{itemName}</div>
                    <div className="catalog-item-content">
                        <div className="catalog-img">
                            <span className="catalog-img-valign"></span><img src={src} />
                        </div>
                        <StaticRating rating={rating} />
                    </div>
                </div>
                </Link>
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

export default Catalog;
