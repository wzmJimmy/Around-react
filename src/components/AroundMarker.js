import React ,{Component} from 'react';
import { Marker,InfoWindow } from "react-google-maps"

export class AroundMarker extends Component{
    state={
        show: false
    }
    onToggleShow = ()=>{
        this.setState((preState)=>({show:!preState.show}))
    }
    render(){
        const post = this.props.post
        return(
            <Marker position = {{
                lat: post.location.lat,
                lng: post.location.lon,
                }}
                    onMouseOver={this.onToggleShow}
                    onMouseOut={this.onToggleShow}
            >
                {
                    this.state.show?(
                        <InfoWindow onCloseClick={this.onToggleShow}>
                            <div>
                                <p>{`${post.user}:${post.message}`}</p>
                                <img src={post.url} width="100px" height="80px" alt="share image"></img>
                            </div>
                        </InfoWindow>
                    ):null
                }

            </Marker>
        )
    }
}