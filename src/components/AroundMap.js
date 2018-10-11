import React ,{Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow } from "react-google-maps"

class innerAroundMap extends Component{
    render(){
        return(
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: 45, lng: -95 }}
            >
                <Marker position={{ lat: 45, lng: -95 }} />
                <Marker position={{ lat: 45.5, lng: -95.5 }} />
                <Marker position={{ lat: 44.5, lng: -94.5 }}>
                    <InfoWindow>
                        <div>
                            Hello World
                        </div>
                    </InfoWindow>
                </Marker>
            </GoogleMap>
        )
    }
}

export const AroundMap = withScriptjs(withGoogleMap(innerAroundMap));