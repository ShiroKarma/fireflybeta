import React, { Component, useEffect, useState } from 'react';
import liff from '@line/liff';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import { db } from '../../utils/firebase';
import { Button } from '@material-ui/core'
import './map.css'
import logo from '../../logo.svg'
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");


Geocode.setApiKey("AIzaSyBUdW_ctnNUHOpsLYyEKse1nyWw0xZP63Y");
Geocode.enableDebug();
class LocationSearchModal extends React.Component {
 
  state = {
    address: '',
    city: '',
    area: '',
    state: '',
    zoom: 15,
    height: 400,
    mapPosition: {
      lat: 13.7390154,
      lng: 100.5481816,
    },
    markerPosition: {
      lat: 13.7390154,
      lng: 100.5481816,
    }

  }
  

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          mapPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          markerPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        },
          () => {
            Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
              response => {
                console.log(response)
                const address = response.results[0].formatted_address,
                  addressArray = response.results[0].address_components,
                  city = this.getCity(addressArray),
                  area = this.getArea(addressArray),
                  state = this.getState(addressArray);
                console.log('city', city, area, state);
                this.setState({
                  address: (address) ? address : '',
                  area: (area) ? area : '',
                  city: (city) ? city : '',
                  state: (state) ? state : '',
                })
              },
              error => {
                console.error(error);
              }
            );

          })
      });
    } else {
      console.error("Geolocation is not supported by this browser!");
    }
  };

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //     if (
  //         this.state.markerPosition.lat !== this.state.center.lat ||
  //         this.state.address !== nextState.address ||
  //         this.state.city !== nextState.city ||
  //         this.state.area !== nextState.area ||
  //         this.state.state !== nextState.state
  //     ) {
  //         return true
  //     } else if (this.state.mapPosition.lat === nextState.mapPosition.lat) {
  //         return false
  //     }
  // }

  getCity = (addressArray) => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  getArea = (addressArray) => {
    let area = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  getState = (addressArray) => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onInfoWindowClose = (event) => { };

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      response => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setState({
          address: (address) ? address : '',
          area: (area) ? area : '',
          city: (city) ? city : '',
          state: (state) ? state : '',
          markerPosition: {
            lat: newLat,
            lng: newLng
          },
          mapPosition: {
            lat: newLat,
            lng: newLng
          },
        })
      },
      error => {
        console.error(error);
      }
    );
  };

  onPlaceSelected = (place) => {
    console.log('plc', place);
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();

    console.log('latvalue', latValue)
    console.log('lngValue', lngValue)

    // Set these values in the state.
    this.setState({
      address: (address) ? address : '',
      area: (area) ? area : '',
      city: (city) ? city : '',
      state: (state) ? state : '',
      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      },
    })
  };



  handleCordSubmit = (e) => {
    console.log("=====================>",this.props.userId)
    e.preventDefault();
    db.collection('history').doc(this.props.userId)
      .update({
        Place: this.state.address,
        Details: this.state.detailsFire,
        Location: ["" + this.state.markerPosition.lat + "", "" + this.state.markerPosition.lng + ""],
        inprogress: true,
        AI_Status:1
      });
      alert("Success")
  }
  handleDetailChange = (e) => {
    e.preventDefault()
    this.setState({ detailsFire: e.target.value })
  }
  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap(
        props => (
          <GoogleMap
            defaultZoom={this.state.zoom}
            defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
          >
            {/* InfoWindow on top of marker */}

            {/*Marker*/}
            <Marker
              google={this.props.google}
              name={'Dolores park'}
              draggable={true}
              onDragEnd={this.onMarkerDragEnd}
              position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
            />
            <InfoWindow
              onClose={this.onInfoWindowClose}
              position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
            >
              <div>
                <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
              </div>
            </InfoWindow>
            <Marker />

            {/* <MarkerWithLabel
                            position={{ lat: -34.397, lng: 150.644 }}
                            labelAnchor={new google.maps.Point(0, 0)}
                            labelStyle={{ backgroundColor: "yellow", fontSize: "32px", padding: "16px" }}
                        >
                            <div>Hello There!</div>
                        </MarkerWithLabel> */}


            {/* For Auto complete Search Box */}
            <Autocomplete
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                marginTop: '2px',
                marginBottom: '2rem'
              }}
              onPlaceSelected={this.onPlaceSelected}
              types={['(regions)']}
            />
          </GoogleMap>
        )
      )
    );

    return (
      <div>
        <div style={{ padding: '1rem', margin: '0 auto', maxWidth: 1000 }}>

          <AsyncMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUdW_ctnNUHOpsLYyEKse1nyWw0xZP63Y&libraries=places"
            loadingElement={
              <div style={{ height: `100%` }} />
            }
            containerElement={
              <div style={{ height: this.state.height }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
          />
        </div>

        <form className="formHolder" id="sendAMessage">
          <div className="row-fluid pt-4 px-4">
            <h2 className="text-center">SEND A MESSAGE</h2>
          </div>
          <div className="Location">
            <label htmlFor="location"><h4>Location</h4></label>
            <h6 label="Address">{this.state.address}</h6>
          </div>
          <div className="form-group row-fluid m-4">
            <label htmlFor="details">More Details</label>
            <textarea
              rows="5"
              type="text"
              id="details"
              placeholder="Details"
              className="form-control"
              value={this.state.detailsFire}
              onChange={this.handleDetailChange}
            />
          </div>
          <div className="row m-4">
            <Button
              style={{backgroundColor:'#e6a800' ,}}
              form="sendAMessage"
              type="submit"
              className="btn btn-block btn-primary"
              onClick={this.handleCordSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    )
  }

}

export default LocationSearchModal;