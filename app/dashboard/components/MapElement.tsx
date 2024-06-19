import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Event, UserRole } from "@/types/types";
import EventDetails from "./eventDetails";
import SendMessageBox from "./sendMessageBox";

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 54.373905264586014,
  lng: 18.647007740230656
};

const libraries: ("places")[] = ['places'];

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
    console.log("Marker clicked:", event);
    setSelectedEvent(event);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyD75EWmDGLt6lq4KlZmniElKohX5GSIXjA" libraries={libraries}>
      <div className="h-full w-full relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
        >
          {events.map((event) => (
            // Validate latitude and longitude before rendering the marker
            !isNaN(event.latitude) && !isNaN(event.longitude) && (
              <Marker
                key={event.id}
                position={{ lat: event.latitude, lng: event.longitude }}
                onClick={() => handleMarkerClick(event)}
                icon={{
                  url: "/icons/concert.png",
                  scaledSize: new window.google.maps.Size(24, 24), // Adjust the size as needed
                }}
              />
            )
          ))}
        </GoogleMap>

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
    </LoadScript>
  );
};

export default MapElement;
