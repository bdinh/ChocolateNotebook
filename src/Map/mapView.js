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
            plotData: null,
            type: "Origin",
        };
        bindAll(this, [
            "renderCircles",
            "handleButtons",
            "updateControlCenter",
            "handleOriginFilter"
        ]);
        this.map = "";
    }

    componentWillMount() {
        // json("./test2.json", (error, data) => {
        //     let dataArray = [];
        //
        //     Object.keys(data).forEach((key, i) => {
        //         if (i == 0) {
        //             let insertObject = {};
        //             data[key].forEach((value) => {
        //                 insertObject[key] = value;
        //                 dataArray.push(insertObject);
        //             });
        //         } else {
        //             data[key].forEach((value) => {
        //                 let insert = dataArray[i];
        //                 insert[key] = value;
        //             });
        //         }
        //     });
        //
        //     // dataArray.forEach((collection) => {
        //     //     collection.LatLng = new L.LatLng(collection["Origin.Lat"], collection["Origin.Long"])
        //     // });
        //     this.setState({
        //         data: dataArray
        //     });
        // })


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

    handleButtons(event) {
        console.log(event.target.value);
        // this.setState({
        //     type: event.target.value
        // });
        // this.updateMap();
        // this.map.off();
        // this.map.remove();
    }

    updateMap() {

        // this.map.off();
        // this.map.remove();

        if (this.state.type === "Origin") {
            csv("./origin-data.csv", (error, data) => {
                console.log(data)
                let mapboxTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
                });

                this.map =  L.map('map')
                    .addLayer(mapboxTiles)
                    .setView([-1.2858, 20], 2);

                data.forEach((datum) => {
                    let position = [parseFloat(datum.latitude), parseFloat(datum.longitude)];
                    let circle = new L.circleMarker(position, {
                        color: "transparent",
                        fill: true,
                        fillColor: '#7F524E',
                        fillOpacity: datum.count * 0.01,
                        radius: 5
                    }).addTo(this.map);
                    let popupText = "<b>Country of Origin:</b> " + datum["Bean.Origin"] + "<br>" +
                        "<b>Total # Bars:</b> " + datum.count + "<br>" +
                        "<b>Average Rating:</b> " + Math.round(100 * parseFloat(datum["avg.rating"])) / 100;
                    circle.bindPopup(popupText)

                    circle.on('mouseover', (event) => {
                        event.target.openPopup();
                        event.target.setStyle({
                            fillOpacity: 1
                        });
                    });

                    circle.on('mouseout', (event) => {
                        event.target.closePopup();
                        event.target.setStyle({
                            fillOpacity: datum.count * 0.01
                        });
                    });

                })

            })

        } else if (this.state.type === "Destination"){
            csv("./destination-data.csv", (error, data) => {
                let dataArray = [];
                console.log(data)

                let mapboxTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
                });

                this.map = L.map('map')
                    .addLayer(mapboxTiles)
                    .setView([-1.2858, 20], 2);

                data.forEach((datum) => {
                    let position = [parseFloat(datum.latitude), parseFloat(datum.longitude)];
                    let circle = new L.circleMarker(position, {
                        color: "transparent",
                        fill: true,
                        fillColor: 'brown',
                        fillOpacity: 0.5,
                        radius: datum.count * 0.1
                    }).addTo(this.map);
                    let popupText = "<b>Country of Destination:</b> " + datum["Company.Location"] + "<br>" +
                        "<b>Total # Bars:</b> " + datum.count + "<br>" +
                        "<b>Average Rating:</b> " + Math.round(100 * parseFloat(datum["avg.rating"])) / 100;
                    circle.bindPopup(popupText)
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

    renderCircles() {
        if (this.state.plotData !== null) {
            console.log(this.state.plotData);
            this.state.plotData.map((origin, i) => {
                return (
                    <CircleMarker radius={10} key={i} center={[55.5, 50]}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                        </Popup>
                    </CircleMarker>
                )
            })

        }
    }

    handleOriginFilter(event) {
        console.log(event.target.value)
    }

    updateControlCenter() {
        if (this.state.type === "Origin") {
            return (
                <div>
                    <p>This map shows the country of origin that produced the chocolate bars
                        from the 1700 individual bars that were expertly rated in this
                        <a href="http://flavorsofcacao.com/index.html"> dataset</a>.
                    </p>
                    <p>Total Number of Bars Exported Legend:</p>
                    <div className="legend-wrapper">
                        <p>0</p>
                        <div className="legend-scale">
                        </div>
                        <p>220</p>
                    </div>
                    <p className="card-section">
                        Filter By:
                    </p>
                    <div className="filter-by-button-container">
                        <button
                            className="btn visual-button"
                            type="radio"
                            name="total-filter"
                            value="total-filter"
                            onClick={this.handleOriginFilter}
                        >
                            Total
                        </button>
                        <button
                            className="btn visual-button"
                            type="radio"
                            name="rating-filter"
                            value="rating-filter"
                            onClick={this.handleOriginFilter}
                        >
                            Rating
                        </button>
                        <button
                            className="btn visual-button"
                            type="radio"
                            name="percent-filter"
                            value="percent-filter"
                            onClick={this.handleOriginFilter}
                        >
                            Cocao Percent
                        </button>
                    </div>
                </div>
            );
        } else if (this.state.type === "Destination") {
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
                                            name="Origin"
                                            value="Origin"
                                            onClick={this.handleButtons}
                                        >Origin
                                        </button>
                                        <button
                                            className="btn visual-button"
                                            type="radio"
                                            name="Destination"
                                            value="Destination"
                                            onClick={this.handleButtons}
                                        >Destination
                                        </button>
                                        <button
                                            className="btn visual-button"
                                            type="radio"
                                            name="Transition"
                                            value="Transition"
                                            onClick={this.handleButtons}
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