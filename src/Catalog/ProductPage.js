import React, { Component } from 'react';
import "./Catalog.css";
import chocolateBars from '../Data/chocolate-bars.json';
import StaticRating from "./StaticRating";
import { Link } from 'react-router-dom';

export default class ProductPage extends Component {
    
    render() {
        let productRef = this.props.routerprops.match.params.productRef;

        let product = chocolateBars.filter(bar => {
            return bar.recordid === productRef;
        });

        let content;
        if (product.length === 0) {
            content = (<p><strong>Product not found.</strong> Please return to our <Link to="/catalog" >Catalog</Link></p>);
        } else {
            product = product[0];
            let fields = product.fields
            
            let itemName = fields.name || "Item Name";
            let src = fields.src || "http://via.placeholder.com/350";
            let rating = Math.round(fields.rating) || 0;

            content = (
                <div className="catalog-item-card">
                <div className="catalog-item-header catalog-product-header">{itemName}</div>
                <div className="catalog-item-content">
                    <div className="product-content">
                        <ProductInformation product={product} />
                        <div className="catalog-img">
                            <span className="catalog-img-valign"></span><img src={src} />
                        </div>
                    </div>
                    <div>
                        <StaticRating rating={rating} />
                    </div>
                </div>
            </div>
            );
        }

        return (
            <div className="productpage-container">
                {content}
            </div>
        );
    }
}

class ProductInformation extends Component {
    render() {
        return (
            <div className="product-information">
                <div>
                <i className={"fa fa-globe"} aria-hidden="true"></i> Origin: {this.props.product.fields.broad_bean_origin}
                </div>
                <div>
                <i className={"fa fa-chocolate"} aria-hidden="true"></i> Cocoa Percentage {this.props.product.fields.cocoa_percent}
                </div>
                <div>
                <i className={"fa fa-industry"} aria-hidden="true"></i> Producer {this.props.product.fields.company}
                </div>
            </div>
        );
    }
}