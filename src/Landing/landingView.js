import React, { Component } from 'react';
import $ from "jquery";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map';
import './landing.css'
import { Link  } from 'react-router-dom';


export default class LandingView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <div className="landing-body">
            <div className="landing-image">
                <div className="get-started-button-container">
                    <button type="button" className="btn get-started-button">Get Started</button>
                </div>
                <div className="landing-text-container">
                    <p className="hero-text quote">
                        “All you need is love. But a little chocolate now and then doesn't hurt.”                 </p>
                    <p className="hero-text cited">- Charles M. Schulz</p>
                </div>
            </div>

            <div className="our-story row">
                <div className="col-md-6 section-block text-block">
                        <p className="section-title">Our Story</p>
                        <p className="section-text">We created Chocolate Notebook to help people keep track of all of the chocolate they taste over time. We hope it will be a useful and fun tool for chocolate enthusiasts, especially people who taste a lot of single origin chocolate. Since there are thousands of different chocolate bars and numerous things to remember about each chocolate, it can be hard to remember what you have had. Even fantastic chocolates can blur together if you haven’t had them in awhile. One member of our team has tasted numerous chocolate bars and admittedly cannot remember what they thought of most of the bars they’ve tasted. This project is also inspired by Chocolopolis, which has an incredible selection of single origin chocolate bars from around the world.</p>
                </div>
                <div className="col-md-6 note-book-icon section-block icon-block">
                    <img src="./notebook-icon.svg"/>
                </div>
            </div>
            <div className="history row">
                <div className="col-md-6 section-block text-block">
                        <p className="section-title">History of Chocolate</p>
                        <p className="section-text">
                            Cacao seeds, which chocolate is made out of, were first used in 1900 BC to
                            create fermented beverages that were frothy, spiced and bitter. It’s possible that
                            it was fermented and served as an alcoholic beverage as early as 1400 BC! The seeds
                            were believed to be a gift from a god that would imbue the drinker with strength.</p>
                        <p className="section-text">
                            It spread in Europe in the 16th century and was sweetened for consumption. It was
                            initially available to wealthy members of society, being an import, and later
                            became available to the general public. Cacao plantations spread, bringing with
                            them a thriving slave market, as it is laborious to grow and process cacao.
                        </p>
                        <p className="section-text">The
                            chocolate we recognize today started to take form in the 1800s as people learned
                            how to separate cacao butter (the fats) from cacao liquor (cacao solids).
                            Milk chocolate came on the scene in the late 1800s when powdered milk was mixed in
                            with the cacao liquor.In 1879, Robert Lindt of today’s Lindt chocolate brand invented
                            conching, the process by which chocolate is cooked and refined to reduce the particle size
                            and bring out flavors. Almost all modern chocolate on the market today has been conched.</p>
                </div>
                <div className="col-md-6 section-block chocolate-bar-icon">
                    {/*<p className="section-text">In 1879, Robert Lindt of today’s Lindt chocolate brand invented*/}
                        {/*conching, the process by which chocolate is cooked and refined to reduce the particle size*/}
                        {/*and bring out flavors. Almost all modern chocolate on the market today has been conched.*/}
                    {/*</p>*/}
                    {/*<div className="chocolate-bar-icon">*/}
                        <img src="./chocolate-icon.svg"/>
                    {/*</div>*/}
                </div>
            </div>
            <div className="footer">
                <div className="footer-container">
                    <p>Data from <a href="http://flavorsofcacao.com/index.html">Favors of Cacao</a></p>
                    <p className="footer-text">Made with &hearts; by Adele Miller, Bao Dinh, Jonathan Chuang, McKaulay Kolakowski</p>
                </div>
            </div>
        </div>

        );
    }

}
