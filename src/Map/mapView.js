import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map';
import './mapview.css';
import { json, select, csv } from 'd3';
import 'leaflet/dist/leaflet.css';
import L, { map, getPanes, overlayPane, geo, svg, LatLng,
    initPathRoot, path, collection, circleMarker, remove, off } from 'leaflet';
import $ from 'jquery';
import { bindAll } from 'lodash'
import  '../../node_modules/leaflet-curve/leaflet.curve';
import '../../node_modules/leaflet-arc/bin/leaflet-arc.min';

export default class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "origin-view",
            originFilterType: "totalFilter",
            transitionView: "exportFilter",
            transitionViewSelected: "AllFilter"
        };
        bindAll(this, [
            'handleViewMode',
            'updateControlCenter',
            'handleOriginFilter',
            'handleTransitionView',
            'handleCountryFilter'
        ]);
        this.map = "";
        this.originValueMapping = {
            totalFilter: {
                min: 0,
                max: 220,
                text: "Total Number"
            },
            ratingFilter: {
                min: 0,
                max: 3.5,
                text: "Average Rating"
            },
            percentFilter: {
                min: 0,
                max: 85,
                text: "Average Cocao Percent"
            },
        };
        this.destinationValueMapping = {
            totalFilter: {
                min: 0,
                max: 775,
                text: "Total Number"
            },
            ratingFilter: {
                min: 0,
                max: 4,
                text: "Average Rating"
            },
            percentFilter: {
                min: 0,
                max: 85,
                text: "Average Cocao Percent"
            },
        };
        this.exportCountry = ["All", "Bolivia", "Brazil",
            "Ecuador", "Madagascar", "Nicaragua", "Peru", "Venezuela"];

        this.importCountry = ["All", "Australia", "Canada", "Ecuador",
        "France", "Italy", "United Kingdom", "United States"];

    }

    componentDidMount() {
        this.updateMap();
    }

    updateMap() {

            if (this.state.type === "origin-view") {
            csv("./origin-data.csv", (error, data) => {
                let mapboxTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
                });

                this.map =  L.map('map')
                    .addLayer(mapboxTiles)
                    .setView([-1.2858, 13], 2);

                data.forEach((datum) => {
                    let opacity;
                    switch (this.state.originFilterType) {
                        case "totalFilter":
                            opacity = datum.total * 0.01;
                            break;
                        case "ratingFilter":
                            opacity = datum.avgRating * 0.25;
                            break;
                        case "percentFilter":
                            opacity = datum.avgPercent / 120;
                            break;
                    }

                    let position = [parseFloat(datum.latitude), parseFloat(datum.longitude)];
                    let circle = new L.circleMarker(position, {
                        color: "transparent",
                        fill: true,
                        fillColor: '#7F524E',
                        fillOpacity: opacity,
                        radius: 5
                    }).addTo(this.map);
                    let popupText = "<b>Country of Origin:</b> " + datum["Bean.Origin"] + "<br>" +
                        "<b>Total # Bars Exported:</b> " + datum.total + "<br>" +
                        "<b>Average Rating:</b> " + Math.round(100 * parseFloat(datum.avgRating)) / 100 + "<br>" +
                        "<b>Average Cocoa Percent:</b> " + Math.round(10 * parseFloat(datum.avgPercent)) / 10  + "%";
                        circle.bindPopup(popupText);

                    circle.on('mouseover', (event) => {
                        event.target.openPopup();
                        event.target.setStyle({
                            fillOpacity: 1
                        });
                    });

                    circle.on('mouseout', (event) => {
                        event.target.closePopup();
                        event.target.setStyle({
                            fillOpacity: opacity
                        });
                    });

                })

            })

        } else if (this.state.type === "destination-view"){
            csv("./destination-data.csv", (error, data) => {
                let mapboxTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
                });

                this.map =  L.map('map')
                    .addLayer(mapboxTiles)
                    .setView([-1.2858, 13], 2);

                data.forEach((datum) => {
                    let opacity;
                    switch (this.state.originFilterType) {
                        case "totalFilter":
                            opacity = datum.total * 0.01;
                            break;
                        case "ratingFilter":
                            opacity = datum.avgRating * 0.30;
                            break;
                        case "percentFilter":
                            opacity = datum.avgPercent / 100;
                            break;
                    }

                    let position = [parseFloat(datum.latitude), parseFloat(datum.longitude)];
                    let circle = new L.circleMarker(position, {
                        color: "transparent",
                        fill: true,
                        fillColor: '#909479',
                        fillOpacity: opacity,
                        radius: 5
                    }).addTo(this.map);
                    let popupText = "<b>Country of Destination:</b> " + datum["Company.Location"] + "<br>" +
                        "<b>Total # Bars Imported:</b> " + datum.total + "<br>" +
                        "<b>Average Rating:</b> " + Math.round(100 * parseFloat(datum.avgRating)) / 100 + "<br>" +
                        "<b>Average Cocoa Percent:</b> " + Math.round(10 * parseFloat(datum.avgPercent)) / 10  + "%";
                    circle.bindPopup(popupText);

                    circle.on('mouseover', (event) => {
                        event.target.openPopup();
                        event.target.setStyle({
                            fillOpacity: 1
                        });
                    });

                    circle.on('mouseout', (event) => {
                        event.target.closePopup();
                        event.target.setStyle({
                            fillOpacity: opacity
                        });
                    });
                })
            });
        } else {
                csv("./final-bezier-data.csv", (error, data) => {
                    let mapboxTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution: "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
                    });

                    this.map = L.map('map')
                        .addLayer(mapboxTiles)
                        .setView([-1.2858, 13], 2);

                    let plotData = data;

                    if (this.state.transitionViewSelected !== "AllFilter") {
                        plotData = [];

                        let country = this.state.transitionViewSelected.replace("Filter", "");
                        if (this.state.transitionView === "exportFilter") {
                            data.forEach((datum) => {
                                if (datum.Origin === country) {
                                    plotData.push(datum);
                                }
                            })
                        } else {
                            data.forEach((datum) => {
                                if (datum.Destination === country) {
                                    plotData.push(datum);
                                }
                            })
                        }
                    }

                    plotData.forEach((datum) => {
                        let origPosition = [parseFloat(datum.originLat), parseFloat(datum.originLong)];
                        let destPosition = [parseFloat(datum.destLat), parseFloat(datum.destLong)];

                        let origCircle = new L.circleMarker(origPosition, {
                            color: "transparent",
                            fill: true,
                            fillColor: '#7F524E',
                            fillOpacity: 1,
                            radius: 3
                        }).addTo(this.map);

                        let destCircle = new L.circleMarker(destPosition, {
                            color: "transparent",
                            fill: true,
                            fillColor: '#909479',
                            fillOpacity: 1,
                            radius: 5
                        }).addTo(this.map);

                        let pathOptions = {
                            color: 'rgba(127, 82, 78, 0.2)',
                            weight: 2,
                            snakingSpeed: 200,
                            vertices: 200
                        };

                        let bezierCurve = L.curve(['M', [datum.originLat, datum.originLong],
                            'Q', [datum.midpointY + 20, datum.midpointX],
                            [datum.destLat, datum.destLong]], pathOptions).addTo(this.map);

                        let popupText = "<b>Country of Origin:</b> " + datum.Origin + "<br>" +
                            "<b>Country of Destination:</b> " + datum.Destination + "<br>" +
                            "<b>Total # Bars:</b> " + datum.TotalN + "<br>" +
                            "<b>Average Rating:</b> " + Math.round(100 * parseFloat(datum.MeanRating)) / 100 + "<br>" +
                            "<b>Average Cocoa Percent:</b> " + Math.round(10 * parseFloat(datum.MeanPercent)) / 10 + "%";

                        bezierCurve.bindPopup(popupText);
                        bezierCurve.on('mouseover', function (event) {
                            this.setStyle({
                                color: 'rgba(127, 82, 78, 1)',
                                weight: 4
                            });
                            this.openPopup();
                        });
                        bezierCurve.on('mouseout', function (event) {
                            this.setStyle(pathOptions);
                            this.closePopup();
                        });

                    })

                })
            }

    }

    handleViewMode(event) {
            let eventTriggered = event.target.id;
            setTimeout(function() {
                this.map.off();
                this.map.remove();
                this.setState({
                    type: eventTriggered
                }, this.updateMap);
            }.bind(this), 0);
    }


    handleOriginFilter(event) {
            let eventTriggered = event.target.id;
            setTimeout(function () {
                this.map.off();
                this.map.remove();
                this.setState({
                    originFilterType: eventTriggered
                }, this.updateMap);
            }.bind(this), 0)
    }

    handleTransitionView(event) {
            $('#AllFilter').addClass('active');
            $('#' + this.state.transitionViewSelected).removeClass('active');
            this.map.off();
            this.map.remove();
            this.setState({
                transitionView: event.target.id,
                transitionViewSelected: 'AllFilter'
            }, this.updateMap);
    }

    handleCountryFilter(event) {
            this.map.off();
            this.map.remove();
            this.setState({
                transitionViewSelected: event.target.id
            }, this.updateMap);
    }


    updateControlCenter() {
        if ((this.state.type === "origin-view") || (this.state.type === "destination-view")) {
            return (
                <div>
                    {
                        this.state.type === "origin-view" ?
                            (<p>This map shows the country of origin that produced the chocolate bars
                                    from the 1700 individual bars that were expertly rated in this
                                    <a href="http://flavorsofcacao.com/index.html"> dataset</a>.
                                </p>
                            ) :
                            (<p>This map shows the country where the chocolate bars
                                    from the 1700 individual bars that were expertly rated in this
                                    <a href="http://flavorsofcacao.com/index.html"> dataset</a> were
                                    imported to.
                                </p>)
                    }
                    <p>{this.originValueMapping[this.state.originFilterType].text} of Bars Exported Legend:</p>
                    <div className="legend-wrapper">
                        <p>
                            {this.state.type === "origin-view" ?
                                    this.originValueMapping[this.state.originFilterType].min
                                    : this.destinationValueMapping[this.state.originFilterType].min}
                        </p>
                        <div className={"legend-scale" + " " + (this.state.type === "origin-view" ? "legend-scale-origin" : "legend-scale-destination")}>
                        </div>
                        <p>
                            {this.state.type === "origin-view" ?
                                this.originValueMapping[this.state.originFilterType].max
                                : this.destinationValueMapping[this.state.originFilterType].max}
                        </p>
                    </div>
                    <p className="control-card-section">
                        Filter By:
                    </p>
                    <div className="filter-by-button-container">
                        <div className="btn-group" data-toggle="buttons">
                        <label
                            className="btn visual-button active"
                            value="origin-view"
                            id="totalFilter"
                            onClick={this.handleOriginFilter}
                        >
                            <input
                                type="radio"
                                name="totalFilter"/>
                            Total
                        </label>
                        <label
                            className="btn visual-button"
                            value="ratingFilter"
                            id="ratingFilter"
                            onClick={this.handleOriginFilter}
                        >
                            <input type="radio"
                                   name="ratingFilter"/>
                            Rating
                        </label>
                        <label className="btn visual-button"
                               value="percentFilter"
                               id="percentFilter"
                               onClick={this.handleOriginFilter}
                           >
                            <input type="radio"
                                   name="percentFilter"/>
                            Cocao Percent
                        </label>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <p>This map shows the country of origin and destination of the
                        1700 individual bars that were expertly rated in this
                        <a href="http://flavorsofcacao.com/index.html"> dataset</a>, along with
                        a path trajectory that shows where the chocolate begins and ends up.
                    </p>
                    <p className="control-card-section">
                        Filter By:
                    </p>
                    <div className="filter-by-button-container">
                        <div className="btn-group" data-toggle="buttons">
                            <label
                                className="btn visual-button active"
                                value="exportFilter"
                                id="exportFilter"
                                onClick={this.handleTransitionView}
                            >
                                <input
                                    type="radio"
                                    name="exportFilter"/>
                                Export
                            </label>
                            <label className="btn visual-button"
                                   value="importFilter"
                                   id="importFilter"
                                   onClick={this.handleTransitionView}
                            >
                                <input type="radio" name="importFilter"/>
                                Import
                            </label>
                        </div>
                    </div>
                    <p className="control-card-section">
                        {this.state.transitionView === "exportFilter" ? "Export " : "Import "}
                        Country:
                    </p>
                    <div className="country-button-container">
                        <div className="btn-group btn-group-country" data-toggle="buttons">

                        {
                            this.state.transitionView === "exportFilter" ?
                                (this.exportCountry.map((country, i) => {
                                    let classActive= "btn visual-button active";
                            return (
                                <label
                                    className={i === 0 ? classActive : "btn visual-button"}
                                    key={i}
                                    value={country + "Filter"}
                                    id={country + "Filter"}
                                    onClick={this.handleCountryFilter}>
                                    <input
                                        type="radio"
                                        name={country + "Filter"}/>
                                    {country}
                                </label>
                            )})) :
                                (this.importCountry.map((country, i) => {
                                    let classActive= "btn visual-button active";
                                    return (
                                        <label
                                            className={i === 0 ? classActive : "btn visual-button"}
                                            key={i}
                                            value={country + "Filter"}
                                            id={country + "Filter"}
                                            onClick={this.handleCountryFilter}>
                                            <input
                                                type="radio"
                                                name={country + "Filter"}/>
                                            {country}
                                        </label>
                                    )}
                                ))
                        }
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {

        return (
            <div className="map-wrapper">
                <div className="visual-padding row">
                <div className="visual-container col-md-8" id="map">
                </div>
                <div className="visual-buttons-container col-md-4">
                    <div className="card control-card">
                            <div className="card-block">
                                <p className="card-title">
                                    Control Center
                                </p>
                                <p className="control-card-section">View Mode:</p>
                                <div className="btn-group btn-container view-mode-button-container" data-toggle="buttons">
                                    <div className="btn-group" data-toggle="buttons">
                                        <label
                                            className="btn visual-button active"
                                            value="origin-view"
                                            id="origin-view"
                                            onClick={this.handleViewMode}>
                                            <input
                                                type="radio"
                                                name="origin-view"/>
                                                Origin
                                        </label>
                                        <label
                                            className="btn visual-button"
                                            value="destination-view"
                                            id="destination-view"
                                            onClick={this.handleViewMode}>
                                            <input type="radio"
                                                   name="destination-view"/>
                                                Destination
                                        </label>
                                        <label className="btn visual-button"
                                               value="transition-view"
                                               id="transition-view"
                                               onClick={this.handleViewMode}>
                                            <input type="radio" name="transition-view"/>
                                                Transition
                                        </label>
                                    </div>
                                </div>
                                {this.updateControlCenter()}
                            </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }

}