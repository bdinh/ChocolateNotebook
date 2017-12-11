import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map';
import './mapview.css';
import { json, select, csv } from 'd3';
import { Map, Marker, Popup, TileLayer, Circle, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { map, getPanes, overlayPane, geo, svg, LatLng,
    initPathRoot, path, collection, circleMarker, remove, off } from 'leaflet';
import $ from 'jquery';
// import L from 'leaflet';
import { bindAll } from 'lodash'
import  '../../node_modules/leaflet-curve/leaflet.curve';
import '../../node_modules/leaflet-arc/bin/leaflet-arc.min';
import '../../node_modules/leaflet.polyline.snakeanim/L.Polyline.SnakeAnim'

export default class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "origin-view",
            originFilterType: "totalFilter"
        };
        bindAll(this, [
            "handleViewMode",
            "updateControlCenter",
            "handleOriginFilter"
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

    }

    componentWillMount() {



    }

    componentDidMount() {
        // this.map = L.map('map');
        this.updateMap();

        // csv("./final-bezier-data.csv", (error, data) => {
        //     let dataArray = [];
        //     console.log(data)
        //
        //     let mapboxTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        //         attribution: "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
        //     });
        //
        //     this.map =  L.map('map')
        //         .addLayer(mapboxTiles)
        //         .setView([-1.2858, 13], 2);
        //
        //     let origin = [];
        //     let destination = [];
        //     let midpoint = [];

            // data.forEach((datum) => {
            //     let pathOptions = {
            //         color: 'rgba(127, 82, 78, 0.2)',
            //         weight: 2,
            //         snakingSpeed: 200,
            //         vertices:200
            //     };
            //
            //     let bezierCurve = L.curve(['M', [datum.originLat, datum.originLong],
            //         'Q', [datum.midpointY + 20, datum.midpointX],
            //         [datum.destLat, datum.destLong]], pathOptions).addTo(this.map);
            //     // let bezierCurve = L.Polyline.Arc([datum.originLat, datum.originLong], [datum.destLat, datum.destLong], pathOptions).addTo(this.map).snakeIn();
            //     // let bezierCurve = L.Polyline.Arc([-25.274398, -133.775136], [-25.274398, 133.775136], pathOptions).addTo(this.map).snakeIn();
            //
            //     let popupText = "<b>Country of Origin:</b> " + datum.Origin + "<br>" +
            //         "<b>Country of Destination:</b> " + datum.Destination + "<br>" +
            //         "<b>Total # Bars:</b> " + datum.TotalN + "<br>" +
            //         "<b>Average Cocoa Percentage:</b> " + datum.MeanPercent + "%" + "<br>" +
            //         "<b>Average Rating:</b> " + Math.round(100 * parseFloat(datum.MeanRating)) / 100;
            //     bezierCurve.bindPopup(popupText);
            //     bezierCurve.on('mouseover', function (e) {
            //         // this.options.color = 'rgba(127, 82, 78, 1)';
            //         this.setStyle({
            //             color: 'rgba(127, 82, 78, 1)',
            //             weight:
            //         });
            //         this.openPopup();
            //     });
            //     bezierCurve.on('mouseout', function (e) {
            //         // this.options.color = 'rgba(127, 82, 78, 0.2)';
            //         this.setStyle(pathOptions);
            //         this.closePopup();
            //     });
            //
            //
            //
            // })






            // var line = L.polyline(latlngs, {snakingSpeed: 200});
            // line.addTo(map).snakeIn();

            // let test = L.Polyline.Arc([-16.290154, -63.588653], [-27.35313, -53.60125], pathOptions).addTo(this.map).snakeIn();
            // let test2 = L.Polyline.Arc([-0.006949, 6.522309], [46.227638, 2.213749], pathOptions).addTo(this.map).snakeIn();

            // var path = L.curve(['M',[50.54136296522163,28.520507812500004],
            //         'C',[52.214338608258224,28.564453125000004],
            //         [48.45835188280866,33.57421875000001],
            //         [50.680797145321655,33.83789062500001],
            //         'V',[48.40003249610685],
            //         'L',[47.45839225859763,31.201171875],
            //         [48.40003249610685,28.564453125000004],'Z'],
            //     {color:'red'}).addTo(this.map);

            // var pathFour = L.curve(['M',[46.86019101567027,-29.047851562500004],
            //     'Q',[50.48547354578499,-23.818359375000004],
            //     [46.70973594407157,-19.907226562500004],
            //     'T',[46.6795944656402,-11.0302734375]], {dashArray: 5, animate: {duration: 3000}}).addTo(this.map);





        // })
    }

    updateMap() {
        if (this.state.type === "origin-view") {
            console.log("orig")
            csv("./origin-data.csv", (error, data) => {
                let mapboxTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
                });

                this.map =  L.map('map')
                    .addLayer(mapboxTiles)
                    .setView([-1.2858, 20], 2);

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
                        "<b>Total # Bars:</b> " + datum.total + "<br>" +
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
            console.log("dest")
            csv("./destination-data.csv", (error, data) => {

                let mapboxTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
                });

                this.map = L.map('map')
                    .addLayer(mapboxTiles)
                    .setView([-1.2858, 20], 2);

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
                        "<b>Total # Bars:</b> " + datum.total + "<br>" +
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
            csv("./origin-data.csv", (error, data) => {

                let originData = data;

                csv("./destination-data.csv", (error, data) => {
                    let destinationData = data;

                    let mapboxTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution: "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
                    });

                    this.map = L.map('map')
                        .addLayer(mapboxTiles)
                        .setView([-1.2858, 20], 2);

                    originData.forEach((datum) => {
                        let position = [parseFloat(datum.latitude), parseFloat(datum.longitude)];
                        let circle = new L.circleMarker(position, {
                            color: "transparent",
                            fill: true,
                            fillColor: '#CC9692',
                            fillOpacity: 0.5,
                            radius: 10
                        }).addTo(this.map);
                        let popupText = "<b>Country of Origin:</b> " + datum["Bean.Origin"] + "<br>" +
                            "<b>Total # Bars:</b> " + datum.count + "<br>" +
                            "<b>Average Rating:</b> " + Math.round(100 * parseFloat(datum["avg.rating"])) / 100;
                        circle.bindPopup(popupText)
                    });

                    destinationData.forEach((datum) => {
                        let position = [parseFloat(datum.latitude), parseFloat(datum.longitude)];
                        let circle = new L.circleMarker(position, {
                            color: "transparent",
                            fill: true,
                            fillColor: '#CFD4AD',
                            fillOpacity: 0.8,
                            radius: 10
                        }).addTo(this.map);
                        let popupText = "<b>Country of Destination:</b> " + datum["Company.Location"] + "<br>" +
                            "<b>Total # Bars:</b> " + datum.count + "<br>" +
                            "<b>Average Rating:</b> " + Math.round(100 * parseFloat(datum["avg.rating"])) / 100;
                        circle.bindPopup(popupText)
                    })



                })

            });

        }

    }

    handleViewMode(event) {
        this.map.off();
        this.map.remove();
        this.setState({
            type: event.target.value
        }, this.updateMap);
        console.log(this.map);
    }


    handleOriginFilter(event) {
        this.map.off();
        this.map.remove();
        this.setState({
            originFilterType: event.target.value
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
                    <p className="card-section">
                        Filter By:
                    </p>
                    <div className="filter-by-button-container">
                        <button
                            className="btn visual-button"
                            type="radio"
                            name="totalFilter"
                            value="totalFilter"
                            onClick={this.handleOriginFilter}
                        >
                            Total
                        </button>
                        <button
                            className="btn visual-button"
                            type="radio"
                            name="ratingFilter"
                            value="ratingFilter"
                            onClick={this.handleOriginFilter}
                        >
                            Rating
                        </button>
                        <button
                            className="btn visual-button"
                            type="radio"
                            name="percentFilter"
                            value="percentFilter"
                            onClick={this.handleOriginFilter}
                        >
                            Cocao Percent
                        </button>
                    </div>
                </div>
            );
        } else if (this.state.type === "destination-view") {
            return (
                <p>This map shows the country where the chocolate bars
                    from the 1700 individual bars that were expertly rated in this
                    <a href="http://flavorsofcacao.com/index.html"> dataset</a> were
                    imported to.
                </p>
            )
        } else {
            return ""
        }
    }


    render() {

        return (
            <div className="map-wrapper">
                <div className="visual-padding row">
                <div className="visual-container col-md-8" id="map">
                </div>
                <div className="visual-buttons-container col-md-4">
                    <div className="card">
                            <div className="card-block">
                                <p className="card-title">
                                    Control Center
                                </p>
                                <p className="card-section">View Mode:</p>
                                <div className="btn-group btn-container view-mode-button-container" data-toggle="buttons">
                                        <button
                                            className="btn visual-button"
                                            type="radio"
                                            name="origin-view"
                                            value="origin-view"
                                            onClick={this.handleViewMode}
                                        >Origin
                                        </button>
                                        <button
                                            className="btn visual-button"
                                            type="radio"
                                            name="destination-view"
                                            value="destination-view"
                                            onClick={this.handleViewMode}
                                        >Destination
                                        </button>
                                        <button
                                            className="btn visual-button"
                                            type="radio"
                                            name="transition-view"
                                            value="transition-view"
                                            onClick={this.handleViewMode}
                                        >Transition
                                        </button>
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