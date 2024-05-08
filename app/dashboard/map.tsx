"use client";
import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text, lat, lng }: any) => (
  <div className="text-4xl">{text}</div>
);

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 54.44523997033245,
      lng: 18.556777889033913,
    },
    zoom: 10,
  };

  return (
    <div  className="h-full w-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCbtcMBOOAOYoBlZUzWC-3xwtsEPKbbs3s" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          text="🏠"
        />
      </GoogleMapReact>
    </div>
  );
}
