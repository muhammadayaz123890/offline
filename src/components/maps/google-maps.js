import { GoogleApiWrapper, InfoWindow, Map, Marker, MapControl } from 'google-maps-react-18-support';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { GmapWraper } from '../../container/styled';

const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY;

const GoogleMaps = GoogleApiWrapper({
  apiKey,
})((property) => {
  const { latitude, longitude, google, width, height, zoom, mapStyles, place, styles, infoWindow, position } = property;
  const [state, setState] = useState({
    showingInfoWindow: true,
    activeMarker: {},
    selectedPlace: {},
  });

  const onMarkerClick = (props, marker) => {
    setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  const onMapClicked = () => {
    if (state.showingInfoWindow) {
      setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  const onInfoWindowClose = () => {
    setState({
      showingInfoWindow: false,
    });
  };

  return (
    <GmapWraper width={width} height={height} position={position}>
      <Map
        onClick={onMapClicked}
        styles={mapStyles}
        google={google}
        style={styles}
        center={{ lat: latitude, lng: longitude }}
        zoom={zoom}
        height="500px"
        zoomControl={false}
        fullscreenControl={false}
      >
        {place !== undefined ? (
          place.map((item) => {
            return (
              <Marker
                key={item.id}
                onClick={onMarkerClick}
                position={{ lat: item.latitude, lng: item.longitude }}
                icon={require(`../../static/img/map/mpc.png`)}
              />
            );
          })
        ) : (
          <Marker
            onClick={onMarkerClick}
            position={{ lat: latitude, lng: longitude }}
            icon={require(`../../static/img/map/mpc.png`)}
          />
        )}
        <InfoWindow onClose={onInfoWindowClose} marker={state.activeMarker} visible={state.showingInfoWindow}>
          {infoWindow}
        </InfoWindow>
      </Map>
    </GmapWraper>
  );
});

GoogleMaps.defaultProps = {
  latitude: '50.797897',
  longitude: '-1.077641',
  width: '100%',
  height: '305px',
  position: 'relative',
  zoom: 13,
  infoWindow: (
    <div className="z-99998 bg-slate-400" id="prueba">
      <h1>Hello world</h1>
    </div>
  ),

  styles: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
};

GoogleMaps.propTypes = {
  latitude: PropTypes.string,
  longitude: PropTypes.string,
  google: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  position: PropTypes.string,
  zoom: PropTypes.number,
  place: PropTypes.arrayOf(PropTypes.object),
  infoWindow: PropTypes.node,
};

export { GoogleMaps };
