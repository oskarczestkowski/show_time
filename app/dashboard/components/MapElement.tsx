"use client"
import React from "react";
import GoogleMapReact from 'google-map-react';
import dynamic from 'next/dynamic'
 
const CalendarElement = dynamic(() => import('./CalendarElement'), { ssr: false })

const AnyReactComponent = ({ text }: any) => <div className="text-4xl">{text}</div>;

export default function MapElement() {
  const defaultProps = {
    center: {
      lat: 54.373905264586014,
      lng: 18.647007740230656
    },
    zoom: 14
  };

  return (
    <div className="h-full w-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCbtcMBOOAOYoBlZUzWC-3xwtsEPKbbs3s" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
      </GoogleMapReact>
    </div>
  );
}