import React ,{Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import {POS_KEY} from "../util/constant";
import {AroundMarker} from "./AroundMarker";

class innerAroundMap extends Component{
    reloadMarkers = ()=>{
        console.log("reloadMarkers");
        const range = this.getRange();
        const center = this.map.getCenter();
        const location = {lat: center.lat(),long:center.lng()};
        this.props.loadNearbyPosts(location,range);
    }

    getMapRef = (map) => {
        this.map = map;
        window.map = map;
    }

    getRange = () => {
        const google = window.google;
        const center = this.map.getCenter();
        const bounds = this.map.getBounds();
        if (center && bounds) {
            const ne = bounds.getNorthEast();
            const right = new google.maps.LatLng(center.lat(), ne.lng());
            return 0.001 * google.maps.geometry.spherical.computeDistanceBetween(center, right);
        }
    }

    render(){
        const {lat,long} = JSON.parse(localStorage.getItem(POS_KEY));
        console.log(lat,long);
        console.log(this.props.posts);
        return(
            <GoogleMap
                onDragEnd={this.reloadMarkers}
                onZoomChanged={this.reloadMarkers}
                ref = {this.getMapRef}
                defaultZoom={11}
                defaultCenter={{ lat: lat, lng: long }}
            >
                {
                    this.props.posts.map((post)=>
                            <AroundMarker
                                key = {post.url}
                                post={post}
                            />
                    )
                }

            </GoogleMap>
        )
    }
}

export const AroundMap = withScriptjs(withGoogleMap(innerAroundMap));