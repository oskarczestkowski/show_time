import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import { Event, UserRole } from "@/types/types"; // Ensure this path is correct
import EventDetails from "./eventDetails";
import SendMessageBox from "./sendMessageBox";

interface CustomMarkerProps {
  lat: number;
  lng: number;
  iconUrl: string;
  onClick: () => void;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ iconUrl, onClick }) => (
  <div onClick={onClick} style={{ cursor: 'pointer' }}>
    <img src={iconUrl} alt="Event Marker" style={{ width: '24px', height: '24px' }} />
  </div>
);

const MapElement: React.FC<{ userRole: UserRole }> = ({ userRole }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showSendMessageBox, setShowSendMessageBox] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/dashboard/getEvents');
        const data = await response.json();
        setEvents(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleMarkerClick = (event: Event) => {
    console.log("Marker clicked:", event); // Add this line
    setSelectedEvent(event);
  };

  const defaultProps = {
    center: {
      lat: 54.373905264586014,
      lng: 18.647007740230656
    },
    zoom: 14
  };

  const iconUrl = "/icons/concert.png"; // Update this with the actual path to your icon

  return (
    <div className="h-full w-full relative">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyD75EWmDGLt6lq4KlZmniElKohX5GSIXjA" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onChildClick={(key, childProps) => {
          const event = events.find(e => e.id === key);
          if (event) handleMarkerClick(event);
        }}
      >
        {events.map((event) => (
          <CustomMarker
            key={event.id}
            lat={event.latitude}
            lng={event.longitude}
            iconUrl={iconUrl}
            onClick={() => handleMarkerClick(event)}
          />
        ))}
      </GoogleMapReact>

      {selectedEvent && (
        <div className="event-details-container absolute top-0 left-0 bg-white p-4 shadow-lg">
          <EventDetails event={selectedEvent} senderRole={userRole} />
          <button onClick={() => setShowSendMessageBox(true)}>Send Message</button>
        </div>
      )}

      {showSendMessageBox && selectedEvent && (
        <SendMessageBox 
          receiverId={selectedEvent.organizer_id} 
          senderRole={userRole} 
          onMessageSent={() => setShowSendMessageBox(false)} 
        />
      )}
    </div>
  );
};

export default MapElement;
