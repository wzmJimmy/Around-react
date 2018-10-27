import React ,{Component} from 'react';
import { Tabs, Spin } from 'antd';
import  $ from 'jquery';

import '../styles/Home.css';
import {API_ROOT, AUTH_PREFIX, GEO_OPTIONS, KEY, POS_KEY} from "../util/constant";
import {Gallery} from "./Gallery";
import {CreatePostButton} from "./CreatePostButton";
import {AroundMap} from "./AroundMap";

const TabPane = Tabs.TabPane;

export class Home extends Component{
    state={
        error:'',
        loadingGeo:false,
        loadingPost:false,
        post:[],
    }
    componentDidMount(){
        this.setState({loadingGeo:true,error:''})
        this.getGeolocation();
    }
    getGeolocation =()=>{
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(
                this.onSuccessGeo,
                this.onFailFeo,
                GEO_OPTIONS
            )
        }else {
            this.setState({error:'Your browser does not support geolocation!'})
        }
    }
    onSuccessGeo = (position)=>{
            const {latitude,longitude} = position.coords;
            localStorage.setItem(POS_KEY,JSON.stringify({lat:latitude,long:longitude}));
            console.log(position);
            this.setState({loadingGeo: false, error:'',loadingPost: true});
            this.loadNearbyPosts();
    }
    onFailFeo =(error)=>{
        console.log(error);
        this.setState({loadingGeo: false, error:error.message});
    }
    loadNearbyPosts = (loaction, range)=>{
        this.setState({loadingPost: false});
        const {lat,long} = loaction || JSON.parse(localStorage.getItem(POS_KEY));
        const radius = range||20;
        $.ajax({
                url:`${API_ROOT}/search?lat=${lat}&lon=${long}&range=${radius}`,
                headers:{
                    Authorization:`${AUTH_PREFIX} ${localStorage.getItem(KEY)}`,
                },
                method: 'GET',
            }
        ).then(
            (rsp) => {this.setState({loadingPost: false,post:(rsp||[])});},
            (rsp) => {this.setState({error:rsp.responseText});}
        ).catch((err)=>{console.log(err)})
    }
    getGalleryPanelContent = () => {
        if (this.state.error) {
            return <div>{this.state.error}</div>;
        } else if (this.state.loadingGeo) {
            return <Spin tip="Loading Geo-location..."/>;
        } else if (this.state.loadingPost) {
            return <Spin tip="Loading Nearby Posts..."/>;
        } else if(this.state.post!=null && this.state.post.length>0) {
            return <Gallery images={this.state.post.map(({user,message,url})=>{
                return {
                    user,src:url,thumbnail:url,caption:message,
                    thumbnailWidth:400,thumbnailHeight:300,
                }
            })}/>;
        } else{
                return <Gallery images={default_imagelist}/>;
        }
    }
    render(){
        const PostButton = <CreatePostButton loadNearbyPosts={this.loadNearbyPosts}/>;
        return(
            <Tabs tabBarExtraContent={PostButton} className="maintabs">
                <TabPane tab="Post" key="1">{this.getGalleryPanelContent()}</TabPane>
                <TabPane tab="Map" key="2">
                    <AroundMap
                        loadNearbyPosts={this.loadNearbyPosts}
                        posts={this.state.post}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `600px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </TabPane>
            </Tabs>

        );
    }
}

const default_imagelist=[
    {
        user:"123",
        src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
        thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
        thumbnailWidth: 271,
        thumbnailHeight: 320,
        caption: "Orange Macro (Tom Eversley - isorepublic.com)"
    },
    {
        user:"123",
        src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
        thumbnail: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 190,
        caption: "286H (gratisography.com)"
    },
    {
        user:"123",
        src: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
        thumbnail: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 148,
        caption: "315H (gratisography.com)"
    },
    {
        user:"123",
        src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
        thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 213,
        caption: "201H (gratisography.com)"
    },
    {
        user:"123",
        src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_n.jpg",
        thumbnailWidth: 248,
        thumbnailHeight: 320,
        caption: "Big Ben (Tom Eversley - isorepublic.com)"
    },
    {
        user:"123",
        src: "https://c1.staticflickr.com/9/8785/28687743710_870813dfde_h.jpg",
        thumbnail: "https://c1.staticflickr.com/9/8785/28687743710_3580fcb5f0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 113,
        caption: "Red Zone - Paris (Tom Eversley - isorepublic.com)"
    },
    {
        user:"123",
        src: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
        thumbnail: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_n.jpg",
        thumbnailWidth: 313,
        thumbnailHeight: 320,
        caption: "Wood Glass (Tom Eversley - isorepublic.com)"
    },
    {
        user:"123",
        src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
        thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 213,
        caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)"
    }
];