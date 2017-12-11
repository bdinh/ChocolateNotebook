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

export default class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plotData: null,
            type: "origin",
        };
        bindAll(this, [
            "renderCircles",
            "handleButtons"
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
        // this.updateMap();


        // csv("./destination-data.csv", (error, data) => {
        //     let dataArray = [];
        //     console.log(data)
    }

    handleButtons(event) {
        console.log(event.target.value);
        this.setState({
            type: event.target.value
        });
        this.updateMap();
        this.map.off();
        this.map.remove();
    }

    updateMap() {

        // this.map.off();
        // this.map.remove();

        if (this.state.type === "origin") {
            csv("./origin-data.csv", (error, data) => {
                let dataArray = [];
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
                        fillColor: 'brown',
                        fillOpacity: 0.5,
                        radius: datum.count * .1
                    }).addTo(this.map);
                    let popupText = "<b>Country of Origin:</b> " + datum["Bean.Origin"] + "<br>" +
                        "<b>Total # Bars:</b> " + datum.count + "<br>" +
                        "<b>Average Rating:</b> " + Math.round(100 * parseFloat(datum["avg.rating"])) / 100;
                    circle.bindPopup(popupText)
                })
            })

        } else if (this.state.type === "destination"){
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

    render() {

        return (
            <div className="map-wrapper">
                <div className="visual-padding"/>
                <div className="visual-buttons-container">
                    <button
                        className="btn visual-button"
                        id="origin-button"
                        value="origin"
                        onClick={this.handleButtons}
                    >Origin</button>
                    <button
                        className="btn visual-button"
                        id="destination-button"
                        value="destination"
                        onClick={this.handleButtons}
                    >Destination</button>
                    <button
                        className="btn visual-button"
                        value="transition"
                        id="transition-button"
                        onClick={this.handleButtons}
                    >Transition</button>
                </div>
                <div className="visual-container" id="map">
                    {/*<Map*/}
                        {/*id="mapContainer"*/}
                        {/*center={[51.505, -0.09,]}*/}
                        {/*zoom={3}*/}
                        {/*style={{*/}
                            {/*height: "100%",*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*<TileLayer*/}
                            {/*url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
                            {/*attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"*/}
                        {/*/>*/}
                        {/*<Circle center={[51.505,51.505]}>*/}
                            {/*<Popup>*/}
                                {/*<span>*/}
                                  {/*A pretty CSS3 popup.<br />Easily customizable.*/}
                                {/*</span>*/}
                            {/*</Popup>*/}
                        {/*</Circle>*/}
                        {/*{this.renderCircles()}*/}
                        {/*<Circle radius={100} center={[55.5, 50]}>*/}
                            {/*<Popup>*/}
                                {/*<span>A pretty CSS3 popup. <br/> Easily customizable.</span>*/}
                            {/*</Popup>*/}
                        {/*</Circle>*/}
                        {/*{this.state.data !== null ? renderMarkers() : ""}*/}
                    {/*</Map>*/}
                </div>
            </div>
        );
    }

}